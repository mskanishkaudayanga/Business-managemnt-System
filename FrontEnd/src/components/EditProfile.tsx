import { useState } from "react";
import InputField from "./InputFeild";
import SelectField from "./SelectFeild";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import businesSevices from "../services/businessServices";

const EditProfile = () => {
  const navigate = useNavigate();
  const locations = [
    "Colombo",
    "Gampaha",
    "Kandy",
    "Galle",
    "Matara",
    "Jaffna",
    "Anuradhapura",
    "Badulla",
    "Batticaloa",
    "Hambantota",
    "Kurunegala",
    "Mannar",
    "Monaragala",
    "Nuwara Eliya",
    "Polonnaruwa",
    "Puttalam",
    "Ratnapura",
    "Trincomalee",
    "Vavuniya",
  ];
  const categories = [
    "IT",
    "Health",
    "Food",
    "Education",
    "Entertainment",
    "Other",
  ];
  const timeZones = ["FullTime", "PartTime", "TwentyFourHours"];
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    location: "",
    website: "",
    category: "",
    description: "",
    timeZone: "",
    profileImage: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const validateField = (name: string, value: string) => {
    let errorMessage = "";

    switch (name) {
      case "name":
        errorMessage =
          value.length >= 3 ? "" : "Name must be at least 3 characters";
        break;
      case "phone":
        errorMessage = /^\d{10}$/.test(value)
          ? ""
          : "Phone number must be 10 digits";
        break;
      case "address":
        errorMessage = value ? "" : "Address is required";
        break;
      case "location":
        errorMessage = value ? "" : "Location is required";
        break;
      case "website":
        errorMessage = /^(https?:\/\/)?([\w\d-]+\.)+[\w-]{2,4}\/?$/.test(value)
          ? ""
          : "Invalid website URL";
        break;
      case "category":
        errorMessage = value ? "" : "Category is required";
        break;
      case "description":
        errorMessage = value ? "" : "Description is required";
        break;
      default:
        break;
    }

    return errorMessage;
  };
  const CLOUDINARY_URL =
    "https://api.cloudinary.com/v1_1/defl3vguu/image/upload";
  const UPLOAD_PRESET = "kanishka"; // Your Cloudinary preset name

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET); // Required by Cloudinary

    try {
      const response = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });
      console.log("Response: ", response);
      const data = await response.json();
      console.log("Data: ", data.secure_url);
      if (data.secure_url) {
        setFormData((prevData) => ({
          ...prevData,
          profileImage: data.secure_url, // Store image URL
        }));
      } else {
        console.error("Image upload failed", data);
        toast.error("Image upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Something went wrong with the image upload");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: validateField("name", formData.name),
      phone: validateField("phone", formData.phone),
      address: validateField("address", formData.address),
      location: validateField("location", formData.location),
      website: validateField("website", formData.website),
      category: validateField("category", formData.category),
      description: validateField("description", formData.description),
    };

    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }


    try {
      console.log("Form Data: ", formData);
      const register = await businesSevices.addBusiness(formData);
      console.log("Register Response: ", register);

      if (register.error) {
        toast.error(register.error);
        return;
      }

      toast.success("Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const removeImage = () => {
    setFormData((prevData) => ({
      ...prevData,
      profileImage: null,
    }));

    const fileInput = document.querySelector<HTMLInputElement>(
      "input[name='profileImage']"
    );
    if (fileInput) fileInput.value = "";
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex w-full">
      <div className=" w-ful justify-center items-center grid md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <InputField
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            placeholder="Enter your name"
            onChange={handleChange}
            validate={validateField}
          />
          <InputField
            label="Phone"
            type="text"
            name="phone"
            value={formData.phone}
            placeholder="Enter your phone number"
            onChange={handleChange}
            validate={validateField}
          />
          <InputField
            label="Address"
            type="text"
            name="address"
            value={formData.address}
            placeholder="Enter your address"
            onChange={handleChange}
            validate={validateField}
          />
          <InputField
            label="Website"
            type="text"
            name="website"
            value={formData.website}
            placeholder="Enter your website URL"
            onChange={handleChange}
            validate={validateField}
          />
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="profileImage">
              Upload Profile Picture
            </label>
            <input
              type="file"
              name="profileImage"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer bg-white"
            />
            {formData.profileImage && (
              <div className="mt-2">
                <p className="text-sm text-green-500">
                  Selected file: {formData.profileImage.name}
                </p>
                <button
                  onClick={removeImage}
                  className="mt-2 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove Image
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <InputField
            label="description"
            type=" description"
            name="description"
            value={formData.description}
            placeholder="Enter your Discription"
            onChange={handleChange}
            validate={validateField}
          />
          <SelectField
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            options={categories.map((category) => ({
              value: category,
              label: category,
            }))}
          />
          <SelectField
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            options={locations.map((locations) => ({
              value: locations,
              label: locations,
            }))}
          />
          <SelectField
            label="Time Zone"
            name="timeZone"
            value={formData.timeZone}
            onChange={handleChange}
            options={timeZones.map((timeZone) => ({
              value: timeZone,
              label: timeZone,
            }))}
          />
          <button
            type="submit"
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg"
          >
            Update
          </button>
        </div>
      </div>
    </form>
  );
};
export default EditProfile;
