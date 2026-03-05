import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import type { Transaccion } from "./Transacciones"

@Entity("valoraciones")
export class Valoracion {
    @PrimaryGeneratedColumn({ name: "idtransaccion" })
    id!: number

    @Column({ name: "calificacion", type: "integer" })
    calificacion!: number

    @Column({ name: "comentario", type: "text" })
    comentario!: string

    @Column({ name: "fechavaloracion", type: "timestamp" })
    fechavaloracion!: Date

    @ManyToOne("Transaccion", (transaccion: Transaccion) => transaccion.valoraciones)
    @JoinColumn({ name: "idtransaccion" })
    transaccion!: Transaccion
}