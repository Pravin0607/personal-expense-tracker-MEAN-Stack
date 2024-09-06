import mongoose,{Schema,Document} from "mongoose";

interface ExpenseDocument extends Document{
    description?: string;
    amount: number;
    date: Date;
    categoryId: Schema.Types.ObjectId;
    createdBy: Schema.Types.ObjectId;
}

const expenseSchema = new Schema({
    description: {type: String},
    amount: {type: Number, required: true},
    date: {type: Date, required: true},
    categoryId: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
    createdBy: {type: Schema.Types.ObjectId, ref: 'User', required: true}
});

const Expense = mongoose.model<ExpenseDocument>('Expense', expenseSchema);

export {Expense, ExpenseDocument}