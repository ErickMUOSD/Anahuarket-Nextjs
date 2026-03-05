import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from "typeorm"
import { Usuario } from "./Usuarios"
import { Producto } from "./Productos"
import { EstadoTransaccion } from "./EstadoTransaccion"
import { MetodoPago } from "./MetodoPago"
import { Valoracion } from "./Valoraciones"

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

    @ManyToOne(() => Usuario, (usuario) => usuario.compras)
    @JoinColumn({ name: "idcomprador" })
    comprador!: Usuario

    @ManyToOne(() => Usuario, (usuario) => usuario.ventas)
    @JoinColumn({ name: "idvendedor" })
    vendedor!: Usuario

    @ManyToOne(() => Producto, (producto) => producto.transacciones)
    @JoinColumn({ name: "idproducto" })
    producto!: Producto

    @ManyToOne(() => EstadoTransaccion)
    @JoinColumn({ name: "idestado" })
    estado!: EstadoTransaccion

    @ManyToOne(() => MetodoPago)
    @JoinColumn({ name: "idmetodopago" })
    metodopago!: MetodoPago

    @OneToMany(() => Valoracion, (valoracion) => valoracion.transaccion)
    valoraciones!: Valoracion[]
}