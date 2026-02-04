import jwt from "jsonwebtoken";

export const generateSetCookie = function (res, userId) {
  const authToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("authToken", authToken, {
    httpOnly: true, // prevents xss vulnerablity
    secure: process.env.NODE_ENV === "production", // prevents crsf vulnerablity
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return authToken;
};
