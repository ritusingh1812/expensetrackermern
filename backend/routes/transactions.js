const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');
const { register, login } = require("../controllers/userController");

const router=require('express').Router()


router.post('/add-income',addIncome)
.get('/get-incomes',getIncomes)
.delete('/delete-income/:id',deleteIncome)
.post('/add-expense',addExpense)
.get('/get-expenses',getExpense)
.delete('/delete-expense/:id',deleteExpense)




router.post("/register",register);
router.post("/login",login);







module.exports=router;