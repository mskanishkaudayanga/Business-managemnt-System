import { PrismaClient, ServiceAndProduct } from "@prisma/client";

const prisma = new PrismaClient();
const addProduct = async (product: ServiceAndProduct, businessId: number) => {
  try {
    return await prisma.serviceAndProduct.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image ?? null,
        business: {
          connect: { id: businessId }, 
        },
      },
    });
  } catch (error) {
    throw error;
  }
};


const updateproduct = async (id: number, product: ServiceAndProduct) => {
  try {
    return await prisma.serviceAndProduct.update({
      where: {
        id: id,
      },
      data: product,
    });
  } catch (error) {
    throw error;
  }
}
const removeproduct = async (id: number) => { 
  try {
    return await prisma.serviceAndProduct.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    throw error;
  }
}
const getProductsByBusinessId = async (businessId: number) => {
  try {
    return await prisma.serviceAndProduct.findMany({
      where: {
        businessId: businessId,
      },
    });
  } catch (error) {
    throw error;
  }
}
const productsAndServices = {
  addProduct,
  updateproduct,
  removeproduct,
  getProductsByBusinessId,
}
export default productsAndServices;