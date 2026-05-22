"use client";

import { useState } from "react";
import { Metadata } from "next";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Icon from "@/components/ui/AppIcon";
import AppImage from "@/components/ui/AppImage";
import Link from "next/link";

export default function FindHomePage() {
  const [activeTab, setActiveTab] = useState<'search' | 'saved' | 'applied'>('search');
  const [filters, setFilters] = useState({
    location: '',
    minRent: '',
    maxRent: '',
    bhk: 'any',
    furnishing: 'any',
    propertyType: 'any'
  });
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const properties = [
    {
      id: 1,
      title: "3BHK Luxury Apartment",
      location: "Koramangala 5th Block",
      rent: 45000,
      deposit: 180000,
      area: 1450,
      bhk: "3BHK",
      furnishing: "Semi-Furnished",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      landlord: {
        name: "Priya Sharma",
        rating: 4.8,
        verified: true,
        responseTime: "2 hours"
      },
      amenities: ["Parking", "Lift", "Gym", "Security"],
      rating: 4.8,
      reviewCount: 27,
      availableFrom: "15th March 2026",
      saved: true,
      applied: false
    },
    {
      id: 2,
      title: "2BHK Near Metro Station",
      location: "Indiranagar",
      rent: 35000,
      deposit: 105000,
      area: 1200,
      bhk: "2BHK",
      furnishing: "Fully Furnished",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
      landlord: {
        name: "Rajesh Kumar",
        rating: 4.6,
        verified: true,
        responseTime: "4 hours"
      },
      amenities: ["Metro", "Parking", "Security", "Power Backup"],
      rating: 4.6,
      reviewCount: 18,
      availableFrom: "1st April 2026",
      saved: false,
      applied: true
    },
    {
      id: 3,
      title: "Spacious 1BHK Studio",
      location: "HSR Layout",
      rent: 22000,
      deposit: 66000,
      area: 650,
      bhk: "1BHK",
      furnishing: "Semi-Furnished",
      image: "https://images.unsplash.com/photo-1565182999561-18d7dc61c393",
      landlord: {
        name: "Anita Verma",
        rating: 4.9,
        verified: true,
        responseTime: "1 hour"
      },
      amenities: ["WiFi", "Parking", "Security"],
      rating: 4.9,
      reviewCount: 12,
      availableFrom: "20th March 2026",
      saved: true,
      applied: false
    },
    {
      id: 4,
      title: "Premium 2BHK with Balcony",
      location: "Jayanagar 4th Block",
      rent: 32000,
      deposit: 96000,
      area: 1100,
      bhk: "2BHK",
      furnishing: "Fully Furnished",
      image: "https://images.unsplash.com/photo-1584622781564-1d987140d97a",
      landlord: {
        name: "Suresh Patel",
        rating: 4.7,
        verified: true,
        responseTime: "3 hours"
      },
      amenities: ["Balcony", "Parking", "Gym", "Garden"],
      rating: 4.7,
      reviewCount: 22,
      availableFrom: "10th April 2026",
      saved: false,
      applied: false
    }
  ];

  const savedProperties = properties.filter(p => p.saved);
  const appliedProperties = properties.filter(p => p.applied);

  const getFilteredProperties = () => {
    let filtered = properties;
    
    if (activeTab === 'saved') return savedProperties;
    if (activeTab === 'applied') return appliedProperties;
    
    if (filters.location) {
      filtered = filtered.filter(p => 
        p.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    if (filters.minRent) {
      filtered = filtered.filter(p => p.rent >= parseInt(filters.minRent));
    }
    
    if (filters.maxRent) {
      filtered = filtered.filter(p => p.rent <= parseInt(filters.maxRent));
    }
    
    if (filters.bhk && filters.bhk !== 'any') {
      filtered = filtered.filter(p => p.bhk.includes(filters.bhk));
    }
    
    if (filters.furnishing && filters.furnishing !== 'any') {
      filtered = filtered.filter(p => 
        p.furnishing.toLowerCase().includes(filters.furnishing.toLowerCase())
      );
    }
    
    return filtered;
  };

  const filteredProperties = getFilteredProperties();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Page Header */}
        <section className="py-12 px-4 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
          <div className="container mx-auto max-w-7xl">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
              Find Your Perfect <span className="gradient-text">Home</span>
            </h1>
            <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-8">
              Discover verified properties with trusted landlords. Filter by your preferences and connect directly.
            </p>

            {/* Search Bar */}
            <div className="glass rounded-2xl p-4 max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="relative">
                  <Icon name="MapPinIcon" size={20} className="absolute left-3 top-3.5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Location (e.g., Koramangala)"
                    value={filters.location}
                    onChange={(e) => setFilters(prev => ({...prev, location: e.target.value}))}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
                  />
                </div>
                
                <select
                  value={filters.bhk}
                  onChange={(e) => setFilters(prev => ({...prev, bhk: e.target.value}))}
                  className="px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
                >
                  <option value="any">Any BHK</option>
                  <option value="1">1 BHK</option>
                  <option value="2">2 BHK</option>
                  <option value="3">3 BHK</option>
                  <option value="4">4+ BHK</option>
                </select>
                
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min Rent"
                    value={filters.minRent}
                    onChange={(e) => setFilters(prev => ({...prev, minRent: e.target.value}))}
                    className="px-3 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Max Rent"
                    value={filters.maxRent}
                    onChange={(e) => setFilters(prev => ({...prev, maxRent: e.target.value}))}
                    className="px-3 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background text-sm"
                  />
                </div>
                
                <button className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-all duration-300 flex items-center justify-center space-x-2">
                  <Icon name="MagnifyingGlassIcon" size={20} />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto max-w-7xl px-4 py-8">
          {/* Navigation Tabs & Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            {/* Tabs */}
            <div className="glass rounded-2xl p-2 inline-flex">
              <button
                onClick={() => setActiveTab('search')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'search'
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name="MagnifyingGlassIcon" size={20} className="inline mr-2" />
                Search ({properties.length})
              </button>
              <button
                onClick={() => setActiveTab('saved')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'saved'
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name="BookmarkIcon" size={20} className="inline mr-2" />
                Saved ({savedProperties.length})
              </button>
              <button
                onClick={() => setActiveTab('applied')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'applied'
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name="PaperAirplaneIcon" size={20} className="inline mr-2" />
                Applied ({appliedProperties.length})
              </button>
            </div>

            {/* View Controls */}
            <div className="flex items-center space-x-4">
              <div className="glass rounded-xl p-1 inline-flex">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === 'list'
                      ? 'bg-primary text-white'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name="ListBulletIcon" size={20} />
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === 'map'
                      ? 'bg-primary text-white'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name="MapIcon" size={20} />
                </button>
              </div>

              <div className="text-sm text-muted-foreground">
                {filteredProperties.length} properties found
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          {activeTab === 'search' && (
            <div className="glass rounded-2xl p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-foreground">Advanced Filters</h3>
                <button 
                  onClick={() => setFilters({location: '', minRent: '', maxRent: '', bhk: 'any', furnishing: 'any', propertyType: 'any'})}
                  className="text-primary hover:underline text-sm"
                >
                  Clear All
                </button>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Furnishing</label>
                  <select
                    value={filters.furnishing}
                    onChange={(e) => setFilters(prev => ({...prev, furnishing: e.target.value}))}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
                  >
                    <option value="any">Any Furnishing</option>
                    <option value="fully">Fully Furnished</option>
                    <option value="semi">Semi Furnished</option>
                    <option value="unfurnished">Unfurnished</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Property Type</label>
                  <select
                    value={filters.propertyType}
                    onChange={(e) => setFilters(prev => ({...prev, propertyType: e.target.value}))}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
                  >
                    <option value="any">Any Type</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">Independent House</option>
                    <option value="villa">Villa</option>
                    <option value="studio">Studio</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Amenities</label>
                  <div className="flex flex-wrap gap-2">
                    {['Parking', 'Gym', 'Security', 'Lift', 'Swimming Pool'].map((amenity) => (
                      <button
                        key={amenity}
                        className="px-3 py-1 text-xs border border-border rounded-full hover:bg-primary hover:text-white hover:border-primary transition-colors"
                      >
                        {amenity}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Properties Grid */}
          {viewMode === 'list' ? (
            <div className="grid lg:grid-cols-2 gap-8">
              {filteredProperties.map((property) => (
                <div key={property.id} className="glass rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative">
                    <AppImage
                      src={property.image}
                      alt={property.title}
                      className="w-full h-48 object-cover"
                    />
                    
                    <div className="absolute top-4 left-4">
                      <div className="px-3 py-1 bg-success text-white text-xs font-bold rounded-full">
                        Verified
                      </div>
                    </div>
                    
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button 
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                          property.saved ? 'bg-warning text-white' : 'bg-white/90 text-muted-foreground hover:bg-white'
                        }`}
                      >
                        <Icon name="BookmarkIcon" size={16} variant={property.saved ? "solid" : "outline"} />
                      </button>
                      <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                        <Icon name="ShareIcon" size={16} className="text-muted-foreground" />
                      </button>
                    </div>

                    {property.applied && (
                      <div className="absolute bottom-4 left-4">
                        <div className="px-3 py-1 bg-accent text-white text-xs font-bold rounded-full">
                          Applied
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-1">{property.title}</h3>
                        <p className="text-muted-foreground text-sm flex items-center">
                          <Icon name="MapPinIcon" size={16} className="mr-1" />
                          {property.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-foreground">₹{property.rent.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">per month</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <p className="font-semibold text-foreground">{property.bhk}</p>
                        <p className="text-xs text-muted-foreground">Type</p>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <p className="font-semibold text-foreground">{property.area}</p>
                        <p className="text-xs text-muted-foreground">sq ft</p>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <p className="font-semibold text-foreground">{property.furnishing.split(' ')[0]}</p>
                        <p className="text-xs text-muted-foreground">Furnished</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Icon name="StarIcon" size={16} className="text-warning" variant="solid" />
                        <span className="font-semibold text-foreground">{property.rating}</span>
                        <span className="text-muted-foreground text-sm">({property.reviewCount} reviews)</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Available from {property.availableFrom}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {property.amenities.slice(0, 4).map((amenity, index) => (
                        <span key={index} className="px-2 py-1 bg-muted text-foreground text-xs rounded-lg">
                          {amenity}
                        </span>
                      ))}
                      {property.amenities.length > 4 && (
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-lg">
                          +{property.amenities.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Landlord Info */}
                    <div className="flex items-center justify-between mb-4 p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-semibold text-foreground text-sm">{property.landlord.name}</p>
                        <div className="flex items-center space-x-1">
                          <Icon name="StarIcon" size={12} className="text-warning" variant="solid" />
                          <span className="text-xs text-muted-foreground">{property.landlord.rating} • Responds in {property.landlord.responseTime}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="ShieldCheckIcon" size={16} className="text-success" />
                        <span className="text-xs text-success">Verified</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Link
                        href={`/property-details/${property.id}`}
                        className="flex-1 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-secondary transition-colors text-center"
                      >
                        View Details
                      </Link>
                      <button className="flex-1 px-4 py-2 border border-primary text-primary rounded-lg text-sm font-medium hover:bg-primary hover:text-white transition-colors">
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Map View Placeholder */
            <div className="glass rounded-2xl p-8 text-center">
              <Icon name="MapIcon" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">Map View Coming Soon</h3>
              <p className="text-muted-foreground">Interactive map view with property locations will be available soon.</p>
              <button
                onClick={() => setViewMode('list')}
                className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
              >
                Switch to List View
              </button>
            </div>
          )}

          {/* No Results */}
          {filteredProperties.length === 0 && (
            <div className="text-center py-16">
              <Icon name="BuildingOfficeIcon" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">No Properties Found</h3>
              <p className="text-muted-foreground mb-4">
                {activeTab === 'saved' && "You haven't saved any properties yet."}
                {activeTab === 'applied' && "You haven't applied to any properties yet."}
                {activeTab === 'search' && "Try adjusting your filters or search criteria."}
              </p>
              {activeTab === 'search' && (
                <button 
                  onClick={() => setFilters({location: '', minRent: '', maxRent: '', bhk: 'any', furnishing: 'any', propertyType: 'any'})}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}