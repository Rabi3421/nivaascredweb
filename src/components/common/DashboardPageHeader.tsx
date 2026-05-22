import Link from "next/link";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";
import type { DashboardAction } from "@/types/user";

interface DashboardPageHeaderProps {
  name: string;
  subtitle: string;
  avatar: string;
  actions: DashboardAction[];
}

export default function DashboardPageHeader({
  name,
  subtitle,
  avatar,
  actions,
}: DashboardPageHeaderProps) {
  return (
    <section className="py-8 px-4 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* User Info */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-shrink-0">
              <AppImage
                src={avatar}
                alt={`${name} profile photo`}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success border-2 border-white rounded-full flex items-center justify-center">
                <Icon name="CheckIcon" size={12} className="text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Welcome back, {name}!
              </h1>
              <p className="text-muted-foreground">{subtitle}</p>
            </div>
          </div>

          {/* CTA Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            {actions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                  action.variant === "outline"
                    ? "border-2 border-primary text-primary hover:bg-primary hover:text-white"
                    : "bg-primary text-white hover:bg-secondary"
                }`}
              >
                <Icon name={action.icon} size={20} />
                <span>{action.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
