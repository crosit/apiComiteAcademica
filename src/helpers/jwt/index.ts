import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";
import config from "../../configs/envs";

export const signToken = (
  payload: Record<string, any>,
  options: SignOptions
): string => {
  return jwt.sign(
    payload,
    config.authentication.jwt.JWT_SECRET || "TOKEN_FAILURE",
    options
  );
};

export const verifyToken = (
  token: string,
  options: VerifyOptions
): string | any => {
  try {
    return jwt.verify(
      token,
      config.authentication.jwt.JWT_SECRET || "TOKEN_FAILURE",
      options
    );
  } catch (error) {
    return null;
  }
};
