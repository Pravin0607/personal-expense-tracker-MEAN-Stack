import { Request, Response } from "express";
import { Expense,ExpenseDocument } from "../models/expense.model";


const getAllExpenses = async (req: Request, res: Response) => {
    const { userId } = req.headers;
    console.log(userId);
    try {
        let expenses = await Expense.find({ createdBy: userId }).populate('categoryId', 'categoryName').sort({ date: -1 });
        res.json({ success: true, data: expenses });
    } catch (err) {
        console.log(err);
        res.status(400).json({ success: false, message: "Failed to fetch expenses" });
    }
}

const addExpense=async(req:Request,res:Response)=>{
    const {userId}=req.headers;
    // console.log(req.body);
    const {amount,description,date,selectedCategory:{_id}}=req.body;
    console.log("add Expense ",date);
    try
    {
        let expense=new Expense({
            amount,
            description,
            date,
            categoryId:_id,
            createdBy:userId
        });
        let result=await expense.save();
        res.json({success:true,message:"Expense added successfully",data:result});
    }catch(err)
    {
        console.log(err);
        res.status(400).json({success:false,message:"Failed to add expense"});
    }

}

const updateExpense=async(req:Request,res:Response)=>{
    const {id}=req.params;
    // console.log(req.body);
    const {amount,description,date,categoryId}=req.body;
    try
    {
        let result = await Expense.findByIdAndUpdate(id,{amount,description,date,categoryId});
        res.json({success:true,message:"Expense updated successfully",data:result});
    }catch(err)
    {
        console.log(err);
        res.status(400).json({success:false,message:"Failed to update expense"});
    }
}

const deleteExpense=async(req:Request,res:Response)=>{
    const {id}=req.params;
    try
    {
        let result = await Expense.findByIdAndDelete(id);
        res.json({success:true,message:"Expense deleted successfully",data:result});
    }catch(err)
    {
        console.log(err);
        res.status(400).json({success:false,message:"Failed to delete expense"});
    }
}

export { getAllExpenses,addExpense,deleteExpense,updateExpense}