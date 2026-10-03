import { createRoot } from "react-dom/client";
import "../styles.css";
import TalentApp from "../talent/App";

const root = document.getElementById("root");
if (root) createRoot(root).render(<TalentApp />);
