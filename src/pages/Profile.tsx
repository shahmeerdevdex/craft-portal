
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Camera, CheckCircle, MapPin, Star } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  // Personal Information form state
  const [personalInfo, setPersonalInfo] = useState({
    fullName: 'John Doe',
    businessName: 'JD Contracting',
    email: 'john@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St, Springfield, IL 62701',
    about: 'Professional contractor with over 10 years of experience in residential and commercial projects. Specializing in roofing, electrical work, and general maintenance.',
  });

  // Skills form state
  const [skills, setSkills] = useState({
    lawnCare: true,
    roofing: true,
    plumbing: false,
    electrical: true,
    maintenance: true,
    inspector: false,
  });

  // Service area form state
  const [serviceArea, setServiceArea] = useState({
    zipCodes: '62701, 62702, 62703, 62704, 62711',
    radius: '25',
  });

  // Payment info form state
  const [paymentInfo, setPaymentInfo] = useState({
    accountConnected: false,
    preferredMethod: 'bank',
  });

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillChange = (skill: string, checked: boolean) => {
    setSkills(prev => ({ ...prev, [skill]: checked }));
  };

  const handleServiceAreaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setServiceArea(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated",
    });
  };

  const handleConnectPayment = () => {
    // This would typically redirect to Stripe Connect or another payment provider
    setTimeout(() => {
      setPaymentInfo(prev => ({ ...prev, accountConnected: true }));
      toast({
        title: "Payment account connected",
        description: "You can now receive payments for completed jobs",
      });
    }, 1000);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
          {isEditing ? (
            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button className="btn-primary" onClick={handleSaveProfile}>
                Save Changes
              </Button>
            </div>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Summary Card */}
          <Card className="lg:col-span-1">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src="" alt={personalInfo.fullName} />
                    <AvatarFallback className="bg-blue-100 text-blue-500 text-2xl">
                      {personalInfo.fullName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button 
                      size="icon" 
                      className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-blue-500 hover:bg-blue-600"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div>
                  <h2 className="font-bold text-xl">{personalInfo.fullName}</h2>
                  {personalInfo.businessName && (
                    <p className="text-neutral-600">{personalInfo.businessName}</p>
                  )}
                  <div className="flex items-center justify-center mt-1 text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4" />
                    <span className="text-neutral-600 ml-1 text-sm">(4.0)</span>
                  </div>
                </div>
                <div className="flex items-center text-neutral-600 text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  Springfield, IL Area
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {skills.lawnCare && <Badge className="bg-green-100 text-green-700 hover:bg-green-200">Lawn Care</Badge>}
                  {skills.roofing && <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">Roofing</Badge>}
                  {skills.plumbing && <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-200">Plumbing</Badge>}
                  {skills.electrical && <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200">Electrical</Badge>}
                  {skills.maintenance && <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">Maintenance</Badge>}
                  {skills.inspector && <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200">Inspector</Badge>}
                </div>
                <div className="w-full border-t border-border pt-4 mt-2">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-left">
                      <p className="text-neutral-500">Jobs Completed</p>
                      <p className="font-bold text-lg">28</p>
                    </div>
                    <div className="text-left">
                      <p className="text-neutral-500">Member Since</p>
                      <p className="font-bold text-lg">Jan 2023</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Details */}
          <Card className="lg:col-span-3">
            <CardContent className="pt-6">
              <Tabs defaultValue="personal">
                <TabsList className="mb-4">
                  <TabsTrigger value="personal">Personal Info</TabsTrigger>
                  <TabsTrigger value="skills">Skills & Services</TabsTrigger>
                  <TabsTrigger value="location">Service Area</TabsTrigger>
                  <TabsTrigger value="payment">Payment</TabsTrigger>
                </TabsList>

                {/* Personal Info Tab */}
                <TabsContent value="personal" className="space-y-4">
                  <h3 className="font-medium text-lg">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={personalInfo.fullName}
                        onChange={handlePersonalInfoChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Business Name (optional)</Label>
                      <Input
                        id="businessName"
                        name="businessName"
                        value={personalInfo.businessName}
                        onChange={handlePersonalInfoChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={personalInfo.email}
                        onChange={handlePersonalInfoChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={personalInfo.phone}
                        onChange={handlePersonalInfoChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={personalInfo.address}
                        onChange={handlePersonalInfoChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="about">About Me</Label>
                      <Textarea
                        id="about"
                        name="about"
                        value={personalInfo.about}
                        onChange={handlePersonalInfoChange}
                        rows={4}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </TabsContent>

                {/* Skills Tab */}
                <TabsContent value="skills" className="space-y-6">
                  <div>
                    <h3 className="font-medium text-lg mb-4">Services & Skills</h3>
                    <p className="text-neutral-600 mb-4">
                      Select all the services you can provide. You'll receive job notifications matching your skills.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="lawnCare" 
                          checked={skills.lawnCare}
                          onCheckedChange={(checked) => handleSkillChange('lawnCare', checked as boolean)}
                          disabled={!isEditing}
                        />
                        <label
                          htmlFor="lawnCare"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Lawn Care & Landscaping
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="roofing" 
                          checked={skills.roofing}
                          onCheckedChange={(checked) => handleSkillChange('roofing', checked as boolean)}
                          disabled={!isEditing}
                        />
                        <label
                          htmlFor="roofing"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Roofing & Gutters
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="plumbing" 
                          checked={skills.plumbing}
                          onCheckedChange={(checked) => handleSkillChange('plumbing', checked as boolean)}
                          disabled={!isEditing}
                        />
                        <label
                          htmlFor="plumbing"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Plumbing
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="electrical" 
                          checked={skills.electrical}
                          onCheckedChange={(checked) => handleSkillChange('electrical', checked as boolean)}
                          disabled={!isEditing}
                        />
                        <label
                          htmlFor="electrical"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Electrical
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="maintenance" 
                          checked={skills.maintenance}
                          onCheckedChange={(checked) => handleSkillChange('maintenance', checked as boolean)}
                          disabled={!isEditing}
                        />
                        <label
                          htmlFor="maintenance"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          General Maintenance & Handyman
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="inspector" 
                          checked={skills.inspector}
                          onCheckedChange={(checked) => handleSkillChange('inspector', checked as boolean)}
                          disabled={!isEditing}
                        />
                        <label
                          htmlFor="inspector"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Photo Site Inspector
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-lg mb-4">Licenses & Certifications</h3>
                    
                    <div className="border rounded-md p-4 bg-neutral-50">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <p className="font-medium">Upload your contractor licenses or certifications</p>
                          <p className="text-sm text-neutral-600 mt-1">
                            Some jobs may require verification of your professional credentials
                          </p>
                        </div>
                        <Button className="btn-primary" disabled={!isEditing}>
                          Upload Document
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Service Area Tab */}
                <TabsContent value="location" className="space-y-4">
                  <h3 className="font-medium text-lg">Service Area</h3>
                  <p className="text-neutral-600 mb-4">
                    Define the area where you're available to work. You'll receive job notifications within this area.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="zipCodes">ZIP Codes (comma separated)</Label>
                      <Textarea
                        id="zipCodes"
                        name="zipCodes"
                        value={serviceArea.zipCodes}
                        onChange={handleServiceAreaChange}
                        placeholder="e.g. 62701, 62702, 62703"
                        disabled={!isEditing}
                      />
                      <p className="text-sm text-neutral-600">Enter all ZIP codes where you can provide services</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="radius">Service Radius (miles)</Label>
                      <Input
                        id="radius"
                        name="radius"
                        type="number"
                        value={serviceArea.radius}
                        onChange={handleServiceAreaChange}
                        disabled={!isEditing}
                      />
                      <p className="text-sm text-neutral-600">Distance you're willing to travel from your home location</p>
                    </div>
                  </div>
                </TabsContent>

                {/* Payment Tab */}
                <TabsContent value="payment" className="space-y-4">
                  <h3 className="font-medium text-lg">Payment Information</h3>
                  <p className="text-neutral-600 mb-4">
                    Connect your payment method to receive funds for completed jobs
                  </p>
                  
                  {paymentInfo.accountConnected ? (
                    <div className="rounded-md border border-green-200 bg-green-50 p-4">
                      <div className="flex">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <div>
                          <h4 className="font-medium text-green-700">Payment Account Connected</h4>
                          <p className="text-sm text-green-600 mt-1">
                            Your account is set up to receive payments
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-md border p-4">
                      <h4 className="font-medium">Connect Payment Account</h4>
                      <p className="text-sm text-neutral-600 mt-1 mb-4">
                        Connect your bank account or payment method to get paid for completed jobs
                      </p>
                      <Button 
                        onClick={handleConnectPayment} 
                        className="bg-[#6772E5] hover:bg-[#5469D4] text-white"
                      >
                        Connect Account
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

// Create Badge component for skills
const Badge = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`px-2 py-1 rounded-full text-xs font-medium ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Profile;
