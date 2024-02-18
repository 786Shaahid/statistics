import axios from "axios";
import { Transaction } from "./services.model.js";

export class ServiceRepository{

  /** 1 DEFINE REPOSITORY FOR INITIALIZE THE DATABSE */
 async initializeDB(){
      try {
        const response= await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        // a. initialize the database
        //  response.data.forEach( async (transactionsData) => {
        //         const transaction= new Transaction({
        //             title:transactionsData.title,
        //             price:transactionsData.price,
        //             description:transactionsData.description,
        //             category:transactionsData.category,
        //             image:transactionsData.image,
        //             sold:transactionsData.sold,
        //             dateOfSale:transactionsData.dateOfSale
        //         });
        //      await transaction.save();    

        //  });
            //  or we can do this way
        await Transaction.insertMany(response.data);
         return  Transaction.find();
      } catch (error) {
        console.log(error);
      }
 }
  /** 2.  DEFINE REPOSITORY FOR list all transactions with search and pagination*/
 async getTransactions({month,page=1,searchText}){
    console.log( month,page,searchText);
    const months=Number(month)
        try {
           const response= await Transaction.aggregate([
              {
                $match: {
                  $expr:{$eq:[{$month:{$toDate:"$dateOfSale"}},parseFloat(month)]}
                }
              },
              {
                $match: {
                  $or: [
                    { title: { $regex: searchText, $options: 'i' } },
                    { description: { $regex: searchText, $options: 'i' } },
                    { price: { $regex: searchText, $options: 'i' } }
                  ]
                }
              },
              {$skip:(page-1)*10},
              {$limit:10}

            ]) ;
            // console.log("response",response);
        return response;
        } catch (error) {
            console.log(error);
        }
 }
  /** 3.  DEFINE REPOSITORY FOR */
 async getStatistics({month}){
   try {
     const response= await Transaction.aggregate([
              {
                $match:{
                  $expr: { $eq: [{ $month: { $toDate: "$dateOfSale" } }, parseInt(month)] }
                }
              },
              
              {
                $group:{
                  _id: null,
                  totalSaleAmount: { $sum: { $toDouble: "$price" }  },
                  totalSoldItems: { $sum: { $cond: { if: "$sold", then: 1, else: 0 } } },
                  totalNotSoldItems: { $sum: { $cond: { if: "$sold", then: 0, else: 1 } } }
                }
              }
     ]);
     console.log("statistics-response",response);
     return response;
   } catch (error) {
    console.log(error);
   }
 }
  /** 4.  DEFINE REPOSITORY FOR */
 async getBchartData({month}){
     try {
      const response= await Transaction.aggregate([
        {
          $match:{
            $expr:{$eq:[{$month:{$toDate:"$dateOfSale"}},parseFloat(month)]}
          }
        },
        {
          $addFields: {
            numericPrice: { $toDouble: "$price" } // Convert price field to double
          }
        },
        {
          $project: {
            priceRange: {
              $switch: {
                branches: [
                { case: { $and: [{ $gte: ["$numericPrice", 0] }, { $lte: ["$numericPrice", 100] }] },   then: "0 - 100" },
                { case: { $and: [{ $gte: ["$numericPrice", 101] }, { $lte: ["$numericPrice", 200] }] }, then: "101 - 200" },
                { case: { $and: [{ $gte: ["$numericPrice", 201] }, { $lte: ["$numericPrice", 300] }] }, then: "201 - 300" },
                { case: { $and: [{ $gte: ["$numericPrice", 301] }, { $lte: ["$numericPrice", 400] }] }, then: "301 - 400" },
                { case: { $and: [{ $gte: ["$numericPrice", 401] }, { $lte: ["$numericPrice", 500] }] }, then: "401 - 500" },
                { case: { $and: [{ $gte: ["$numericPrice", 501] }, { $lte: ["$numericPrice", 600] }] }, then: "501 - 600" },
                { case: { $and: [{ $gte: ["$numericPrice", 601] }, { $lte: ["$numericPrice", 700] }] }, then: "601 - 700" },
                { case: { $and: [{ $gte: ["$numericPrice", 701] }, { $lte: ["$numericPrice", 800] }] }, then: "701 - 800" },
                { case: { $and: [{ $gte: ["$numericPrice", 801] }, { $lte: ["$numericPrice", 900] }] }, then: "801 - 900" },
                { case: { $gte: ["$numericPrice", 901] }, then: "901-above" }
              
                ],
                default: "Unknown"
              }
            }
          }
        },
        {
          $group: {
            _id: "$priceRange",
            count: { $sum: 1 }
          }
        }
      ]);

      console.log("getBchatData",response);
      return response;
     } catch (error) {
      console.log(error);
     }
  

 }
  /** 5.  DEFINE REPOSITORY FOR */
 async getPchartData({month}){
        try {
          const response= await Transaction.aggregate([
               {
                $match:{
                  $expr:{$eq:[{$month:{$toDate:"$dateOfSale"}},parseFloat(month)]}
                }
               },
               {
                $group: {
                  _id: "$category",
                  count: { $sum: 1 }
                }
              },
              {
                $project: {
                  category: "$_id",
                  count: 1,
                  _id: 0
                }
              }


          ])
          console.log("getpiechart",response);
          return response;
        } catch (error) {
          console.log(error);
        }
 }
  /** 6.  DEFINE REPOSITORY FOR */
 async getCombineData({month}){
   try {
           
     // Call getStatistics,getBchartData,getPchartData to combine
     const [statistics, bchartData, pchartData]= await Promise.all([
            this.getStatistics({month}),
            this.getBchartData({month}),
            this.getPchartData({month})
     ]);

     return {
            statistics,bchartData,pchartData
     }
   } catch (error) {
    console.log(error);
   }
 }
 



}