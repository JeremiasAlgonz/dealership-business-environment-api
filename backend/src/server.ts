//importar o frmwrk express
import express from 'express';
//import rotas
import router from './routes';

//instanciar o express
const app = express();

//configurar o uso de json
app.use(express.json());

//configurar o uso das [rotas]
app.use(router);

//configurar a porta e funcao executada na [ativacao]
app.listen(4000, () => { console.log("Servidor Iniciado...") });
