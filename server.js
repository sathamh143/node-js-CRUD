const express = require ('express');
const app = express ()
const Product = require ('./models/produectModel')
const mongoose = require ('mongoose');

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/products',async(req,res) => {
    try {
      const product = await Product.find(req.body)
      res.status(500).json(product); 
    } catch (error) {
      res.status(500).json({message: error.message})
    }
})

app.get('/products/:id',async(req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(500).json(product); 
      } catch (error) {
        res.status(500).json({message: error.message})
      } 
})

app.post('/products',async(req,res) => {
  try {
    const product = await Product.create(req.body)
    res.status(500).json(product); 
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message})
  }
})

app.put('/products/:id',async(req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id,req.body);
        if(!product){
            return res.status(404).json({message:`cannot find any product ID ${id}`})
        }
        const updateProduct = await Product.findById(id,req.body);
        res.status(500).json(updateProduct); 
      } catch (error) {
        res.status(500).json({message: error.message})
      } 
})

app.delete('/products/:id',async(req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id,req.body);
        if(!product){
            return res.status(404).json({message:`cannot find any product ID ${id}`})
        }
        res.status(500).json(product); 
      } catch (error) {
        res.status(500).json({message: error.message})
      } 
})


mongoose.connect('mongodb+srv://sathamnshpm:whiterose@cluster0.errmiko.mongodb.net/satham-nshpm?retryWrites=true&w=majority')
.then(()=> {
    console.log('mongodb connect success')
    app.listen (3000,() => {
        console.log ('node api app running on port 3000')
    })
}).catch((error) =>{
    console.log(error)
})