import express from 'express'
import controller from './controller.js'



const routes = express.Router()

routes.post('/pelicula', controller.handleInsertPeliculaRequest)

routes.get('/peliculas', controller.handleGetPeliculasRequest)
routes.get('/pelicula/:id', controller.handleGetPeliculaRequest)
routes.put('/pelicula/:id', controller.handleUpdatePeliculaRequest)
routes.delete('/pelicula/:id', controller.handleDeletePeliculaRequest)

routes.post('/pelicula/search', controller.handleSearchPeliculaRequest)

export default routes