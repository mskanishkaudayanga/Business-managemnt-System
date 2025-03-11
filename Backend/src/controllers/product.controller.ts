
import businessServices from "../services/business.service";
import productsAndServices from "../services/Products.service";
import { Request, Response } from "express";

const productAdd = async (req: Request, res: Response) => {
  try {
    if(!req.user || !req.user.id) {
      res.status(400).json({ message: "Invalid user ID" });
      return;
    }
    console.log(req.user.id);
    const businesID = await businessServices.getBusinesIDByUserId(req.user.id);
    const product = req.body;
    const newProduct = await productsAndServices.addProduct(product ,businesID);
    res.status(201).json(newProduct);
  } catch (error:any) {
    res.status(400).send(error.message);
  }
}
const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const product = req.body;
    const updatedProduct = await productsAndServices.updateproduct(id, product);
    res.status(200).json(updatedProduct);
  } catch (error:any) {
    res.status(400).send(error.message);
  }
}
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await productsAndServices.removeproduct(id);
    res.status(204).end();
  } catch (error:any) {
    res.status(400).send(error.message);
  }
}
const getProductsByuserId = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.id) {
      res.status(400).json({ message: "Invalid user ID" });
      return;
    }

    const userId = req.user.id;
    const businessId = await businessServices.getBusinesIDByUserId(userId);

    if (!businessId) {
      res.status(404).json({ message: "No business found for this user." });
      return;
    }

    const products = await productsAndServices.getProductsByBusinessId(businessId);
    res.status(200).json(products);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const productController = {
  productAdd,
  updateProduct,
  deleteProduct,
  getProductsByuserId,
}
export default productController