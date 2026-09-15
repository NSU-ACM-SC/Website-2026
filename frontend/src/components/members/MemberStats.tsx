import type { Member } from "@/types";

export function MemberStats({ members }: { members: Member[] }) {
  const teams = [...new Set(members.map((member) => member.team))];

  return (
    <div
      className="stats-chart"
      role="img"
      aria-label="Preview member counts by team"
    >
      {teams.map((team) => {
        const count = members.filter((member) => member.team === team).length;
        return (
          <div className="chart-row" key={team}>
            <span>{team}</span>
            <div
              className="chart-bar"
              style={{ width: `${(count / members.length) * 100}%` }}
            />
            <strong>{count}</strong>
          </div>
        );
      })}
    </div>
  );
}
