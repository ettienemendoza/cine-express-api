import { ObjectId } from 'mongodb';
import client from '../common/dbconn.js';
import { Actor } from './actor.js';
import { Pelicula } from '../pelicula/pelicula.js'; 
import { peliculaCollection } from '../pelicula/controller.js';


const actorCollection = client.db('server').collection('actores');


async function handleInsertActorRequest(req, res) {
    let data = req.body;
    let actor = Actor;

    actor.nombre = data.nombre;
    actor.edad = data.edad;
    actor.nacionalidad = data.nacionalidad;
    actor.idPelicula = data.idPelicula;

    try {
        
        let pelicula = await peliculaCollection.findOne({ nombre: data.nombrePelicula });
        if (!pelicula) return res.status(404).send('Película no encontrada');

        actor.idPelicula = pelicula._id; 

        await actorCollection.insertOne(actor)
            .then((data) => {
                if (!data) return res.status(400).send('Error al guardar registro');
                return res.status(201).send(data);
            })
            .catch((e) => { return res.status(500).send({ error: e }); });

    } catch (e) {
        return res.status(500).send({ error: e.message });
    }
}


async function handleGetActoresRequest(req, res) {
    await actorCollection.find({}).toArray()
        .then((data) => { return res.status(200).send(data); })
        .catch((e) => { return res.status(500).send({ error: e }); });
}


async function handleGetActorByIdRequest(req, res) {
    let id = req.params.id;

    try {
        let oid = ObjectId.createFromHexString(id);

        await actorCollection.findOne({ _id: oid })
            .then((data) => {
                if (!data) return res.status(404).send({});
                return res.status(200).send(data);
            })
            .catch((e) => { return res.status(500).send({ error: e.code }); });

    } catch (e) {
        return res.status(400).send('Id mal formado');
    }
}

async function handleGetActoresByPeliculaIdRequest(req, res) {
    let id = req.params.id;

    try {
        let oid = ObjectId.createFromHexString(id);

        await actorCollection.find({ idPelicula: oid }).toArray()
            .then((data) => { return res.status(200).send(data); })
            .catch((e) => { return res.status(500).send({ error: e }); });

    } catch (e) {
        return res.status(400).send('Id mal formado');
    }
}

export default {
    handleInsertActorRequest,
    handleGetActoresRequest,
    handleGetActorByIdRequest,
    handleGetActoresByPeliculaIdRequest
};
