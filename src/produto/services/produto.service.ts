import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Produto } from "../entities/produto.entity";

Injectable()
export class ProdutoService { 
    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>
    ) { }

    async findAll(): Promise<Produto[]> {
        return await this.produtoRepository.find({
            
            relations: {
                categoria: true
            }
        });
    }

    async findById(id: number): Promise<Produto> {
        let produto = await this.produtoRepository.findOne({
           
            where: {
                id
            },

            relations: {
                categoria: true
            }
        });

        if (!produto)
            throw new HttpException('Produto não localizada!', HttpStatus.NOT_FOUND);

        return produto;
    }

    async findByNomeProduto(nomeProduto: string): Promise<Produto[]> {
        return await this.produtoRepository.find({
          
            where: {
            nomeProduto: ILike(`%${nomeProduto}%`)
          },

          relations: {
            categoria: true
          }
        });
}

    async create(produto: Produto): Promise<Produto> {
        return await this.produtoRepository.save(produto);
    }
    
    async update(produto: Produto): Promise<Produto> {
        
        let buscaproduto = await this.findById(produto.id);

        if(!produto.id || !buscaproduto){
            throw new HttpException('Produto não localizada!', HttpStatus.NOT_FOUND);
        }

        return await this.produtoRepository.save(produto);
    }

    async delete(id: number): Promise<DeleteResult>{
        
        let buscaproduto = await this.findById(id);

        if(!buscaproduto){
            throw new HttpException('Produto não localizada!', HttpStatus.NOT_FOUND);
        }

        return await this.produtoRepository.delete(id);
    }

}