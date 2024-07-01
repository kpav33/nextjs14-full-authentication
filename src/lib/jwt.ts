import jwt, { JwtPayload } from "jsonwebtoken";

interface SignOption {
  expiresIn: string | number;
}

// Determine jwt expire time
const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: "1d",
};

export function signJwt(
  payload: JwtPayload,
  option: SignOption = DEFAULT_SIGN_OPTION
) {
  // Exclamation mark at the end marks, that this can be undefined
  const secretKey = process.env.JWT_USER_ID_SECRET!;
  // Create token
  const token = jwt.sign(payload, secretKey);
  return token;
}

export function verifyJwt(token: string) {
  try {
    // Exclamation mark at the end marks, that this can be undefined
    const secretKey = process.env.JWT_USER_ID_SECRET!;
    // Verify existing token
    const decoded = jwt.verify(token, secretKey);
    return decoded as JwtPayload;
  } catch (e) {
    console.log(e);
    // Return null to mark that token was invalid
    return null;
  }
}
