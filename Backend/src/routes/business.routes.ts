import express from "express";
import businessController from "../controllers/busines.controller";

const BusinesRoutes = express.Router();

BusinesRoutes.put("/UpdateBusiness/:id", businessController.updateBusiness);
BusinesRoutes.post("/AddBusiness", businessController.addBusiness);
BusinesRoutes.get("/GetAllBusiness", businessController.getAllBusiness);
BusinesRoutes.get("/GetBusiness", businessController.getBusinessController);

export default BusinesRoutes;
