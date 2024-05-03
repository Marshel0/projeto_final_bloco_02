import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity";

@Entity({name: "tb_produtos"})
export class Produto {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    nomeProduto: string

    @IsNotEmpty()
    @Column("decimal", {precision: 6, scale: 2, nullable: false})
    preco: number;

    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    foto: string;

    @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
        onDelete: 'CASCADE',
        })
      categoria: Categoria;

}