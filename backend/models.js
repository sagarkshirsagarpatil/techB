const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/techB',{

useNewUrlParser: "true",
useUnifiedTopology: "true"

});
const sch= new mongoose.Schema({
name:String,
address:String,
customer:String,
number:Number
});
module.exports=mongoose.model("customer",sch);