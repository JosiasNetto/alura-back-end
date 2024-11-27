import fs from "fs";    //Importa a lib fs(file system)
import {getTodosPosts, criarPost, atualizarPost} from "../models/postsModel.js";   //Importa as funções do model
import gerarDescricaoComGemini from "../services/geminiService.js";

export  async function listarPosts(req, res) {
    const posts = await getTodosPosts(); //Declara a var posts
    res.status( 200).json(posts);   //Retornara o objeto posts no formato json
}

export  async function postarNovoPost(req, res){
    const novoPost = req.body;  //Recebe os valores do novo post

    try{
        const postCriado = await criarPost(novoPost);   //Chama a funcao que add o post no db e retorna o ID
        res.status(200).json(postCriado);   //Retorna o ID e se foi criado corretamente, no formato json
    } catch(erro) {
        console.error(erro.message);    //Imprime o erro detalhado no console
        res.status(500).json({"Erro":"Falha na requisição"})    //Mensagem de erro para o usuario
    }
}

export  async function uploadImagem(req, res){
    //Declara o novo post com a url da imagem
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try{
        const postCriado = await criarPost(novoPost);   //Adciona o novo post ao db
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;    //Caminho da img no server, utilizando seu id de criação
        fs.renameSync(req.file.path, imagemAtualizada); //Renomeia a img adcionada no server, pelo nome do id
        res.status(200).json(postCriado);   //Retorna o ID e se foi criado corretamente, no formato json
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}

export  async function atualizaNovoPost(req, res){
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`

    try{
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);

        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }

        const postCriado = await atualizarPost(id, post);   //Chama a funcao que add o post no db e retorna o ID
        res.status(200).json(postCriado);   //Retorna o ID e se foi criado corretamente, no formato json
    } catch(erro) {
        console.error(erro.message);    //Imprime o erro detalhado no console
        res.status(500).json({"Erro":"Falha na requisição"})    //Mensagem de erro para o usuario
    }
}