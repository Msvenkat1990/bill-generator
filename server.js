const server = require('express');
const app = server();
const mongoose = require('mongoose');
const cors = require('cors')
const dotEnv =require('dotenv');
const router = require('./router/router');
dotEnv.config();
const{PORT,DB} = process.env
mongoose.connect(DB)
.then(()=>{
    console.log('database connected successfully');
})
.catch(()=>{
    console.log('database not connected');
})

app.use(server.json());
app.use(cors());
app.use('/api',router);
app.listen(PORT,()=>{
    console.log('server runing port at :',PORT);
})
