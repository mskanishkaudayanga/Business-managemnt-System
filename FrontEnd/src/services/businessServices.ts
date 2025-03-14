import axiosInstance from "./Auth";

const businesSevices ={
  getBusinessDetails: async (id: number) => {
    try {
      const response = await axiosInstance.get(`/GetBusinesIDByBusinessID/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching business details:", error);
      throw error;
    }
  },
  addBusiness: async (businessData: any) => {
    try{
      const response =await axiosInstance.post(`AddBusiness`,businessData);
      
      return response.data;
    }
    catch(error){
      throw error;
    }
  },
  countProfileVies : async (id:number)=>{
    try{
      console.log("id",id);
      const response = await axiosInstance.get(`businessProfile/${id}`,{
        withCredentials: true,
      });
      return response.data;
    }
    catch(error){
      throw error;
    }
  },
getBusinesIdAuthorized : async ()=>{
  try{
    const response = await axiosInstance.get(`GetBusinesIDByAuthorized`);
    return response.data;

  }
  catch(error){
    throw error;
  }
}

}
export default businesSevices;