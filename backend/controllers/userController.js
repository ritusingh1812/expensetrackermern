const User=require("../models/UserModel");
const bcrypt=require("bcrypt")


module.exports.register= async(req,res,next)=>{
  try {
    const { username, email, password } = req.body;
    console.log(req.body);
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
}

module.exports.login= async(req,res,next)=>{
  try {
    const { username,password } = req.body;
    console.log(req.body)
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "Incorrect username or password", status: false });
    const isValidPassword=await bcrypt.compare(password,user.password)
    if (!isValidPassword)
      return res.json({ msg: "Incorrect Password", status: false });
  
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
}