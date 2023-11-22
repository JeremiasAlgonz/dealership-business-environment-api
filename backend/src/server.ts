/* TENTANDO SOLUCIONAR PROBLEMAS CORS */

import express from 'express';
import cors from 'cors';
import router from './routes';

const app = express();

// Configuração do CORS
const corsOptions = {
    origin: 'http://localhost:3000', // Especifique a origem do cliente
    optionsSuccessStatus: 200, // Opcional
};

// Middleware para aplicar as configurações de CORS
app.use(cors(corsOptions));

// Middleware para aceitar solicitações em diferentes métodos
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

app.use(express.json());
app.use(router);

app.listen(4000, () => {
    console.log("Servidor Iniciado...");
});





/* CONFIGURACAO ANTERIOR <= Descontinuada ***

//importar o frmwrk express
import express from 'express';
//import rotas
import router from './routes';

//instanciar o express
const app = express();


const cors = require('cors'); // Importa a biblioteca cors

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200, // Opcional
};

//configurar o uso de json
app.use(express.json());

//configurar o uso das [rotas]
app.use(router);

//configurar a porta e funcao executada na [ativacao]
app.listen(4000, () => { console.log("Servidor Iniciado...") });
*/