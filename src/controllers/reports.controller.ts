import { Request,Response } from "express";
import { Expense} from "../models/expense.model";

const getCategoryWiseReportDaywise = async (req: Request, res: Response) => 
{    
  console.log("getting daily summary report");
    let date1=new Date(req.body.date);
    const userId= req.headers.userId;
    try{
        const categoryReport = await Expense.aggregate([
            {
                $match:{
                    createdBy:userId,
                    date:date1
                }
            },
            {
                $group:{
                    _id:"$categoryId",
                    totalAmount:{$sum:"$amount"}
                }
            },
            {
                $lookup:{
                    from:"categories",
                    localField:"_id",
                    foreignField:"_id",
                    as:"category"                    
                }
            },
            {   
                $unwind:"$category"
            },
            {
                $project:{
                    _id:0,
                    category:"$category.categoryName",
                    totalAmount:1
                }
            }            
        ]);
        // const categoryReport=await Expense.find({date:date1});
        // console.log(categoryReport)
        const expenses = await Expense.find({ date: date1, createdBy: userId }).populate('categoryId', 'categoryName').sort({date:1});

        if (expenses.length > 0) {
          let arr:any = expenses.map(ele => ({
            _id: ele._id,
            amount: ele.amount,
            description: ele.description,
            date: ele.date,
            categoryName: (ele.categoryId as any).categoryName
          }));
          // console.log(arr);
          const data = { categoryReport, expenses:arr };
          res.status(200).json({success:true,data});
        }
        else
        {
          const data = { categoryReport, expenses };
          // console.log(data);
          res.status(200).json({success:false,data});
        }

    }catch(err)
    {
        console.log(err);
        res.status(500).json({success:false,message:"Internal Server Error"});    
    }
}

const getCategoryWiseReportMonth = async (req: Request, res: Response) => {
  console.log("getting monthly summary report")
    let date1 = new Date(req.body.month);
    const userId = req.headers.userId;
  
    try {

      const startDate = new Date(date1.getFullYear(), date1.getMonth(), 1); // Set start date of the month
      const endDate = new Date(date1.getFullYear(), date1.getMonth() + 1, 0); // Set end date of the month (day before next month)
  
      const categoryReport = await Expense.aggregate([
        {
          $match: {
            createdBy: userId,
            date: { $gte: startDate, $lte: endDate } // Match date between start and end of month
          }
        },
        {
          $group: {
            _id: "$categoryId",
            totalAmount: { $sum: "$amount" }
          }
        },
        {
          $lookup: {
            from: "categories",
            localField: "_id",
            foreignField: "_id",
            as: "category"
          }
        },
        {
          $unwind: "$category"
        },
        {
          $project: {
            _id: 0,
            category: "$category.categoryName",
            totalAmount: 1
          }
        }
      ]);
  
      const expenses = await Expense.find({
        date: { $gte: startDate, $lte: endDate }, // Match date between start and end of month
        createdBy: userId
      }).populate('categoryId', 'categoryName').sort({date:1});
  
      if (expenses.length > 0) {
        let arr:any = expenses.map(ele => ({
          _id: ele._id,
          amount: ele.amount,
          description: ele.description,
          date: ele.date,
          categoryName: (ele.categoryId as any).categoryName
        }));
        // console.log(arr);
        const data = { categoryReport, expenses:arr };
        res.status(200).json({success:true,data});
      }
      else
      {
        const data = { categoryReport, expenses };
        // console.log(data);
        res.status(200).json({success:false,data});
      }
      console.log("data sent of month : ",{expenses,categoryReport});

    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };


  const getCategoryWiseReportYear = async (req: Request, res: Response) => {
    console.log("getting yearly summary report")
    let date1 = new Date(req.body.year);
    const userId = req.headers.userId;
  
    try {
      const startDate = new Date(date1.getFullYear(), 0, 1); // Set start date of the year (Jan 1st)
      const endDate = new Date(date1.getFullYear() + 1, 0, 1); // Set end date of the year (next year's Jan 1st)
  
      const categoryReport = await Expense.aggregate([
        {
          $match: {
            createdBy: userId,
            date: { $gte: startDate, $lte: endDate } // Match date between start and end of year
          }
        },
        {
          $group: {
            _id: "$categoryId",
            totalAmount: { $sum: "$amount" }
          }
        },
        {
          $lookup: {
            from: "categories",
            localField: "_id",
            foreignField: "_id",
            as: "category"
          }
        },
        {
          $unwind: "$category"
        },
        {
          $project: {
            _id: 0,
            category: "$category.categoryName",
            totalAmount: 1
          }
        }
      ]);
  
      const expenses = await Expense.find({
        date: { $gte: startDate, $lt: endDate }, // Match date between start and end of year
        createdBy: userId
      }).populate('categoryId', 'categoryName').sort({date:1});
  
       if (expenses.length > 0) {
          let arr:any = expenses.map(ele => ({
            _id: ele._id,
            amount: ele.amount,
            description: ele.description,
            date: ele.date,
            categoryName: (ele.categoryId as any).categoryName
          }));
          // console.log(arr);
          const data = { categoryReport, expenses:arr };
          res.status(200).json({success:true,data});
        }
        else
        {
          const data = { categoryReport, expenses };
          // console.log(data);
          res.status(200).json({success:false,data});
        }
      console.log("data sent of year : ",{expenses,categoryReport});
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
  
const getCategoryWiseReportRangedate = async (req: Request, res: Response) => {
  console.log("getting range summary report")
  try{
    const userId= req.headers.userId;
    const [startDate, endDate] = req.body.dates;
    let date1=new Date(startDate);
    let date2=new Date(endDate);

    console.log("date1 = ",date1);
    console.log("date2 = ",date2);
    // console.log(new Date(date2.getFullYear(), date2.getMonth(), date2.getDate() + 1));
    if (date1.getTime() === date2.getTime()) {
      // console.log("date1 and date2 are the same (same day)");
      req.body.date = date1;
     return getCategoryWiseReportDaywise(req,res);
    }

    const categoryReport = await Expense.aggregate([
        {
          $match: {
            createdBy: userId,
            date: {   $gte: new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()),
              $lt: new Date(date2.getFullYear(), date2.getMonth(), date2.getDate() + 1) // Add 1 day to include expenses on date2
        } // Match within date range
          }
        },
        {
            $group:{
                _id:"$categoryId",
                totalAmount:{$sum:"$amount"}
            }
        },
        {
            $lookup:{
                from:"categories",
                localField:"_id",
                foreignField:"_id",
                as:"category"                    
            }
        },
        {   
            $unwind:"$category"
        },
        {
            $project:{
                _id:0,
                category:"$category.categoryName",
                totalAmount:1
            }
        }            
    ]);
    // const categoryReport=await Expense.find({date:date1});
    // console.log(categoryReport)

    const expenses = await Expense.find({
      date: { $gte: date1, $lt: new Date(date2.getFullYear(), date2.getMonth(), date2.getDate() + 1) },
      createdBy: userId
    }).populate('categoryId', 'categoryName').sort({date:1});

    // console.log(expenses);

    if (expenses.length > 0) {
      let arr:any = expenses.map(ele => ({
        _id: ele._id,
        amount: ele.amount,
        description: ele.description,
        date: ele.date,
        categoryName: (ele.categoryId as any).categoryName
      }));
      // console.log(arr);
      const data = { categoryReport, expenses:arr };
      res.status(200).json({success:true,data});
    }
    else
    {
      const data = { categoryReport, expenses };
      // console.log(data);
      res.status(200).json({success:false,data});
    }
    console.log("data sent of range : ",{expenses,categoryReport});

}catch(err)
{
    console.log(err);
    res.status(500).json({success:false,message:"Internal Server Error"});    
}

}

const getSummaryReport=async(req:Request,res:Response)=>{
  console.log("getting summary report");
  const userId=req.headers.userId;
  let today=new Date();
  // console.log("today = ",today);
  today= new Date(today.getFullYear(), today.getMonth(), today.getDate());
  try{
    //get total money spen today

    const todayReport = await Expense.aggregate([
      {
        $match: {
          createdBy: userId,
          date: today
        }
      },{
        $group:{
          _id:null,
          totalAmount:{$sum:"$amount"}
        }
      },
      {
        $project:{
          _id:0,
          totalAmount:1
        }
      }
    ]);
    
    // console.log("today report ",todayReport);

    //get total money spent this month
   let startDate = new Date(today.getFullYear(), today.getMonth(), 1); // Set start date of the month
   let endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Set end date of the month (day before next month)

    const thisMonthReport = await Expense.aggregate([
      {
        $match: {
          createdBy: userId,
          date: { $gte: startDate, $lt: endDate } // Match date between start and end of month
        }
      },{
        $group:{
          _id:null,
          totalAmount:{$sum:"$amount"}
        }
      },
      {
        $project:{
          _id:0,
          totalAmount:1
        }
      }
    ]);

    //get total money spent this year
    let startYear = new Date(today.getFullYear(), 0, 1); // Set start date of the year (Jan 1st)
    let endYear = new Date(today.getFullYear() + 1, 0, 1); // Set end date of the year (next year's Jan 1st)

    let thisYearReport= await Expense.aggregate([
      {
        $match: {
          createdBy: userId,
          date: { $gte: startYear, $lt: endYear } // Match date between start and end of month
        }
      },{
        $group:{
          _id:null,
          totalAmount:{$sum:"$amount"}
        }
      },
      {
        $project:{
          _id:0,
          totalAmount:1
        }
      }
    ]);

    //get total money spent till today
    
    let tillNowReport= await Expense.aggregate([
      {
        $match: {
          createdBy: userId,
          date: {$lte: today } // Match date between start and end of month
        }
      },{
        $group:{
          _id:null,
          totalAmount:{$sum:"$amount"}
        }
      },
      {
        $project:{
          _id:0,
          totalAmount:1
        }
      }
    ]);

    const categoryReporttill = await Expense.aggregate([
      {
        $match: {
          createdBy: userId,
          date: { $lte: today } // Match date between start and end of year
        }
      },
      {
        $group: {
          _id: "$categoryId",
          totalAmount: { $sum: "$amount" }
        }
      },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "category"
        }
      },
      {
        $unwind: "$category"
      },
      {
        $project: {
          _id: 0,
          category: "$category.categoryName",
          totalAmount: 1
        }
      }
    ]);

    let totalToday= todayReport.length>0?todayReport[0].totalAmount:0;
    let totalThisMonth= thisMonthReport.length>0?thisMonthReport[0].totalAmount:0;
    let totalThisYear= thisYearReport.length>0?thisYearReport[0].totalAmount:0;
    let totalTillNow= tillNowReport.length>0?tillNowReport[0].totalAmount:0;
    
    res.status(200).json({success:true,data:{amounts:{totalToday,totalThisMonth,totalThisYear,totalTillNow},categoryReporttill}});

  }catch(err)
  {
    console.log(err);
    res.status(500).json({success:false,message:"Internal Server Error"});  
  }  
}

export { getCategoryWiseReportDaywise , getCategoryWiseReportMonth,getCategoryWiseReportYear,getCategoryWiseReportRangedate,getSummaryReport};
