# Propuesta de Curso: Sistemas Criptográficos

## Nombre
**Sistemas Criptográficos y Técnicas de Encriptación en el Desarrollo de Software**

---

## Descripción
Este proyecto consiste en el diseño y desarrollo de un módulo de aprendizaje práctico enfocado en la **criptografía aplicada**. A través de este curso, los estudiantes aprenderán los fundamentos teóricos y la implementación real de los tres pilares de la seguridad de datos en tránsito y en reposo: **encriptación simétrica**, **encriptación asimétrica** y **hashing de datos y contraseñas**.

El curso adopta un enfoque multilingüe, enseñando los mismos conceptos y patrones de seguridad de forma paralela en los cuatro lenguajes más demandados en el desarrollo de software actual: **Python**, **Java**, **PHP** y **JavaScript (Node.js)**. Esto permite a los desarrolladores comprender que, independientemente de la tecnología utilizada, los principios de seguridad y los algoritmos criptográficos siguen estándares universales.

---

## Dolor que Busca Resolver
En el desarrollo de software, la seguridad suele tratarse como una idea secundaria o se implementa de forma incorrecta debido a la falta de claridad técnica. Los dolores específicos que este proyecto busca resolver son:

1. **Uso de algoritmos obsoletos e inseguros**: Muchos programadores siguen utilizando funciones vulnerables como `MD5` o `SHA-1` para almacenar contraseñas o encriptar datos, exponiendo a los sistemas a ataques de colisión y descifrado rápido.
2. **Confusión entre Hashing y Encriptación**: Existe una confusión común entre encriptar (proceso bidireccional) y hashear (proceso unidireccional). Esto lleva a malas prácticas de diseño, como almacenar contraseñas encriptadas de forma reversible en lugar de hasheadas de forma segura.
3. **Mala gestión de claves e IVs (Vectores de Inicialización)**: Errores como reutilizar el mismo IV en encriptación simétrica AES-GCM o codificar la clave directamente en el código fuente (*hardcoding*).
4. **Barrera de entrada en la implementación multiplataforma**: La documentación de criptografía en lenguajes como Java o PHP suele ser sumamente compleja y verbosa, lo que desmotiva a los programadores a escribir código seguro desde el inicio.

---

## Ventajas del Uso
La implementación y comprensión de sistemas criptográficos adecuados en una aplicación ofrece las siguientes ventajas:

1. **Confidencialidad Garantizada**: Asegura que la información sensible (datos personales, tokens, información financiera) sea ilegible para terceros no autorizados, incluso si acceden físicamente a la base de datos o interceptan el tráfico de red.
2. **Integridad de los Datos**: Mediante el uso de firmas digitales y cifrado autenticado (como AES-GCM), se puede detectar cualquier alteración maliciosa en los datos durante su transmisión o almacenamiento.
3. **Autenticación Segura y No Repudio**: La criptografía asimétrica permite validar la identidad del emisor mediante firmas digitales, impidiendo que este niegue haber enviado o firmado un mensaje.
4. **Cumplimiento Regulatorio**: Cumplir con estándares internacionales de protección de datos (como GDPR, HIPAA, PCI-DSS) que exigen explícitamente el cifrado de datos sensibles en reposo y en tránsito.
5. **Portabilidad de Conceptos**: Al aprender cómo se implementan los mismos estándares en diferentes lenguajes, el desarrollador adquiere una mentalidad agnóstica a la tecnología, enfocada en la arquitectura de seguridad.

---

## Desventajas del Uso
Aunque la criptografía es indispensable, su implementación conlleva retos y costos que deben ser gestionados:

1. **Complejidad en la Gestión de Claves**: La seguridad de un sistema criptográfico no depende de mantener el algoritmo en secreto, sino de la seguridad de las claves (Principio de Kerckhoffs). Perder la clave privada o simétrica significa la pérdida permanente del acceso a los datos.
2. **Impacto en el Rendimiento (Overhead Computacional)**: La encriptación y desencriptación (especialmente la asimétrica) y los algoritmos de hashing deliberadamente lentos (como bcrypt o Argon2id) consumen CPU y memoria adicionales, lo que puede afectar la latencia del sistema bajo alta carga.
3. **Mantenimiento y Obsolescencia**: Los algoritmos seguros de hoy pueden volverse inseguros mañana debido al aumento del poder de cómputo o descubrimientos criptoanalíticos (por ejemplo, la necesidad de migrar de claves RSA de 2048 bits a 4096 bits, o transicionar hacia criptografía post-cuántica).
4. **Riesgo de Falsa Seguridad**: Si la criptografía está mal implementada (ej. llaves hardcodeadas en Git, generación de números aleatorios no seguros), el sistema sigue siendo vulnerable, pero los desarrolladores operan bajo la falsa ilusión de estar protegidos.

---

## Planificación de la Enseñanza: Conceptos y Algoritmos Universales

Si por “lenguajes” te refieres a **lenguajes de programación**, no existe un conjunto de tipos de encriptación propio de cada lenguaje. Los lenguajes (Python, Java, C#, JavaScript, PHP, etc.) implementan algoritmos criptográficos que pertenecen a categorías generales y universales.

Los principales tipos de cifrado son:

### 1. Cifrado simétrico
Usa la misma clave para cifrar y descifrar.
* **Ejemplos**: AES, DES, 3DES, Blowfish, Twofish, ChaCha20.
* **Ventajas**:
  - Muy rápido.
  - Ideal para cifrar grandes cantidades de datos.

### 2. Cifrado asimétrico
Usa un par de claves: una clave pública (para cifrar) y una clave privada (para descifrar).
* **Ejemplos**: RSA, ElGamal, ECC, Diffie–Hellman.
* **Ventajas**:
  - Permite intercambio seguro de claves.
  - Base de las firmas digitales.

### 3. Funciones hash criptográficas
No son cifrado porque son de una sola vía (no pueden revertirse).
* **Ejemplos**: SHA-256, SHA-3, MD5 (obsoleto para seguridad), SHA-1 (obsoleto), BLAKE3.
* **Usos**:
  - Almacenamiento de contraseñas.
  - Verificación de integridad.
  - Firmas digitales.

### 4. Algoritmos para contraseñas
Diseñados específicamente para almacenar contraseñas de forma lenta y segura para resistir ataques de fuerza bruta.
* **Ejemplos**: bcrypt, scrypt, Argon2, PBKDF2.

### 5. Cifrados de flujo (Stream Ciphers)
Cifran los datos byte a byte o bit a bit de manera continua.
* **Ejemplos**: ChaCha20, RC4 (inseguro hoy).

### 6. Cifrados por bloques (Block Ciphers)
Procesan bloques completos de datos de tamaño fijo.
* **Ejemplos**: AES, DES, Twofish.

### Los más usados actualmente
Para aplicaciones modernas se suelen usar:
* **AES-256**: Estándar para cifrado simétrico por bloques.
* **ChaCha20-Poly1305**: Cifrado de flujo moderno y rápido para dispositivos móviles.
* **RSA**: Para compatibilidad heredada (mínimo 2048/4096 bits).
* **ECC (Criptografía de Curva Elíptica)**: Más moderno, rápido y con llaves mucho más cortas que RSA para el mismo nivel de seguridad.
* **SHA-256 o SHA-3**: Hashing general de datos.
* **Argon2 / bcrypt**: Estándares para el almacenamiento seguro de contraseñas.

*Nota: Si te referías a los tipos de encriptación disponibles en un lenguaje específico (Python, Java, JavaScript, PHP, etc.), en la sección de ejemplos a continuación se listan y detallan las bibliotecas y algoritmos específicos que cada uno soporta.*

---

## Progresión Pedagógica y Ruta de Aprendizaje

De forma pedagógica, es más fácil ordenar la criptografía desde lo más básico hasta lo más avanzado, según su función:

### 1. Métodos clásicos (históricos)
Son los primeros sistemas de cifrado, usados antes de las computadoras.
* **Ejemplos**: Cifrado César, Cifrado Vigenère, Máquina Enigma.
* **Objetivo**: Entender los fundamentos del ocultamiento de información y la sustitución/transposición.

### 2. Cifrado simétrico
Una sola clave sirve para cifrar y descifrar.
* **Idea sencilla**: Tú y tu amigo tienen la misma llave. Con esa llave abren y cierran una caja fuerte.
* **Ejemplos**: AES, ChaCha20.
* **Conceptos importantes**: Clave secreta, rapidez, protección de archivos y bases de datos.

### 3. Cifrado asimétrico
Usa dos claves diferentes pero relacionadas matemáticamente.
* **Idea sencilla**: Un buzón tiene una ranura pública donde cualquiera puede meter cartas (clave pública). Pero solo el dueño del buzón tiene la llave para abrirlos y sacar las cartas (clave privada).
* **Ejemplos**: RSA, ECC.
* **Conceptos importantes**: Clave pública, clave privada, confidencialidad e intercambio seguro de información.

### 4. Intercambio de claves
Permite que dos personas acuerden una clave secreta a través de un canal inseguro.
* **Ejemplo**: Diffie–Hellman.
* **Objetivo**: Crear una clave compartida sin tener que enviarla directamente por la red.

### 5. Funciones Hash
No cifran datos; crean una "huella digital" única de tamaño fijo.
* **Idea sencilla**: Como una huella dactilar de un archivo. Si cambia un solo bit, la huella es completamente distinta.
* **Ejemplos**: SHA-256, SHA-3.
* **Se usan para**: Verificar integridad y detectar modificaciones accidentales o maliciosas.

### 6. Firmas digitales
Demuestran quién envió un mensaje (autenticidad) y garantizan que no fue alterado (integridad).
* **Combinación**: Hashing y Criptografía asimétrica.
* **Ejemplos**: Firmas basadas en RSA, firmas basadas en ECC (ECDSA).

### 7. Protección de contraseñas
Algoritmos de hashing lentos diseñados para almacenar credenciales.
* **Ejemplos**: Argon2, bcrypt, scrypt.
* **Objetivo**: Hacer computacionalmente inviable y muy costoso adivinar contraseñas mediante ataques de fuerza bruta o de diccionario.

### 8. Criptografía moderna avanzada
Temas de vanguardia para investigación o arquitectura avanzada.
* **Incluye**:
  - *Elliptic Curve Cryptography* (ECC).
  - *Zero-Knowledge Proofs* (ZKP - Pruebas de conocimiento cero).
  - *Homomorphic Encryption* (Cifrado homomórfico).
  - *Post-Quantum Cryptography* (Criptografía poscuántica).

---

### Ruta de Aprendizaje Recomendada (Roadmap)

Esta ruta sigue una progresión natural de aprendizaje: **ocultar mensajes → compartir claves → verificar autenticidad → proteger contraseñas → técnicas criptográficas avanzadas**.

1. **Cifrado César y Vigenère**: Fundamentos clásicos.
2. **Conceptos Básicos**: Clave, texto plano y texto cifrado.
3. **Cifrado Simétrico**: AES (modos CBC vs GCM).
4. **Cifrado Asimétrico**: RSA (principios matemáticos y padding).
5. **Intercambio de Claves**: Diffie–Hellman (y ECDH).
6. **Hashes**: SHA-256 y verificación de integridad.
7. **Firmas Digitales**: Flujo de firma y verificación.
8. **Seguridad de Contraseñas**: Argon2 y bcrypt frente al hashing simple.
9. **Curvas Elípticas (ECC)**: Ventajas y aplicaciones modernas.
10. **Criptografía Poscuántica**: Preparándose para la computación cuántica.

---

## Ejemplos en los Diferentes Lenguajes

A continuación, se presentan las implementaciones prácticas de los tres escenarios más comunes utilizando las mejores prácticas de la industria:
1. **Encriptación Simétrica**: AES-256 en modo GCM (Galois/Counter Mode), que proporciona cifrado autenticado.
2. **Encriptación Asimétrica**: RSA con padding OAEP y SHA-256.
3. **Hashing**: SHA-256 para integridad de datos, y derivación segura con sal para contraseñas.

---

### 1. Python 🐍

En Python, utilizamos la librería estándar `hashlib` para hashing básico y la librería recomendada de la industria `cryptography` para operaciones avanzadas de cifrado simétrico y asimétrico.

```python
# Requisitos: pip install cryptography
import os
import hashlib
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.primitives import hashes

# =====================================================================
# A. ENCRIPTACIÓN SIMÉTRICA (AES-256-GCM)
# =====================================================================
def ejemplo_simetrico():
    print("--- Python: AES-256-GCM ---")
    # 1. Generar una clave de 256 bits (32 bytes)
    key = AESGCM.generate_key(bit_length=256)
    aesgcm = AESGCM(key)
    
    plaintext = b"Mensaje confidencial de prueba"
    
    # 2. Generar un IV/Nonce único de 96 bits (12 bytes) para GCM
    nonce = os.urandom(12)
    
    # 3. Encriptar
    ciphertext = aesgcm.encrypt(nonce, plaintext, None)
    print(f"Cifrado (hex): {ciphertext.hex()}")
    
    # 4. Desencriptar
    decrypted = aesgcm.decrypt(nonce, ciphertext, None)
    print(f"Desencriptado: {decrypted.decode('utf-8')}\n")

# =====================================================================
# B. ENCRIPTACIÓN ASIMÉTRICA (RSA-OAEP-SHA256)
# =====================================================================
def ejemplo_asimetrico():
    print("--- Python: RSA OAEP ---")
    # 1. Generar claves
    private_key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=2048
    )
    public_key = private_key.public_key()
    
    message = b"Secreto cifrado con clave publica"
    
    # 2. Encriptar con la clave pública
    ciphertext = public_key.encrypt(
        message,
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )
    print(f"Cifrado (hex): {ciphertext.hex()[:60]}...")
    
    # 3. Desencriptar con la clave privada
    decrypted = private_key.decrypt(
        ciphertext,
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )
    print(f"Desencriptado: {decrypted.decode('utf-8')}\n")

# =====================================================================
# C. HASHING (SHA-256 e Integridad)
# =====================================================================
def ejemplo_hashing():
    print("--- Python: Hashing (SHA-256) ---")
    data = b"Texto para verificar integridad"
    
    # Hash unidireccional determinístico
    hash_obj = hashlib.sha256(data)
    print(f"SHA-256 Hex: {hash_obj.hexdigest()}")
    
    # Ejemplo de password hashing usando PBKDF2 (estándar en la librería nativa)
    password = "MiClaveSuperSegura".encode('utf-8')
    salt = os.urandom(16)
    pw_hash = hashlib.pbkdf2_hmac('sha256', password, salt, 100000)
    print(f"PBKDF2 Hash (hex): {pw_hash.hex()}\n")

if __name__ == "__main__":
    ejemplo_simetrico()
    ejemplo_asimetrico()
    ejemplo_hashing()
```

---

### 2. Java ☕

Java proporciona su arquitectura de criptografía nativa (JCA) a través de los paquetes `java.security` y `javax.crypto`.

```java
import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.OAEPParameterSpec;
import javax.crypto.spec.PSource;
import java.security.*;
import java.security.spec.MGF1ParameterSpec;
import java.util.Base64;

public class SistemasCriptograficos {

    // =====================================================================
    // A. ENCRIPTACIÓN SIMÉTRICA (AES-256-GCM)
    // =====================================================================
    public static void ejemploSimetrico() throws Exception {
        System.out.println("--- Java: AES-256-GCM ---");
        // 1. Generar clave
        KeyGenerator keyGen = KeyGenerator.getInstance("AES");
        keyGen.init(256);
        SecretKey key = keyGen.generateKey();

        // 2. Generar IV (12 bytes)
        byte[] iv = new byte[12];
        SecureRandom.getInstanceStrong().nextBytes(iv);

        String plaintext = "Mensaje confidencial de prueba";

        // 3. Encriptar
        Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
        GCMParameterSpec gcmSpec = new GCMParameterSpec(128, iv); // 128 bits de etiqueta de autenticidad
        cipher.init(Cipher.ENCRYPT_MODE, key, gcmSpec);
        byte[] ciphertext = cipher.doFinal(plaintext.getBytes("UTF-8"));
        System.out.println("Cifrado (Base64): " + Base64.getEncoder().encodeToString(ciphertext));

        // 4. Desencriptar
        cipher.init(Cipher.DECRYPT_MODE, key, gcmSpec);
        byte[] decrypted = cipher.doFinal(ciphertext);
        System.out.println("Desencriptado: " + new String(decrypted, "UTF-8") + "\n");
    }

    // =====================================================================
    // B. ENCRIPTACIÓN ASIMÉTRICA (RSA-OAEP-SHA256)
    // =====================================================================
    public static void ejemploAsimetrico() throws Exception {
        System.out.println("--- Java: RSA OAEP ---");
        // 1. Generar par de claves
        KeyPairGenerator keyGen = KeyPairGenerator.getInstance("RSA");
        keyGen.initialize(2048);
        KeyPair pair = keyGen.generateKeyPair();

        String message = "Secreto cifrado con clave publica";

        // Configurar OAEP con SHA-256
        OAEPParameterSpec oaepSpec = new OAEPParameterSpec(
            "SHA-256", "MGF1", MGF1ParameterSpec.SHA256, PSource.PSpecified.DEFAULT
        );

        // 2. Encriptar con la clave pública
        Cipher cipher = Cipher.getInstance("RSA/ECB/OAEPWithSHA-256AndMGF1Padding");
        cipher.init(Cipher.ENCRYPT_MODE, pair.getPublic(), oaepSpec);
        byte[] ciphertext = cipher.doFinal(message.getBytes("UTF-8"));
        System.out.println("Cifrado (Base64): " + Base64.getEncoder().encodeToString(ciphertext).substring(0, 60) + "...");

        // 3. Desencriptar con la clave privada
        cipher.init(Cipher.DECRYPT_MODE, pair.getPrivate(), oaepSpec);
        byte[] decrypted = cipher.doFinal(ciphertext);
        System.out.println("Desencriptado: " + new String(decrypted, "UTF-8") + "\n");
    }

    // =====================================================================
    // C. HASHING (SHA-256)
    // =====================================================================
    public static void ejemploHashing() throws Exception {
        System.out.println("--- Java: Hashing (SHA-256) ---");
        String data = "Texto para verificar integridad";
        
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] hash = digest.digest(data.getBytes("UTF-8"));

        // Convertir bytes a formato Hexadecimal
        StringBuilder hexString = new StringBuilder();
        for (byte b : hash) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) hexString.append('0');
            hexString.append(hex);
        }
        System.out.println("SHA-256 Hex: " + hexString.toString() + "\n");
    }

    public static void main(String[] args) {
        try {
            ejemploSimetrico();
            ejemploAsimetrico();
            ejemploHashing();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

---

### 3. PHP 🐘

PHP utiliza la extensión integrada `openssl` para la encriptación simétrica y asimétrica, y funciones nativas como `hash()` y `password_hash()` para la derivación segura de contraseñas.

```php
<?php
// =====================================================================
// A. ENCRIPTACIÓN SIMÉTRICA (AES-256-GCM)
// =====================================================================
function ejemploSimetrico() {
    echo "--- PHP: AES-256-GCM ---\n";
    $plaintext = "Mensaje confidencial de prueba";
    
    // 1. Generar clave segura
    $key = openssl_random_pseudo_bytes(32);
    
    // 2. Generar IV de 12 bytes
    $iv_len = openssl_cipher_iv_length('aes-256-gcm');
    $iv = openssl_random_pseudo_bytes($iv_len);
    
    // 3. Encriptar (Pasamos la etiqueta de autenticación por referencia)
    $tag = "";
    $ciphertext = openssl_encrypt($plaintext, 'aes-256-gcm', $key, OPENSSL_RAW_DATA, $iv, $tag);
    echo "Cifrado (hex): " . bin2hex($ciphertext) . "\n";
    
    // 4. Desencriptar
    $decrypted = openssl_decrypt($ciphertext, 'aes-256-gcm', $key, OPENSSL_RAW_DATA, $iv, $tag);
    echo "Desencriptado: " . $decrypted . "\n\n";
}

// =====================================================================
// B. ENCRIPTACIÓN ASIMÉTRICA (RSA)
// =====================================================================
function ejemploAsimetrico() {
    echo "--- PHP: RSA OAEP ---\n";
    // 1. Generar un nuevo par de claves RSA
    $config = [
        "digest_alg" => "sha256",
        "private_key_bits" => 2048,
        "private_key_type" => OPENSSL_KEYTYPE_RSA,
    ];
    $pkey = openssl_pkey_new($config);
    openssl_pkey_export($pkey, $private_key);
    
    $details = openssl_pkey_get_details($pkey);
    $public_key = $details["key"];
    
    $message = "Secreto cifrado con clave publica";
    
    // 2. Encriptar usando la clave pública y padding OAEP
    openssl_public_encrypt($message, $ciphertext, $public_key, OPENSSL_PKCS1_OAEP_PADDING);
    echo "Cifrado (hex): " . bin2hex(substr($ciphertext, 0, 30)) . "...\n";
    
    // 3. Desencriptar usando la clave privada
    openssl_private_decrypt($ciphertext, $decrypted, $private_key, OPENSSL_PKCS1_OAEP_PADDING);
    echo "Desencriptado: " . $decrypted . "\n\n";
}

// =====================================================================
// C. HASHING (SHA-256 y hashing de contraseñas)
// =====================================================================
function ejemploHashing() {
    echo "--- PHP: Hashing (SHA-256 & Argon2) ---\n";
    $data = "Texto para verificar integridad";
    
    // Hash estándar
    $hash = hash('sha256', $data);
    echo "SHA-256 Hex: " . $hash . "\n";
    
    // Hash seguro de contraseña (Usa Argon2id de forma nativa si está disponible)
    $password = "MiClaveSuperSegura";
    $pw_hash = password_hash($password, PASSWORD_ARGON2ID);
    echo "Argon2id Hash: " . $pw_hash . "\n";
    
    // Verificación
    if (password_verify($password, $pw_hash)) {
        echo "Verificación de contraseña: Éxito\n\n";
    } else {
        echo "Verificación de contraseña: Fallida\n\n";
    }
}

ejemploSimetrico();
ejemploAsimetrico();
ejemploHashing();
```

---

### 4. JavaScript (Node.js) ⚡

En Node.js, utilizamos el módulo nativo `crypto` para realizar todas las operaciones de forma asíncrona y segura.

```javascript
const crypto = require('crypto');

// =====================================================================
// A. ENCRIPTACIÓN SIMÉTRICA (AES-256-GCM)
// =====================================================================
function ejemploSimetrico() {
    console.log("--- Node.js: AES-256-GCM ---");
    const plaintext = "Mensaje confidencial de prueba";
    
    // 1. Generar una clave y un IV
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(12); // GCM recomienda 12 bytes
    
    // 2. Encriptar
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    let ciphertext = cipher.update(plaintext, 'utf8', 'hex');
    ciphertext += cipher.final('hex');
    
    // Obtener tag de autenticación (garantiza la integridad)
    const tag = cipher.getAuthTag().toString('hex');
    console.log(`Cifrado (hex): ${ciphertext}`);
    console.log(`Tag (hex): ${tag}`);
    
    // 3. Desencriptar
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(Buffer.from(tag, 'hex'));
    let decrypted = decipher.update(ciphertext, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    console.log(`Desencriptado: ${decrypted}\n`);
}

// =====================================================================
// B. ENCRIPTACIÓN ASIMÉTRICA (RSA-OAEP-SHA256)
// =====================================================================
function ejemploAsimetrico() {
    console.log("--- Node.js: RSA OAEP ---");
    // 1. Generar claves
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: { type: 'spki', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
    });
    
    const message = Buffer.from("Secreto cifrado con clave publica");
    
    // 2. Encriptar con clave pública y padding OAEP
    const ciphertext = crypto.publicEncrypt({
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256"
    }, message);
    console.log(`Cifrado (hex): ${ciphertext.toString('hex').substring(0, 60)}...`);
    
    // 3. Desencriptar con clave privada
    const decrypted = crypto.privateDecrypt({
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256"
    }, ciphertext);
    console.log(`Desencriptado: ${decrypted.toString('utf8')}\n`);
}

// =====================================================================
// C. HASHING (SHA-256 y scrypt)
// =====================================================================
function ejemploHashing() {
    console.log("--- Node.js: Hashing (SHA-256 & Scrypt) ---");
    const data = "Texto para verificar integridad";
    
    // Hash de datos básico
    const hash = crypto.createHash('sha256').update(data).digest('hex');
    console.log(`SHA-256 Hex: ${hash}`);
    
    // Hashing de contraseña seguro mediante scrypt
    const password = "MiClaveSuperSegura";
    const salt = crypto.randomBytes(16).toString('hex');
    
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
        if (err) throw err;
        console.log(`Scrypt Hash (hex): ${derivedKey.toString('hex')}\n`);
    });
}

ejemploSimetrico();
ejemploAsimetrico();
ejemploHashing();
```
