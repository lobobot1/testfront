"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export async function create(data: FieldValues) {
  const dataRefined = {
    firstName: data["First Name"],
    lastName: data["Last Name"],
    email: data.email,
    password: data.password,
  };

  try {
    const res = await fetch(process.env.REGISTER_URL as string, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataRefined),
    });

    const response = await res.json();

    console.log(response.token)

    if (response.token) {
      cookies().set("session", response.token, {
        httpOnly: true,
        sameSite: "strict",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      });
    }
  } catch (err) {
    console.error(err);
  }
}
