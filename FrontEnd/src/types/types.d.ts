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
  name:string;
  location:string;
  category:string;
  openTime:string;
  closeTime:string;
  image:string; 

}
export interface ServiceCardProps {
  name: string;
  description: string;
  price: number;
  image: string; // URL or base64 string
}