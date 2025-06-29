import VisionSection from "@/components/VisionSection";
import ModelSection from "@/components/ModelSection";
import WorkflowSection from "@/components/WorkflowSection";
import CompetitiveSection from "@/components/CompetitiveSection";
import PrototypeSection from "@/components/PrototypeSection";
import InvestmentSection from "@/components/InvestmentSection";
import LLMModalProvider from "@/components/LLMModalProvider";
import MoveToTopButton from "@/components/MoveToTopButton";

export default function Home() {
  return (
    <LLMModalProvider>
      <VisionSection />
      <ModelSection />
      <WorkflowSection />
      <CompetitiveSection />
      <PrototypeSection />
      <InvestmentSection />
      <MoveToTopButton />
    </LLMModalProvider>
  );
}
