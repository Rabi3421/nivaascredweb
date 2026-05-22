"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Icon from "@/components/ui/AppIcon";
import Link from "next/link";

export default function LandlordOnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1 - Entry
    signupMethod: '',
    mobile: '',
    email: '',
    
    // Step 2 - Basic Profile
    fullName: '',
    city: '',
    ownerType: '',
    propertyCount: '',
    
    // Step 3 - Trust Level
    emailVerified: false,
    profilePhoto: null,
    
    // Step 4 - Property
    propertyCity: '',
    locality: '',
    propertyType: '',
    furnishedStatus: '',
    
    // Step 5 - Tenant Relationship
    tenantName: '',
    tenantContact: '',
    startDate: '',
    rentRange: '',
    
    // Step 6 - Relationship Confirmation
    verificationDocument: null,
    documentType: ''
  });

  const [trustLevel, setTrustLevel] = useState(0);

  const propertyCountRanges = [
    "1 property", "2-3 properties", "4-5 properties", 
    "6-10 properties", "10+ properties"
  ];

  const propertyTypes = [
    "1BHK", "2BHK", "3BHK", "4BHK+", 
    "PG/Hostel", "Studio", "Villa", "Independent House"
  ];

  const rentRanges = [
    "₹5,000 - ₹10,000", "₹10,000 - ₹20,000", "₹20,000 - ₹30,000",
    "₹30,000 - ₹50,000", "₹50,000 - ₹75,000", "₹75,000+"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 8) {
      setCurrentStep(prev => prev + 1);
      // Update trust level based on completed steps
      if (currentStep === 2) setTrustLevel(25);
      if (currentStep === 3) setTrustLevel(50);
      if (currentStep === 4) setTrustLevel(65);
      if (currentStep === 5) setTrustLevel(80);
      if (currentStep === 6) setTrustLevel(90);
      if (currentStep === 7) setTrustLevel(100);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-foreground">Progress</span>
        <span className="text-sm font-medium text-primary">{Math.round((currentStep / 8) * 100)}% Complete</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300" 
          style={{ width: `${(currentStep / 8) * 100}%` }}
        />
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="text-center space-y-6">
      <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
        <Icon name="BuildingOffice2Icon" size={20} className="text-primary" />
        <span className="text-sm font-semibold text-primary">Find Reliable Tenants</span>
      </div>
      
      <h2 className="text-2xl font-bold text-foreground mb-4">
        Reduce Rental Risk
      </h2>
      
      <p className="text-muted-foreground mb-8">
        Connect with verified, trustworthy tenants and make informed rental decisions with confidence.
      </p>

      <div className="space-y-4">
        <button
          onClick={() => {
            handleInputChange('signupMethod', 'mobile');
            nextStep();
          }}
          className="w-full px-6 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-all duration-300 flex items-center justify-center space-x-3"
        >
          <Icon name="DevicePhoneMobileIcon" size={20} />
          <span>Sign up with Mobile OTP</span>
        </button>
        
        <button
          onClick={() => {
            handleInputChange('signupMethod', 'email');
            nextStep();
          }}
          className="w-full px-6 py-4 border-2 border-border text-foreground rounded-xl font-semibold hover:bg-muted transition-all duration-300 flex items-center justify-center space-x-3"
        >
          <Icon name="EnvelopeIcon" size={20} />
          <span>Sign up with Email</span>
        </button>
      </div>

      <div className="flex items-center space-x-4 mt-6 text-sm text-muted-foreground">
        <div className="flex items-center space-x-2">
          <Icon name="ShieldCheckIcon" size={16} className="text-primary" />
          <span>Verified tenants only</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="EyeIcon" size={16} className="text-primary" />
          <span>Credit score insights</span>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Basic Profile</h2>
        <p className="text-muted-foreground">Help us understand your rental business</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Full Name *
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            City *
            <Icon name="InformationCircleIcon" size={16} className="inline ml-1 text-muted-foreground" title="Why we ask this: To show you tenant applications from your area" />
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
            placeholder="e.g., Bangalore, Mumbai, Delhi"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            You are *
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleInputChange('ownerType', 'owner')}
              className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                formData.ownerType === 'owner'
                  ? 'bg-primary text-white'
                  : 'border border-border text-foreground hover:bg-muted'
              }`}
            >
              🏠 Property Owner
            </button>
            <button
              type="button"
              onClick={() => handleInputChange('ownerType', 'agent')}
              className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                formData.ownerType === 'agent'
                  ? 'bg-primary text-white'
                  : 'border border-border text-foreground hover:bg-muted'
              }`}
            >
              🤝 Authorized Agent
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Number of Properties *
            <Icon name="InformationCircleIcon" size={16} className="inline ml-1 text-muted-foreground" title="Why we ask this: To customize your dashboard experience" />
          </label>
          <select
            value={formData.propertyCount}
            onChange={(e) => handleInputChange('propertyCount', e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
          >
            <option value="">Select range</option>
            {propertyCountRanges.map((range) => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Build Trust Level</h2>
        <p className="text-muted-foreground">Quick verification to boost your credibility</p>
      </div>

      <div className="glass rounded-2xl p-6 text-center mb-6">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Icon name="ShieldCheckIcon" size={24} className="text-primary" />
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">{trustLevel}%</div>
            <div className="text-sm text-muted-foreground">Trust Level Complete</div>
          </div>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-500" 
            style={{ width: `${trustLevel}%` }}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 glass rounded-xl">
          <div className="flex items-center space-x-3">
            <Icon name="EnvelopeIcon" size={20} className="text-success" />
            <span className="font-medium text-foreground">Email Verification</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircleIcon" size={20} className="text-success" />
            <span className="text-sm text-success">Verified</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Profile Photo (Optional but recommended)
            <Icon name="InformationCircleIcon" size={16} className="inline ml-1 text-muted-foreground" title="Why we ask this: Tenants prefer landlords with profile photos. +15% application rate!" />
          </label>
          <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
            <Icon name="CameraIcon" size={32} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground mb-3">
              Upload a professional photo of yourself
            </p>
            <button className="px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
              Choose Photo
            </button>
          </div>
        </div>
      </div>

      <div className="bg-success/10 border border-success/20 rounded-xl p-4">
        <div className="flex items-center space-x-2 text-sm text-success">
          <Icon name="TrendingUpIcon" size={16} />
          <span>Landlords with profile photos get 15% more tenant applications!</span>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Add Property (Lightweight)</h2>
        <p className="text-muted-foreground">Basic property information to get started</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              City *
            </label>
            <input
              type="text"
              value={formData.propertyCity}
              onChange={(e) => handleInputChange('propertyCity', e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
              placeholder="e.g., Bangalore"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Locality *
            </label>
            <input
              type="text"
              value={formData.locality}
              onChange={(e) => handleInputChange('locality', e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
              placeholder="e.g., Koramangala, HSR Layout"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Property Type *
          </label>
          <select
            value={formData.propertyType}
            onChange={(e) => handleInputChange('propertyType', e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
          >
            <option value="">Select property type</option>
            {propertyTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Furnished Status *
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'unfurnished', label: 'Unfurnished', icon: '🏠' },
              { id: 'semi-furnished', label: 'Semi-Furnished', icon: '🛋️' },
              { id: 'fully-furnished', label: 'Fully Furnished', icon: '🏡' }
            ].map((status) => (
              <button
                key={status.id}
                type="button"
                onClick={() => handleInputChange('furnishedStatus', status.id)}
                className={`px-3 py-4 rounded-xl font-medium transition-all duration-300 flex flex-col items-center space-y-2 ${
                  formData.furnishedStatus === status.id
                    ? 'bg-primary text-white'
                    : 'border border-border text-foreground hover:bg-muted'
                }`}
              >
                <span className="text-2xl">{status.icon}</span>
                <span className="text-xs">{status.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-muted/50 border border-border rounded-xl p-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="InformationCircleIcon" size={16} className="text-primary" />
          <span>No full address needed yet. We'll collect detailed information later when you're ready to list.</span>
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Add Tenant Relationship</h2>
        <p className="text-muted-foreground">Connect with your current or past tenant</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Tenant Name *
          </label>
          <input
            type="text"
            value={formData.tenantName}
            onChange={(e) => handleInputChange('tenantName', e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
            placeholder="Enter tenant's full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Tenant Contact *
            <Icon name="InformationCircleIcon" size={16} className="inline ml-1 text-muted-foreground" title="Why we ask this: To verify the relationship and send invitation" />
          </label>
          <input
            type="text"
            value={formData.tenantContact}
            onChange={(e) => handleInputChange('tenantContact', e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
            placeholder="Tenant's phone number or email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Tenancy Start Date *
          </label>
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => handleInputChange('startDate', e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Monthly Rent Range *
          </label>
          <select
            value={formData.rentRange}
            onChange={(e) => handleInputChange('rentRange', e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
          >
            <option value="">Select rent range</option>
            {rentRanges.map((range) => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
        <div className="flex items-center space-x-2 text-sm text-primary">
          <Icon name="PaperAirplaneIcon" size={16} />
          <span>We'll send an invitation to your tenant to join and verify this relationship</span>
        </div>
      </div>
    </div>
  );

  const renderStep6 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Relationship Confirmation</h2>
        <p className="text-muted-foreground">Upload proof to verify the tenant relationship</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Document Type *
            <Icon name="InformationCircleIcon" size={16} className="inline ml-1 text-muted-foreground" title="Why we ask this: Both parties must match for verified relationship" />
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'rent-receipt', label: 'Rent Receipt', icon: 'DocumentTextIcon' },
              { id: 'rental-agreement', label: 'Agreement', icon: 'DocumentIcon' },
              { id: 'confirm-tenant', label: 'Confirm Tenant Upload', icon: 'CheckCircleIcon' }
            ].map((doc) => (
              <button
                key={doc.id}
                type="button"
                onClick={() => handleInputChange('documentType', doc.id)}
                className={`px-3 py-4 rounded-xl font-medium transition-all duration-300 flex flex-col items-center space-y-2 ${
                  formData.documentType === doc.id
                    ? 'bg-primary text-white'
                    : 'border border-border text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={doc.icon} size={24} />
                <span className="text-xs">{doc.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Upload Document *
          </label>
          <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
            <Icon name="CloudArrowUpIcon" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium text-foreground mb-2">
              Drop your file here or click to upload
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Supports JPG, PNG, PDF. Max 5MB
            </p>
            <button className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-colors">
              Choose File
            </button>
          </div>
        </div>
      </div>

      <div className="bg-warning/10 border border-warning/20 rounded-xl p-4">
        <div className="flex items-center space-x-2 text-sm text-warning">
          <Icon name="ArrowPathIcon" size={16} />
          <span>Both landlord and tenant uploads must match for the relationship to become "Verified"</span>
        </div>
      </div>
    </div>
  );

  const renderStep7 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Review Tenant</h2>
        <p className="text-muted-foreground">Rate your tenant (only after tenancy ends)</p>
      </div>

      <div className="glass rounded-2xl p-8 text-center mb-6">
        <Icon name="ClockIcon" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-bold text-foreground mb-2">Review Locked</h3>
        <p className="text-muted-foreground mb-6">
          Reviews are unlocked only after tenancy ends and both parties confirm the exit date.
        </p>
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
          <div className="flex items-center space-x-2 text-sm text-primary">
            <Icon name="InformationCircleIcon" size={16} />
            <span>This ensures fair and unbiased reviews from both parties</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-foreground mb-3">Rating Structure (Preview)</h4>
        {[
          { id: 'rent-punctuality', label: 'Rent Punctuality', icon: 'ClockIcon' },
          { id: 'property-care', label: 'Property Care', icon: 'HomeIcon' },
          { id: 'communication', label: 'Communication', icon: 'ChatBubbleLeftRightIcon' },
          { id: 'overall-reliability', label: 'Overall Reliability', icon: 'StarIcon' }
        ].map((category) => (
          <div key={category.id} className="glass rounded-xl p-4 opacity-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name={category.icon} size={20} className="text-muted-foreground" />
                <span className="font-medium text-muted-foreground">{category.label}</span>
              </div>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Icon key={star} name="StarIcon" size={16} className="text-muted-foreground" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep8 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-success/10 border border-success/20 rounded-full mb-4">
          <Icon name="CheckCircleIcon" size={20} className="text-success" />
          <span className="text-sm font-semibold text-success">Profile Complete!</span>
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Your Landlord Dashboard</h2>
        <p className="text-muted-foreground">Welcome to your property management hub</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Tenant Reliability Insights */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Icon name="ChartBarIcon" size={24} className="text-primary" />
              <div>
                <h3 className="font-bold text-foreground">Tenant Insights</h3>
                <p className="text-sm text-muted-foreground">Reliability analytics</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-success">85%</div>
              <div className="text-xs text-muted-foreground">Avg Score</div>
            </div>
          </div>
        </div>

        {/* Past Tenant Ratings */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Icon name="StarIcon" size={24} className="text-warning" />
              <div>
                <h3 className="font-bold text-foreground">Tenant Ratings</h3>
                <p className="text-sm text-muted-foreground">Past reviews given</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-foreground">3</div>
              <div className="text-xs text-muted-foreground">Reviews</div>
            </div>
          </div>
        </div>

        {/* Property History */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Icon name="ClockIcon" size={24} className="text-accent" />
              <div>
                <h3 className="font-bold text-foreground">Property History</h3>
                <p className="text-sm text-muted-foreground">Tenancy records</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-foreground">2.3yr</div>
              <div className="text-xs text-muted-foreground">Avg tenure</div>
            </div>
          </div>
        </div>

        {/* Invite New Tenant */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Icon name="UserPlusIcon" size={24} className="text-success" />
              <div>
                <h3 className="font-bold text-foreground">Invite Tenant</h3>
                <p className="text-sm text-muted-foreground">Add new relationship</p>
              </div>
            </div>
            <button className="px-3 py-1.5 bg-success text-white rounded-lg text-sm font-medium hover:bg-success/80 transition-colors">
              Invite
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/landlord/dashboard"
          className="flex-1 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-all duration-300 text-center"
        >
          Go to Dashboard
        </Link>
        <button className="flex-1 px-6 py-3 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center space-x-2">
          <Icon name="UserPlusIcon" size={20} />
          <span>Invite New Tenant</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-12">
        <div className="container mx-auto max-w-2xl px-4">
          <div className="glass rounded-2xl p-8">
            {renderProgressBar()}
            
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
            {currentStep === 5 && renderStep5()}
            {currentStep === 6 && renderStep6()}
            {currentStep === 7 && renderStep7()}
            {currentStep === 8 && renderStep8()}

            {currentStep > 1 && currentStep < 8 && (
              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                <button
                  onClick={prevStep}
                  className="px-6 py-3 border border-border text-foreground rounded-xl font-semibold hover:bg-muted transition-all duration-300 flex items-center space-x-2"
                >
                  <Icon name="ArrowLeftIcon" size={20} />
                  <span>Back</span>
                </button>
                
                <div className="flex space-x-3">
                  <button className="px-4 py-3 text-primary font-semibold hover:bg-primary/10 rounded-xl transition-colors">
                    Save & Resume Later
                  </button>
                  <button
                    onClick={nextStep}
                    className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-all duration-300 flex items-center space-x-2"
                  >
                    <span>Continue</span>
                    <Icon name="ArrowRightIcon" size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}