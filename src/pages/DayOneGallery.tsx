import { Helmet } from "react-helmet-async";
const DRIVE_FOLDER =
  "https://drive.google.com/drive/folders/1qq10VDnYaSiYwy924J5OG3QvaKkYWl17";

const dayOnePhotos = [
  {
    src: "https://f005.backblazeb2.com/file/policymeeting/convention-images/DSC00042-34.jpg",
    title: "Day 1 — Praise Jam",
  },
  {
    src: "https://f005.backblazeb2.com/file/policymeeting/convention-images/DSC00072-45.jpg",
    title: "Day 1 — Praise Jam",
  },
  {
    src: "https://f005.backblazeb2.com/file/policymeeting/convention-images/DSC00106-62.jpg",
    title: "Day 1 — Praise Jam",
  },
  {
    src: "https://f005.backblazeb2.com/file/policymeeting/convention-images/DSC09901-2.jpg",
    title: "Day 1 — Praise Jam",
  },
];

function DayOneGallery() {
  return (
    <>
      <Helmet>
        <title>Day 1 Moments | IMPACT 2026</title>

        <meta
          name="description"
          content="Relive some of the moments from Day 1 of IMPACT 2026 — Praise Jam."
        />

        {/* Open Graph */}
        <meta property="og:title" content="Day 1 Moments | IMPACT 2026" />

        <meta
          property="og:description"
          content="Relive some of the moments from Day 1 of IMPACT 2026 — Praise Jam."
        />

        <meta
          property="og:image"
          content="https://f005.backblazeb2.com/file/policymeeting/convention-images/DSC00042-34.jpg"
        />

        <meta
          property="og:url"
          content="https://impact2026.onrender.com/gallery"
        />

        <meta property="og:type" content="website" />

        {/* Twitter / X */}
        <meta name="twitter:card" content="summary_large_image" />

        <meta name="twitter:title" content="Day 1 Moments | IMPACT 2026" />

        <meta
          name="twitter:description"
          content="Relive some of the moments from Day 1 of IMPACT 2026 — Praise Jam."
        />

        <meta
          name="twitter:image"
          content="https://f005.backblazeb2.com/file/policymeeting/convention-images/DSC00042-34.jpg"
        />
      </Helmet>
      <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-12 text-white">
        {/* Background glow */}
        <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              IMPACT 2026
            </div>

            <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
              Day 1 <span className="text-emerald-400">Moments.</span>
            </h1>

            <p className="mt-4 text-sm leading-7 text-white/50 sm:text-base">
              Relive some of the moments from Day 1 of IMPACT 2026.
            </p>

            {/* Google Drive */}
            <a
              href={DRIVE_FOLDER}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-3 rounded-2xl bg-emerald-500 px-6 py-4 font-bold text-white shadow-lg shadow-emerald-500/10 transition hover:bg-emerald-400"
            >
              View All Day 1 Photos
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 17L17 7M7 7h10v10"
                />
              </svg>
            </a>
          </div>

          {/* Gallery */}
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {dayOnePhotos.map((photo, index) => (
              <a
                key={photo.src}
                href={photo.src}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.04] ${
                  index === 0 ? "col-span-2 row-span-2" : ""
                }`}
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  loading="lazy"
                  className="h-full min-h-[180px] w-full object-cover transition duration-700 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-xs font-semibold text-white/80">
                    {photo.title}
                  </p>
                </div>

                {/* View icon */}
                <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/30 opacity-0 backdrop-blur-md transition group-hover:opacity-100">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 3h6v6M10 14L21 3M21 14v6a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1h6"
                    />
                  </svg>
                </div>
              </a>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur-xl sm:p-8">
            <p className="text-sm text-white/40">
              These are just a few moments from Day 1.
            </p>

            <a
              href={DRIVE_FOLDER}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-bold text-emerald-400 transition hover:text-emerald-300"
            >
              Explore the full Day 1 gallery →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default DayOneGallery;
