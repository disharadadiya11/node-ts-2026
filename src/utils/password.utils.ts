import bcrypt from "bcrypt";

export const encryptPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export const decryptPassword = async (password: string, hashPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashPassword);
};
