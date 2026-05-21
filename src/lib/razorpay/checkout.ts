import { captureEvent } from "@/lib/analytics/posthog";

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayErrorResponse {
  error: {
    code: string;
    description: string;
    source: string;
    step: string;
    reason: string;
    metadata: {
      order_id: string;
      payment_id: string;
    };
  };
}

interface RazorpayOptions {
  key?: string;
  amount: string;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => Promise<void>;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
  theme?: {
    color?: string;
  };
}

interface RazorpayInstance {
  on: (event: string, callback: (response: RazorpayErrorResponse) => void) => void;
  open: () => void;
}

interface CustomWindow extends Window {
  Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
}

interface CheckoutOptions {
  amount: number;
  courseId: string;
  courseName: string;
  programSlug: string;
}

export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const handleCheckout = async ({
  amount: price,
  courseId,
  courseName,
  programSlug,
}: CheckoutOptions): Promise<void> => {
  let hasRecordedPaymentTerminalState = false;

  const recordPaymentFailure = (status: "cancelled" | "failed") => {
    if (hasRecordedPaymentTerminalState && status === "cancelled") {
      return;
    }

    hasRecordedPaymentTerminalState = true;
    captureEvent("payment_failed", {
      program_slug: programSlug,
      status,
    });
  };

  try {
    const res = await loadRazorpayScript();

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const orderRes = await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId }),
    });

    if (!orderRes.ok) {
      throw new Error("Failed to create order");
    }

    const { orderId, amount, currency } = await orderRes.json();

    const options: RazorpayOptions = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: amount.toString(),
      currency,
      name: courseName,
      description: `Enrollment for ${courseName} (\u20B9${price})`,
      order_id: orderId,
      handler: async (response: RazorpayResponse) => {
        try {
          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              courseId,
            }),
          });

          if (verifyRes.ok) {
            window.location.href = `/payment-success?course_id=${courseId}&status=success`;
            return;
          }

          recordPaymentFailure("failed");
          const errData = await verifyRes.json().catch(() => ({}));
          const errMsg = errData.error || "Payment verification failed";
          window.location.href = `/payment-success?course_id=${courseId}&status=error&error=${encodeURIComponent(errMsg)}`;
        } catch (err) {
          recordPaymentFailure("failed");
          console.error("Error verifying payment:", err);
          window.location.href = `/payment-success?course_id=${courseId}&status=error&error=${encodeURIComponent("Network or system error occurred during verification")}`;
        }
      },
      prefill: {
        name: "Student Name",
        email: "student@example.com",
        contact: "9999999999",
      },
      modal: {
        ondismiss: () => {
          recordPaymentFailure("cancelled");
        },
      },
      theme: {
        color: "#0f172a",
      },
    };

    const customWindow = window as unknown as CustomWindow;

    if (!customWindow.Razorpay) {
      throw new Error("Razorpay SDK is not loaded");
    }

    captureEvent("payment_started", {
      amount: price,
      program_slug: programSlug,
    });

    const rzp1 = new customWindow.Razorpay(options);
    rzp1.on("payment.failed", (response: RazorpayErrorResponse) => {
      recordPaymentFailure("failed");
      alert(`Payment Failed: ${response.error.description}`);
    });
    rzp1.open();
  } catch (error) {
    recordPaymentFailure("failed");
    console.error("Checkout error:", error);
    alert("Something went wrong during checkout.");
  }
};
