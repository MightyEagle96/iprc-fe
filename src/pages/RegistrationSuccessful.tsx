import { Link } from "react-router-dom";

function RegistrationSuccessful() {
  return (
    <section
      id="registration-form"
      className="min-h-screen bg-white px-6 py-16 flex items-center justify-center"
    >
      <div className="mx-auto max-w-4xl w-full">
        <div
          className="bg-teal-100 border-t-4 border-teal-500 rounded-lg text-teal-900 px-6 py-5 shadow-lg"
          role="alert"
        >
          <div className="flex">
            <div className="py-1">
              <svg
                className="fill-current h-6 w-6 text-teal-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>

            <div className="flex-1">
              <p className="font-bold text-lg">Registration Received</p>

              <p className="text-sm mt-2">
                Your registration has been received. Finance and Accounts will
                verify your payment and you will be notified once the process is
                completed.
              </p>

              <p className="text-sm mt-4">Thank you.</p>

              <div className="mt-8">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-6 py-3 font-medium text-white shadow-md transition-all duration-200 hover:bg-teal-700 hover:shadow-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 12l9-9m0 0l9 9m-9-9v18"
                    />
                  </svg>
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegistrationSuccessful;
