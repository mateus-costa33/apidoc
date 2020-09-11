import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import DocumentsController from './controllers/DocumentsController';

const routes = express.Router();

const upload = multer(multerConfig)

const documentsController = new DocumentsController();



routes.get("/", (request, response) => {
    response.send("Olá Mundo com typescript!")
})

routes.post("/docs", upload.single('pdf'), documentsController.store);
routes.get("/documents", documentsController.all)
routes.get("/documents/geo", documentsController.index)


export default routes;