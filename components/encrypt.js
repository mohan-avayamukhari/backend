import crypto from 'crypto';

const encryptToken = (token) => {
  const secretKey = Buffer.from(process.env.SERVICE_TOKEN_SECRET, 'hex');
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv);
  let encryptedToken = cipher.update(token, 'utf-8', 'hex');
  encryptedToken += cipher.final('hex');

  return {
    encryptedToken,
    iv: iv.toString('hex'),
  };
};

export { encryptToken };