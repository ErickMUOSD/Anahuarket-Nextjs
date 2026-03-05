import { AppDataSource } from "@/server/db/dataSource";
import { Usuario } from "@/server/db/entities/Usuarios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log(data);

    if (!AppDataSource.isInitialized) {
      console.log("pasamos el initialize")
      await AppDataSource.initialize();
    }
    const registerRepo = AppDataSource.getRepository(Usuario);
    const temporalUser = registerRepo.create(data);

    console.log(data);
    await registerRepo.save(temporalUser);
    console.log(registerRepo.find())

    return NextResponse.json("registering...")
  } catch (error) {
    console.log(error)
    return NextResponse.json(error)

  }
}