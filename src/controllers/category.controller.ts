import { Request,Response } from "express";
import { Category } from "../models/category.model";
import { Expense } from "../models/expense.model";

const getAllCategories=async(req:Request,res:Response)=>{
    try{
        let categories=await Category.find({createdBy:req.headers.userId},{categoryName:1}).sort({categoryName:1});
        res.json({success:true,data:categories})
    }catch(err){
        console.log(err);
        res.status(400).json({success:false,message:"Failed to fetch categories"})
    }
}

const createCategory=async(req:Request,res:Response)=>{
    let {categoryName}=req.body;
    categoryName=categoryName.toLowerCase();
    // console.log("cat is",categoryName)
    try{
        // console.log("checking cat")
        let isAvailable=await Category.findOne({categoryName,createdBy:req.headers.userId});
        if(isAvailable) return res.status(400).json({success:false,message:"Category name already exists"});
        // console.log("creating cat")
        let cat=await Category.create({categoryName,createdBy:req.headers.userId});
        res.json({success:true,message:"Category created successfully",data:cat});
    }catch(err)
    {
        console.error("duplicate category name",err);
        res.status(400).json({success:false,message:"Category creation failed due to duplicate category name or server error"})
    }
}

const updateCategory=async(req:Request,res:Response)=>{
    const {id}=req.params;
    const {categoryName}=req.body;
    try{
        let cat=await Category.findByIdAndUpdate(id,{categoryName},{new:true});
        res.json({success:true,message:"Category updated successfully",data:cat});
    }catch(err){
        console.error(err);
        res.status(400).json({success:false,message:"Category updation failed due to server error"})
    }
}

const deleteCategory=async(req:Request,res:Response)=>{
    const {id}=req.params;
    try{
        let isExpenseAvailable=await Expense.findOne({categoryId:id});
        if(isExpenseAvailable) return res.status(400).json({success:false,message:"Category cannot be deleted as it is associated with expenses"});

        let cat=await Category.findByIdAndDelete(id);
        res.json({success:true,message:"Category deleted successfully",data:cat});
    }catch(err){
        console.error(err);
        res.status(400).json({success:false,message:"Category deletion failed due to server error"})
    }
}

export {createCategory,getAllCategories,updateCategory,deleteCategory}