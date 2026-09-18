import { MemberDirectory } from "@/components/members/MemberDirectory";
import { panelMembers } from "@/data/memberGroups";

export function ExecutiveBoard() {
  return <MemberDirectory membersData={panelMembers} fetchCategory="panels-executive" />;
}
