import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = "mongodb+srv://ettiene2:Iplacex1234@eva-u2-spring.qj8so.mongodb.net/eva-u2-spring?retryWrites=true&w=majority";

const client = new MongoClient(uri,{
    serverApi: {
        version: ServerApiVersion.v1,
        strict:true,
        deprecationErrors: true
    }
}) 

export default client