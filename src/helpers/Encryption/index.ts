import CryptoJS from 'crypto-js';

const secretKey = process.env.SECRET_KEY;

export const encryption = (email: string) => {
  return CryptoJS.AES.encrypt(email, secretKey).toString();
};

export const decrypt = (text: string) => {
  const bytes = CryptoJS.AES.decrypt(text, secretKey!);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};
