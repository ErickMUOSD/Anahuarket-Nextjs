import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("estadotransaccion")
export class EstadoTransaccion {
    @PrimaryGeneratedColumn({ name: "idestado"})
    id!: number

    @Column({ name: "estado", type: "varchar", length: 50 })
    nombre!: string
}