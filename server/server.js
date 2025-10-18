import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connetDB  from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoutes.js';


// app config
const app = express()
const port = process.env.PORT || 4000
 connetDB()
 connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())

//API Routes
app.use('/api/user', userRouter);


app.get('/',(req,res)=>{
    res.send('API WORKING Great')
})

app.listen(port, ()=> console.log("Server Started",port))