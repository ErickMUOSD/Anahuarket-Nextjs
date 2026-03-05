import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm"
import { Usuario } from "./Usuarios"
import { Categoria } from "./Categorias"
import { Disponibilidad } from "./Disponibilidad"
import { Transaccion } from "./Transacciones"

@Entity("producto")
export class Producto {
    @PrimaryGeneratedColumn({ name: "idproducto" })
    id!: number

    @Column({ name: "idusuario", type: "integer" })
    idusuario!: number

    @Column({ name: "nombreproducto", type: "varchar", length: 100 })
    nombre!: string


    @Column({ name: "descripcion", type: "text", nullable: true })
    descripcion!: string

    @Column({ name: "precio", type: "numeric", precision: 10, scale: 2 })
    precio!: number

    @Column({ name: "stock", type: "integer"})
    stock!: number

    @Column({ name: "fechapublicacion", type: "timestamp" })
    fechapublicacion!: Date

    @Column({ name: "isactive", type: "smallint" })
    isactive!: number

    @Column({ name: "fotoproducto", type: "bytea", nullable: true })
    foto!: Buffer

    @ManyToOne(() => Usuario, (usuario) => usuario.productos)
    @JoinColumn({ name: "idusuario" })
    vendedor!: Usuario

    @ManyToOne(() => Categoria)
    @JoinColumn({ name: "idcategoria" })
    categoria!: Categoria

    @ManyToOne(() => Disponibilidad)
    @JoinColumn({ name: "iddisponibilidad" })
    disponibilidad!: Disponibilidad

    @OneToMany(() => Transaccion, (transaccion) => transaccion.producto)
    transacciones!: Transaccion[]
}