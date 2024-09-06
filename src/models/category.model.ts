import mongoose,{Schema,Document} from "mongoose";

interface CategoryDocument extends Document{
    categoryName:string;
    createdBy:Schema.Types.ObjectId;
}

const categorySchema = new Schema<CategoryDocument>({
    categoryName:{type:String,lowercase:true,required:true},
    createdBy:{type:Schema.Types.ObjectId,ref:"User",required:true}
},{timestamps:true});


const Category = mongoose.model<CategoryDocument>("Category",categorySchema);


export {Category,CategoryDocument};

