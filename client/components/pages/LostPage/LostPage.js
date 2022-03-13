import React from "react";
import LostSection from "_templates/LostSection";

export default function LostPage() {
  LostPage.treeImg = true;

  return (
    <div className="lost-page page">
      <LostSection />
    </div>
  );
}
