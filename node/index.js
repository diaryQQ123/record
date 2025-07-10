const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const app=express()
const port=3000;
const recordRoutes=require('./routes/recordRoutes')
app.use(bodyParser.json())
app.use(cors())
app.get('/',(req,res)=>{
    res.send('hello')
})
app.use('/api/record',recordRoutes)
app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`)
})