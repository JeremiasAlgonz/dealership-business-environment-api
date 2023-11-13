//importar componentes do [express]
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';


class ClienteController {

    async list(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const clientes = await prisma.cliente.findMany(
            // recupera todas as concessionarias
            {
                select: {
                    id_cliente: true,
                    tipoProprietario: true,
                    nome: true,
                    cpf: true,
                    cnpj: true,
                    telefone: true,
                    email: true,
                    endereco: {
                        select: {
                            logradouro: true,
                            numero: true,
                            complemento: true,
                            codigoPostal: true
                        }
                    },
                    motocicletas: true,
                }
            }
        );
        res.status(200).json(clientes);
    }

    async show(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const cliente = await prisma.cliente.findUnique(
            {
                where: { id_cliente: Number(req.params.id) },
                select: {
                    id_cliente: true,
                    tipoProprietario: true,
                    nome: true,
                    cpf: true,
                    cnpj: true,
                    telefone: true,
                    email: true,
                    endereco: {
                        select: {
                            logradouro: true,
                            numero: true,
                            complemento: true,
                            codigoPostal: true
                        }
                    },
                    motocicletas: true,
                }
            }
        );
        res.status(200).json(cliente);
    }


    async store(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const { tipoProprietario, nome, cpf, cnpj, telefone, email, endereco } = req.body; // Obter os dados nos parâmetros da rota
        const novoCliente = await prisma.cliente.create(
            {
                data: {
                    tipoProprietario: tipoProprietario,
                    nome: nome,
                    cpf: cpf,
                    cnpj: cnpj,
                    telefone: telefone,
                    email: email,
                    endereco: endereco,
                },
                select: {
                    tipoProprietario: true,
                    nome: true,
                    cpf: true,
                    cnpj: true,
                    telefone: true,
                    email: true,
                    endereco: {
                        select: {
                            logradouro: true,
                            numero: true,
                            complemento: true,
                            codigoPostal: true
                        }
                    }
                }
            }
        );
        res.status(201).json(novoCliente);
    }

    async update(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const { nome, cpf, cnpj, telefone, email, } = req.body; // Obter os dados nos parâmetros da rota assim como em Store
        const clienteAlterado = await prisma.cliente.update(
            {
                where: { id_cliente: Number(req.params.id) },
                data: {
                    nome: nome,
                    cpf: cpf,
                    cnpj: cnpj,
                    telefone: telefone,
                    email: email,
                },
                select: {
                    tipoProprietario: true,
                    nome: true,
                    cpf: true,
                    cnpj: true,
                    telefone: true,
                    email: true,
                    endereco: {
                        select: {
                            logradouro: true,
                            numero: true,
                            complemento: true,
                            codigoPostal: true
                        }
                    }
                }
            }
        );
        res.status(200).json(clienteAlterado);
    }
    async delete(req: Request, res: Response) {
        const prisma = new PrismaClient();
        await prisma.cliente.delete(
            {
                where: { id_cliente : Number(req.params.id) },
            }
        );
        res.status(200).json({ excluido: true });
    }
}
export default ClienteController;