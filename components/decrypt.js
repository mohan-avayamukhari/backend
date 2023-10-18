import crypto from 'crypto';

const decryptToken = (encryptedToken, iv) => {
  const secretKey = Buffer.from(process.env.SERVICE_TOKEN_SECRET, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', secretKey, Buffer.from(iv, 'hex'));

  let decryptedToken = decipher.update(encryptedToken, 'hex', 'utf-8');
  decryptedToken += decipher.final('utf-8');
  return decryptedToken;
};

export { decryptToken };
