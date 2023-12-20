const express=require('express');
const cors=require('cors');
const route=express();
const controller=require('./controller');
route.use(express.json());
route.use(cors({
                    origin:'http://localhost:3000'
                                    }));
route.get('/',controller.show);
route.post('/addCustomer',controller.add);
route.get('/edit',controller.edit);
route.delete('/delet',controller.delet);
route.put('/update',controller.update);
module.exports=route;