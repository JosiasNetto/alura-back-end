import express from 'express';  //Importando a lib express
import multer from 'multer';    //Importando a lib multer
import cors from 'cors'
import  {listarPosts, postarNovoPost, uploadImagem, atualizaNovoPost}  from '../controllers/postsController.js';  //Importando as funcs do controller

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

const upload = multer({dest: "./uploads"}); //Declarando aonde os uploads seram armazenados

const routes = (app) => {
    app.use(express.json()); //Declarando que o server utilizara json

    app.use(cors(corsOptions));
    
    //Reta get de posts
    app.get("/posts", listarPosts); 

    //Rota post para criar novo post
    app.post("/posts", postarNovoPost);

    //Rota post para upload de foto
    app.post("/upload", upload.single("imagem"), uploadImagem);

    app.put("/upload/:id", atualizaNovoPost)
}

export default routes; 
