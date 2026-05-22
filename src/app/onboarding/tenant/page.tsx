"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Icon from "@/components/ui/AppIcon";
import Link from "next/link";

export default function TenantOnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1 - Entry
    signupMethod: '',
    mobile: '',
    
    // Step 2 - Basic Profile
    fullName: '',
    city: '',
    occupation: '',
    lookingTo: '',
    
    // Step 3 - Trust Level
    email: '',
    profilePhoto: null,
    
    // Step 4 - Rental Relationship
    rentalStatus: '',
    propertyCity: '',
    propertyArea: '',
    startDate: '',
    endDate: '',
    landlordContact: '',
    rentRange: '',
    
    // Step 5 - Verification
    verificationDocument: null,
    documentType: ''
  });

  const [trustLevel, setTrustLevel] = useState(0);

  const occupations = [
    "Software Engineer", "Teacher", "Doctor", "Student", 
    "Business Owner", "Consultant", "Sales Professional",
    "Government Employee", "Freelancer", "Other"
  ];

  const rentRanges = [
    "₹5,000 - ₹10,000", "₹10,000 - ₹20,000", "₹20,000 - ₹30,000",
    "₹30,000 - ₹50,000", "₹50,000 - ₹75,000", "₹75,000+"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 7) {
      setCurrentStep(prev => prev + 1);
      // Update trust level based on completed steps
      if (currentStep === 2) setTrustLevel(20);
      if (currentStep === 3) setTrustLevel(40);
      if (currentStep === 4) setTrustLevel(60);
      if (currentStep === 5) setTrustLevel(80);
      if (currentStep === 6) setTrustLevel(100);
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
        <span className="text-sm font-medium text-primary">{Math.round((currentStep / 7) * 100)}% Complete</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300" 
          style={{ width: `${(currentStep / 7) * 100}%` }}
        />
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="text-center space-y-6">
      <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
        <Icon name="StarIcon" size={20} className="text-primary" />
        <span className="text-sm font-semibold text-primary">Build Your Rental Reputation</span>
      </div>
      
      <h2 className="text-2xl font-bold text-foreground mb-4">
        Get Trusted Faster
      </h2>
      
      <p className="text-muted-foreground mb-8">
        Join thousands of verified tenants and build your rental reputation to get approved faster.
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
          <span>Sign up with Mobile Number</span>
        </button>
        
        <button
          onClick={() => {
            handleInputChange('signupMethod', 'google');
            nextStep();
          }}
          className="w-full px-6 py-4 border-2 border-border text-foreground rounded-xl font-semibold hover:bg-muted transition-all duration-300 flex items-center justify-center space-x-3"
        >
          <Icon name="GlobeAltIcon" size={20} />
          <span>Sign up with Google</span>
        </button>
      </div>

      <div className="flex items-center space-x-4 mt-6 text-sm text-muted-foreground">
        <div className="flex items-center space-x-2">
          <Icon name="ClockIcon" size={16} className="text-primary" />
          <span>30 seconds setup</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="ShieldCheckIcon" size={16} className="text-primary" />
          <span>No documents needed yet</span>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Basic Profile</h2>
        <p className="text-muted-foreground">Help us understand your rental needs</p>
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
            <Icon name="InformationCircleIcon" size={16} className="inline ml-1 text-muted-foreground" title="Why we ask this: To show you relevant properties in your area" />
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
            Current Occupation *
          </label>
          <select
            value={formData.occupation}
            onChange={(e) => handleInputChange('occupation', e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
          >
            <option value="">Select your occupation</option>
            {occupations.map((occ) => (
              <option key={occ} value={occ}>{occ}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Looking to *
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleInputChange('lookingTo', 'rent')}
              className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                formData.lookingTo === 'rent'
                  ? 'bg-primary text-white'
                  : 'border border-border text-foreground hover:bg-muted'
              }`}
            >
              🔍 Rent
            </button>
            <button
              type="button"
              onClick={() => handleInputChange('lookingTo', 'already-renting')}
              className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                formData.lookingTo === 'already-renting'
                  ? 'bg-primary text-white'
                  : 'border border-border text-foreground hover:bg-muted'
              }`}
            >
              🏠 Already Renting
            </button>
          </div>
        </div>
      </div>

      <div className="bg-muted/50 border border-border rounded-xl p-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="InformationCircleIcon" size={16} className="text-primary" />
          <span>No Aadhaar or PAN required at this stage. We keep it simple!</span>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Build Trust Level</h2>
        <p className="text-muted-foreground">Quick verification to boost your profile</p>
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
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Email Address *
            <Icon name="InformationCircleIcon" size={16} className="inline ml-1 text-muted-foreground" title="Why we ask this: For account security and important updates" />
          </label>
          <div className="relative">
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-4 py-3 pr-10 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
              placeholder="your.email@example.com"
            />
            <Icon name="EnvelopeIcon" size={20} className="absolute right-3 top-3.5 text-muted-foreground" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Profile Photo (Optional but recommended)
            <Icon name="InformationCircleIcon" size={16} className="inline ml-1 text-muted-foreground" title="Why we ask this: Helps landlords trust you more. +10% approval rate!" />
          </label>
          <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
            <Icon name="CameraIcon" size={32} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground mb-3">
              Upload a clear photo of yourself
            </p>
            <button className="px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
              Choose Photo
            </button>
          </div>
        </div>
      </div>

      <div className="bg-success/10 border border-success/20 rounded-xl p-4">
        <div className="flex items-center space-x-2 text-sm text-success">
          <Icon name="CheckCircleIcon" size={16} />
          <span>Profile photos get 10% higher approval rates from landlords!</span>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Add Rental Relationship</h2>
        <p className="text-muted-foreground">Tell us about your rental experience</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Rental Status *
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleInputChange('rentalStatus', 'currently-renting')}
              className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                formData.rentalStatus === 'currently-renting'
                  ? 'bg-primary text-white'
                  : 'border border-border text-foreground hover:bg-muted'
              }`}
            >
              <span>🏠</span>
              <span>Currently Renting</span>
            </button>
            <button
              type="button"
              onClick={() => handleInputChange('rentalStatus', 'past-rental')}
              className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                formData.rentalStatus === 'past-rental'
                  ? 'bg-primary text-white'
                  : 'border border-border text-foreground hover:bg-muted'
              }`}
            >
              <span>🏁</span>
              <span>Past Rental</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Property City *
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
              Area *
            </label>
            <input
              type="text"
              value={formData.propertyArea}
              onChange={(e) => handleInputChange('propertyArea', e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
              placeholder="e.g., Koramangala, Whitefield"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
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
              Tenancy End Date
            </label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => handleInputChange('endDate', e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
              placeholder="Leave blank if ongoing"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Landlord Contact *
            <Icon name="InformationCircleIcon" size={16} className="inline ml-1 text-muted-foreground" title="Why we ask this: To verify your rental relationship" />
          </label>
          <input
            type="text"
            value={formData.landlordContact}
            onChange={(e) => handleInputChange('landlordContact', e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
            placeholder="Landlord's mobile number or email"
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
          <span>We'll send a verification request to your landlord to confirm this relationship</span>
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Relationship Verification</h2>
        <p className="text-muted-foreground">Upload proof to verify your rental relationship</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Document Type *
            <Icon name="InformationCircleIcon" size={16} className="inline ml-1 text-muted-foreground" title="Why we ask this: To prevent fake reviews and ensure authenticity" />
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'rent-receipt', label: 'Rent Receipt', icon: 'DocumentTextIcon' },
              { id: 'rental-agreement', label: 'Rental Agreement', icon: 'DocumentIcon' },
              { id: 'bank-payment', label: 'Bank Payment', icon: 'BanknotesIcon' }
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

      <div className="space-y-3">
        <div className="bg-success/10 border border-success/20 rounded-xl p-4">
          <div className="flex items-center space-x-2 text-sm text-success">
            <Icon name="ShieldCheckIcon" size={16} />
            <span>Partial documents are allowed - we just need to verify the relationship</span>
          </div>
        </div>

        <div className="bg-warning/10 border border-warning/20 rounded-xl p-4">
          <div className="flex items-center space-x-2 text-sm text-warning">
            <Icon name="ExclamationTriangleIcon" size={16} />
            <span>This step prevents fake reviews and keeps our platform trustworthy</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep6 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Review Phase</h2>
        <p className="text-muted-foreground">Leave a review for your landlord (only after tenancy ends)</p>
      </div>

      {formData.rentalStatus === 'currently-renting' ? (
        <div className="glass rounded-2xl p-8 text-center">
          <Icon name="ClockIcon" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-bold text-foreground mb-2">Review Locked</h3>
          <p className="text-muted-foreground mb-6">
            You can only rate your landlord after your tenancy ends and both parties confirm the exit date.
          </p>
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
            <div className="flex items-center space-x-2 text-sm text-primary">
              <Icon name="InformationCircleIcon" size={16} />
              <span>This prevents biased reviews during active tenancy</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-success/10 border border-success/20 rounded-xl p-4 mb-6">
            <div className="flex items-center space-x-2 text-sm text-success">
              <Icon name="CheckCircleIcon" size={16} />
              <span>Review unlocked - Your tenancy has ended</span>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { id: 'rent-fairness', label: 'Rent Fairness', icon: 'CurrencyRupeeIcon' },
              { id: 'maintenance', label: 'Maintenance Response', icon: 'WrenchScrewdriverIcon' },
              { id: 'behavior', label: 'Behavior & Professionalism', icon: 'UserIcon' },
              { id: 'overall', label: 'Overall Trust', icon: 'StarIcon' }
            ].map((category) => (
              <div key={category.id} className="glass rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Icon name={category.icon} size={20} className="text-primary" />
                    <span className="font-medium text-foreground">{category.label}</span>
                  </div>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        className="w-8 h-8 rounded hover:bg-warning/20 transition-colors flex items-center justify-center"
                      >
                        <Icon name="StarIcon" size={16} className="text-muted-foreground hover:text-warning" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Text Review (Optional but recommended)
            </label>
            <textarea
              rows={4}
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background resize-none"
              placeholder="Share your experience with this landlord to help future tenants..."
            />
          </div>
        </div>
      )}
    </div>
  );

  const renderStep7 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-success/10 border border-success/20 rounded-full mb-4">
          <Icon name="CheckCircleIcon" size={20} className="text-success" />
          <span className="text-sm font-semibold text-success">Profile Complete!</span>
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Your Tenant Dashboard</h2>
        <p className="text-muted-foreground">Welcome to your personalized rental profile</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Reputation Score */}
        <div className="glass rounded-2xl p-6 text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-primary">85</span>
          </div>
          <h3 className="font-bold text-foreground mb-2">Rental Reputation Score</h3>
          <p className="text-sm text-muted-foreground">Based on your rental history and landlord reviews</p>
        </div>

        {/* Payment Streak */}
        <div className="glass rounded-2xl p-6 text-center">
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-success">12</span>
          </div>
          <h3 className="font-bold text-foreground mb-2">Payment Streak</h3>
          <p className="text-sm text-muted-foreground">Months of on-time rent payments</p>
        </div>

        {/* Review Count */}
        <div className="glass rounded-2xl p-6 text-center">
          <div className="w-20 h-20 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-warning">3</span>
          </div>
          <h3 className="font-bold text-foreground mb-2">Review Count</h3>
          <p className="text-sm text-muted-foreground">Verified landlord reviews</p>
        </div>

        {/* Share Profile */}
        <div className="glass rounded-2xl p-6 text-center">
          <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="ShareIcon" size={32} className="text-accent" />
          </div>
          <h3 className="font-bold text-foreground mb-2">Share Profile</h3>
          <p className="text-sm text-muted-foreground">Let landlords view your verified profile</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/tenant/dashboard"
          className="flex-1 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-all duration-300 text-center"
        >
          Go to Dashboard
        </Link>
        <button className="flex-1 px-6 py-3 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-300">
          Share Profile
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

            {currentStep > 1 && currentStep < 7 && (
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