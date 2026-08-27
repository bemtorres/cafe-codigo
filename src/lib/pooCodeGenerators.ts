import type { PooCompletedChallenge } from '../data/pooCompletedChallenges';

function parseMethodUml(m: string): { name: string; params: string; returnType: string } {
  let clean = m.replace('+', '').replace('*', '').trim();
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
  return { name, params, returnType };
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

export function generateJavaCode(ch: PooCompletedChallenge): string {
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
    return `    public ${pm.returnType} ${pm.name}(${convertParamsToJava(pm.params)}) {\n        System.out.println("Ejecutando en ${ch.externalClass.name}...");\n        ${pm.returnType !== 'void' ? 'return null;' : ''}\n    }`;
  }).join('\n\n');

  const parentAttrs = ch.parent.attrs.map(a => {
    const pa = parseAttrUml(a);
    return `    private ${pa.type} ${pa.name};`;
  }).join('\n');

  const parentMethods = ch.parent.methods.map(m => {
    const pm = parseMethodUml(m);
    const isAbstract = m.includes('*');
    if (isAbstract) {
      return `    public abstract ${pm.returnType} ${pm.name}(${convertParamsToJava(pm.params)});`;
    }
    return `    public ${pm.returnType} ${pm.name}(${convertParamsToJava(pm.params)}) {\n        System.out.println("Comportamiento base en ${ch.parent.name}");\n        ${pm.returnType !== 'void' ? 'return null;' : ''}\n    }`;
  }).join('\n\n');

  const daughter1Attrs = ch.ownClassSpec.attrs.map(a => {
    const pa = parseAttrUml(a);
    return `    private ${pa.type} ${pa.name};`;
  }).join('\n');

  const daughter1Methods = ch.ownClassSpec.methods.map(m => {
    const pm = parseMethodUml(m);
    return `    public ${pm.returnType} ${pm.name}(${convertParamsToJava(pm.params)}) {\n        System.out.println("Método propio de ${ch.ownClassSpec.name}");\n        ${pm.returnType !== 'void' ? 'return null;' : ''}\n    }`;
  }).join('\n\n');

  const daughter2Attrs = ch.children[1].attrs.map(a => {
    const pa = parseAttrUml(a);
    return `    private ${pa.type} ${pa.name};`;
  }).join('\n');

  const daughter2Methods = ch.children[1].methods.map(m => {
    const pm = parseMethodUml(m);
    return `    public ${pm.returnType} ${pm.name}(${convertParamsToJava(pm.params)}) {\n        System.out.println("Operación con composición en ${ch.children[1].name}");\n        ${pm.returnType !== 'void' ? 'return null;' : ''}\n    }`;
  }).join('\n\n');

  const daughter3Attrs = ch.children[2].attrs.map(a => {
    const pa = parseAttrUml(a);
    return `    private ${pa.type} ${pa.name};`;
  }).join('\n');

  const daughter3Methods = ch.interfaceSpec.methods.map(m => {
    const pm = parseMethodUml(m);
    return `    @Override\n    public ${pm.returnType} ${pm.name}(${convertParamsToJava(pm.params)}) {\n        System.out.println("Implementación de la interfaz ${ch.interfaceSpec.name} en ${ch.children[2].name}");\n        ${pm.returnType !== 'void' ? 'return null;' : ''}\n    }`;
  }).join('\n\n');

  return `// ==========================================\n// 1. INTERFAZ\n// ==========================================\npublic interface ${ch.interfaceSpec.name} {\n${ifaceMethods}\n}\n\n// ==========================================\n// 2. CLASE EXTERNA (COMPOSICIÓN)\n// ==========================================\npublic class ${ch.externalClass.name} {\n${extAttrs}\n\n    public ${ch.externalClass.name}() {}\n\n${extMethods}\n}\n\n// ==========================================\n// 3. CLASE PADRE ABSTRACTA\n// ==========================================\npublic abstract class ${ch.parent.name} {\n${parentAttrs}\n\n    public ${ch.parent.name}() {}\n\n${parentMethods}\n}\n\n// ==========================================\n// 4. CLASES HIJAS\n// ==========================================\n\n// Hija 1: Con características propias\npublic class ${ch.ownClassSpec.name} extends ${ch.parent.name} {\n${daughter1Attrs}\n\n${daughter1Methods}\n}\n\n// Hija 2: Con atributo de clase externa\npublic class ${ch.children[1].name} extends ${ch.parent.name} {\n${daughter2Attrs}\n\n${daughter2Methods}\n}\n\n// Hija 3: Implementa la Interfaz\npublic class ${ch.children[2].name} extends ${ch.parent.name} implements ${ch.interfaceSpec.name} {\n${daughter3Attrs}\n\n${daughter3Methods}\n}\n\n// ==========================================\n// 5. CLASE MAIN\n// ==========================================\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("=== 1. COMPOSICIÓN Y OBJETOS ===");\n        ${ch.externalClass.name} extObj = new ${ch.externalClass.name}();\n        ${ch.ownClassSpec.name} obj1 = new ${ch.ownClassSpec.name}();\n        ${ch.children[1].name} obj2 = new ${ch.children[1].name}();\n        ${ch.children[2].name} obj3 = new ${ch.children[2].name}();\n\n        System.out.println("\\n=== 2. DEMOSTRACIÓN DE POLIMORFISMO ===");\n        ${ch.parent.name}[] lista = { obj1, obj2, obj3 };\n        for (${ch.parent.name} item : lista) {\n            System.out.println("Instancia: " + item.getClass().getSimpleName());\n        }\n\n        System.out.println("\\n=== 3. USO DE LA INTERFAZ ===");\n        ${ch.interfaceSpec.name} ejecutor = obj3;\n        ${ch.interfaceSpec.methods[0] ? 'ejecutor.' + parseMethodUml(ch.interfaceSpec.methods[0]).name + '();' : ''}\n    }\n}`;
}

export function generatePythonCode(ch: PooCompletedChallenge): string {
  return `# ==========================================\n# 1. INTERFAZ (ABC / Protocol)\n# ==========================================\nfrom abc import ABC, abstractmethod\n\nclass ${ch.interfaceSpec.name}(ABC):\n${ch.interfaceSpec.methods.map(m => {
    const pm = parseMethodUml(m);
    return `    @abstractmethod\n    def ${pm.name}(self${pm.params ? ', ' + pm.params : ''}):\n        pass`;
  }).join('\n\n')}\n\n# ==========================================\n# 2. CLASE EXTERNA (COMPOSICIÓN)\n# ==========================================\nclass ${ch.externalClass.name}:\n    def __init__(self):\n${ch.externalClass.attrs.map(a => `        self.${parseAttrUml(a).name} = None`).join('\n')}\n\n${ch.externalClass.methods.map(m => {
    const pm = parseMethodUml(m);
    return `    def ${pm.name}(self${pm.params ? ', ' + pm.params : ''}):\n        print("Ejecutando en ${ch.externalClass.name}")`;
  }).join('\n\n')}\n\n# ==========================================\n# 3. CLASE PADRE ABSTRACTA\n# ==========================================\nclass ${ch.parent.name}(ABC):\n    def __init__(self):\n${ch.parent.attrs.map(a => `        self._${parseAttrUml(a).name} = None`).join('\n')}\n\n${ch.parent.methods.map(m => {
    const pm = parseMethodUml(m);
    const isAbs = m.includes('*');
    if (isAbs) {
      return `    @abstractmethod\n    def ${pm.name}(self${pm.params ? ', ' + pm.params : ''}):\n        pass`;
    }
    return `    def ${pm.name}(self${pm.params ? ', ' + pm.params : ''}):\n        print("Comportamiento base ${ch.parent.name}")`;
  }).join('\n\n')}\n\n# ==========================================\n# 4. CLASES HIJAS\n# ==========================================\nclass ${ch.ownClassSpec.name}(${ch.parent.name}):\n    def __init__(self):\n        super().__init__()\n\nclass ${ch.children[1].name}(${ch.parent.name}):\n    def __init__(self, external_obj: ${ch.externalClass.name}):\n        super().__init__()\n        self.external = external_obj\n\nclass ${ch.children[2].name}(${ch.parent.name}, ${ch.interfaceSpec.name}):\n    def __init__(self):\n        super().__init__()\n\n${ch.interfaceSpec.methods.map(m => {
    const pm = parseMethodUml(m);
    return `    def ${pm.name}(self${pm.params ? ', ' + pm.params : ''}):\n        print("Implementación interfaz ${ch.interfaceSpec.name} en ${ch.children[2].name}")`;
  }).join('\n\n')}\n\n# ==========================================\n# 5. MAIN PYTHON\n# ==========================================\nif __name__ == "__main__":
    ext = ${ch.externalClass.name}()
    obj1 = ${ch.ownClassSpec.name}()
    obj2 = ${ch.children[1].name}(ext)
    obj3 = ${ch.children[2].name}()

    lista = [obj1, obj2, obj3]
    for o in lista:
        print(f"Instancia: {type(o).__name__}")`;
}

export function generateCsharpCode(ch: PooCompletedChallenge): string {
  return `using System;\nusing System.Collections.Generic;\n\n// 1. INTERFAZ\npublic interface I${ch.interfaceSpec.name} {\n${ch.interfaceSpec.methods.map(m => {
    const pm = parseMethodUml(m);
    const csName = pm.name.charAt(0).toUpperCase() + pm.name.slice(1);
    return `    ${pm.returnType} ${csName}(${convertParamsToJava(pm.params)});`;
  }).join('\n')}\n}\n\n// 2. CLASE EXTERNA\npublic class ${ch.externalClass.name} {\n${ch.externalClass.attrs.map(a => `    private ${parseAttrUml(a).type} ${parseAttrUml(a).name};`).join('\n')}\n}\n\n// 3. CLASE PADRE\npublic abstract class ${ch.parent.name} {\n${ch.parent.attrs.map(a => `    private ${parseAttrUml(a).type} ${parseAttrUml(a).name};`).join('\n')}\n}\n\n// 4. CLASES HIJAS\npublic class ${ch.ownClassSpec.name} : ${ch.parent.name} {}\npublic class ${ch.children[1].name} : ${ch.parent.name} {\n    private ${ch.externalClass.name} _external;\n}\npublic class ${ch.children[2].name} : ${ch.parent.name}, I${ch.interfaceSpec.name} {\n${ch.interfaceSpec.methods.map(m => {
    const pm = parseMethodUml(m);
    const csName = pm.name.charAt(0).toUpperCase() + pm.name.slice(1);
    return `    public ${pm.returnType} ${csName}(${convertParamsToJava(pm.params)}) {\n        Console.WriteLine("Implementación C#");\n        ${pm.returnType !== 'void' ? 'return default;' : ''}\n    }`;
  }).join('\n\n')}\n}\n\n// 5. MAIN C#\nclass Program {\n    static void Main() {\n        var lista = new ${ch.parent.name}[] { new ${ch.ownClassSpec.name}(), new ${ch.children[1].name}(), new ${ch.children[2].name}() };\n        foreach (var item in lista) Console.WriteLine(item.GetType().Name);\n    }\n}`;
}

export function generateCppCode(ch: PooCompletedChallenge): string {
  return `#include <iostream>\n#include <vector>\n#include <string>\n\n// 1. INTERFAZ\nclass ${ch.interfaceSpec.name} {\npublic:\n    virtual ~${ch.interfaceSpec.name}() = default;\n${ch.interfaceSpec.methods.map(m => {
    const pm = parseMethodUml(m);
    return `    virtual ${pm.returnType} ${pm.name}() = 0;`;
  }).join('\n')}\n};\n\n// 2. CLASE EXTERNA\nclass ${ch.externalClass.name} {};\n\n// 3. CLASE PADRE ABSTRACTA\nclass ${ch.parent.name} {\npublic:\n    virtual ~${ch.parent.name}() = default;\n};\n\n// 4. CLASES HIJAS\nclass ${ch.ownClassSpec.name} : public ${ch.parent.name} {};\nclass ${ch.children[1].name} : public ${ch.parent.name} {\n    ${ch.externalClass.name} ext;\n};\nclass ${ch.children[2].name} : public ${ch.parent.name}, public ${ch.interfaceSpec.name} {\npublic:\n${ch.interfaceSpec.methods.map(m => {
    const pm = parseMethodUml(m);
    return `    ${pm.returnType} ${pm.name}() override {\n        std::cout << "Implementación C++\\n";\n    }`;
  }).join('\n\n')}\n};\n\nint main() {\n    std::vector<${ch.parent.name}*> lista = { new ${ch.ownClassSpec.name}(), new ${ch.children[1].name}(), new ${ch.children[2].name}() };\n    for(auto item : lista) { delete item; }\n    return 0;\n}`;
}
