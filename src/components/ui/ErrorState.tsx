import Icon from "@/components/ui/AppIcon";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export default function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this content. Please try again.",
  onRetry,
  className = "",
}: ErrorStateProps) {
  return (
    <div className={`glass rounded-2xl p-12 text-center ${className}`}>
      <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon name="ExclamationTriangleIcon" size={32} className="text-destructive" />
      </div>
      <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-sm mx-auto">{description}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-all flex items-center space-x-2 mx-auto"
        >
          <Icon name="ArrowPathIcon" size={18} />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
}
