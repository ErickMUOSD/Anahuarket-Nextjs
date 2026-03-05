import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("metodopago")
export class MetodoPago {
    @PrimaryGeneratedColumn({ name: "idmetodopago" })
    id!: number

    @Column({ name: "nombremetodopago", type: "varchar", length: 50 })
    nombre!: string
}