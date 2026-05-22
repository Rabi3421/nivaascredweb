import Icon from "@/components/ui/AppIcon";

interface CreditScoreDashboardProps {
  creditScore: number;
  scoreBreakdown: {
    onTimePayments: number;
    verifications: number;
    positiveReviews: number;
    rentalHistory: number;
  };
}

export default function CreditScoreDashboard({ creditScore, scoreBreakdown }: CreditScoreDashboardProps) {
  const maxScore = 1000;
  const percentage = (creditScore / maxScore) * 100;

  const factors = [
    {
      icon: "CheckCircleIcon",
      label: "On-Time Payments",
      points: scoreBreakdown.onTimePayments,
      maxPoints: 400,
      color: "success",
      description: "Consistent rent payments",
    },
    {
      icon: "ShieldCheckIcon",
      label: "Verifications",
      points: scoreBreakdown.verifications,
      maxPoints: 200,
      color: "primary",
      description: "ID, phone, email verified",
    },
    {
      icon: "StarIcon",
      label: "Positive Reviews",
      points: scoreBreakdown.positiveReviews,
      maxPoints: 250,
      color: "warning",
      description: "5-star ratings received",
    },
    {
      icon: "HomeIcon",
      label: "Rental History",
      points: scoreBreakdown.rentalHistory,
      maxPoints: 150,
      color: "accent",
      description: "Years of verified rentals",
    },
  ];

  return (
    <div className="glass rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center space-x-2">
        <Icon name="ChartBarIcon" size={24} className="text-primary" />
        <span>Credit Score Breakdown</span>
      </h2>

      {/* Visual Score Meter */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-muted-foreground">Current Score</span>
          <span className="text-sm font-semibold text-primary">{creditScore} / {maxScore}</span>
        </div>
        <div className="h-4 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Contributing Factors */}
      <div className="space-y-6">
        {factors.map((factor, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name={factor.icon as any} size={20} className={`text-${factor.color}`} />
                <div>
                  <p className="text-sm font-semibold text-foreground">{factor.label}</p>
                  <p className="text-xs text-muted-foreground">{factor.description}</p>
                </div>
              </div>
              <span className="text-sm font-bold text-foreground">
                {factor.points} / {factor.maxPoints}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full bg-${factor.color} transition-all duration-1000 rounded-full`}
                style={{ width: `${(factor.points / factor.maxPoints) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Improvement Tips */}
      <div className="mt-8 glass bg-primary/5 rounded-xl p-6 border-2 border-primary/20">
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="LightBulbIcon" size={20} className="text-primary" />
          <span>Ways to Improve</span>
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start space-x-2 text-sm text-foreground">
            <Icon name="ArrowTrendingUpIcon" size={18} className="text-primary mt-0.5 flex-shrink-0" />
            <span>Continue paying rent on time to earn +10 points per month</span>
          </li>
          <li className="flex items-start space-x-2 text-sm text-foreground">
            <Icon name="ArrowTrendingUpIcon" size={18} className="text-primary mt-0.5 flex-shrink-0" />
            <span>Complete all verifications to maximize your trust score</span>
          </li>
          <li className="flex items-start space-x-2 text-sm text-foreground">
            <Icon name="ArrowTrendingUpIcon" size={18} className="text-primary mt-0.5 flex-shrink-0" />
            <span>Maintain good relationships to receive positive reviews</span>
          </li>
        </ul>
      </div>
    </div>
  );
}