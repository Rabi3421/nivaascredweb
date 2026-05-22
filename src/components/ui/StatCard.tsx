import Icon from "@/components/ui/AppIcon";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  color: string;
  bgColor: string;
}

export default function StatCard({ label, value, icon, color, bgColor }: StatCardProps) {
  return (
    <div className="glass rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300">
      <div
        className={`w-16 h-16 ${bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}
      >
        <Icon name={icon} size={28} className={color} />
      </div>
      <p className="text-2xl font-bold text-foreground mb-1">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
