const express=require('express');

const UserController=require('../../controllers/user-controller');
const { AuthRequestValidator } = require('../../middlewares/index');


const router=express.Router();

router.post('/signup',
    AuthRequestValidator.authvalidateUser,
    UserController.create);

router.post('/signin',
    AuthRequestValidator.authvalidateUser,
    UserController.signIn);


    router.get('/isAuthenticated',
        UserController.isAunthenticated);

        router.get('/isAdmin',
            AuthRequestValidator.validateIsAdminRequest,
            UserController.isAdmin);
module.exports=router;