import {
  achievementItems,
  eventItems,
  membersData,
  teamItems,
} from "@/data/siteContent";

export function QuickStats() {
  return (
    <div className="number-strip">
      {[
        [membersData.length, "Directory preview"],
        [eventItems.length, "Activities in archive"],
        [teamItems.length, "Teams, groups & SIGs"],
        [achievementItems.length, "Chapter milestones"],
      ].map(([n, label]) => (
        <div key={label}>
          <strong>{String(n).padStart(2, "0")}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
