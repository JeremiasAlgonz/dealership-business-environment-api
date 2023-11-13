//importar componentes necessarios do express
import { Router, Request, Response, json } from 'express';
//importar os controllers aqui
import TesteController from './controllers/TesteController';

//importar middlewares aqui
import ValidaTeste from './middlewares/ValidaTeste';
import ConcessionariaController from './controllers/ConcessionariaController';

//instanciar [Router]
const router = Router();

//modelo de Rota para requisicoes GET<POST<PUT<DELETE
router.get("/teste/:id", ValidaTeste, new TesteController().teste);

router.get("/concessionarias", new ConcessionariaController().list);

export default router;