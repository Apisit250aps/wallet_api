import jwt from 'jsonwebtoken';

const SECRET_KEY = '$2b$10$bAg/a526LJ.IX6M1drfKoOXRE/AfTiPU17m5OuYQwGgfTWjmQg/OK'; // Replace with your secret key

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' });
};

export const verifyToken = (token: string): object | string => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    throw new Error('Invalid token');
  }
};
