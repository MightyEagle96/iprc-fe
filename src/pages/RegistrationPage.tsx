import logo from "../assets/logo.png";
import AcademicRegistration from "./AcademicRegistration";

function RegistrationPage() {
  const scrollToForm = () => {
    document
      .getElementById("registration-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative min-h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/20733081/pexels-photo-20733081.jpeg')",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/75" />

        {/* Content */}
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
          {/* Logo */}
          <img
            src={logo}
            alt="IPRCOC Logo"
            className="mb-8 w-28 md:w-36 lg:w-48"
          />

          {/* Title */}
          <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl">
            IPRCOC 2026
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-4xl text-base text-gray-200 sm:text-lg md:text-xl lg:text-2xl">
            INSTITUTIONAL PROFESSIONAL REGISTRATION CENTRE OFFICERS CONFERENCE
          </p>

          {/* Button (moved closer) */}
          <button
            onClick={scrollToForm}
            className="mt-8 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-black transition duration-300 hover:scale-105 hover:shadow-xl"
          >
            Register Now
          </button>
        </div>
      </section>

      {/* Registration Form Section */}
      <section
        id="registration-form"
        className="min-h-screen bg-white px-6 py-16"
      >
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl font-bold">
            Registration Form
          </h2>

          {/* Form goes here */}
          <AcademicRegistration />
        </div>
      </section>
    </>
  );
}

export default RegistrationPage;
