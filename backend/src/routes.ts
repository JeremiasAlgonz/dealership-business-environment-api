//importar componentes necessarios do express
import { Router, Request, Response, json } from 'express';
//importar os controllers aqui
import TesteController from './controllers/TesteController';

//importar middlewares aqui
import ValidaTeste from './middlewares/ValidaTeste';
import ConcessionariaController from './controllers/ConcessionariaController';
import ClienteController from './controllers/ClienteController';
import motocicletaController from './controllers/MotocicletaController';
import EnderecoController from './controllers/EnderecoController';

//instanciar [Router]
const router = Router();


//modelo de Rota para requisicoes GET<POST<PUT<DELETE
router.get("/teste/:id", ValidaTeste, new TesteController().teste);

router.get("/concessionarias", new ConcessionariaController().list);
router.get("/concessionarias/:id", new ConcessionariaController().show);
router.post("/concessionarias", new ConcessionariaController().store);
router.put("/concessionarias/:id", new ConcessionariaController().update);
router.delete("/concessionarias/:id", new ConcessionariaController().delete);

router.get("/clientes", new ClienteController().list);
router.get("/clientes/:id", new ClienteController().show);
router.post("/clientes", new ClienteController().store);
router.put("/clientes/:id", new ClienteController().update);
router.delete("/clientes/:id", new ClienteController().delete);

router.get("/motocicletas", new motocicletaController().list);
router.get("/motocicletas/:id", new motocicletaController().show);
router.post("/motocicletas", new motocicletaController().store);
router.put("/motocicletas/:id", new motocicletaController().update);
router.delete("/motocicletas/:id", new motocicletaController().delete);

router.get("/enderecos", new EnderecoController().list);
router.get("/enderecos/:id", new EnderecoController().show);
router.post("/enderecos", new EnderecoController().store);
router.put("/enderecos/:id", new EnderecoController().update);
router.delete("/enderecos/:id", new EnderecoController().delete);

export default router;