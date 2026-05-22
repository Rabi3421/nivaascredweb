import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";

interface Review {
  id: string;
  reviewer: string;
  reviewerImage: string;
  reviewerImageAlt: string;
  reviewerType: "Landlord" | "Tenant";
  rating: number;
  date: string;
  property: string;
  text: string;
  paymentHistory?: string;
}

interface ReviewTimelineProps {
  reviews: Review[];
}

export default function ReviewTimeline({ reviews }: ReviewTimelineProps) {
  return (
    <div className="glass rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center space-x-2">
        <Icon name="ClockIcon" size={24} className="text-primary" />
        <span>Rental History & Reviews</span>
      </h2>

      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div
            key={review.id}
            className="relative pl-8 pb-6 border-l-2 border-border last:border-l-0 last:pb-0"
          >
            {/* Timeline Dot */}
            <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-primary ring-4 ring-background" />

            {/* Review Card */}
            <div className="glass rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              {/* Review Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <AppImage
                    src={review.reviewerImage}
                    alt={review.reviewerImageAlt}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-foreground">{review.reviewer}</h4>
                    <p className="text-xs text-muted-foreground">{review.reviewerType}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{review.date}</span>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Icon
                    key={i}
                    name="StarIcon"
                    variant={i < review.rating ? "solid" : "outline"}
                    size={16}
                    className={i < review.rating ? "text-warning" : "text-muted"}
                  />
                ))}
                <span className="ml-2 text-sm font-semibold text-foreground">{review.rating}.0</span>
              </div>

              {/* Property */}
              <div className="flex items-center space-x-2 mb-3 text-sm text-muted-foreground">
                <Icon name="HomeIcon" size={16} />
                <span>{review.property}</span>
              </div>

              {/* Review Text */}
              <p className="text-foreground leading-relaxed mb-4">{review.text}</p>

              {/* Payment History (if available) */}
              {review.paymentHistory && (
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center space-x-2">
                    <Icon name="CreditCardIcon" size={16} className="text-success" />
                    <span className="text-sm font-semibold text-foreground">Payment Record</span>
                  </div>
                  <span className="text-sm font-bold text-success">{review.paymentHistory}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}