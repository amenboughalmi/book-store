import express from 'express'
import {book} from '../models/bookmodel.js'
const router = express.Router()




router.post('/', async(request,res)=>{
    try{
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return res.status(400).send({
                message : 'send all required files: titles, author, publishYear'
            })
        }
        const newBook = {
            title:request.body.title,
            author:request.body.author,
            publishYear:request.body.publishYear,
        }
        const Book = await book.create(newBook)

        return res.status(200).send(Book)

    }catch(error){
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

router.get('/', async(req,res) =>{
    try{
        const books = await book.find({})
        return res.status(200).json({
            count:books.length,
            data: books
        })

    }catch(error) {
        console.log(error.message)
    }
})
router.get('/:id', async(req,res) =>{
    try{
        const { id } = req.params
        const Book = await book.findById(id)
        return res.status(200).json(Book)

    }catch(error) {
        console.log(error.message)
    }
})

router.put('/:id', async (request, response)=>{
    try {
        if (
            !request.body.title || !request.body.author || !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'send all required fields'
            })
        }
        const { id } = request.params
        const result = await book.findByIdAndUpdate(id, request.body)
        if (!result) {
            return response.status(404).json({message: 'book not found'})
        }
        return response.status(200).send({message: 'book updated successfully'})
    }catch(error) {
        console.log(error)
    }
})

router.delete('/:id', async (req,res)=>{
    try{
        const {id} = req.params
        const result = await book.findByIdAndDelete(id)
        if (!result) {
            return res.status(404).json({message: 'book not found'})
        }
        return res.status(200).send({message: 'book deleted successfully'})
    }catch(error) {
        console.log(error)
    }
})

export default router