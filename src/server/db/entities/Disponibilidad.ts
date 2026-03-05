import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("disponibilidad")
export class Disponibilidad {
    @PrimaryGeneratedColumn({ name: "iddisponibilidad" })
    id!: number

    @Column({ name: "nombredisponibilidad", type: "varchar", length: 50 })
    nombre!: string
}