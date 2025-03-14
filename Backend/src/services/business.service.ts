import { Business, Category, Prisma, PrismaClient, TimesEnum } from "@prisma/client";
const prisma = new PrismaClient();


const updateBusiness = async (id: number, business: Partial<Business>): Promise<Business> => {
  try {
    return await prisma.business.update({
      where: { id },
      data: {
        description: business.description,
        name: business.name,
        phone: business.phone,
        address: business.address,
        location: business.location,
        timeZone: business.timeZone as TimesEnum | undefined,
        category: business.category as Category | undefined,
        website: business.website,
        profileImage: business.profileImage,
      },
    });
  } catch (error) {
    throw error;
  }
};

const Addbusiness = async (business: Business,userId: number) => {
  try {
    const userExists = await prisma.user.findUnique({ where: { id: userId } });
    if (!userExists) {
      console.log(`User with ID ${userId} not found.`);
      throw new Error(`User with ID ${userId} does not exist.`);
    }
    return await prisma.business.create({
      data: {
        description: business.description,
        name: business.name,
        phone: business.phone,
        address: business.address,
        location: business.location,
        timeZone: business.timeZone as TimesEnum,
        category: business.category as Category, 
        website: business.website,
        ownerId: userId, 
        profileImage: business.profileImage,
      },
    });
  } catch (error) {
    throw error;
  }
}
const IsbusinessExist = async (userId:number)=> {
  try {
    const existingBusiness = await prisma.business.findFirst({
      where: { ownerId: userId },
    });

    console.log("existingBusiness exit", existingBusiness);
    return existingBusiness?.id;
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
const getBusinesByBusinessId = async (businesId: number): Promise<Business | null> => {
  try {
    const business = await prisma.business.findFirst({
      where: {
        id: businesId,
      },
    });
    return business;
  } catch (error) {
    throw error;
  }
}

const getFilteredBusiness = async (location?: string, category?: Category, timeZone?: TimesEnum): Promise<Business[]> => {
  try {
    // Build the filter object dynamically
    const where: Prisma.BusinessWhereInput = {};

    if (location) {
      where.location = location;
    }
    if (category) {
      where.category = category;
    }
    if (timeZone) {
      where.timeZone = timeZone;
    }

    // Fetch the businesses based on the dynamic filter
    return await prisma.business.findMany({
      where: where,
    });
  } catch (error) {
    throw error;
  }
};
const countProfileViews =async (businesId:number)=>{
  try{

    return await prisma.business.update(
      {
        where: {
          id:businesId
        },
        data: {
          profileViews: { increment: 1 },
        },
      }

    )
  }
  catch(error){
    throw error
  }
}

const getBusinessIdByUserId = async (userId: number) => {
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
  }
  catch (error) {
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
  getBusinesIDByUserId,
  getFilteredBusiness,
  IsbusinessExist,
  getBusinesByBusinessId,
  countProfileViews,
  getBusinessIdByUserId
}
export default businessServices;