import RegisterForm from "../components/RegisterForm";

const Register = () => {
  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('https://example.com/background-image.jpg')",
      }}
    >
      {/* Left side: Sign Up Form */}
      <div className="lg:w-1/2 flex items-center justify-center bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
        <RegisterForm />
      </div>

      {/* Right side: Image */}
      <div className="lg:w-1/2 hidden lg:block">
        <img
          src="/OIP (1).jpeg"
          alt="Restaurant"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default Register;
