import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from "typeorm"
import type { Usuario } from "./Usuarios"
import type { Producto } from "./Productos"
import { EstadoTransaccion } from "./EstadoTransaccion"
import { MetodoPago } from "./MetodoPago"
import type { Valoracion } from "./Valoraciones"

@Entity("transacciones")
export class Transaccion {
    @PrimaryGeneratedColumn({ name: "idtransaccion" })
    id!: number

    @Column({ name: "idcomprador", type: "integer"})
    idcomprador!: number

    @Column({ name: "idvendedor", type: "integer"})
    idvendedor!: number

    @Column({ name: "idproducto", type: "integer"})
    idproducto!: number

    @Column({ name: "cantidad", type: "integer"})
    cantidad!: number

    @Column({ name: "preciototal", type: "numeric", precision: 10, scale: 2 })
    preciototal!: number

    @Column({ name: "fechatransaccion", type: "timestamp" })
    fechatransaccion!: Date

    @Column({ name: "isactive", type: "smallint" })
    isactive!: number

    @ManyToOne("Usuario", (usuario: Usuario) => usuario.compras)
    @JoinColumn({ name: "idcomprador" })
    comprador!: Usuario

    @ManyToOne("Usuario", (usuario: Usuario) => usuario.ventas)
    @JoinColumn({ name: "idvendedor" })
    vendedor!: Usuario

    @ManyToOne("Producto", (producto: Producto) => producto.transacciones)
    @JoinColumn({ name: "idproducto" })
    producto!: Producto

    @ManyToOne(() => EstadoTransaccion)
    @JoinColumn({ name: "idestado" })
    estado!: EstadoTransaccion

    @ManyToOne(() => MetodoPago)
    @JoinColumn({ name: "idmetodopago" })
    metodopago!: MetodoPago

    @OneToMany("Valoracion", (valoracion: Valoracion) => valoracion.transaccion)
    valoraciones!: Valoracion[]
}