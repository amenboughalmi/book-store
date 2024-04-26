import express from "express"
import {port, mongo_uri} from "./config.js"
import mongoose from "mongoose"
import booksRoutes from './routes/booksRoutes.js'
import cors from 'cors'
const app = express()
app.use(express.json())

app.use(cors())


app.get('/', (req,res) => {
    console.log(req)
    return res.status(234).send('welcome')
})
app.use('/books', booksRoutes)
mongoose 
.connect(mongo_uri)
.then(()=>{
    console.log('app connected')
    app.listen(port, () =>{
        console.log(`app listening on on port ${port}`)
    })
})
.catch((error)=>{
    console.log(error)
})