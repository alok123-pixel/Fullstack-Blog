import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';


const app = express();

// Middleware
app.use(cors())
app.use(express.json())

await connectDB()

const PORT = process.env.PORT || 3000;

// Routes
app.get('/',(req,res)=>{
    res.send("server is ready")
})

app.use('/api/admin', adminRouter)
app.use('/api/blog', blogRouter)

app.listen(PORT,()=>{
    console.log("server is running " +  PORT)
})

export default app;