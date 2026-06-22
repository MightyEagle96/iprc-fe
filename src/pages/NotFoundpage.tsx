import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 px-6">
      <div className="max-w-2xl text-center">
        {/* Error Code */}
        <h1 className="text-8xl md:text-9xl font-extrabold text-blue-600 tracking-tight">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-800">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-4 text-slate-600 text-lg leading-relaxed">
          Sorry, the page you are looking for does not exist, may have been
          moved, or the link you followed is incorrect.
        </p>

        {/* Illustration */}
        <div className="my-10 flex justify-center">
          <div className="relative">
            <div className="w-48 h-48 rounded-full bg-blue-100 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-24 h-24 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.172 9.172a4 4 0 015.656 5.656M15 15l6 6M11 17a6 6 0 100-12 6 6 0 000 12z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium shadow-lg hover:bg-blue-700 transition-all duration-200"
          >
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-100 transition-all duration-200"
          >
            Go Back
          </button>
        </div>

        {/* Footer Text */}
        <p className="mt-10 text-sm text-slate-500">
          If you believe this is an error, please contact the system
          administrator.
        </p>
      </div>
    </div>
  );
}

export default NotFoundPage;
