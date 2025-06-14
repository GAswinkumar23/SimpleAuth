const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const cors=require('cors');

const loginrouter=require('../backend/router/loginroute');
const signupRouter=require('../backend/router/signuproute');

const PORT="5001";
dotenv.config();
const app=express();
app.use(express.static('public'));
app.use(cors());
app.use(express.json());

app.listen(PORT, () => console.log(`I am running on port ${PORT}`));

app.use('/login',loginrouter);
app.use('/signup',signupRouter);

const url="mongodb://127.0.0.1:27017/sampleauth";

mongoose.connect(url,{
    useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=> console.log(`mongo is connnected at ${url} `)).catch(error=> console.error(`the error is :${error}`));