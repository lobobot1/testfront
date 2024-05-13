"use server";

import { cookies } from "next/headers";
import * as jose from "jose";

const maxAge = 60 * 60 * 24 * 7 * 4; // 4 weeks

export async function register(token: string) {
  try {
    cookies().set("session", token, {
      httpOnly: true,
      sameSite: "strict",
      expires: maxAge,
    });
  } catch (err) {
    console.log(err);
  }
}

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
