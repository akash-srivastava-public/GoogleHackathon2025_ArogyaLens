import CryptoJS from "crypto-js";

const piiFields = ["name", "email", "ssn", "phone", "id", "_id"];

function getKey(password: string): CryptoJS.lib.WordArray {
  return CryptoJS.SHA256(password);
}

function encrypt(text: string, password: string): string {
  const key = getKey(password);
  const iv = CryptoJS.lib.WordArray.random(16); // 128-bit IV

  const encrypted = CryptoJS.AES.encrypt(text, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  return CryptoJS.enc.Base64.stringify(iv) + ":" + encrypted.toString(); // iv:encrypted
}

function decrypt(encrypted: string, password: string): string {
  const [ivBase64, encryptedData] = encrypted.split(":");
  if (!ivBase64 || !encryptedData) throw new Error("Invalid encrypted data format");

  const key = getKey(password);
  const iv = CryptoJS.enc.Base64.parse(ivBase64);

  const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
}

function encryptPIIObject(obj: any, password: string): any {
  if (obj !== null && typeof obj === "object") {
    const result: any = {};
    for (const key in obj) {
      if (piiFields.includes(key) && typeof obj[key] === "string") {
        result[key] = encrypt(obj[key], password);
      } else {
        result[key] = encryptPIIObject(obj[key], password);
      }
    }
    return result;
  }
  return obj;
}

function decryptPIIObject(obj: any, password: string): any {
  if (obj !== null && typeof obj === "object") {
    const result: any = {};
    for (const key in obj) {
      if (piiFields.includes(key) && typeof obj[key] === "string") {
        try {
          result[key] = decrypt(obj[key], password);
        } catch {
          result[key] = obj[key];
        }
      } else {
        result[key] = decryptPIIObject(obj[key], password);
      }
    }
    return result;
  }
  return obj;
}

function encryptPII(data: any[] | any, password: string): any[] | any {
  if (Array.isArray(data)) {
    return data.map(item => encryptPIIObject(item, password));
  }
  return encryptPIIObject(data, password);
}

function decryptPII(data: any[] | any, password: string): any[] | any {
  if (Array.isArray(data)) {
    return data.map(item => decryptPIIObject(item, password));
  }
  return decryptPIIObject(data, password);
}

export {
  encryptPII,
  decryptPII
};
