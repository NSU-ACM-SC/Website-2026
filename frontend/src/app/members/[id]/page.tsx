
import {
  FacebookIcon,
  GithubIcon,
  LinkedinIcon,
} from "@/components/ui/SocialIcons";
import { collections, membersData } from "@/data/siteContent";
import {
  fetchChapterMemberByNsuId,
  fetchChapterMembers,
} from "@/lib/supabaseMembers";
import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    const { members } = await fetchChapterMembers();
    if (members && members.length > 0) {
      return members
        .filter((member) => Boolean(member.nsuId && member.nsuId !== "N/A"))
        .map((member) => ({
          id: String(member.nsuId),
        }));
    }
  } catch (error) {
    console.error("Error generating static params from Supabase:", error);
  }

  // Fallback to static mock members if Supabase is unreachable
  return membersData.map((member) => ({
    id: String(member.nsuId || member.id),
  }));
}

async function getMember(id: string) {
  // 1. Try Supabase first using NSU ID
  const supaMember = await fetchChapterMemberByNsuId(id);
  if (supaMember) {
    const isExecutive = Boolean(supaMember.executivePosition);
    const position = isExecutive
      ? supaMember.executivePosition!
      : supaMember.teamPosition || "General Member";

    const sigs =
      supaMember.sig && supaMember.sig !== "—" && supaMember.sig !== "None"
        ? [{ name: supaMember.sig, role: supaMember.sigPosition || "Member" }]
        : [];

    return {
      id: supaMember.nsuId,
      nsuId: supaMember.nsuId,
      name: supaMember.name,
      team: supaMember.team,
      teamRole: supaMember.teamPosition,
      chapterRole: supaMember.executivePosition || undefined,
      position,
      sigs,
      joinYear: supaMember.semesterJoined || "Member",
      status: isExecutive ? "Executive" : supaMember.status || "Active",
      email: supaMember.email,
      facebook: supaMember.facebook,
      linkedin: supaMember.linkedin,
      github: supaMember.github,
      photoUrl: supaMember.photoUrl,
    };
  }

  // 2. Fallback to local membersData by nsuId or id
  const fallback = membersData.find(
    (member) => member.nsuId === id || member.id === id,
  );
  if (fallback) {
    return {
      id: fallback.nsuId || fallback.id,
      nsuId: fallback.nsuId,
      name: fallback.name,
      team: fallback.team,
      teamRole: fallback.teamRole,
      chapterRole: fallback.chapterRole,
      position: fallback.position,
      sigs: fallback.sigs.map((sig) => ({ name: sig.name, role: sig.role })),
      joinYear: String(fallback.joinYear),
      status: fallback.status,
      email: fallback.nsuEmail || fallback.personalEmail,
      facebook: undefined,
      linkedin: fallback.linkedin,
      github: fallback.github,
      photoUrl: fallback.avatar,
    };
  }

  return null;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const member = await getMember(id);
  return {
    title: (member?.name || "Member") + " | NSU ACM SC",
    description: member
      ? `${member.name} (${member.position}) - Member Profile, NSU ACM Student Chapter.`
      : "Member Profile | NSU ACM Student Chapter",
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const member = await getMember(id);
  if (!member) notFound();

  const contributions = Object.values(collections)
    .flatMap((c) => c.items)
    .filter((i) => i.authors?.includes(member.name));

  const researchItems = collections["publications/researchs"]?.items.filter((i) => i.authors?.includes(member.name)) || [];
  const blogItems = collections["publications/blogs"]?.items.filter((i) => i.authors?.includes(member.name)) || [];
  const projectItems = collections["publications/projects"]?.items.filter((i) => i.authors?.includes(member.name)) || [];

  const hasSocials = Boolean(
    member.email || member.facebook || member.linkedin || member.github,
  );

  return (
    <div className="w-full bg-[#f1eee7] text-black min-h-screen py-8 px-4 font-sans">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">

        {/* FULL PAGE VIEW */}
        <div className="grid grid-cols-1 gap-6">
          {/* Top Profile Info */}
          <div className="flex flex-col md:flex-row gap-8 p-6 md:p-8 bg-[#f1eee7] border-[3px] border-black shadow-[6px_6px_0px_#000] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all duration-200">
            <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 border-[3px] border-black overflow-hidden bg-gray-300 relative">
              {member.photoUrl ? (
                <Image
                  src={member.photoUrl}
                  alt={member.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl font-black bg-gray-200">
                  {member.name
                    .split(" ")
                    .slice(0, 2)
                    .map((s) => s[0])
                    .join("")}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-3 flex-1 justify-center">
              <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
                {member.name}
              </h2>
              <div className="flex flex-wrap gap-2 mt-1">
                {member.position && (
                  <span className="bg-black text-[#f1eee7] px-3 py-1 text-[11px] font-bold uppercase tracking-wide">
                    {member.position}
                  </span>
                )}
                {member.team && (
                  <span className="bg-black text-[#f1eee7] px-3 py-1 text-[11px] font-bold uppercase tracking-wide">
                    {member.team}
                  </span>
                )}
                {member.chapterRole && (
                  <span className="bg-transparent text-black border-2 border-black px-3 py-1 text-[11px] font-bold uppercase tracking-wide">
                    {member.chapterRole}
                  </span>
                )}
              </div>
              <p className="text-sm md:text-[15px] text-gray-800 leading-relaxed mt-2 max-w-3xl font-medium">
                {member.status} member of NSU ACM SC. 
                {member.sigs.length > 0 &&
                  ` Active in ${member.sigs.map((s) => s.name).join(", ")}.`}
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-black text-black font-bold text-xs shadow-[2px_2px_0px_#000] hover:bg-[#f47b2b] hover:text-white transition-colors uppercase"
                  >
                    <GithubIcon size={14} /> GitHub
                  </a>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-black text-black font-bold text-xs shadow-[2px_2px_0px_#000] hover:bg-[#f47b2b] hover:text-white transition-colors uppercase"
                  >
                    <LinkedinIcon size={14} /> LinkedIn
                  </a>
                )}
                <a
                  href="#"
                  className="group inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-black text-black font-bold text-xs shadow-[2px_2px_0px_#000] hover:bg-[#f47b2b] hover:text-white transition-colors uppercase"
                >
                  <span className="text-[#3392cc] font-black text-sm group-hover:text-white">@</span> Portfolio
                </a>
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-black text-black font-bold text-xs shadow-[2px_2px_0px_#000] hover:bg-[#f47b2b] hover:text-white transition-colors uppercase"
                  >
                    <Mail size={14} /> Email
                  </a>
                )}
                <button
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-black text-black font-bold text-xs shadow-[2px_2px_0px_#000] hover:bg-[#f47b2b] hover:text-white transition-colors uppercase"
                >
                  Share Profile
                </button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 flex flex-col justify-center bg-[#f1eee7] border-[3px] border-black shadow-[4px_4px_0px_#000] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all duration-200">
              <span className="text-4xl font-extrabold text-[#3392cc] mb-1">
                {contributions.length || 0}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wide text-gray-700">
                Contributions
              </span>
            </div>
            <div className="p-5 flex flex-col justify-center bg-[#f1eee7] border-[3px] border-black shadow-[4px_4px_0px_#000] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all duration-200">
              <span className="text-4xl font-extrabold text-[#3392cc] mb-1">
                {member.joinYear.replace(/[^0-9]/g, "").substring(0, 4) || "—"}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wide text-gray-700">
                Joined
              </span>
            </div>
            <div className="p-5 flex flex-col justify-center bg-[#f1eee7] border-[3px] border-black shadow-[4px_4px_0px_#000] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all duration-200">
              <span className="text-4xl font-extrabold text-[#3392cc] mb-1 truncate" title={member.team}>
                {member.team || "None"}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wide text-gray-700">
                Team
              </span>
            </div>
            <div className="p-5 flex flex-col justify-center bg-[#f1eee7] border-[3px] border-black shadow-[4px_4px_0px_#000] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all duration-200">
              <span className="text-4xl font-extrabold text-[#3392cc] mb-1 truncate">
                {member.status === "Executive"
                  ? "Exec"
                  : member.status === "Alumni"
                    ? "Alum"
                    : "Active"}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wide text-gray-700">
                Status
              </span>
            </div>
          </div>

          {/* Bottom Split Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Activity Log */}
            <div className="md:col-span-2 p-6 md:p-8 bg-[#f1eee7] border-[3px] border-black shadow-[6px_6px_0px_#000] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all duration-200 flex flex-col gap-4">
              <h3 className="text-[15px] font-extrabold uppercase border-b-[3px] border-black pb-3 tracking-wide">
                Activity Log
              </h3>
              {contributions.length > 0 ? (
                <div className="flex flex-col gap-5 mt-2">
                  {contributions.map((contribution, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row gap-2 sm:gap-6 pb-5 border-b-2 border-dashed border-gray-300 last:border-0 last:pb-0"
                    >
                      <div className="font-extrabold text-xs text-[#3392cc] min-w-[70px] pt-1 uppercase">
                        {(contribution as any).date
                          ? new Date((contribution as any).date).toLocaleString('default', { month: 'short', year: 'numeric' })
                          : "—"}
                      </div>
                      <div className="flex-1">
                        <Link href={contribution.href} className="hover:underline">
                          <h4 className="font-extrabold text-[15px] mb-1 text-black">
                            {contribution.title}
                          </h4>
                        </Link>
                        <p className="text-[13px] text-gray-600 leading-relaxed font-medium">
                          {(contribution as any).description || "Contributed to this project/event."}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-5 mt-2">
                  <p className="text-[13px] text-gray-600 leading-relaxed font-medium">
                    No public contributions have been linked to this profile yet.
                  </p>
                </div>
              )}
            </div>

            {/* Contact & Badges */}
            <div className="flex flex-col gap-6">
              <div className="p-6 md:p-8 bg-[#f1eee7] border-[3px] border-black shadow-[6px_6px_0px_#000] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all duration-200 flex flex-col gap-4">
                <h3 className="text-[15px] font-extrabold uppercase border-b-[3px] border-black pb-3 tracking-wide">
                  Contact & Personal Details
                </h3>
                <div className="flex flex-col gap-3.5 text-[13px] font-bold text-gray-800 mt-2">
                  {member.email && (
                    <div className="flex items-center gap-3">
                      <span className="text-base grayscale opacity-70 w-5 text-center">✉️</span> 
                      <span className="break-all">{member.email}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <span className="text-base grayscale opacity-70 w-5 text-center">🎓</span> 
                    <span>NSU ID: {member.nsuId || "Confidential"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-base grayscale opacity-70 w-5 text-center">📅</span> 
                    <span>Member since {member.joinYear}</span>
                  </div>
                  {member.sigs.map((sig, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-base grayscale opacity-70 w-5 text-center">⚡</span> 
                      <span>
                        {sig.name} ({sig.role})
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 md:p-8 bg-[#f1eee7] border-[3px] border-black shadow-[6px_6px_0px_#000] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all duration-200 flex flex-col gap-4">
                <h3 className="text-[15px] font-extrabold uppercase border-b-[3px] border-black pb-3 tracking-wide">
                  Badges
                </h3>
                <div className="flex flex-col gap-2.5 mt-2">
                  <div className="bg-black text-[#f1eee7] px-4 py-2 text-[11px] font-bold uppercase flex items-center gap-2">
                    ⭐ {member.status}
                  </div>
                  {member.team && (
                    <div className="bg-black text-[#f1eee7] px-4 py-2 text-[11px] font-bold uppercase flex items-center gap-2">
                      🛠️ {member.team}
                    </div>
                  )}
                  {member.chapterRole && (
                    <div className="bg-black text-[#f1eee7] px-4 py-2 text-[11px] font-bold uppercase flex items-center gap-2">
                      🏆 Core Member
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Extra Sections (Research, Blogs, Projects) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 md:p-8 bg-[#f1eee7] border-[3px] border-black shadow-[6px_6px_0px_#000] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all duration-200 flex flex-col gap-4">
              <h3 className="text-[15px] font-extrabold uppercase border-b-[3px] border-black pb-3 tracking-wide">Research</h3>
              {researchItems.length > 0 ? (
                <ul className="flex flex-col gap-4 text-[13px] text-gray-700 font-medium mt-2 leading-relaxed">
                  {researchItems.map((item, idx) => (
                    <li key={idx} className="relative pl-4 before:content-['▸'] before:absolute before:left-0 before:text-[#3392cc] before:font-bold">
                      <Link href={item.href} className="hover:underline text-black font-bold">
                        {item.title}
                      </Link>
                      {item.date && ` (${new Date(item.date).getFullYear()})`}
                      {item.description && <span className="block mt-1 font-normal text-gray-600">{item.description}</span>}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[13px] text-gray-600 font-medium mt-2">No research papers published yet.</p>
              )}
            </div>
            
            <div className="p-6 md:p-8 bg-[#f1eee7] border-[3px] border-black shadow-[6px_6px_0px_#000] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all duration-200 flex flex-col gap-4">
              <h3 className="text-[15px] font-extrabold uppercase border-b-[3px] border-black pb-3 tracking-wide">Blogs</h3>
              {blogItems.length > 0 ? (
                <ul className="flex flex-col gap-4 text-[13px] text-gray-700 font-medium mt-2 leading-relaxed">
                  {blogItems.map((item, idx) => (
                    <li key={idx} className="relative pl-4 before:content-['▸'] before:absolute before:left-0 before:text-[#3392cc] before:font-bold">
                      <Link href={item.href} className="hover:underline text-black font-bold">
                        {item.title}
                      </Link>
                      {item.description && <span className="block mt-1 font-normal text-gray-600">{item.description}</span>}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[13px] text-gray-600 font-medium mt-2">No blog posts published yet.</p>
              )}
            </div>
            
            <div className="p-6 md:p-8 bg-[#f1eee7] border-[3px] border-black shadow-[6px_6px_0px_#000] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all duration-200 flex flex-col gap-4">
              <h3 className="text-[15px] font-extrabold uppercase border-b-[3px] border-black pb-3 tracking-wide">Projects</h3>
              {projectItems.length > 0 ? (
                <ul className="flex flex-col gap-4 text-[13px] text-gray-700 font-medium mt-2 leading-relaxed">
                  {projectItems.map((item, idx) => (
                    <li key={idx} className="relative pl-4 before:content-['▸'] before:absolute before:left-0 before:text-[#3392cc] before:font-bold">
                      <strong className="text-black">
                        <Link href={item.href} className="hover:underline">{item.title}</Link>:
                      </strong>{" "}
                      {item.description}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[13px] text-gray-600 font-medium mt-2">No projects showcased yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
