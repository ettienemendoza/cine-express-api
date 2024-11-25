import express, { urlencoded } from 'express'
import cors from 'cors'

import client from './src/common/dbconn.js'
import routes from './src/pelicula/routes.js'
import ActorRoutes from './src/actor/routes.js'


const PORTS = 3000 || 4000

const app = express()

app.use(express.json())
app.use(urlencoded({extended: true}))
app.use(cors())

app.all('/',(req, res) => {return res.status(200).send('Bienvenido al cine Iplacex')})

app.use('/api', routes)
app.use('/api', ActorRoutes)


await client.connect()
.then(() =>{
    console.log ('Conectado al cluster')
    app.listen(PORTS, () => { console.log(`Servidor corriendo en http://localhost:${PORTS}`)} )
})
.catch(() => {
    console.log('Ha ocurrido un error ')
})


 