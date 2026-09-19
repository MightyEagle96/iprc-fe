const Q_AND_A_LINK =
  "https://askqueue.com/poll/oyy_-jxv?admin=-nb3IRSitRw5Qm0dtWeu4m7D7iEN6zqH";

function PanelDiscussion() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 pb-10 pt-28 text-white sm:pb-16 sm:pt-36">
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute left-1/2 top-[-180px] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-emerald-400/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-40 top-1/3 h-[400px] w-[400px] rounded-full bg-emerald-500/10 blur-[100px]" />

      <div className="relative mx-auto flex min-h-[85vh] max-w-5xl items-center justify-center">
        <div className="w-full">
          {/* Event badge */}
          <div className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Live Panel Discussion
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/30">
              IMPACT 2026
            </p>

            <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              The Metrics of <span className="text-emerald-400">Impact.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg font-medium leading-8 text-white/60 sm:text-xl">
              Measuring God&apos;s Investment in Our Lives
            </p>
          </div>

          {/* Main interaction card */}
          <div className="mx-auto mt-12 max-w-3xl rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-xl sm:p-10">
            <div className="text-center">
              {/* Icon */}
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-emerald-400/20 bg-emerald-400/10">
                <svg
                  className="h-9 w-9 text-emerald-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 10h8M8 14h5"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 4H5a2 2 0 00-2 2v10a2 2 0 002 2h3l4 3 4-3h3a2 2 0 002-2V6a2 2 0 00-2-2z"
                  />
                </svg>
              </div>

              <h2 className="mt-7 text-2xl font-black sm:text-3xl">
                Your Voice Matters
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/50 sm:text-base">
                Join the conversation. Submit your questions, thoughts, and
                contributions in real time as our panel explores what it means
                to measure God&apos;s investment in our lives.
              </p>

              {/* CTA */}
              <a
                href={Q_AND_A_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-emerald-500 px-7 py-5 text-base font-black text-white shadow-xl shadow-emerald-500/10 transition hover:bg-emerald-400 sm:w-auto sm:min-w-[280px]"
              >
                Join Live Q&A
                <svg
                  className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>

              <p className="mt-4 text-xs text-white/25">
                Questions can be submitted anonymously.
              </p>
            </div>

            {/* How it works */}
            <div className="mt-10 grid gap-3 border-t border-white/10 pt-8 sm:grid-cols-3">
              <Step number="01" title="Join" text="Open the live Q&A." />

              <Step number="02" title="Ask" text="Submit your question." />

              <Step number="03" title="Engage" text="Follow the discussion." />
            </div>
          </div>

          {/* Scripture / theme */}
          <div className="mx-auto mt-8 max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400/60">
              IMPACT 2026
            </p>

            <p className="mt-3 text-sm italic leading-7 text-white/30">
              &ldquo;You are the salt of the earth... You are the light of the
              world.&rdquo;
            </p>

            <p className="mt-2 text-xs font-bold text-white/20">
              Matthew 5:13–16
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4">
      <p className="text-[10px] font-black tracking-[0.2em] text-emerald-400">
        {number}
      </p>

      <p className="mt-2 text-sm font-bold text-white/80">{title}</p>

      <p className="mt-1 text-xs text-white/30">{text}</p>
    </div>
  );
}

export default PanelDiscussion;
