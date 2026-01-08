import SkillUniverseExperience from "../components/SkillUniverse/Experience";
import Overlay from "../components/SkillUniverse/Overlay";

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-black text-white selection:bg-white selection:text-black">
      <Overlay />
      <SkillUniverseExperience />
    </main>
  );
}