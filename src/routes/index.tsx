import { createFileRoute } from "@tanstack/react-router";
import TalentApp from "@/talent/App";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return <TalentApp />;
}
