//importar componentes do [express]
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';


class motocicletaController {

    async list(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const motocicletas = await prisma.motocicleta.findMany(
            // recupera todas as concessionarias
            {
                select: {
                    id_motocicleta: true,
                    renavam: true,
                    kilometragem: true,
                    placa: true,
                    marca: true,
                    modelo: true,
                    anoFabricacao: true,
                    anoModelo: true,
                    potencia: true,
                    cor: true,
                    estado: true,
                    concessionaria: true,
                    cliente: true,
                }
            }
        );
        res.status(200).json(motocicletas);
    }

    async show(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const motocicleta = await prisma.motocicleta.findUnique(
            {
                where: { id_motocicleta: Number(req.params.id) },
                select: {
                    id_motocicleta: true,
                    renavam: true,
                    kilometragem: true,
                    placa: true,
                    marca: true,
                    modelo: true,
                    anoFabricacao: true,
                    anoModelo: true,
                    potencia: true,
                    cor: true,
                    estado: true,
                    concessionaria: true,
                    cliente: true,
                }
            }
        );
        res.status(200).json(motocicleta);
    }


    async store(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const { renavam, kilometragem, placa, marca, modelo, anoFabricacao, anoModelo, potencia, cor, estado, id_concessionaria } = req.body; // Obter os dados nos parâmetros da rota
        const novaMotocicleta = await prisma.motocicleta.create(
            {
                data: {
                    renavam: renavam,
                    kilometragem: kilometragem,
                    placa: placa,
                    marca: marca,
                    modelo: modelo,
                    anoFabricacao: anoFabricacao,
                    anoModelo: anoModelo,
                    potencia: potencia,
                    cor: cor,
                    estado: estado,
                    concessionaria: { connect: { id_concessionaria } }
                },
                select: {
                    id_motocicleta: true,
                    renavam: true,
                    kilometragem: true,
                    placa: true,
                    marca: true,
                    modelo: true,
                    anoFabricacao: true,
                    anoModelo: true,
                    potencia: true,
                    cor: true,
                    estado: true,
                    concessionaria: true,
                    cliente: true,
                }
            }
        );
        res.status(201).json(novaMotocicleta);
    }

    async update(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const { renavam, kilometragem, placa, marca, modelo, anoFabricacao, anoModelo, potencia, cor, estado } = req.body; // Obter os dados nos parâmetros da rota assim como em Store
        const motocicletaAlterada = await prisma.motocicleta.update(
            {
                where: { id_motocicleta: Number(req.params.id) },
                data: {
                    renavam: renavam,
                    kilometragem: kilometragem,
                    placa: placa,
                    marca: marca,
                    modelo: modelo,
                    anoFabricacao: anoFabricacao,
                    anoModelo: anoModelo,
                    potencia: potencia,
                    cor: cor,
                    estado: estado
                },
                select: {
                    id_motocicleta: true,
                    renavam: true,
                    kilometragem: true,
                    placa: true,
                    marca: true,
                    modelo: true,
                    anoFabricacao: true,
                    anoModelo: true,
                    potencia: true,
                    cor: true,
                    estado: true,
                    concessionaria: true,
                    cliente: true,
                }
            }
        );
        res.status(200).json(motocicletaAlterada);
    }
    async delete(req: Request, res: Response) {
        const prisma = new PrismaClient();
        await prisma.motocicleta.delete(
            {
                where: { id_motocicleta: Number(req.params.id) },
            }
        );
        res.status(200).json({ excluido: true });
    }
}
export default motocicletaController;

/*

ESTRUTURA POST -> BODY DA REQUISICAO

{
    "renavam": "renavam",
    "kilometragem": kilometragem,
    "placa": placa,
    "marca": marca,
    "modelo": modelo,
    "anoFabricacao": anoFabricacao,
    "anoModelo": anoModelo,
    "potencia": potencia,
    "cor": cor,
    "estado": estado,
    "concessionaria":,
    "cliente":
}

*/
