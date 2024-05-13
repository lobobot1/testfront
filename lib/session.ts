"use server";
import * as jose from "jose";

export async function veryfyToken(token: string) {
  try {
    const key = await jose.jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET as string)
    );
    return key;
  } catch (err) {
    console.log(err);
  }
}
