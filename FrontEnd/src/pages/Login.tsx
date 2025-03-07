import backgroundImage from "../../public/OIP (1).jpeg";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <>
      <div
        className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        {/* Left side: Login Form */}
        <div className="lg:w-1/2 flex items-center justify-center bg-white bg-opacity-80 p-8 rounded-lg">
          <div className="w-full max-w-md p-8">
            <LoginForm />
          </div>
        </div>

        {/* Right side: Image */}
        <div className="lg:w-1/2 hidden lg:block">
          <img
            src={backgroundImage} // Replace with your image URL
            alt="Restaurant"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </>
  );
};

export default Login;
