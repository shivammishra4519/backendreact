const express=require('express');
const router=express.Router();
const registerUser=require('../controler/registerUser')
const login=require('../controler/login');


router.post('/register',registerUser.registre);
router.post('/login',login.login);

module.exports=router;