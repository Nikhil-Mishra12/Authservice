const express=require('express');
const bodyParser=require('body-parser')
const app=express();

const {PORT} =require('./config/server-config');
const apiRoutes=require('./routes/index')
const db=require('./models/index');

//const UserRepository=require('./repository/user-repository')
//const UserService=require('./services/user-service');

 
const prepareAndstartServer=()=>{
  const {User,Role}=require('./models/index');

   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({extended:true}))

   app.use('/api',apiRoutes)
    app.listen(PORT,async ()=>{
        console.log('server started on', PORT);
      if(process.env.DB_SYNC){
        db.sequelize.sync({alter:true})
      }
        // const u1=await User.findByPk(2);
        // console.log(u1);
        // const r1=await Role.findByPk(2);
        // console.log(r1);
        // u1.addRole(r1);

        // const response=await u1.getRoles();
        // console.log(response);

        // const repo=new UserRepository();
        // const response= await repo.getById(1);
        // console.log(response);
        // const service=new UserService();
        // const newToken=service.createToken({email:"nm280477@gmail.com",id:1});
        // console.log("new token is",newToken);
    })
}

prepareAndstartServer()