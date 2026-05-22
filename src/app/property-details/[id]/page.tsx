import { Metadata } from "next";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Icon from "@/components/ui/AppIcon";
import AppImage from "@/components/ui/AppImage";
import Link from "next/link";

export const metadata: Metadata = {
  title: "3BHK Luxury Apartment in Koramangala - RentTrust",
  description: "Spacious 3BHK apartment in prime Koramangala location with verified landlord reviews. ₹45,000/month with modern amenities and excellent connectivity.",
  keywords: ["3BHK apartment", "Koramangala rental", "luxury apartment", "verified landlord", "Bangalore rental", "premium property"],
};

export default function PropertyDetailsPage() {
  const property = {
    id: 1,
    title: "3BHK Luxury Apartment in Koramangala",
    location: "Koramangala 5th Block, Bangalore",
    rent: 45000,
    deposit: 180000,
    type: "3BHK",
    area: 1450,
    furnishing: "Semi-Furnished",
    floor: "7th Floor of 12",
    age: "3 Years",
    parking: "2 Covered Parking",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
      "https://images.unsplash.com/photo-1565182999561-18d7dc61c393",
      "https://images.unsplash.com/photo-1584622781564-1d987140d97a",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7"
    ],
    rating: 4.8,
    reviewCount: 27,
    verificationStatus: "High Credit",
    availableFrom: "15th March 2026"
  };

  const landlord = {
    name: "Priya Sharma",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_14224793d-1763292347593.png",
    rating: 4.9,
    reviewCount: 45,
    propertiesCount: 6,
    responseTime: "within 2 hours",
    memberSince: "January 2023",
    verificationBadges: ["Identity Verified", "Property Verified", "Income Verified"]
  };

  const amenities = [
    { name: "24/7 Security", icon: "ShieldCheckIcon" },
    { name: "Power Backup", icon: "BoltIcon" },
    { name: "Lift", icon: "ArrowUpIcon" },
    { name: "Gym", icon: "FireIcon" },
    { name: "Swimming Pool", icon: "SwatchIcon" },
    { name: "Children's Park", icon: "UserIcon" },
    { name: "Visitor Parking", icon: "TruckIcon" },
    { name: "Water Storage", icon: "CloudIcon" },
    { name: "Internet Ready", icon: "WifiIcon" },
    { name: "Club House", icon: "BuildingOfficeIcon" },
    { name: "Waste Management", icon: "TrashIcon" },
    { name: "CCTV Surveillance", icon: "VideoCameraIcon" }
  ];

  const nearbyPlaces = [
    { name: "Forum Mall", distance: "0.5 km", type: "Shopping" },
    { name: "Manipal Hospital", distance: "1.2 km", type: "Healthcare" },
    { name: "Koramangala Metro", distance: "0.8 km", type: "Transport" },
    { name: "Jyoti Nivas College", distance: "1.5 km", type: "Education" },
    { name: "BDA Complex", distance: "0.3 km", type: "Recreation" },
    { name: "Sony Signal", distance: "2.1 km", type: "Transport" }
  ];

  const reviews = [
    {
      id: 1,
      tenant: "Rahul Kumar",
      rating: 5,
      date: "February 2026",
      duration: "2 Years",
      review: "Excellent property with all promised amenities. Priya aunty is very responsive and maintains the property well. Great location with easy access to everything.",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14224793d-1763292347593.png"
    },
    {
      id: 2,
      tenant: "Sneha Patel",
      rating: 4,
      date: "January 2026",
      duration: "1.5 Years", 
      review: "Good apartment but had some initial plumbing issues which were fixed quickly. Overall satisfied with the stay. Would recommend to working professionals.",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14224793d-1763292347593.png"
    },
    {
      id: 3,
      tenant: "Arun Menon",
      rating: 5,
      date: "December 2025",
      duration: "3 Years",
      review: "Been staying here for 3 years. Great community, excellent maintenance staff, and the landlord is very understanding. Best rental experience in Bangalore.",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14224793d-1763292347593.png"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Image Gallery */}
        <section className="px-4 py-8">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 rounded-2xl overflow-hidden">
              <div className="md:col-span-2 md:row-span-2">
                <AppImage
                  src={property.images[0]}
                  alt="Main apartment view showing living room with modern furniture"
                  className="w-full h-64 md:h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {property.images.slice(1, 5).map((image, index) => (
                <div key={index} className="relative group cursor-pointer">
                  <AppImage
                    src={image}
                    alt={`Property interior view ${index + 2}`}
                    className="w-full h-32 md:h-40 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {index === 3 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-semibold">
                      <span>+5 More Photos</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Property Info */}
        <section className="px-4 py-8">
          <div className="container mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-8">
                {/* Basic Info */}
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="px-3 py-1 bg-success text-white text-sm font-bold rounded-full">
                      Verified
                    </div>
                    <div className="px-3 py-1 bg-primary text-white text-sm font-bold rounded-full">
                      {property.verificationStatus}
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="StarIcon" variant="solid" size={16} className="text-warning" />
                      <span className="font-semibold text-foreground">{property.rating}</span>
                      <span className="text-muted-foreground">({property.reviewCount} reviews)</span>
                    </div>
                  </div>

                  <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    {property.title}
                  </h1>
                  
                  <div className="flex items-center text-muted-foreground mb-6">
                    <Icon name="MapPinIcon" size={20} className="mr-2" />
                    <span>{property.location}</span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="glass rounded-xl p-4">
                      <p className="text-2xl font-bold text-foreground">₹{property.rent.toLocaleString()}</p>
                      <p className="text-muted-foreground text-sm">per month</p>
                    </div>
                    <div className="glass rounded-xl p-4">
                      <p className="text-2xl font-bold text-foreground">₹{property.deposit.toLocaleString()}</p>
                      <p className="text-muted-foreground text-sm">security deposit</p>
                    </div>
                    <div className="glass rounded-xl p-4">
                      <p className="text-2xl font-bold text-foreground">{property.area} sq ft</p>
                      <p className="text-muted-foreground text-sm">built-up area</p>
                    </div>
                  </div>
                </div>

                {/* Property Features */}
                <div className="glass rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-foreground mb-4">Property Features</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <span className="text-muted-foreground">Type</span>
                      <span className="font-semibold text-foreground">{property.type}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <span className="text-muted-foreground">Furnishing</span>
                      <span className="font-semibold text-foreground">{property.furnishing}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <span className="text-muted-foreground">Floor</span>
                      <span className="font-semibold text-foreground">{property.floor}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <span className="text-muted-foreground">Property Age</span>
                      <span className="font-semibold text-foreground">{property.age}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <span className="text-muted-foreground">Parking</span>
                      <span className="font-semibold text-foreground">{property.parking}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <span className="text-muted-foreground">Available From</span>
                      <span className="font-semibold text-foreground">{property.availableFrom}</span>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div className="glass rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-foreground mb-4">Amenities</h2>
                  <div className="grid md:grid-cols-3 gap-4">
                    {amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-xl">
                        <Icon name={amenity.icon} size={20} className="text-primary" />
                        <span className="text-foreground">{amenity.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Location & Nearby */}
                <div className="glass rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-foreground mb-4">Location & Nearby Places</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {nearbyPlaces.map((place, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                        <div>
                          <p className="font-semibold text-foreground">{place.name}</p>
                          <p className="text-sm text-muted-foreground">{place.type}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-primary">{place.distance}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reviews */}
                <div className="glass rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-foreground">Tenant Reviews</h2>
                    <Link href="#" className="text-primary hover:underline">View All Reviews</Link>
                  </div>

                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-border pb-6 last:border-b-0 last:pb-0">
                        <div className="flex items-start space-x-4">
                          <AppImage
                            src={review.avatar}
                            alt={`${review.tenant} profile photo`}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <p className="font-semibold text-foreground">{review.tenant}</p>
                                <p className="text-sm text-muted-foreground">Stayed {review.duration} • {review.date}</p>
                              </div>
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <Icon
                                    key={i}
                                    name="StarIcon"
                                    variant={i < review.rating ? "solid" : "outline"}
                                    size={16}
                                    className="text-warning"
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-muted-foreground">{review.review}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Landlord Info & Actions */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Landlord Card */}
                  <div className="glass rounded-2xl p-6">
                    <div className="text-center mb-6">
                      <AppImage
                        src={landlord.image}
                        alt={`${landlord.name} profile photo`}
                        className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                      />
                      <h3 className="text-xl font-bold text-foreground">{landlord.name}</h3>
                      <div className="flex items-center justify-center space-x-1 mb-2">
                        <Icon name="StarIcon" variant="solid" size={16} className="text-warning" />
                        <span className="font-semibold text-foreground">{landlord.rating}</span>
                        <span className="text-muted-foreground">({landlord.reviewCount})</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Member since {landlord.memberSince}</p>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Properties</span>
                        <span className="font-semibold text-foreground">{landlord.propertiesCount}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Response Time</span>
                        <span className="font-semibold text-foreground">{landlord.responseTime}</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      {landlord.verificationBadges.map((badge, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <Icon name="CheckCircleIcon" size={16} className="text-success" />
                          <span className="text-muted-foreground">{badge}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <button className="w-full px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-all duration-300 flex items-center justify-center space-x-2">
                        <Icon name="PhoneIcon" size={20} />
                        <span>Contact Landlord</span>
                      </button>
                      
                      <button className="w-full px-6 py-3 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center space-x-2">
                        <Icon name="CalendarIcon" size={20} />
                        <span>Schedule Visit</span>
                      </button>

                      <Link
                        href={`/landlord-profile/${landlord.name.toLowerCase().replace(' ', '-')}`}
                        className="w-full px-6 py-3 bg-muted text-foreground rounded-xl font-semibold hover:bg-muted/80 transition-all duration-300 flex items-center justify-center space-x-2"
                      >
                        <Icon name="UserIcon" size={20} />
                        <span>View Profile</span>
                      </Link>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="glass rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-foreground mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <button className="w-full p-3 bg-muted/50 rounded-xl text-left hover:bg-muted transition-colors flex items-center space-x-3">
                        <Icon name="BookmarkIcon" size={20} className="text-muted-foreground" />
                        <span className="text-foreground">Save Property</span>
                      </button>
                      
                      <button className="w-full p-3 bg-muted/50 rounded-xl text-left hover:bg-muted transition-colors flex items-center space-x-3">
                        <Icon name="ShareIcon" size={20} className="text-muted-foreground" />
                        <span className="text-foreground">Share Property</span>
                      </button>
                      
                      <button className="w-full p-3 bg-muted/50 rounded-xl text-left hover:bg-muted transition-colors flex items-center space-x-3">
                        <Icon name="ExclamationTriangleIcon" size={20} className="text-muted-foreground" />
                        <span className="text-foreground">Report Issue</span>
                      </button>
                    </div>
                  </div>

                  {/* Trust Score */}
                  <div className="glass rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-foreground mb-4">Trust Score</h3>
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-white">A+</span>
                      </div>
                      <p className="font-semibold text-foreground mb-2">Excellent Trust Rating</p>
                      <p className="text-sm text-muted-foreground">Based on verification, reviews, and rental history</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}