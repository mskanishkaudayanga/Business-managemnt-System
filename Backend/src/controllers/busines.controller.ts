import { Category, TimesEnum } from "@prisma/client";
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
    console.log(req.params.id);
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

const getBusinessController = async (req: Request, res: Response) => {
  const location: string | undefined = req.query.location as string;
    const category: Category | undefined = req.query.category as Category;
    const timeZone: TimesEnum | undefined = req.query.timeZone as TimesEnum;

  try {
    const businesses = await businessServices.getFilteredBusiness(location, category, timeZone);

    res.status(200).json(businesses);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching businesses' });
  }
};

const businessController = {
  addBusiness,
  updateBusiness,
  getAllBusiness,
  getBusinessController
  
}
export default businessController