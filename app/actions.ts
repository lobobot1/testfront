"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { redirect } from "next/navigation";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { revalidatePath } from "next/cache";
import { veryfyToken } from "@/lib/session";

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

export async function forgotPassword(data: FieldValues) {
  const dataRefined = {
    email: data.email,
    password: data.password,
  };

  try {
    const res = await fetch(`${process.env.AUTH_URL as string}update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataRefined),
    });

    if (res.status === 400) {
      throw new Error("Email not found");
    }
  } catch (err) {
    return { error: "Email is incorrect" };
  }
}

export async function addProduct(data: FieldValues, currectPage: number) {
  const session = cookies().get("session") as RequestCookie;

  const token = session.value;

  const dataRefined = {
    title: data.title,
    price: data.price,
    sku: data.sku,
    grams: data.grams,
    stock: data.stock,
    compare_price: data.compare_price,
    barcode: data.barcode,
    description: data.description,
  };

  try {
    const res = await fetch(`${process.env.PRODUCT_SERVICE_URL as string}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataRefined),
    });

    if (res.status === 400) {
      throw new Error("Something went wrong");
    }
    revalidatePath(`/page/${currectPage}`);
  } catch (err) {
    return { error: "Something went wrong" };
  }
}

export async function updateProduct(
  data: FieldValues,
  productUrl: string,
  handle: string
) {
  const session = cookies().get("session") as RequestCookie;

  const token = session.value;

  const dataRefined = {
    title: data.title,
    price: data.price,
    sku: data.sku,
    grams: data.grams,
    stock: data.stock,
    compare_price: data.compare_price,
    barcode: data.barcode,
    description: data.description,
  };

  try {
    const res = await fetch(productUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataRefined),
    });

    if (res.status === 400) {
      throw new Error("Something went wrong");
    }
    revalidatePath(`/product/${handle}`);
  } catch (err) {
    return { error: "Something went wrong" };
  }
}

export async function deleteSession() {
  cookies().delete("session");
  redirect("/login");
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
      const tokenDecode = await veryfyToken(response.token);

      if (!tokenDecode) {
        throw new Error("Token is invalid");
      }

      cookies().set("session", response.token, {
        httpOnly: true,
        sameSite: "strict",
        expires: new Date((tokenDecode.payload.exp as number) * 1000),
      });
    }
  } catch (err) {
    throw new Error("something went wrong");
  }
}
