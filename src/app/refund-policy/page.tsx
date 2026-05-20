import { currentSite } from "@/config/site";

export default function RefundPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">Refund Policy</h1>
      <div className="prose prose-sm sm:prose-base dark:prose-invert">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <p>
          Thank you for purchasing our courses at {currentSite.name}.
        </p>
        <h2>Refund Eligibility</h2>
        <p>
          We offer a full money-back guarantee for all purchases made on our website. If you are not satisfied with the product that you have purchased from us, you can get your money back no questions asked.
        </p>
        <p>
          You are eligible for a full reimbursement within 7 calendar days of your purchase. After the 7-day period you will no longer be eligible and won&apos;t be able to receive a refund. We encourage our customers to try the product (or service) in the first two weeks after their purchase to ensure it fits your needs.
        </p>
        <h2>How to Request a Refund</h2>
        <p>
          To request a refund, please contact us at {currentSite.contact.email} with your order number and the email address used for the purchase.
        </p>
      </div>
    </div>
  );
}
