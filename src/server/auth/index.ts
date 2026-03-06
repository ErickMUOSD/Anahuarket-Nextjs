import "reflect-metadata"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { getUsersByEmail } from "@/server/services/userService"
import { authConfig } from "./authConfig"

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        correo: { label: "Correo", type: "email" },
        contrasena: { label: "Contraseña", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.correo || !credentials?.contrasena) return null

        const usuario = await getUsersByEmail(credentials.correo as string)
        if (!usuario) return null

        const passwordValida = await bcrypt.compare(
          credentials.contrasena as string,
          usuario.contrasena
        )
        if (!passwordValida) return null

        return {
          id: String(usuario.id),
          name: usuario.nombre,
          email: usuario.correo,
        }
      }
    })
  ],
})