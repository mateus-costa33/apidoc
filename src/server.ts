import express from 'express';
import routes from './routes';
import cors from 'cors';
import path from 'path'

const server = express();

server.use(cors());
server.use(express.json());  
server.use(routes);

server.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

server.listen(8080, () => {
    console.log("Server Rodando!")
})