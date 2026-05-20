import { currentSite } from "@/config/site";

export default function TermsAndConditionsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
      <div className="prose prose-sm sm:prose-base dark:prose-invert">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <p>
          Welcome to {currentSite.name}. These terms and conditions outline the rules and regulations for the use of our website and services.
        </p>
        <h2>1. Terms</h2>
        <p>
          By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
        </p>
        <h2>2. Use License</h2>
        <p>
          Permission is granted to temporarily download one copy of the materials (information or software) on {currentSite.name}&apos;s website for personal, non-commercial transitory viewing only.
        </p>
        <h2>3. Disclaimer</h2>
        <p>
          The materials on {currentSite.name}&apos;s website are provided &quot;as is&quot;. {currentSite.name} makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
        </p>
      </div>
    </div>
  );
}
