import React, { useState } from "react";

type EventDay = "friday" | "saturday" | "sunday";

const eventDays = [
  {
    id: "friday" as EventDay,
    day: "FRIDAY",
    date: "18TH SEPTEMBER",
    title: "Praise Jam 5.0",
    time: "5:30 PM – 7:30 PM",
    description:
      "An atmosphere of praise, worship and celebration as we kick off IMPACT 2026.",
  },
  {
    id: "saturday" as EventDay,
    day: "SATURDAY",
    date: "19TH SEPTEMBER",
    title: "The Main Convention Experience",
    time: "10:00 AM – 3:20 PM",
    description:
      "The heart of the convention — keynote sessions, worship, panel discussions, live Q&A and breakout sessions.",
  },
  {
    id: "sunday" as EventDay,
    day: "SUNDAY",
    date: "20TH SEPTEMBER",
    title: "Thanksgiving Service",
    time: "8:00 AM",
    description: "A thanksgiving gathering to celebrate all that God has done.",
  },
];

function ImpactEvents() {
  const [activeDay, setActiveDay] = useState<EventDay>("saturday");

  return (
    <section id="events" className="bg-slate-950 px-5 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-400">
            IMPACT 2026
          </p>

          <h2 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Three days.
            <br />
            One unforgettable experience.
          </h2>

          <p className="mt-5 text-base leading-7 text-white/60 sm:text-lg">
            From an explosive praise experience to meaningful conversations,
            practical sessions and thanksgiving, IMPACT 2026 is designed to
            inspire you to live a life of kingdom influence.
          </p>
        </div>

        {/* Day Selector */}
        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {eventDays.map((event) => {
            const active = activeDay === event.id;

            return (
              <button
                key={event.id}
                onClick={() => setActiveDay(event.id)}
                className={`rounded-2xl border p-5 text-left transition ${
                  active
                    ? "border-emerald-400 bg-emerald-500 text-white shadow-xl shadow-emerald-500/10"
                    : "border-white/10 bg-white/[0.04] text-white hover:border-white/20 hover:bg-white/[0.07]"
                }`}
              >
                <p
                  className={`text-xs font-bold tracking-[0.2em] ${
                    active ? "text-emerald-100" : "text-emerald-400"
                  }`}
                >
                  {event.day}
                </p>

                <h3 className="mt-2 text-xl font-black">{event.title}</h3>

                <p
                  className={`mt-2 text-sm ${
                    active ? "text-white/80" : "text-white/50"
                  }`}
                >
                  {event.date} · {event.time}
                </p>
              </button>
            );
          })}
        </div>

        {/* Event Content */}
        <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]">
          {activeDay === "friday" && <FridayProgramme />}

          {activeDay === "saturday" && <SaturdayProgramme />}

          {activeDay === "sunday" && <SundayProgramme />}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FRIDAY
============================================================ */

function FridayProgramme() {
  const events = [
    {
      time: "5:30 PM",
      title: "Opening Prayer",
      person: "Sis. Esther Ugowe",
      duration: "5 mins",
    },
    {
      time: "5:35 PM",
      title: "Opening Charge / Remarks",
      person: "AP. Joshua Agbo-iyi",
      duration: "5 mins",
    },
    {
      time: "5:40 PM",
      title: "Youth Choir Praise Session",
      duration: "20 mins",
    },
    {
      time: "6:00 PM",
      title: "Musicians Praise Session",
      duration: "10 mins",
    },
    {
      time: "6:10 PM",
      title: "Praise Session",
      person: "Minister Ayokunnuni Agbaje",
      duration: "20 mins",
    },
    {
      time: "6:30 PM",
      title: "Praise Session",
      person: "Minister Opeyemi Reuben",
      duration: "25 mins",
    },
    {
      time: "6:55 PM",
      title: "Father's Blessings",
      person: "MICs",
      duration: "5 mins",
    },
    {
      time: "7:00 PM",
      title: "Praise Session",
      person: "Minister Ify",
      duration: "25 mins",
    },
    {
      time: "7:25 PM",
      title: "Benediction & Youth Anthem",
      person: "Bro. Joshua",
      duration: "5 mins",
    },
  ];

  return (
    <ProgrammeLayout
      eyebrow="DAY 1 · FRIDAY"
      title="Praise Jam 5.0"
      time="5:30 PM – 7:30 PM"
      subtitle="Anchors: Bro. Israel & Sis. Phil"
      events={events}
    />
  );
}

/* ============================================================
   SATURDAY
============================================================ */

function SaturdayProgramme() {
  return (
    <div>
      {/* Saturday Header */}
      <div className="border-b border-white/10 bg-emerald-950/40 p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">
          DAY 2 · SATURDAY
        </p>

        <h3 className="mt-2 text-2xl font-black text-white sm:text-3xl">
          The Main Convention Experience
        </h3>

        <p className="mt-2 text-sm text-white/50">
          10:00 AM – 3:20 PM · Anchors: Dcn. Dubem & Sis. Bimbo
        </p>
      </div>

      <div className="divide-y divide-white/10">
        {/* Part 1 */}
        <ProgrammePart
          number="01"
          title="The Ignition"
          time="10:00 AM – 11:50 AM"
        >
          <ProgrammeItem
            time="10:00 AM"
            title="Opening Prayer"
            person="Sis. Tessy"
            duration="10 mins"
          />

          <ProgrammeItem
            time="10:10 AM"
            title="Welcome Address"
            person="Dcn. George"
            duration="5 mins"
          />

          <ProgrammeItem
            time="10:15 AM"
            title="Opening Praise Session"
            person="Minister Kunle Falokun — KPraise"
            duration="20 mins"
          />

          <ProgrammeItem
            time="10:35 AM"
            title="Salt & Light Dynamics"
            subtitle="Reclaiming the Spiritual Mandate of Influence"
            person="Pst. Kolawole Armstrong"
            duration="45 mins"
            featured
          />

          <ProgrammeItem
            time="11:20 AM"
            title="1st Worship Moment"
            person="Olufemi Segun"
            duration="10 mins"
          />

          <ProgrammeItem
            time="11:30 AM"
            title="Worship & Prophetic Prayer"
            person="Youth Choir / Bro. Mayowa"
            duration="20 mins"
          />
        </ProgrammePart>

        {/* Part 2 */}
        <ProgrammePart
          number="02"
          title="Interaction & Engagement"
          time="11:50 AM – 2:15 PM"
        >
          <ProgrammeItem
            time="11:50 AM"
            title="The Metrics of Impact"
            subtitle="Measuring God's Investment in Our Lives"
            person="Moderator: Dcn. Dubem"
            duration="60 mins"
            featured
          />

          <div className="ml-20 mt-[-8px] mb-5 rounded-xl bg-white/[0.04] px-4 py-3 text-sm text-white/50">
            Panelists: Dr. Mrs. Elizabeth Adedire · Dr. Odeyemi · Pst. Bayode
            <br />
            <span className="text-emerald-400">
              Includes 20 mins live Q&A with the audience
            </span>
          </div>

          <ProgrammeItem
            time="12:50 PM"
            title="Network Break / Stretch"
            duration="10 mins"
          />

          <ProgrammeItem time="1:00 PM" title="Drama" duration="10 mins" />

          <ProgrammeItem
            time="1:10 PM"
            title="Breakout Sessions"
            subtitle="6 Cohorts Across 3 Topics"
            duration="30 mins"
            featured
          />

          <div className="ml-20 mb-5 grid gap-3 sm:grid-cols-3">
            <Track
              track="Track A"
              title="Identity"
              people="Bro. Tseyi & Sis. Tosin"
            />

            <Track
              track="Track B"
              title="Influence"
              people="Sis. Arigba & Bro. John"
            />

            <Track
              track="Track C"
              title="Substance vs. Hype"
              people="Bro. Israel & Sis. Lola"
            />
          </div>

          <ProgrammeItem
            time="1:40 PM"
            title="Breakout Cohorts Executive Summary"
            person="Rapporteur: Sis. Bimbo"
            duration="20 mins"
          />

          <ProgrammeItem
            time="2:00 PM"
            title="Offering / Praise Session"
            person="Pst. Damilare Akun / Bro. John (Jay Gospel)"
            duration="10 mins"
          />

          <ProgrammeItem
            time="2:10 PM"
            title="Worship Session"
            person="Dcn. Dubem"
            duration="5 mins"
          />
        </ProgrammePart>

        {/* Part 3 */}
        <ProgrammePart number="03" title="The Climax" time="2:15 PM – 3:20 PM">
          <ProgrammeItem
            time="2:15 PM"
            title="Kingdom Impact in the Workplace"
            subtitle="Career, Business, Professionalism & Value Creation"
            person="Pst. (Mrs.) Marianne Ugo"
            duration="45 mins"
            featured
          />

          <ProgrammeItem
            time="3:00 PM"
            title="Announcements"
            person="Dcn. Fred Udoh"
            duration="5 mins"
          />

          <ProgrammeItem
            time="3:05 PM"
            title="Cutting of Convention Cake"
            duration="5 mins"
          />

          <ProgrammeItem
            time="3:10 PM"
            title="Closing Remarks / Prayers"
            person="Dr. Chris Ofikwu"
            duration="10 mins"
          />
        </ProgrammePart>
      </div>
    </div>
  );
}

/* ============================================================
   SUNDAY
============================================================ */

function SundayProgramme() {
  return (
    <div className="p-8 text-center sm:p-14">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">
        DAY 3 · SUNDAY
      </p>

      <h3 className="mt-3 text-3xl font-black text-white">
        Thanksgiving Service
      </h3>

      <p className="mx-auto mt-3 max-w-lg text-white/50">
        Join us as we close IMPACT 2026 with a celebration of thanksgiving.
      </p>

      <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-white/10 bg-white/[0.04] p-6">
        <p className="text-sm text-white/40">START TIME</p>

        <p className="mt-2 text-3xl font-black text-emerald-400">8:00 AM</p>
      </div>
    </div>
  );
}

/* ============================================================
   REUSABLE COMPONENTS
============================================================ */

function ProgrammeLayout({
  eyebrow,
  title,
  time,
  subtitle,
  events,
}: {
  eyebrow: string;
  title: string;
  time: string;
  subtitle: string;
  events: {
    time: string;
    title: string;
    person?: string;
    duration: string;
  }[];
}) {
  return (
    <div>
      <div className="border-b border-white/10 bg-emerald-950/40 p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">
          {eyebrow}
        </p>

        <h3 className="mt-2 text-2xl font-black text-white sm:text-3xl">
          {title}
        </h3>

        <p className="mt-2 text-sm text-white/50">
          {time} · {subtitle}
        </p>
      </div>

      <div className="divide-y divide-white/10">
        {events.map((event, index) => (
          <ProgrammeItem key={index} {...event} />
        ))}
      </div>
    </div>
  );
}

function ProgrammePart({
  number,
  title,
  time,
  children,
}: {
  number: string;
  title: string;
  time: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-6 sm:p-8">
      <div className="mb-7 flex items-end justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="text-sm font-black text-emerald-400">{number}</span>

          <h4 className="text-xl font-black text-white sm:text-2xl">{title}</h4>
        </div>

        <span className="hidden text-xs font-medium text-white/30 sm:block">
          {time}
        </span>
      </div>

      <div>{children}</div>
    </div>
  );
}

function ProgrammeItem({
  time,
  title,
  subtitle,
  person,
  duration,
  featured = false,
}: {
  time: string;
  title: string;
  subtitle?: string;
  person?: string;
  duration: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`flex gap-4 rounded-2xl p-4 sm:gap-6 ${
        featured ? "bg-emerald-500/[0.08]" : ""
      }`}
    >
      <div className="w-16 shrink-0 pt-1 sm:w-20">
        <p className="text-xs font-bold text-emerald-400">{time}</p>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-col justify-between gap-1 sm:flex-row">
          <div>
            <h5
              className={`font-bold ${
                featured ? "text-lg text-white" : "text-white/90"
              }`}
            >
              {title}
            </h5>

            {subtitle && (
              <p className="mt-1 text-sm text-white/40">{subtitle}</p>
            )}

            {person && <p className="mt-2 text-sm text-white/50">{person}</p>}
          </div>

          <span className="text-xs text-white/30">{duration}</span>
        </div>
      </div>
    </div>
  );
}

function Track({
  track,
  title,
  people,
}: {
  track: string;
  title: string;
  people: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
        {track}
      </p>

      <p className="mt-1 font-bold text-white">{title}</p>

      <p className="mt-2 text-xs leading-5 text-white/40">{people}</p>
    </div>
  );
}

export default ImpactEvents;
