"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { redirect } from "next/navigation";

export async function create(data: FieldValues) {
  const dataRefined = {
    firstName: data["First Name"],
    lastName: data["Last Name"],
    email: data.email,
    password: data.password,
  };

  await fetchAuth("register", dataRefined);
  redirect("/");
}

export async function login(
  data: FieldValues
): Promise<{ error: string } | void> {
  const dataRefined = {
    email: data.email,
    password: data.password,
  };

  try {
    await fetchAuth("login", dataRefined);
  } catch (err) {
    return { error: "Email or password is incorrect" };
  }
  redirect("/");
}

async function fetchAuth(option: string, data: Object) {
  try {
    const res = await fetch(`${process.env.AUTH_URL as string}${option}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await res.json();

    if (res.status === 400) {
      throw new Error(response.message);
    }

    if (response.token) {
      cookies().set("session", response.token, {
        httpOnly: true,
        sameSite: "strict",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      });
    }
  } catch (err) {
    throw new Error("something went wrong");
  }
}
