import type { ReactNode } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";

type Tone = "default" | "error";

interface AuthStatusCardProps {
  actions?: ReactNode;
  description: string;
  title: string;
  tone?: Tone;
}

export function AuthStatusCard({
  actions,
  description,
  title,
  tone = "default",
}: AuthStatusCardProps) {
  const isError = tone === "error";

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
      <Card className="w-full max-w-xl border-[var(--border)]/70 shadow-lg">
        <CardContent className="p-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <div
              className={
                isError
                  ? "flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600"
                  : "flex h-14 w-14 items-center justify-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)]"
              }
            >
              {isError ? (
                <AlertCircle className="h-7 w-7" />
              ) : (
                <Loader2 className="h-7 w-7 animate-spin" />
              )}
            </div>
            <div className="space-y-2">
              <h1 className="font-serif text-2xl font-extrabold text-[var(--foreground)]">
                {title}
              </h1>
              <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
                {description}
              </p>
            </div>
            {actions ? <div className="flex flex-wrap justify-center gap-3">{actions}</div> : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
