import Link from "next/link";
import Icon from "@/components/ui/AppIcon";
import type { VerificationStatus } from "@/types/user";

interface VerificationStatusWidgetProps {
  verificationStatus: VerificationStatus;
  actionHref: string;
  actionLabel: string;
}

export default function VerificationStatusWidget({
  verificationStatus,
  actionHref,
  actionLabel,
}: VerificationStatusWidgetProps) {
  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="text-lg font-bold text-foreground mb-4">Profile Verification</h3>
      <div className="space-y-3">
        {Object.entries(verificationStatus).map(([key, verified]) => (
          <div key={key} className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground capitalize">
              {key.replace(/([A-Z])/g, " $1").trim()}
            </span>
            <div className="flex items-center space-x-2">
              <Icon
                name={verified ? "CheckCircleIcon" : "XCircleIcon"}
                size={16}
                className={verified ? "text-success" : "text-destructive"}
              />
              <span
                className={`text-xs font-medium ${verified ? "text-success" : "text-destructive"}`}
              >
                {verified ? "Verified" : "Pending"}
              </span>
            </div>
          </div>
        ))}
      </div>
      <Link
        href={actionHref}
        className="w-full px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-secondary transition-colors block text-center mt-4"
      >
        {actionLabel}
      </Link>
    </div>
  );
}
