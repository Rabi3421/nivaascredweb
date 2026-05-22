import Icon from "@/components/ui/AppIcon";

interface RentalStatisticsProps {
  stats: {
    totalRentals: number;
    onTimePayments: number;
    responseRate: string;
    activeSince: string;
    propertiesManaged?: number;
    avgRentalDuration?: number;
  };
  userType: "Landlord" | "Tenant";
}

export default function RentalStatistics({ stats, userType }: RentalStatisticsProps) {
  const landlordStats = [
    {
      icon: "HomeIcon",
      label: "Properties Managed",
      value: stats.propertiesManaged || 0,
      color: "accent",
    },
    {
      icon: "UserGroupIcon",
      label: "Total Rentals",
      value: stats.totalRentals,
      color: "primary",
    },
    {
      icon: "ClockIcon",
      label: "Avg Response",
      value: stats.responseRate,
      color: "success",
    },
    {
      icon: "CalendarIcon",
      label: "Active Since",
      value: stats.activeSince,
      color: "warning",
    },
  ];

  const tenantStats = [
    {
      icon: "HomeIcon",
      label: "Total Rentals",
      value: stats.totalRentals,
      color: "primary",
    },
    {
      icon: "CheckCircleIcon",
      label: "On-Time Payments",
      value: `${stats.onTimePayments}%`,
      color: "success",
    },
    {
      icon: "ClockIcon",
      label: "Avg Duration",
      value: `${stats.avgRentalDuration || 0} months`,
      color: "accent",
    },
    {
      icon: "CalendarIcon",
      label: "Active Since",
      value: stats.activeSince,
      color: "warning",
    },
  ];

  const displayStats = userType === "Landlord" ? landlordStats : tenantStats;

  return (
    <div className="glass rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center space-x-2">
        <Icon name="ChartPieIcon" size={24} className="text-primary" />
        <span>Rental Statistics</span>
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {displayStats.map((stat, index) => (
          <div
            key={index}
            className="text-center p-6 bg-muted/30 rounded-xl hover:bg-muted/50 transition-all duration-300"
          >
            <div className={`w-12 h-12 mx-auto mb-4 bg-${stat.color}/10 rounded-xl flex items-center justify-center`}>
              <Icon name={stat.icon as any} size={24} className={`text-${stat.color}`} />
            </div>
            <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Additional Insights */}
      {userType === "Tenant" && stats.onTimePayments === 100 && (
        <div className="mt-6 glass bg-success/5 rounded-xl p-6 border-2 border-success/20">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="TrophyIcon" size={24} className="text-success" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-1">Perfect Payment Record!</h3>
              <p className="text-sm text-muted-foreground">
                You've never missed a rent payment. This significantly boosts your credit score and trustworthiness.
              </p>
            </div>
          </div>
        </div>
      )}

      {userType === "Landlord" && (stats.propertiesManaged || 0) >= 5 && (
        <div className="mt-6 glass bg-accent/5 rounded-xl p-6 border-2 border-accent/20">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="BuildingOffice2Icon" size={24} className="text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-1">Experienced Landlord</h3>
              <p className="text-sm text-muted-foreground">
                Managing {stats.propertiesManaged}+ properties shows your experience and reliability in the rental market.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}