const router = require('express').Router();
const {User, authMiddleware} = require('../models/user');
const {validateSignup, validateLogin} = require('../services/user-service')
const bcrypt = require('bcrypt');

router.post('/api/user/signup', async(req,res) => {
    try{

        
        const {error} = validateSignup(req.body);
        if (error) 
        return res.status(400).send({message: error.details[0].message});
    
        const user = await User.findOne({email:req.body.email});
        if (user) 
        return res.status(406).send({message: "User already exists with given email."});

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password,salt);

        req.body.password = hashPassword;

        await new User(req.body).save();
        res.status(201).send({message: "User created successfully"});

    }catch(err){
        console.log(err)
        res.status(500).send({message: "Error occured while signup user to system"});
    }
})

router.post('/api/user/login', async(req,res) => {
    try{

        const {error} = validateLogin(req.body);
        if (error) 
        return res.status(400).send({message: error.details[0].message});

        const user = await User.findOne({email:req.body.email});
        if (!user) 
        return res.status(406).send({message: "User not registered yet. Please signup first and then login"});

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) 
        return res.status(401).send({message: "Invalid Username or Password"});

        const token = user.generateAuthToken();
        res.status(200).send({data:token, message:"Logged in successfully"});

    }catch(err){
        res.status(500).send({message: "Error occured while login user to system"});
    }
})

router.get('/api/user/details', authMiddleware, (req, res) => {
    // The user details are available in req.user
    const userDetails = {
      username: req.user.username,
      email: req.user.email,
      // Add other user details as needed
    };
  
    res.json(userDetails);
});

module.exports = router;