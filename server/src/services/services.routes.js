import express from 'express';
import { ServiceController } from './services.controller.js';

const routes=express.Router();
const serviceController= new ServiceController();

routes.get('/initdb',(req,res)=>{
    serviceController.initDatabase(req,res);
})
routes.get('/transactions',(req,res)=>{
    serviceController.transactionsList(req,res);
})
routes.get('/statistics',(req,res)=>{
    serviceController.statisticsForMonth(req,res);
})
routes.get('/barChart',(req,res)=>{
    serviceController.barChart(req,res);
})
routes.get('/pieChart',(req,res)=>{
    serviceController.pieChart(req,res);
})
routes.get('/combinedata',(req,res)=>{
    serviceController.combineData(req,res);
})

export default routes;
