import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const bcryptUtils = {
  hashPassword: async (password: string): Promise<string> => {
    return await bcrypt.hash(password, SALT_ROUNDS);
  },
  comparePasswords: async (
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> => {
    return await bcrypt.compare(plainPassword, hashedPassword);
  },
};
