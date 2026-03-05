import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import type { Producto } from "./Productos"
import type { Transaccion } from "./Transacciones"

@Entity("usuarios")
export class Usuario {
    @PrimaryGeneratedColumn({ name: "idusuario" })
    id!: number

    @Column({ name: "nombre", type: "varchar", length: 100 })
    nombre!: string

    @Column({ name: "correo", type: "varchar", length: 225 })
    correo!: string

    @Column({ name: "telefono", type: "varchar", length: 75 })
    telefono!: string

    @Column({ name: "contrasena", type: "varchar", length: 255 })
    contrasena!: string

    @Column({ name: "fecharegistro", type: "timestamp" })
    fecharegistro!: Date

    @Column({ name: "isactive", type: "smallint" })
    isactive!: number

    @Column({ name: "fotousuario", type: "bytea", nullable: true })
    foto!: Buffer

    @OneToMany("Producto", (producto: Producto) => producto.vendedor)
    productos!: Producto[]

    @OneToMany("Transaccion", (transaccion: Transaccion) => transaccion.comprador)
    compras!: Transaccion[]

    @OneToMany("Transaccion", (transaccion: Transaccion) => transaccion.vendedor)
    ventas!: Transaccion[]
}