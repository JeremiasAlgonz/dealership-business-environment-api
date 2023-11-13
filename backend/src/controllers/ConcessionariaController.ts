//importar componentes do [express]
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';


class ConcessionariaController {
    async list(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const concessionarias = await prisma.concessionaria.findMany(
            // recupera todas as concessionarias
            {
                select: {
                    id_concessionaria: true,
                    cnpj: true,
                    nomeFantasia: true,
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
        res.status(200).json(concessionarias);
    }
    async show(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const concessionaria = await prisma.concessionaria.findUnique(
            // recupera a concessionaria conforme params em WHERE
            {
                where: { id_concessionaria: Number(req.params.id) },
                select: {
                    id_concessionaria: true,
                    cnpj: true,
                    nomeFantasia: true,
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
        res.status(200).json(concessionaria);
    }
    async store(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const { cnpj, nomeFantasia, telefone, email, endereco } = req.body; // Obter os dados nos parâmetros da rota
        const novaConcessionaria = await prisma.concessionaria.create(
            {
                data: {
                    cnpj: cnpj,
                    nomeFantasia: nomeFantasia,
                    telefone: telefone,
                    email: email,
                    endereco: endereco
                },
                select: {
                    id_concessionaria: true,
                    cnpj: true,
                    nomeFantasia: true,
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
        res.status(201).json(novaConcessionaria);
    }
    async update(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const { cnpj, nomeFantasia, telefone, email, endereco } = req.body; // Obter os dados nos parâmetros da rota assim como em Store
        const concessionariaAlterada = await prisma.concessionaria.update(
            {
                where: { id_concessionaria: Number(req.params.id) },
                data: {
                    cnpj: cnpj,
                    nomeFantasia: nomeFantasia,
                    telefone: telefone,
                    email: email,
                    endereco: endereco
                },
                select: {
                    id_concessionaria: true,
                    cnpj: true,
                    nomeFantasia: true,
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
        res.status(200).json(concessionariaAlterada);
    }
    async delete(req: Request, res: Response) {
        const prisma = new PrismaClient();
        await prisma.concessionaria.delete(
            {
                where: { id_concessionaria: Number(req.params.id) },
            }
        );
        res.status(200).json({ excluido: true });
    }
}

export default ConcessionariaController;