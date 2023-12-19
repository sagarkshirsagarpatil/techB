const DB=require('./models');
const show=async(req,resp)=>{
                    try{
                 let page= req.query.page;
                 let limit=req.query.per_page;
                  let data=await  DB.find().skip((page-1)*limit).limit(limit);
                  let length=await DB.find();
                   resp.send({totle:length.length,data:data});
                    }catch(error){
                 console.log(error);
                    }
                 }
const add=async(req,resp)=>{
try{
const {name,address,customer,number}=req.body;
const data={
name,address,customer,number
}
const dat=await new DB(data);
const respt=await dat.save();
resp.send({status:"success",data:data})
}catch(error){
console.log(error);
}
}
const update=async(req,resp)=>{
const {id,name,address,customer,number}=req.body;
const data={name,address,customer,number}
const dat=await DB.updateOne({_id:id},{$set: data}) 
resp.send({status:"success",message:"Successfull Updated",resp:dat});
}
const delet=async(req,resp)=>{
let id=req.query.id;
let data=await DB.deleteOne({_id:id});
resp.send(data);
                  
                  }
const edit=async(req,resp)=>{
let id=req.query.id;
let data=await DB.findOne({_id:id});
resp.send(data);
}
module.exports={add,update,delet,edit,show}