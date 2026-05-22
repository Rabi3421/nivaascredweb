import Icon from "@/components/ui/AppIcon";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export default function EmptyState({
  icon = "MagnifyingGlassIcon",
  title,
  description,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`glass rounded-2xl p-12 text-center ${className}`}>
      <Icon name={icon} size={48} className="text-muted-foreground mx-auto mb-4" />
      <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
      {description && (
        <p className="text-muted-foreground mb-6 max-w-sm mx-auto">{description}</p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-all"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
