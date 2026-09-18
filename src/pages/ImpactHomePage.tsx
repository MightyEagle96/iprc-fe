import { useNavigate } from "react-router-dom";
import background from "./logo.jpeg";

function Home() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-black text-white">
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Poster Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url("${background}")`,
          }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90" />

        {/* Content */}
        <div className="relative z-10 flex min-h-screen flex-col">
          {/* Navbar */}
          <header className="px-5 py-5 sm:px-8 lg:px-12">
            <div className="mx-auto flex max-w-7xl items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
                  RCCG New Life Assembly
                </p>

                <p className="mt-1 text-sm font-bold text-white">
                  Youth & Young Adults
                </p>
              </div>

              <button
                onClick={() => navigate("/register")}
                className="rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-bold backdrop-blur-md transition hover:bg-white hover:text-black"
              >
                Register
              </button>
            </div>
          </header>

          {/* Hero Content */}
          <div className="flex flex-1 items-end px-5 pb-12 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
            <div className="mx-auto w-full max-w-7xl">
              <div className="max-w-xl">
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-emerald-300">
                  New Life Youth & Young Adults Convention
                </p>

                <h1 className="text-6xl font-black tracking-tight sm:text-7xl lg:text-8xl">
                  IMPACT
                </h1>

                <p className="mt-2 text-xl font-medium text-white/80 sm:text-2xl">
                  Matthew 5:13–16
                </p>

                <p className="mt-5 max-w-lg text-base leading-7 text-white/75 sm:text-lg">
                  A gathering of young people coming together to encounter God,
                  grow in purpose, and make lasting impact.
                </p>

                {/* CTA */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() => navigate("/register")}
                    className="rounded-2xl bg-emerald-500 px-8 py-4 text-base font-black text-white shadow-2xl shadow-emerald-500/30 transition hover:bg-emerald-400 hover:scale-[1.02]"
                  >
                    Register Now
                  </button>

                  <a
                    href="/events"
                    className="rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-center text-base font-bold backdrop-blur-md transition hover:bg-white/20"
                  >
                    Event Details
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          EVENT DETAILS
      ====================================================== */}
      <section
        id="details"
        className="bg-slate-950 px-5 py-16 sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-400">
              IMPACT 2026
            </p>

            <h2 className="mt-2 text-3xl font-black sm:text-4xl">
              Be part of the experience.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {/* Friday */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-sm font-bold text-emerald-400">FRIDAY</p>

              <p className="mt-2 text-2xl font-black">18th</p>

              <p className="mt-2 text-white/60">5:30 PM</p>
            </div>

            {/* Saturday */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-sm font-bold text-emerald-400">SATURDAY</p>

              <p className="mt-2 text-2xl font-black">19th</p>

              <p className="mt-2 text-white/60">10:00 AM</p>
            </div>

            {/* Sunday */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-sm font-bold text-emerald-400">SUNDAY</p>

              <p className="mt-2 text-2xl font-black">20th</p>

              <p className="mt-2 text-white/60">8:00 AM</p>
            </div>
          </div>

          {/* Venue */}
          <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <p className="text-sm font-bold uppercase tracking-wider text-white/40">
              Venue
            </p>

            <h3 className="mt-2 text-xl font-bold">RCCG New Life Assembly</h3>

            <p className="mt-2 text-white/60">
              Region 45 HQ, Phase 3 Junction, Kubwa, Abuja
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          REGISTRATION CTA
      ====================================================== */}
      <section className="bg-emerald-700 px-5 py-20 text-center sm:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-200">
            IMPACT 2026
          </p>

          <h2 className="mt-3 text-4xl font-black sm:text-5xl">
            Ready to make an impact?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-emerald-50/80">
            Register now and secure your place at the RCCG New Life Youth &
            Young Adults Convention.
          </p>

          <button
            onClick={() => navigate("/register")}
            className="mt-8 rounded-2xl bg-white px-10 py-4 font-black text-emerald-700 shadow-xl transition hover:scale-[1.02]"
          >
            Register for IMPACT 2026
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black px-5 py-8 text-center">
        <p className="text-sm text-white/40">
          RCCG New Life Assembly • Region 45
        </p>

        <p className="mt-1 text-xs text-white/25">
          New Life Youth & Young Adults
        </p>
      </footer>
    </main>
  );
}

export default Home;
