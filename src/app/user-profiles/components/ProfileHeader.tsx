import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";

interface ProfileHeaderProps {
  profile: {
    name: string;
    image: string;
    imageAlt: string;
    userType: "Landlord" | "Tenant";
    creditScore: number;
    rating: number;
    totalReviews: number;
    verified: {
      id: boolean;
      phone: boolean;
      email: boolean;
      payment: boolean;
    };
    joinedDate: string;
  };
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  const getScoreColor = (score: number) => {
    if (score >= 850) return "text-primary";
    if (score >= 700) return "text-success";
    if (score >= 500) return "text-warning";
    return "text-error";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 850) return "Outstanding";
    if (score >= 700) return "Excellent";
    if (score >= 500) return "Good";
    return "Building";
  };

  return (
    <div className="glass rounded-3xl p-8 md:p-12">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
        {/* Profile Image */}
        <div className="relative flex-shrink-0">
          <AppImage
            src={profile.image}
            alt={profile.imageAlt}
            className="w-32 h-32 rounded-2xl object-cover ring-4 ring-primary/20"
          />
          {profile.verified.id && (
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-success border-4 border-white rounded-full flex items-center justify-center">
              <Icon name="CheckIcon" size={20} className="text-white" />
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">{profile.name}</h1>
            <span
              className={`px-4 py-1.5 rounded-full text-sm font-bold ${
                profile.userType === "Landlord" ?"bg-accent/10 text-accent" :"bg-primary/10 text-primary"
              }`}
            >
              {profile.userType}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
            <div className="flex items-center space-x-1">
              <Icon name="CalendarIcon" size={16} />
              <span className="text-sm">Joined {profile.joinedDate}</span>
            </div>
            <span className="text-muted">•</span>
            <div className="flex items-center space-x-1">
              <Icon name="StarIcon" variant="solid" size={16} className="text-warning" />
              <span className="text-sm font-semibold text-foreground">{profile.rating}</span>
              <span className="text-sm">({profile.totalReviews} reviews)</span>
            </div>
          </div>

          {/* Credit Score Display */}
          <div className="flex flex-wrap items-center gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Credit Score</p>
              <div className="flex items-baseline space-x-2">
                <span className={`text-4xl font-bold ${getScoreColor(profile.creditScore)}`}>
                  {profile.creditScore}
                </span>
                <span className={`text-sm font-semibold ${getScoreColor(profile.creditScore)}`}>
                  {getScoreLabel(profile.creditScore)}
                </span>
              </div>
            </div>

            {/* Verification Badges */}
            <div className="flex flex-wrap gap-2">
              {profile.verified.id && (
                <div className="flex items-center space-x-1 px-3 py-1.5 bg-success/10 text-success rounded-lg">
                  <Icon name="IdentificationIcon" size={16} />
                  <span className="text-xs font-semibold">ID Verified</span>
                </div>
              )}
              {profile.verified.phone && (
                <div className="flex items-center space-x-1 px-3 py-1.5 bg-primary/10 text-primary rounded-lg">
                  <Icon name="DevicePhoneMobileIcon" size={16} />
                  <span className="text-xs font-semibold">Phone Verified</span>
                </div>
              )}
              {profile.verified.email && (
                <div className="flex items-center space-x-1 px-3 py-1.5 bg-accent/10 text-accent rounded-lg">
                  <Icon name="EnvelopeIcon" size={16} />
                  <span className="text-xs font-semibold">Email Verified</span>
                </div>
              )}
              {profile.verified.payment && (
                <div className="flex items-center space-x-1 px-3 py-1.5 bg-warning/10 text-warning rounded-lg">
                  <Icon name="CreditCardIcon" size={16} />
                  <span className="text-xs font-semibold">Payment Verified</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}