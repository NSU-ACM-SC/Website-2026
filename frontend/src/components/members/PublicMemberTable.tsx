import type { PublicMember } from "@/data/memberGroups";
import Link from "next/link";

export function PublicMemberTable({ members }: { members: PublicMember[] }) {
  return (
    <div
      className="member-table-wrap"
      tabIndex={0}
      role="region"
      aria-label="Scrollable member table"
    >
      <table className="member-table">
        <caption className="sr-only">
          Public chapter member directory preview
        </caption>
        <thead>
          <tr>
            {["Name", "Joined", "Team", "Role", "SIG", "Status"].map(
              (heading) => (
                <th scope="col" key={heading}>
                  {heading}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>
                <Link href={`/members/${member.id}`}>{member.name}</Link>
              </td>
              <td>{member.joinYear}</td>
              <td>{member.team}</td>
              <td>
                {member.chapterRole && <div>{member.chapterRole}</div>}
                <div>{member.teamRole} (Team)</div>
              </td>
              <td>
                {member.sigs
                  .map((sig) => `${sig.name}: ${sig.role}`)
                  .join(" / ") || "No SIG"}
              </td>
              <td>{member.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
