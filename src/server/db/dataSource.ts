import { DataSource } from "typeorm";
import { Usuario } from './entities/Usuarios';
import { Producto } from "./entities/Productos";
import { Valoracion } from "./entities/Valoraciones";
import { Transaccion } from "./entities/Transacciones";
import { MetodoPago } from "./entities/MetodoPago";
import { Categoria } from "./entities/Categorias";
import { Disponibilidad } from "./entities/Disponibilidad";
import { EstadoTransaccion } from "./entities/EstadoTransaccion";

const globalForDb = global as unknown as { AppDataSource: DataSource };

export const AppDataSource = globalForDb.AppDataSource ?? new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: true,
    entities: [Usuario, Producto, Valoracion, Transaccion, MetodoPago, Categoria, Disponibilidad, EstadoTransaccion],
})

if (process.env.NODE_ENV !== "production") globalForDb.AppDataSource = AppDataSource;

export const getDataSource = async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize()
  }
  return AppDataSource
}
