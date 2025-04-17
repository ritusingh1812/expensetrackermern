
const ExpenseSchema=require('../models/ExpenseModel')


exports.addExpense =  async (req,res)=>{
  const {title,amount,category,description,type,date,username}=req.body
  const expense=ExpenseSchema({
    title,amount,category,description,date,type,username
  })

  try {
    if(!title||!category||!date||!description||!username){
      return res.status(400).json({message:"all fields are required!"})
    }
    if(amount<=0||!amount==='number'){
      return res.status(400).json({message:"Amount must be a positive number"})
    }
    await expense.save()
    res.status(200).json({message:"Expense added!"})
  } catch (error) {
    res.status(500).json({message:"Server error!"})
  }
}

// exports.getExpense = async (req, res) => {
//   try {
//     const expenses = await ExpenseSchema.find().sort({ createdAt: -1 });
//     res.status(200).json(expenses);
//   } catch (error) {
//     res.status(500).json({ message: "Server error!" });
//   }
// };

exports.getExpense = async (req, res) => {
  try {
    const { username } = req.query; // Destructure username from query parameters

    // Validate if username is provided
    if (!username) {
      return res.status(400).json({ message: "Username is required!" });
    }

    // Fetch expenses specific to the username
    const expenses = await ExpenseSchema.find({ username }).sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server error!" });
  }
};


exports.deleteExpense= async(req,res)=>{
  const {id} =req.params;
  
  ExpenseSchema.findByIdAndDelete(id)
  .then((expenses)=>{
    res.status(200).json({message:'Expense deleted'})
  })
  .catch((err)=>{
    res.status(500).json({message:"Server error!"})
  })
}


// const ExpenseSchema = require('../models/ExpenseModel')

// exports.addExpense = async (req, res) => {
//   const { title, amount, category, description, date } = req.body
//   const username = req.user.username  // Assuming the username is stored in req.user

//   const expense = new ExpenseSchema({
//     title,
//     amount,
//     category,
//     description,
//     date,
//     username,
//   })

//   try {
//     if (!title || !category || !date || !description) {
//       return res.status(400).json({ message: "All fields are required!" })
//     }
//     if (amount <= 0 || typeof amount !== 'number') {
//       return res.status(400).json({ message: "Amount must be a positive number" })
//     }
//     await expense.save()
//     res.status(200).json({ message: "Expense added!" })
//   } catch (error) {
//     res.status(500).json({ message: "Server error!" })
//   }
// }

// exports.getExpenses = async (req, res) => {
//   const username = req.user.username  // Assuming the username is stored in req.user

//   try {
//     const expenses = await ExpenseSchema.find({ username }).sort({ createdAt: -1 })
//     res.status(200).json(expenses)
//   } catch (error) {
//     res.status(500).json({ message: "Server error!" })
//   }
// }

// exports.deleteExpense = async (req, res) => {
//   const { id } = req.params

//   try {
//     await ExpenseSchema.findByIdAndDelete(id)
//     res.status(200).json({ message: "Expense deleted" })
//   } catch (err) {
//     res.status(500).json({ message: "Server error!" })
//   }
// }
// exports.deleteExpense = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const expense = await ExpenseSchema.findByIdAndDelete(id); // Use await here

//     if (!expense) {
//       return res.status(404).json({ message: "Expense not found!" }); // Handle case where the expense is not found
//     }

//     res.status(200).json({ message: "Expense deleted" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error!" }); // Catch any unexpected errors
//   }
// };
