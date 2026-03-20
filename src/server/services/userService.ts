import { prisma } from "@/server/db/db";
import { registerSchema, RegisterInput, UpdateUserInput, updateUserSchema } from "@/types/auth.types";
import bcrypt from "bcryptjs";

export async function registerUser(data: RegisterInput) {
  const parsed = registerSchema.safeParse(data);

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { nombre, correo, telefono, contrasena } = parsed.data;

  const exist = await prisma.usuario.findUnique({ where: { correo } });
  if (exist) return { error: "El correo ya esta registrado" };

  const hashedPassword = await bcrypt.hash(contrasena, 12);

  const saved = await prisma.usuario.create({
    data: {
      nombre,
      correo,
      telefono,
      contrasena: hashedPassword,
      fecharegistro: new Date(),
      isactive: 1,
    },
  });

  return { id: saved.idusuario, correo: saved.correo };
}

export async function getUsersByEmail(correo: string) {
  return prisma.usuario.findUnique({ where: { correo } });
}

export async function getUserById(id: number) {
  return prisma.usuario.findUnique({
    where: { idusuario: id },
    select: { nombre: true, telefono: true }
  })
}

export async function updateUser(id: number, data: UpdateUserInput) {
  const parsed = updateUserSchema.safeParse(data)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const updateData: any = {}

  if (parsed.data.nombre) updateData.nombre = parsed.data.nombre
  if (parsed.data.telefono) updateData.telefono = parsed.data.telefono
  if (parsed.data.contrasena) updateData.contrasena = await bcrypt.hash(parsed.data.contrasena, 12)

  if (Object.keys(updateData).length === 0) {
    return { error: "No hay cambios que guardar" }
  }

  await prisma.usuario.update({
    where: { idusuario: id },
    data: updateData
  })

  return { ok: true }
}