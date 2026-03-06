import { registerSchema, RegisterInput } from "@/types/auth.types";
import { getDataSource } from "../db/dataSource";
import { Usuario } from "../db/entities/Usuarios";
import bcrypt from "bcryptjs";



export async function registerUser(data: RegisterInput) {
    const parsed = registerSchema.safeParse(data)


    if (!parsed.success) {
        return { error: parsed.error.issues[0].message };
    }

    const { nombre, correo, telefono, contrasena } = parsed.data;

    const db = await getDataSource();
    const repo = db.getRepository(Usuario)
    
    const exist = await repo.findOneBy({correo})
    if (exist) return { error: "El correo ya está registrado" }

    const hashedPassword = await bcrypt.hash(contrasena, 12);
    const newUser = repo.create({ nombre, correo, telefono, contrasena: hashedPassword });
    const saved = await repo.save(newUser);

    return {id: saved.id, correo: saved.correo};
}