import { Category, TimesEnum } from "@prisma/client";
import businessServices from "../services/business.service";
import { Request, Response } from "express";

const addBusiness = async (req: Request, res: Response) => {
  try {
    const business = req.body;
    if (!req.user || !req.user.id) {
      res.status(400).json({ message: "Invalid user ID" });
      return;
    }

    const existingBusinessId = await businessServices.IsbusinessExist(
      req.user.id
    );
    if (existingBusinessId) {
      const updatedBusiness = await businessServices.updateBusiness(
        existingBusinessId,
        business
      );
      res.status(200).json(updatedBusiness);
      return;
    } else {
      const newBusiness = await businessServices.Addbusiness(
        business,
        req.user.id
      );
      res.status(201).json(newBusiness);
      return;
    }
  } catch (error: any) {
    console.error("Error in addBusiness:", error);
    res.status(400).send(error.message);
    return;
  }
};

const getAllBusiness = async (req: Request, res: Response) => {
  try {
    const businesses = await businessServices.getAllBusiness();
    res.status(200).json(businesses);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};

const getBusinessController = async (req: Request, res: Response) => {
  const location: string | undefined = req.query.location as string;
  const category: Category | undefined = req.query.category as Category;
  const timeZone: TimesEnum | undefined = req.query.timeZone as TimesEnum;
console.log("location",location);
console.log("category",category);
console.log("timeZone",timeZone);
  try {
    const businesses = await businessServices.getFilteredBusiness(
      location,
      category,
      timeZone
    );

    res.status(200).json(businesses);
  } catch (error) {
    res.status(500).json({ error: "Error fetching businesses" });
  }
};
const getBusinesByBusinessId = async (req :Request, res :Response) => {
  try {   
    if (!req.params || !req.params.id) {
      res.status(400).json({ message: "Invalid business ID" });
      return;
    }
    const businesId =parseInt(req.params.id);

    const business = await businessServices.getBusinesByBusinessId(businesId);
    res.status(200).json(business);

  } catch (error) {
    res.status(500).json({ error: "Error fetching businesses" });
  }
  }

const businessController = {
  addBusiness,
  getAllBusiness,
  getBusinessController,
  getBusinesByBusinessId,
};
export default businessController;
