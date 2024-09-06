import { Router } from "express";
import { addExpense, deleteExpense, getAllExpenses, updateExpense } from "../controllers/expense.controller";
import { auth } from "../middleware/auth";

const ExpenseRouter = Router();

ExpenseRouter.use(auth);

ExpenseRouter.get("/all", getAllExpenses);

ExpenseRouter.post("/add", addExpense);

ExpenseRouter.put("/update/:id", updateExpense);

ExpenseRouter.delete("/delete/:id",deleteExpense);


export { ExpenseRouter };
