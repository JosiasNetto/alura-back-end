import express from 'express';   //Importando express do modulo express
import routes from './src/routes/postsRoutes.js';   //Importando a funcao das rotas

const  app = express(); //Declarando app como o servidor do express

app.use(express.static("uploads"))

routes(app);  //Executar a funcao que declara as rotas

//Server escuta as requisições na porta local 3000
app.listen(3000, () => {
    console.log("Servidor escutando...");
});