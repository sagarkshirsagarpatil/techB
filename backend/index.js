const express=require('express');
const app=express();
const route=require('./route');
app.use('/',route);
const port = 4000;
app.listen(4000,()=>{
  console.log('server running.....');
})