import bcryptjs from "bcryptjs";

export const encryptPass = (password: string): string => {
  const salt: string = bcryptjs.genSaltSync(12);
  const encryptedPass: string = bcryptjs.hashSync(password, salt);
  return encryptedPass;
};

export const decryptPass = (
  plainPassword: string,
  encryptedPassword: string
): boolean => {
  const encryptedPass: boolean = bcryptjs.compareSync(
    plainPassword,
    encryptedPassword
  );
  return encryptedPass;
};
