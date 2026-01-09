import SkillUniverseExperience from "../components/SkillUniverse/Experience";
import Overlay from "../components/SkillUniverse/Overlay";

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-[#F5F5F0] text-black selection:bg-black selection:text-white">
      <Overlay />
      <SkillUniverseExperience />
    </main>
  );
}