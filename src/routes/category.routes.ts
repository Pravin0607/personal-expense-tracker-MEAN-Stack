import { Router } from "express";
import { auth } from "../middleware/auth";
import { createCategory,deleteCategory,getAllCategories, updateCategory } from "../controllers/category.controller";

const CategoryRouter=Router();

CategoryRouter.use(auth);

CategoryRouter.get("/all" ,getAllCategories);

CategoryRouter.post("/create",createCategory);

CategoryRouter.patch("/update/:id",updateCategory);

CategoryRouter.delete("/delete/:id",deleteCategory);

export {CategoryRouter};