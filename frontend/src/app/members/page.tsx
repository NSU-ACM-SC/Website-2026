import React from "react";

export const metadata = { title: "Members | NSU ACM SC" };

export default function MembersPage() {
  const responsibilities = [
    { id: "01", title: "Faculty Advisor (FA)" },
    {
      id: "02",
      title:
        "Executive Body (EB): Chair, Vice Chair, Secretary, Treasurer, Membership Chair, Webmaster",
    },
    { id: "03", title: "Sub Executive — Team" },
    { id: "04", title: "Coordinator — SIG" },
    { id: "05", title: "InCharge — Team" },
    { id: "06", title: "Moderator — SIG" },
    { id: "07", title: "Senior Member — Team / SIG" },
    { id: "08", title: "General Member — Team / SIG" },
    { id: "09", title: "Probationary Member — Team / SIG" },
  ];

  return (
    <div className="py-24 md:py-32 space-y-32">
      {/* Section 1: About Members */}
      <section className="space-y-12 px-6 md:px-12">
        <div className="text-center space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-acmorange">
            Our People
          </h2>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight">
            Who we are.
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Executive Body */}
          <div className="bg-white border-[3px] border-black neo-shadow p-8 space-y-4 neo-interactive flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-acmorange uppercase tracking-tight">
                Executive Body
              </h3>
              <p className="text-lg font-medium leading-relaxed">
                The Executive Body leads the chapter, oversees all operations, and
                defines our strategic vision. They are the driving force behind
                our initiatives.
              </p>
            </div>
          </div>

          {/* Cores */}
          <div className="bg-white border-[3px] border-black neo-shadow p-8 space-y-4 neo-interactive flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-acmblue uppercase tracking-tight">
                Cores
              </h3>
              <p className="text-lg font-medium leading-relaxed">
                Cores manage specific teams and Special Interest Groups (SIGs).
                They ensure smooth execution of projects and mentor the members.
              </p>
            </div>
          </div>

          {/* Members */}
          <div className="bg-white border-[3px] border-black neo-shadow p-8 space-y-4 neo-interactive flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-acmgreen uppercase tracking-tight">
                Members
              </h3>
              <p className="text-lg font-medium leading-relaxed">
                The heart of our chapter. Members actively participate in teams
                and SIGs, bringing ideas to life through dedication and teamwork.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Responsibilities (From Image) */}
      <section className="space-y-12 px-6 md:px-12">
        <div className="text-center space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-widest">
            HIERARCHY
          </h2>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight">
            How the chapter works.
          </h1>
        </div>

        <div className="max-w-5xl mx-auto border border-black bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.1)]">
          {responsibilities.map((role, idx) => (
            <div
              key={role.id}
              className={`flex items-center px-6 md:px-8 py-5 md:py-6 ${idx !== responsibilities.length - 1 ? "border-b border-black" : ""
                } hover:bg-white transition-colors duration-200 cursor-default`}
            >
              <span className="text-2xl font-black text-acmpurple mr-6 md:mr-8 w-12 shrink-0">
                {role.id}
              </span>
              <span className="text-lg font-medium">{role.title}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
