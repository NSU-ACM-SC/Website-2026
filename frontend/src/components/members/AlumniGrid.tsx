import type { Member } from "@/types";
import Link from "next/link";

export function AlumniGrid({ members }: { members: Member[] }) {
  const alumni = members.filter((member) => member.status === "Alumni");

  return (
    <div className="profile-grid">
      {alumni.map((member) => (
        <Link
          className="profile-card"
          href={`/members/${member.id}`}
          key={member.id}
        >
          <p className="eyebrow">Alumni / {member.joinYear}</p>
          <h3>{member.name}</h3>
          <p>
            {member.team} / {member.position}
          </p>
        </Link>
      ))}
    </div>
  );
}
