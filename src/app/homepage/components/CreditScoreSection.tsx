import Icon from "@/components/ui/AppIcon";

export default function CreditScoreSection() {
  const scoreFactors = [
    {
      icon: "CheckCircleIcon",
      title: "On-Time Payments",
      points: "+10 points per month",
      description: "Pay rent on time to consistently boost your score",
      color: "success",
    },
    {
      icon: "ShieldCheckIcon",
      title: "ID Verification",
      points: "+20 points",
      description: "Complete identity verification for instant boost",
      color: "primary",
    },
    {
      icon: "StarIcon",
      title: "Positive Reviews",
      points: "+5 points per review",
      description: "Get 5-star reviews from landlords/tenants",
      color: "warning",
    },
    {
      icon: "HomeIcon",
      title: "Rental History",
      points: "+15 points per year",
      description: "Longer verified rental history increases trust",
      color: "accent",
    },
  ];

  const scoreLevels = [
    { min: 0, max: 300, label: "Building Trust", color: "bg-muted" },
    { min: 301, max: 600, label: "Good Standing", color: "bg-warning" },
    { min: 601, max: 850, label: "Excellent", color: "bg-success" },
    { min: 851, max: 1000, label: "Outstanding", color: "bg-primary" },
  ];

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <Icon name="ChartBarIcon" size={20} className="text-primary" />
            <span className="text-sm font-semibold text-primary">Credit Scoring</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Build Your <span className="gradient-text">Rental Credit Score</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your rental behavior matters. Build a strong credit score to access better properties and attract reliable landlords.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Visual Score Meter */}
          <div className="glass rounded-3xl p-8 md:p-12 animate-fade-in">
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold text-foreground mb-2">Your Credit Score</h3>
              <p className="text-sm text-muted-foreground">Updated in real-time</p>
            </div>

            {/* Score Display */}
            <div className="relative mb-12">
              <div className="w-64 h-64 mx-auto relative">
                {/* Circular Progress */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                  <circle
                    cx="100"
                    cy="100"
                    r="85"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="12"
                    className="text-muted"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="85"
                    fill="none"
                    stroke="url(#scoreGradient)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray="534"
                    strokeDashoffset="133.5"
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Score Number */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-6xl font-bold gradient-text mb-2">850</p>
                  <p className="text-sm text-muted-foreground font-semibold">Excellent</p>
                </div>
              </div>
            </div>

            {/* Score Levels */}
            <div className="space-y-3">
              {scoreLevels.map((level, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${level.color}`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-foreground">{level.label}</span>
                      <span className="text-xs text-muted-foreground">
                        {level.min}-{level.max}
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${level.color} transition-all duration-1000`}
                        style={{
                          width: level.min === 851 ? "85%" : level.min === 601 ? "75%" : level.min === 301 ? "50%" : "30%",
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Contributing Factors */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-2xl font-bold text-foreground mb-6">How to Boost Your Score</h3>

            {scoreFactors.map((factor, index) => (
              <div
                key={index}
                className="glass rounded-xl p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`w-12 h-12 bg-${factor.color}/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-${factor.color}/20 transition-colors`}
                  >
                    <Icon
                      name={factor.icon as any}
                      size={24}
                      className={`text-${factor.color}`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-bold text-foreground">{factor.title}</h4>
                      <span className={`text-sm font-bold text-${factor.color}`}>
                        {factor.points}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{factor.description}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Benefits */}
            <div className="glass rounded-xl p-6 bg-primary/5 border-2 border-primary/20">
              <h4 className="text-lg font-bold text-foreground mb-4 flex items-center space-x-2">
                <Icon name="SparklesIcon" size={20} className="text-primary" />
                <span>Benefits of High Score</span>
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2 text-sm text-foreground">
                  <Icon name="CheckCircleIcon" size={18} className="text-success mt-0.5 flex-shrink-0" />
                  <span>Access to premium properties with verified landlords</span>
                </li>
                <li className="flex items-start space-x-2 text-sm text-foreground">
                  <Icon name="CheckCircleIcon" size={18} className="text-success mt-0.5 flex-shrink-0" />
                  <span>Lower security deposits for qualified tenants</span>
                </li>
                <li className="flex items-start space-x-2 text-sm text-foreground">
                  <Icon name="CheckCircleIcon" size={18} className="text-success mt-0.5 flex-shrink-0" />
                  <span>Priority consideration for competitive properties</span>
                </li>
                <li className="flex items-start space-x-2 text-sm text-foreground">
                  <Icon name="CheckCircleIcon" size={18} className="text-success mt-0.5 flex-shrink-0" />
                  <span>Potential for better loan terms with partner banks</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground mb-6">
            Start building your credit score today
          </p>
          <button className="px-8 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-all duration-300 shadow-lg hover:shadow-xl">
            Get Verified Now
          </button>
        </div>
      </div>
    </section>
  );
}