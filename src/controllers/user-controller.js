const UserService=require('../services/user-service');

const userservice=new UserService();

const create=async (req,res)=>{
try {
    const response=await userservice.create({
        email:req.body.email,
        password:req.body.password
    });
    return res.status(201).json({
         data:response,
         message:"Successfully create a new user",
        success:true,
        err:{}

    })
} catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({
        message:error.message || 'Something went wrong',
        data:{},
        success:false,
        err:error.explanation || error
    });
}
}

const signIn=async (req,res)=> {
    try {
        const response=await userservice.signIn(req.body.email,req.body.password);
        return res.status(200).json({
            success:true,
            data:response,
            err:{},
            message:'Successfully signin'
                     
        })
    } catch (error) {
        
        return res.status(error.statusCode).json({
            message:error.message,
            data:{},
            success:false,
            err:error.explanation
        });
    }
}

const isAunthenticated=async (req,res)=>{
    try {
        const token=req.headers['x-access-token'];
         const response=await userservice.isAuthenticated(token);
         return res.status(200).json({
            success:true,
            err:{},
            data:response,
            message:'user is aunthenticated and token is valid'
         });     

    } catch (error) {
        return res.status(500).json({
            message:'Something went wrong',
            data:{},
            success:false,
            err:error
        });
    }
}

const isAdmin=async(req,res)=>{
    try {
        const response=await userservice.isAdmin(req.body.id);
        return res.status(200).json({
            data:response,
            success:true,
            err:{},
            message:'Succcesfully fetch wether  user is admin or not'
        })
    } catch (error) {
        return res.status(500).json({
            message:'Something went wrong',
            data:{},
            success:false,
            err:error
        });
    }
}

module.exports={
    create,
    signIn,
    isAunthenticated,
    isAdmin
}