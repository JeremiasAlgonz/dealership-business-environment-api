//importar componentes do [express]
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';


class EnderecoController {

    async list(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const enderecos = await prisma.endereco.findMany(
            // recupera todas as concessionarias
            {
                select: {
                    id_endereco: true,
                    logradouro: true,
                    numero: true,
                    complemento: true,
                    codigoPostal: true,
                    Cliente: true,
                    Concessionaria: true
                }
            }
        );
        res.status(200).json(enderecos);
    }

    async show(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const endereco = await prisma.endereco.findUnique(
            {
                where: { id_endereco: Number(req.params.id) },
                select: {
                    logradouro: true,
                    numero: true,
                    complemento: true,
                    codigoPostal: true,
                    Cliente: true,
                    Concessionaria: true
                }
            }
        );
        res.status(200).json(endereco);
    }


    async store(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const { logradouro, numero, complemento, codigoPostal, Cliente, Concessionaria } = req.body; // Obter os dados nos parâmetros da rota
        const novoEndereco = await prisma.endereco.create(
            {
                data: {
                    logradouro: logradouro,
                    numero: numero,
                    complemento: complemento,
                    codigoPostal: codigoPostal,
                    Cliente,
                    Concessionaria
                },
                select: {
                    logradouro: true,
                    numero: true,
                    complemento: true,
                    codigoPostal: true,
                    Cliente: true,
                    Concessionaria: true
                }
            }
        );
        res.status(201).json(novoEndereco);
    }

    async update(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const { logradouro, numero, complemento, codigoPostal, Cliente, Concessionaria } = req.body; // Obter os dados nos parâmetros da rota assim como em Store
        const enderecoAlterado = await prisma.endereco.update(
            {
                where: { id_endereco: Number(req.params.id) },
                data: {
                    logradouro: logradouro,
                    numero: numero,
                    complemento: complemento,
                    codigoPostal: codigoPostal,
                    Cliente,
                    Concessionaria
                },
                select: {
                    logradouro: true,
                    numero: true,
                    complemento: true,
                    codigoPostal: true,
                    Cliente: true,
                    Concessionaria: true
                }
            }
        );
        res.status(200).json(enderecoAlterado);
    }
    async delete(req: Request, res: Response) {
        const prisma = new PrismaClient();
        await prisma.endereco.delete(
            {
                where: { id_endereco: Number(req.params.id) },
            }
        );
        res.status(200).json({ excluido: true });
    }
}
export default EnderecoController;


/*
 ESTRUTURA POST -> BODY DA REQUISICAO

JSON
{
  "logradouro":"rua da concessionaria",
  "numero":92,
  "complemento":"comercial I",
  "codigoPostal":"12456-000",
  "cliente": null,
  "concessionaria": null
}


*/