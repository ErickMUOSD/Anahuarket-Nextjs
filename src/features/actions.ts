"use server";

import { registerUser, RegisterInput } from "@/server/services/userService";

export async function registerUserAction(data: RegisterInput) {
    return registerUser(data);
}