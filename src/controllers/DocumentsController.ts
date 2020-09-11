import { Request, Response } from 'express';
import knex from '../database/connection';

class DocumentsController{
    async store(request: Request, response: Response){
        const {
            nome,
            pdf,
            class_doc
        } = request.body;

        const trx = await knex.transaction();

        const document = {
            nome,
            class_doc,
            pdf: request.file.filename,
        }

        const result = await trx('documents').insert(document);

        await trx.commit();

        return response.json({ 
            ...result,
        });


    }

    async index(request: Request, response: Response){

        const documents = await knex('documents').where('id', '>', 35).select("*");
        
        if (!documents) {
            return response.status(400).json({ message: 'Documents not found.' });
        }

        const Documentos = documents.map(item => { 
            return {
              id: item.id,
              title: item.nome,
              doc_class: item.class_doc,
              arquivo_pdf: `http://localhost:3333/uploads/${item.pdf.replace(/ /g, "%20")}`,
            };
          });

        return response.json({
            Documentos
        })


    }

    async all(request: Request, response: Response){

        const documents = await knex('documents').select('*');        
        interface PDF {
            id: Number,
            nome: String,
            pdf: String,
        }


        const Documentos = documents.map(item => { 
            return {
              id: item.id,
              title: item.nome,
              doc_class: item.class_doc,
              arquivo_pdf: `http://localhost:3333/uploads/${item.pdf}`,
            };
          });



        return response.json({
            Documentos
        })

    }
}

export default DocumentsController;

