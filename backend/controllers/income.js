
const IncomeSchema=require('../models/IncomeModel')
exports.addIncome =  async (req,res)=>{
  const {title,amount,category,description,type,date,username}=req.body
  const income=IncomeSchema({
    title,amount,category,description,type,date,username
  })

  try {
    if(!title||!category||!date||!description||!username){
      return res.status(400).json({message:"all fields are required!"})
    }
    if(amount<=0||!amount==='number'){
      return res.status(400).json({message:"Amount must be a positive number"})
    }
    await income.save()
    res.status(200).json({message:"Income added!"})
  } catch (error) {
    res.status(500).json({message:"Server error!"})
  }
}

// exports.getIncomes= async(req,res)=>{
//   const username="shalala"
//   try {
//     // const incomes=await IncomeSchema.find().sort({createdAt:-1})
//     // res.status(200).json(incomes)
//     const incomes = await IncomeSchema.find({ username }).sort({ createdAt: -1 }); // Filter by username
//     res.status(200).json(incomes);
//   } catch (error) {
//     res.status(500).json({message:"Server error!"})
//   }
// }
exports.getIncomes = async (req, res) => {
  try {
    const { username } = req.query; // Destructure username from query parameters

    // Validate if username is provided
    if (!username) {
      return res.status(400).json({ message: "Username is required!" });
    }

    // Fetch incomes specific to the username
    const incomes = await IncomeSchema.find({ username }).sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server error!" });
  }
};


exports.deleteIncome= async(req,res)=>{
  const {id} =req.params;
  
  IncomeSchema.findByIdAndDelete(id)
  .then((income)=>{
    res.status(200).json({message:'Income deleted'})
  })
  .catch((err)=>{
    res.status(500).json({message:"Server error!"})
  })
}



