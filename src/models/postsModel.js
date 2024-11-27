import 'dotenv/config';
import { ObjectId } from 'mongodb';
import conectarAoBanco from '../config/dbConfig.js'; //Importa a funcao de conectar ao db

//Conecta ao banco de dados passando a string de conexao
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);  

//Funcao que retorna todos os posts do banco de dados
export async function getTodosPosts() {
    const db = conexao.db("imersao-instabytes"); //Declara o db do cluster
    const colecao = db.collection("posts"); //Declara a colecao do db

    return colecao.find().toArray(); //Retorna todos os posts em um array
}

export async function criarPost(novoPost){
    const db = conexao.db("imersao-instabytes"); //Declara o db do cluster
    const colecao = db.collection("posts"); //Declara a colecao do db

    return colecao.insertOne(novoPost); //Funcao especifica do mongo que insere post no db
}

export async function atualizarPost(id, novoPost){
    const db = conexao.db("imersao-instabytes"); //Declara o db do cluster
    const colecao = db.collection("posts"); //Declara a colecao do db

    const objectId = ObjectId.createFromHexString(id); //Conertendo a ID para um formato especifico do MongoDB

    return colecao.updateOne({_id: new ObjectId(objectId)}, {$set:novoPost});
}