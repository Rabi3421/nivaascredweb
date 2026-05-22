interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "w-4 h-4 border-2",
  md: "w-8 h-8 border-2",
  lg: "w-12 h-12 border-4",
};

export default function LoadingSpinner({ size = "md", className = "" }: LoadingSpinnerProps) {
  return (
    <div
      className={`${sizeMap[size]} rounded-full border-primary/20 border-t-primary animate-spin ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}

export function PageLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-background animate-pulse">
      <div className="h-20 bg-muted" />
      <div className="container mx-auto max-w-7xl px-4 py-8 space-y-6">
        <div className="h-8 bg-muted rounded-xl w-1/3" />
        <div className="grid md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 bg-muted rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="glass rounded-2xl overflow-hidden animate-pulse">
      <div className="h-56 bg-muted" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-muted rounded w-3/4" />
        <div className="h-4 bg-muted rounded w-1/2" />
        <div className="h-6 bg-muted rounded w-1/3" />
      </div>
    </div>
  );
}
