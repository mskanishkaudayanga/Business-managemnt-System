import { Business, Category, PrismaClient, TimesEnum } from "@prisma/client";
const prisma = new PrismaClient();

const updateBusiness = async (id:number, business: Business): Promise<Business> => {
  try {
    return await prisma.business.update({
      where: {
        id: id,
      },
      data: business,
    });
  } catch (error) {
    throw error;
  }
}
const Addbusiness = async (business: Business): Promise<Business> => {
  try {
    return await prisma.business.create({
      data: business,
    });
  } catch (error) {
    throw error;
  }
}
const getbusinesByLocation = async (location: string): Promise<Business[]> => {
  try {
    return await prisma.business.findMany({
      where: {
        location: location,
      },
    });
  } catch (error) {
    throw error;
  }
}
const getbusinessByCategory = async (category: Category): Promise<Business[]> => {
  try {
    return await prisma.business.findMany({
      where: {
        category : category,
      },
    });
  } catch (error) {
    throw error;
  }
}
const getbusinessByTimeZone = async (timeZone: TimesEnum): Promise<Business[]> => {
  try {
    return await prisma.business.findMany({
      where: {
        timeZone: timeZone,
      },
    });
  } catch (error) {
    throw error;
  }
}
const getAllBusiness = async (): Promise<Business[]> => {
  try {
    return await prisma.business.findMany();
  }
  catch (error) {
    throw error;
  }
}
const getBusinesIDByUserId = async (userId: number): Promise<number> => {
  try {
    const business = await prisma.business.findFirst({
      where: {
        ownerId: userId,
      },
    });
    if (business) {
      return business.id;
    }
    return 0;
  } catch (error) {
    throw error;
  }
}

const businessServices = {
  updateBusiness,
  Addbusiness,
  getbusinesByLocation,
  getbusinessByCategory,
  getbusinessByTimeZone,
  getAllBusiness,
  getBusinesIDByUserId
}
export default businessServices;