const { JWT_KEY } = require('../config/server-config');
const UserRepository=require('../repository/user-repository');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
//const {JWT_KEY}=require('../config/server-config');

class UserService{
    constructor(){
    this.userRepository=new UserRepository();
    }

    async create(data){

        try {
            
            const user=await this.userRepository.create(data)
            return user;
        } catch (error) {
      console.log("Something went wrong on service layer")  
          throw error;       
        }
    }

    async signIn(email,plainpassword){
        try {
            //step 1 fetch the user using the email
            const user=await this.userRepository.getByEmail(email);
            //step 2 compare incoming password with stores encrypted password
            const passwordMatch=this.checkPassword(plainpassword,user.password);

            if(!passwordMatch){
                console.log("password does not match");
                throw{error:'Incorrect Password'};
            }
            //step 3 if password match than create a token andsend to the user
            const newJWt=this.createToken({email:user.email,id:user.id});
            return newJWt;
        } catch (error) {
            console.log("Somethingwent wrongin signIn process");
            throw error;
        }
    }

    async isAuthenticated(token){
        try {
            const response=this.verifyToken(token);//{email:'',id:'',iat:'',exp:''}
            if(!response){
                throw {error:'Invalid token'}
            }
            const user=this.userRepository.getById(response.id);
            if(!user){
                throw {error:'No user with the corresponding token exist'}
            }
            return user.id;
        } catch (error) {
             console.log("Something went wrong in isAuthentication process");
            throw error;
        }
    }

    createToken(user){
        try {
           const result=jwt.sign(user,JWT_KEY,{expiresIn:'1h'}) ;
           return result;
        } catch (error) {
             console.log("Something went wrong to create token")  
          throw error;       
        }
    }

    verifyToken(token){
        try {
            const response=jwt.verify(token,JWT_KEY);
            return response;
        } catch (error) {
             console.log("Something went wrong to validate token")  
          throw error;  
        }
    }

    checkPassword(userInputPlainPassword,encryptedpassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword,encryptedpassword)
        } catch (error) {
        console.log("Something went wrong in passwword comparsion")  
          throw error; 
        }
    }
}

module.exports=UserService
