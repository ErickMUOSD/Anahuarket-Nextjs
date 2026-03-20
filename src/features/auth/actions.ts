"use server";

import { registerUser } from "@/server/services/userService";
import { RegisterInput, UpdateUserInput } from "@/types/auth.types";
import { auth } from "@/server/auth";
import { updateUser } from "@/server/services/userService";
import { redirect } from "next/navigation";

export async function registerUserAction(data: RegisterInput) {
    return registerUser(data);
}

export async function updateUserAction(data: UpdateUserInput) {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const result = await updateUser(Number(session.user.id), data)
  if (result?.error) return { error: result.error }

  redirect("/profile")
}