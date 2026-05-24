import { APP_SECRET } from "../config/index.js";
import bcrypt from "bcrypt";

// Utility functions for password hashing and validation
export const generateSalt = async () => await bcrypt.genSalt();

export const generatePassword = async (password, salt) =>
  await bcrypt.hash(password, salt);

export const validatePassword = async (
  enteredPassword,
  savedPassword,
  salt,
) => {
  return (await generatePassword(enteredPassword, salt)) === savedPassword;
};

export const ValidateSignature = (req, res, next) => {
    try {
        const signature = req.get("Authorization");
        console.log("Received signature:", signature); // Debugging log

        const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET);
        req.user = payload;
        return true;
    } catch (error) {
        console.error("Signature validation error:", error);
        return false;
    }
};

export const FormatData = (data) => {
    if (data) {
        return { data };
    } else {
        throw new Error("Data Not found!");
    };
};



