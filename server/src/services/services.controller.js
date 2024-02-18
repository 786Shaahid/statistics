import { ApiResponse } from "../utility/apiResponse.utility.js";
import { ErrorHandle } from "../utility/errorResponse.utility.js";
import { ServiceRepository } from "./services.repository.js";

export class ServiceController {
  constructor() {
    this.serviceRepository = new ServiceRepository();
  }
  /** 1. DEFINE CONTROLLER FOR INITIALIZE THE DATABASE */
  async initDatabase(req, res) {
    try {
      const response = await this.serviceRepository.initializeDB();
      if (!response) {
        return res.status(400).json(new ErrorHandle(false, 'Not initialize database', {}))
      }
      return res.status(200).json(new ApiResponse(true, 'Database initialize successfully', response))

    } catch (error) {
      console.log(`Error while initialize the db : ${error}`);
      return res.status(500).json(new ErrorHandle(false, 'Internal Server Error', error.message))
    }
  }
  /** 2. DEFINE CONTROLLER FOR LIST FOR ALL TRANSACTIONS WITH SEARCH AND PAGINATION */
  async transactionsList(req, res) {
    try {
      // console.log(req.query);
      const response = await this.serviceRepository.getTransactions(req.query);
      if (response.length == 0) {
        return res.status(400).json(new ErrorHandle(false, '', "Transactions Not Found !"));
      }
      return res.status(200).json(new ApiResponse(true, 'Get the all transaction list', response))
    } catch (error) {
      console.log(error);
      return res.status(error?.status || 500).json(
        new ErrorHandle(false, "Internal Server Error", error.err ?? error.message ?? "Something Went Wrong")
      )
    }



  }
  /** 3. DEFINE CONTROLLER FOR */
  async statisticsForMonth(req, res) {
    try {
      const result = await this.serviceRepository.getStatistics(req.query);
      if (result.length == 0) {
        return res.status(400).json(new ErrorHandle(false, '', "Transactions Not Found !"));
      }
      return res.status(200).json(new ApiResponse(true, 'Get Statistics', result))

    } catch (error) {
      console.log(error);
      return res.status(error?.status || 500).json(
        new ErrorHandle(false, "Internal Server Error", error.err ?? error.message ?? "Something Went Wrong")
      )
    }
  }
  /** 4. DEFINE CONTROLLER FOR  */
  async barChart(req, res) {
    try {
      const result = await this.serviceRepository.getBchartData(req.query);
      if (result.length == 0) {
        return res.status(400).json(new ErrorHandle(false, '', "No Record !"));
      }
      return res.status(200).json(new ApiResponse(true, 'Get BarChart Data', result))

    } catch (error) {
      console.log(error);
      return res.status(error?.status || 500).json(
        new ErrorHandle(false, "Internal Server Error", error.err ?? error.message ?? "Something Went Wrong")
      )
    }
  }
  /** 5. DEFINE CONTROLLER FOR  */
  async pieChart(req, res) {
    try {
      const result= await this.serviceRepository.getPchartData(req.query);
      if (result.length == 0) {
        return res.status(400).json(new ErrorHandle(false, '', "No Record !"));
      }
      return res.status(200).json(new ApiResponse(true, 'Get PieChart Data', result))



    } catch (error) {
      console.log(error);
      return res.status(error?.status || 500).json(
        new ErrorHandle(false, "Internal Server Error", error.err ?? error.message ?? "Something Went Wrong")
      )
    }
  }
  /** 6. DEFINE CONTROLLER FOR INITIALIZE THE DATABASE */
  async combineData(req, res) {
    try {
      const result= await this.serviceRepository.getCombineData(req.query);
      console.log(result);
      if (Object.keys(result)==0) {
        return res.status(400).json(new ErrorHandle(false, '', "No Record !"));
      }
      return res.status(200).json(new ApiResponse(true, 'Get Combined Data', result))


    } catch (error) {
      console.log(error);
      return res.status(error?.status || 500).json(
        new ErrorHandle(false, "Internal Server Error", error.err ?? error.message ?? "Something Went Wrong")
      )
    }
  }




}
