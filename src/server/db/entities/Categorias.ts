import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("categorias")
export class Categoria {
    @PrimaryGeneratedColumn({ name: "idcategoria" })
    id!: number

    @Column({ name: "nombrecategoria", type: "varchar", length: 50 })
    nombre!: string
}