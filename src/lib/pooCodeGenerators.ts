import type { PooCompletedChallenge } from '../data/pooCompletedChallenges';

function parseMethodUml(m: string): { name: string; params: string; returnType: string; isAbstract: boolean } {
  const isAbstract = m.includes('*');
  let clean = m.replace('+', '').replace('-', '').replace('*', '').trim();
  let returnType = 'void';
  if (clean.includes(':')) {
    const parts = clean.split(':');
    returnType = parts[1].trim();
    clean = parts[0].trim();
  }
  
  let name = clean;
  let params = '';
  if (clean.includes('(')) {
    const pParts = clean.split('(');
    name = pParts[0].trim();
    params = pParts[1].replace(')', '').trim();
  }
  return { name, params, returnType, isAbstract };
}

function parseAttrUml(a: string): { name: string; type: string } {
  let clean = a.replace('-', '').replace('+', '').trim();
  let type = 'String';
  let name = clean;
  if (clean.includes(':')) {
    const parts = clean.split(':');
    name = parts[0].trim();
    type = parts[1].trim();
  }
  return { name, type };
}

function convertParamsToJava(params: string): string {
  if (!params) return '';
  return params.split(',').map(p => {
    const parts = p.trim().split(':');
    if (parts.length === 2) {
      return `${parts[1].trim()} ${parts[0].trim()}`;
    }
    return p.trim();
  }).join(', ');
}

function getJavaDefaultReturn(returnType: string): string {
  if (returnType === 'void') return '';
  if (returnType === 'boolean') return 'return true;';
  if (returnType === 'int' || returnType === 'double' || returnType === 'float' || returnType === 'long') return 'return 0;';
  return 'return null;';
}

export function generateJavaCode(ch: PooCompletedChallenge): string {
  const parentAbsMethods = ch.parent.methods
    .map(parseMethodUml)
    .filter(pm => pm.isAbstract);

  const ifaceMethods = ch.interfaceSpec.methods.map(m => {
    const pm = parseMethodUml(m);
    return `    ${pm.returnType} ${pm.name}(${convertParamsToJava(pm.params)});`;
  }).join('\n');

  const extAttrs = ch.externalClass.attrs.map(a => {
    const pa = parseAttrUml(a);
    return `    private ${pa.type} ${pa.name};`;
  }).join('\n');

  const extMethods = ch.externalClass.methods.map(m => {
    const pm = parseMethodUml(m);
    return `    public ${pm.returnType} ${pm.name}(${convertParamsToJava(pm.params)}) {\n        System.out.println("Ejecutando en ${ch.externalClass.name}...");\n        ${getJavaDefaultReturn(pm.returnType)}\n    }`;
  }).join('\n\n');

  const parentAttrs = ch.parent.attrs.map(a => {
    const pa = parseAttrUml(a);
    return `    private ${pa.type} ${pa.name};`;
  }).join('\n');

  const parentMethods = ch.parent.methods.map(m => {
    const pm = parseMethodUml(m);
    if (pm.isAbstract) {
      return `    public abstract ${pm.returnType} ${pm.name}(${convertParamsToJava(pm.params)});`;
    }
    return `    public ${pm.returnType} ${pm.name}(${convertParamsToJava(pm.params)}) {\n        System.out.println("Comportamiento base en ${ch.parent.name}");\n        ${getJavaDefaultReturn(pm.returnType)}\n    }`;
  }).join('\n\n');

  // Generador de implementaciones abstractas del padre
  const generateJavaAbstractOverrides = (className: string) => {
    return parentAbsMethods.map(pm => {
      return `    @Override\n    public ${pm.returnType} ${pm.name}(${convertParamsToJava(pm.params)}) {\n        System.out.println("Cálculo / operación abstracta de ${ch.parent.name} implementada en ${className}");\n        ${getJavaDefaultReturn(pm.returnType)}\n    }`;
    }).join('\n\n');
  };

  // Hija 1
  const daughter1Attrs = ch.ownClassSpec.attrs.map(a => `    private ${parseAttrUml(a).type} ${parseAttrUml(a).name};`).join('\n');
  const daughter1OwnMethods = ch.ownClassSpec.methods.map(m => {
    const pm = parseMethodUml(m);
    return `    public ${pm.returnType} ${pm.name}(${convertParamsToJava(pm.params)}) {\n        System.out.println("Método propio de ${ch.ownClassSpec.name}");\n        ${getJavaDefaultReturn(pm.returnType)}\n    }`;
  }).join('\n\n');
  const daughter1Methods = [generateJavaAbstractOverrides(ch.ownClassSpec.name), daughter1OwnMethods].filter(Boolean).join('\n\n');

  // Hija 2
  const daughter2Attrs = ch.children[1].attrs.map(a => `    private ${parseAttrUml(a).type} ${parseAttrUml(a).name};`).join('\n');
  const daughter2OwnMethods = ch.children[1].methods.map(m => {
    const pm = parseMethodUml(m);
    return `    public ${pm.returnType} ${pm.name}(${convertParamsToJava(pm.params)}) {\n        System.out.println("Operación con composición en ${ch.children[1].name}");\n        ${getJavaDefaultReturn(pm.returnType)}\n    }`;
  }).join('\n\n');
  const daughter2Methods = [generateJavaAbstractOverrides(ch.children[1].name), daughter2OwnMethods].filter(Boolean).join('\n\n');

  // Hija 3
  const daughter3Attrs = ch.children[2].attrs.map(a => `    private ${parseAttrUml(a).type} ${parseAttrUml(a).name};`).join('\n');
  const daughter3IfaceMethods = ch.interfaceSpec.methods.map(m => {
    const pm = parseMethodUml(m);
    return `    @Override\n    public ${pm.returnType} ${pm.name}(${convertParamsToJava(pm.params)}) {\n        System.out.println("Implementación de la interfaz ${ch.interfaceSpec.name} en ${ch.children[2].name}");\n        ${getJavaDefaultReturn(pm.returnType)}\n    }`;
  }).join('\n\n');
  const daughter3Methods = [generateJavaAbstractOverrides(ch.children[2].name), daughter3IfaceMethods].filter(Boolean).join('\n\n');

  return `// ==========================================\n// 1. INTERFAZ\n// ==========================================\npublic interface ${ch.interfaceSpec.name} {\n${ifaceMethods}\n}\n\n// ==========================================\n// 2. CLASE EXTERNA (COMPOSICIÓN)\n// ==========================================\npublic class ${ch.externalClass.name} {\n${extAttrs}\n\n    public ${ch.externalClass.name}() {}\n\n${extMethods}\n}\n\n// ==========================================\n// 3. CLASE PADRE ABSTRACTA\n// ==========================================\npublic abstract class ${ch.parent.name} {\n${parentAttrs}\n\n    public ${ch.parent.name}() {}\n\n${parentMethods}\n}\n\n// ==========================================\n// 4. CLASES HIJAS\n// ==========================================\n\n// Hija 1: Con características propias\npublic class ${ch.ownClassSpec.name} extends ${ch.parent.name} {\n${daughter1Attrs}\n\n${daughter1Methods}\n}\n\n// Hija 2: Con atributo de clase externa\npublic class ${ch.children[1].name} extends ${ch.parent.name} {\n${daughter2Attrs}\n\n${daughter2Methods}\n}\n\n// Hija 3: Implementa la Interfaz\npublic class ${ch.children[2].name} extends ${ch.parent.name} implements ${ch.interfaceSpec.name} {\n${daughter3Attrs}\n\n${daughter3Methods}\n}\n\n// ==========================================\n// 5. CLASE MAIN\n// ==========================================\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("=== 1. COMPOSICIÓN Y OBJETOS ===");\n        ${ch.externalClass.name} extObj = new ${ch.externalClass.name}();\n        ${ch.ownClassSpec.name} obj1 = new ${ch.ownClassSpec.name}();\n        ${ch.children[1].name} obj2 = new ${ch.children[1].name}();\n        ${ch.children[2].name} obj3 = new ${ch.children[2].name}();\n\n        System.out.println("\\n=== 2. DEMOSTRACIÓN DE POLIMORFISMO ===");\n        ${ch.parent.name}[] lista = { obj1, obj2, obj3 };\n        for (${ch.parent.name} item : lista) {\n            System.out.println("Instancia: " + item.getClass().getSimpleName());\n        }\n\n        System.out.println("\\n=== 3. USO DE LA INTERFAZ ===");\n        ${ch.interfaceSpec.name} ejecutor = obj3;\n        ${ch.interfaceSpec.methods[0] ? 'ejecutor.' + parseMethodUml(ch.interfaceSpec.methods[0]).name + '();' : ''}\n    }\n}`;
}

export function generatePythonCode(ch: PooCompletedChallenge): string {
  const parentAbsMethods = ch.parent.methods
    .map(parseMethodUml)
    .filter(pm => pm.isAbstract);

  const pyAbsOverrides = (className: string) => {
    return parentAbsMethods.map(pm => {
      return `    def ${pm.name}(self${pm.params ? ', ' + pm.params : ''}):\n        print(f"Implementación de ${pm.name} en {self.__class__.__name__}")`;
    }).join('\n\n');
  };

  return `# ==========================================\n# 1. INTERFAZ (ABC / Protocol)\n# ==========================================\nfrom abc import ABC, abstractmethod\n\nclass ${ch.interfaceSpec.name}(ABC):\n${ch.interfaceSpec.methods.map(m => {
    const pm = parseMethodUml(m);
    return `    @abstractmethod\n    def ${pm.name}(self${pm.params ? ', ' + pm.params : ''}):\n        pass`;
  }).join('\n\n')}\n\n# ==========================================\n# 2. CLASE EXTERNA (COMPOSICIÓN)\n# ==========================================\nclass ${ch.externalClass.name}:\n    def __init__(self):\n${ch.externalClass.attrs.map(a => `        self.${parseAttrUml(a).name} = None`).join('\n')}\n\n${ch.externalClass.methods.map(m => {
    const pm = parseMethodUml(m);
    return `    def ${pm.name}(self${pm.params ? ', ' + pm.params : ''}):\n        print("Ejecutando en ${ch.externalClass.name}")`;
  }).join('\n\n')}\n\n# ==========================================\n# 3. CLASE PADRE ABSTRACTA\n# ==========================================\nclass ${ch.parent.name}(ABC):\n    def __init__(self):\n${ch.parent.attrs.map(a => `        self._${parseAttrUml(a).name} = None`).join('\n')}\n\n${ch.parent.methods.map(m => {
    const pm = parseMethodUml(m);
    if (pm.isAbstract) {
      return `    @abstractmethod\n    def ${pm.name}(self${pm.params ? ', ' + pm.params : ''}):\n        pass`;
    }
    return `    def ${pm.name}(self${pm.params ? ', ' + pm.params : ''}):\n        print("Comportamiento base ${ch.parent.name}")`;
  }).join('\n\n')}\n\n# ==========================================\n# 4. CLASES HIJAS\n# ==========================================\nclass ${ch.ownClassSpec.name}(${ch.parent.name}):\n    def __init__(self):\n        super().__init__()\n\n${pyAbsOverrides(ch.ownClassSpec.name)}\n\nclass ${ch.children[1].name}(${ch.parent.name}):\n    def __init__(self, external_obj: ${ch.externalClass.name}):\n        super().__init__()\n        self.external = external_obj\n\n${pyAbsOverrides(ch.children[1].name)}\n\nclass ${ch.children[2].name}(${ch.parent.name}, ${ch.interfaceSpec.name}):\n    def __init__(self):\n        super().__init__()\n\n${[pyAbsOverrides(ch.children[2].name), ch.interfaceSpec.methods.map(m => {
    const pm = parseMethodUml(m);
    return `    def ${pm.name}(self${pm.params ? ', ' + pm.params : ''}):\n        print("Implementación interfaz ${ch.interfaceSpec.name} en ${ch.children[2].name}")`;
  }).join('\n\n')].filter(Boolean).join('\n\n')}\n\n# ==========================================\n# 5. MAIN PYTHON\n# ==========================================\nif __name__ == "__main__":
    ext = ${ch.externalClass.name}()
    obj1 = ${ch.ownClassSpec.name}()
    obj2 = ${ch.children[1].name}(ext)
    obj3 = ${ch.children[2].name}()

    lista = [obj1, obj2, obj3]
    for o in lista:
        print(f"Instancia: {type(o).__name__}")`;
}

export function generateCsharpCode(ch: PooCompletedChallenge): string {
  const parentAbsMethods = ch.parent.methods
    .map(parseMethodUml)
    .filter(pm => pm.isAbstract);

  const csAbsOverrides = (className: string) => {
    return parentAbsMethods.map(pm => {
      const csName = pm.name.charAt(0).toUpperCase() + pm.name.slice(1);
      return `    public override ${pm.returnType} ${csName}(${convertParamsToJava(pm.params)}) {\n        Console.WriteLine("Implementación de ${csName} en ${className}");\n        ${pm.returnType !== 'void' ? 'return default;' : ''}\n    }`;
    }).join('\n\n');
  };

  return `using System;\nusing System.Collections.Generic;\n\n// 1. INTERFAZ\npublic interface I${ch.interfaceSpec.name} {\n${ch.interfaceSpec.methods.map(m => {
    const pm = parseMethodUml(m);
    const csName = pm.name.charAt(0).toUpperCase() + pm.name.slice(1);
    return `    ${pm.returnType} ${csName}(${convertParamsToJava(pm.params)});`;
  }).join('\n')}\n}\n\n// 2. CLASE EXTERNA\npublic class ${ch.externalClass.name} {\n${ch.externalClass.attrs.map(a => `    private ${parseAttrUml(a).type} ${parseAttrUml(a).name};`).join('\n')}\n}\n\n// 3. CLASE PADRE\npublic abstract class ${ch.parent.name} {\n${ch.parent.attrs.map(a => `    private ${parseAttrUml(a).type} ${parseAttrUml(a).name};`).join('\n')}\n${parentAbsMethods.map(pm => {
    const csName = pm.name.charAt(0).toUpperCase() + pm.name.slice(1);
    return `    public abstract ${pm.returnType} ${csName}(${convertParamsToJava(pm.params)});`;
  }).join('\n')}\n}\n\n// 4. CLASES HIJAS\npublic class ${ch.ownClassSpec.name} : ${ch.parent.name} {\n${csAbsOverrides(ch.ownClassSpec.name)}\n}\n\npublic class ${ch.children[1].name} : ${ch.parent.name} {\n    private ${ch.externalClass.name} _external;\n\n${csAbsOverrides(ch.children[1].name)}\n}\n\npublic class ${ch.children[2].name} : ${ch.parent.name}, I${ch.interfaceSpec.name} {\n${[csAbsOverrides(ch.children[2].name), ch.interfaceSpec.methods.map(m => {
    const pm = parseMethodUml(m);
    const csName = pm.name.charAt(0).toUpperCase() + pm.name.slice(1);
    return `    public ${pm.returnType} ${csName}(${convertParamsToJava(pm.params)}) {\n        Console.WriteLine("Implementación C# de ${csName}");\n        ${pm.returnType !== 'void' ? 'return default;' : ''}\n    }`;
  }).join('\n\n')].filter(Boolean).join('\n\n')}\n}\n\n// 5. MAIN C#\nclass Program {\n    static void Main() {\n        var lista = new ${ch.parent.name}[] { new ${ch.ownClassSpec.name}(), new ${ch.children[1].name}(), new ${ch.children[2].name}() };\n        foreach (var item in lista) Console.WriteLine(item.GetType().Name);\n    }\n}`;
}

export function generateCppCode(ch: PooCompletedChallenge): string {
  const parentAbsMethods = ch.parent.methods
    .map(parseMethodUml)
    .filter(pm => pm.isAbstract);

  const cppAbsOverrides = (className: string) => {
    return parentAbsMethods.map(pm => {
      return `    ${pm.returnType} ${pm.name}() override {\n        std::cout << "Implementación C++ de ${pm.name} en ${className}\\n";\n        ${pm.returnType !== 'void' ? 'return {};' : ''}\n    }`;
    }).join('\n\n');
  };

  return `#include <iostream>\n#include <vector>\n#include <string>\n\n// 1. INTERFAZ\nclass ${ch.interfaceSpec.name} {\npublic:\n    virtual ~${ch.interfaceSpec.name}() = default;\n${ch.interfaceSpec.methods.map(m => {
    const pm = parseMethodUml(m);
    return `    virtual ${pm.returnType} ${pm.name}() = 0;`;
  }).join('\n')}\n};\n\n// 2. CLASE EXTERNA\nclass ${ch.externalClass.name} {};\n\n// 3. CLASE PADRE ABSTRACTA\nclass ${ch.parent.name} {\npublic:\n    virtual ~${ch.parent.name}() = default;\n${parentAbsMethods.map(pm => `    virtual ${pm.returnType} ${pm.name}() = 0;`).join('\n')}\n};\n\n// 4. CLASES HIJAS\nclass ${ch.ownClassSpec.name} : public ${ch.parent.name} {\npublic:\n${cppAbsOverrides(ch.ownClassSpec.name)}\n};\n\nclass ${ch.children[1].name} : public ${ch.parent.name} {\nprivate:\n    ${ch.externalClass.name} ext;\npublic:\n${cppAbsOverrides(ch.children[1].name)}\n};\n\nclass ${ch.children[2].name} : public ${ch.parent.name}, public ${ch.interfaceSpec.name} {\npublic:\n${[cppAbsOverrides(ch.children[2].name), ch.interfaceSpec.methods.map(m => {
    const pm = parseMethodUml(m);
    return `    ${pm.returnType} ${pm.name}() override {\n        std::cout << "Implementación C++ de la interfaz\\n";\n        ${pm.returnType !== 'void' ? 'return {};' : ''}\n    }`;
  }).join('\n\n')].filter(Boolean).join('\n\n')}\n};\n\nint main() {\n    std::vector<${ch.parent.name}*> lista = { new ${ch.ownClassSpec.name}(), new ${ch.children[1].name}(), new ${ch.children[2].name}() };\n    for(auto item : lista) { delete item; }\n    return 0;\n}`;
}
