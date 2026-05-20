import RegistrationGate from "./RegistrationGate";
import { getClerkConfigIssue } from "@/lib/auth/clerk";

export default function RegistrationPage() {
  return <RegistrationGate configIssue={getClerkConfigIssue()} />;
}
