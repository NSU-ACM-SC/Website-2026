import React from "react";
import { Metadata } from "next";
import { MemberDirectory } from "@/components/members/MemberDirectory";

export const metadata: Metadata = {
  title: "Member Directory & Public Roster | NSU ACM Student Chapter",
  description: "Search and filter through the verified member roster by position, team wing, SIG, and blood group.",
};

export default function MembersPage() {
  return (
    <div className="flex flex-col">
      <MemberDirectory />
    </div>
  );
}
