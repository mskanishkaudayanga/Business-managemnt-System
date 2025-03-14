export interface LoginData{
  email:string;
  password:string;
}
export interface RegisterData{
  email: string;
  name: string;
  password: string;
  role: string;
}
export interface businessCardData{
  id:number;
  name:string;
  location:string;
  category:string;
  timeZone:string;
  profileImage:string; 

}
export interface ServiceCardProps {
  name: string;
  description: string;
  price: number;
  image: string; // URL or base64 string
}
export type BusinessData = {
  id: number;
  name: string;
  address: string;
  category: string;
  description: string;
  location: string;
  ownerId: number;
  phone: string;
  profileImage: string | null;
  profileViews: number;
  timeZone: string;
  website: string;
  profileImage:string
};
export interface Business {
  profileImage: string;
  id: number;
  name: string;
  location: string;
  category: string;
  timeZone: string;
  image: string;
}
export interface BusinessListProps {
  location: string | null;
  category: string | null;
  timeZone: string | null;
}