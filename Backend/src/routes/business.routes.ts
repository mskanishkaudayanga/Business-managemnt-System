import express from "express";
import businessController from "../controllers/busines.controller";
import authMiddleware from "../middleware/AuthorizationUser";

const BusinesRoutes = express.Router();
BusinesRoutes.post("/AddBusiness", authMiddleware, businessController.addBusiness);
BusinesRoutes.get("/GetAllBusiness", businessController.getBusinessController);
BusinesRoutes.get("/GetBusiness", businessController.getBusinessController);
BusinesRoutes.get("/GetBusinesIDByBusinessID/:id",businessController.getBusinesByBusinessId);
BusinesRoutes.get("/businessProfile/:businessId", businessController.viewBusinessProfile);

export default BusinesRoutes;
