const User = require('../model/User');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

const registerUser = asyncHandler(async(req,res) => {
    const {email,password} = req.body;

    const userExists = await User.findOne({email});

    if(userExists) {
        res.status(400);
        throw new Error('User Already Exists');
    }

    const user = await User.create({
        email,
        password,
    });

    if(user){
        console.log(`User registered successfully: ${user}`);
        res.status(201).json({
            success : true,
            user: {
                _id: user._id,
                email: user.email,
              },
            token: generateToken(user._id),
        });
    }else{
        console.log('Failed to register user');
        res.status(401).json({ success: false, message: 'Invalid E-mail or Password'});
        
    }

});



const authUser = asyncHandler(async (req,res) => {
    const {email,password} = req.body;

    console.log(`Received email: ${email}, password: ${password}`);

    const user = await User.findOne({email});

    if (user) {
        console.log(`User found: ${user}`);
    
        const isMatch = await user.matchPassword(password);
    
        console.log(`Password match result: ${isMatch}`);
    
        if (isMatch) {
          res.json({
            success : true,
            user: {
                _id: user._id,
                email: user.email,
              },
            token: generateToken(user._id),
          });
        } else {
          res.status(401).json({ success:false ,message: 'Invalid E-mail or Password' });
        }
      } else {
        console.log('User not found');
        res.status(401).json({ success:false , message: 'Invalid E-mail or Password' });
      }


    // if(user && (await user.matchPassword(password))) {
    //     res.json({
    //         _id: user._id,
    //         email: user.email,
    //         token: generateToken(user._id),
    //     });
    // } else{
    //     res.status(401);
    //     throw new Error('Invalid E-mail or Password');
    // }
});

const getAllUsers = async(req,res)=>{
  try{

    const users = await User.find();
    
    if(!users){
      return res.status(400).json({
        success:false,
        message:'User Not Found'
      })
    }

    res.status(200).json({
      success:true,
      data:users
    })

  }catch(error){
    res.status(500).json({
      success:false,
      message:'Failed To Fetch Users'
    })
  }
}

const verifyPassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  const isMatch = await user.matchPassword(password);

  if (isMatch) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(401).json({ success: false, message: 'Invalid password' });
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { email, newPassword } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  // Update password
  user.password = newPassword;
  await user.save();

  res.status(200).json({ success: true, message: 'Password updated successfully' });
});


module.exports = {
    registerUser,
    authUser,
    getAllUsers,
    verifyPassword,
    resetPassword
};