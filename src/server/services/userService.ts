import { AppDataSource } from "../db/dataSource";
import { Usuario } from "../db/entities/Usuarios";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const registerSchema = z.object({
    nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    correo: z.string().email("Correo no válido").endsWith("@anahuac.mx", "Debes usar tu correo institucional @anahuac.mx"),
    telefono: z.string().min(7, "Teléfono no válido"),
    contrasena: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export async function registerUser(data: RegisterInput) {
    const parsed = registerSchema.safeParse(data)


    if (!parsed.success) {
        return { error: parsed.error.issues[0].message };
    }

    const { nombre, correo, telefono, contrasena } = parsed.data;

    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
    
    const repo = AppDataSource.getRepository(Usuario);
    const hashedPassword = await bcrypt.hash(contrasena, 12);
    const newUser = repo.create({ nombre, correo, telefono, contrasena: hashedPassword });
    const saved = await repo.save(newUser);

    return {id: saved.id, correo: saved.correo};
}