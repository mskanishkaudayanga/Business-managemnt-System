import businessServices from "../services/business.service";
import { Request, Response } from "express";

const addBusiness = async (req: Request, res: Response) => {
  try {
    const business = req.body;
    const newBusiness = await businessServices.Addbusiness(business);
    res.status(201).json(newBusiness);
  } catch (error:any) {
    res.status(400).send(error.message);
  }
}
const updateBusiness = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const business = req.body;
    const updatedBusiness = await businessServices.updateBusiness(id, business);
    res.status(200).json(updatedBusiness);
  } catch (error:any) {
    res.status(400).send(error.message);
  }
}
const getAllBusiness = async (req: Request, res: Response) => {
  try {
    const businesses = await businessServices.getAllBusiness();
    res.status(200).json(businesses);
  } catch (error:any) {
    res.status(400).send(error.message);
  }
}

const businessController = {
  addBusiness,
  updateBusiness,
  getAllBusiness,
}
export default businessController