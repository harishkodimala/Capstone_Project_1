import exp from 'express'
import { authenticate } from '../services/authService.js';
import { UserTypeModel } from '../models/UserModel.js';
import bcrypt from 'bcryptjs';
export const commonRouter=exp.Router()

//login
commonRouter.post('/login',async(req,res)=>
{
//get user cred object
  let userCred = req.body;
  //call authenticate service
  let { token, user } = await authenticate(userCred);
  //save tokan as httpOnly cookie
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });
  //send res
  res.status(200).json({ message: "login success", payload: user });
})
//logout

//logout for User, Author and Admin
commonRouter.get('/logout', (req, res) => {
  // Clear the cookie named 'token'
  res.clearCookie('token', {
    httpOnly: true, // Must match original  settings
    secure: false,   // Must match original  settings
    sameSite: 'lax' // Must match original  settings
  });
  
  res.status(200).json({ message: 'Logged out successfully' });
});

//update password
commonRouter.put('/change-password',async(req,res)=>
{
//get current paassword and new password
let {userID,email,currentPassword,newPassword}=req.body
let userDB=await UserTypeModel.findById(userID)
if(!userDB)
{
    return res.status(404).json({message:"Invalid user"})
}
//check the current password is correct
let pass=await bcrypt.compare(currentPassword,userDB.password)
if(pass===false)
{
    return res.status(400).json({message:"incorrect password"})
}

//replace the current password with new password
userDB.password=await bcrypt.hash(newPassword,10)
await userDB.save()

//send res
res.status(200).json({message:"password updated succesfully",payload:userDB})
})
