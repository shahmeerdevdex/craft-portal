
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Star, Clock, Map, DollarSign, Camera } from 'lucide-react';

const features = [
  {
    title: 'Find Jobs Near You',
    description: 'Browse jobs in your area that match your skills and availability',
    icon: <Map className="h-6 w-6 text-blue-500" />,
  },
  {
    title: 'Track Your Progress',
    description: 'Manage all your jobs in one dashboard with status updates',
    icon: <Clock className="h-6 w-6 text-blue-500" />,
  },
  {
    title: 'Document Your Work',
    description: 'Upload photos and add comments directly from your device',
    icon: <Camera className="h-6 w-6 text-blue-500" />,
  },
  {
    title: 'Get Paid Quickly',
    description: 'Receive secure payments as soon as your work is approved',
    icon: <DollarSign className="h-6 w-6 text-blue-500" />,
  },
];

const testimonials = [
  {
    quote: "TradesmenPortal has transformed how I find jobs. No more middlemen, just direct connections to clients who need my services.",
    author: "Mike Johnson",
    role: "Electrician",
    rating: 5,
  },
  {
    quote: "I've increased my monthly income by over 30% since joining. The platform is intuitive and the job alerts are perfect for my schedule.",
    author: "Sarah Williams",
    role: "Maintenance Specialist",
    rating: 5,
  },
  {
    quote: "As a roofer, the photo upload feature helps me document my work clearly. Clients appreciate the transparency and I get paid faster.",
    author: "Robert Garcia",
    role: "Roofing Contractor",
    rating: 4,
  },
];

const benefits = [
  "Direct connection to property management companies",
  "No subscription fees - only a small fee on completed jobs",
  "Weekly payment processing",
  "Build your reputation with ratings and reviews",
  "Manage your own schedule and service area",
  "Simple mobile interface for on-the-go updates",
];

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-500">TradesmenPortal</h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <Link to="/register" className="text-neutral-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">Register</Link>
                <Link to="/login">
                  <Button variant="outline">Log In</Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white">Get Started</Button>
                </Link>
              </div>
            </div>
            <div className="md:hidden flex items-center space-x-2">
              <Link to="/login">
                <Button variant="outline" size="sm">Log In</Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="bg-blue-500 text-white">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-500 to-blue-700 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Connect with Jobs.<br className="hidden md:block" /> Get Paid.<br className="hidden md:block" /> Grow Your Business.
              </h1>
              <p className="mt-4 text-lg md:text-xl text-blue-100 max-w-xl mx-auto md:mx-0">
                Join our network of verified tradespeople and connect directly with property management companies looking for your skills.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto bg-white text-blue-700 hover:bg-blue-50">
                    Sign Up Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-blue-600">
                    Log In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block md:w-1/2">
              <div className="relative ml-10">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-blue-400 rounded-lg blur opacity-50"></div>
                <div className="relative bg-white p-6 rounded-lg shadow-xl">
                  <div className="grid grid-cols-2 gap-4">
                    {features.map((feature, index) => (
                      <div key={index} className="flex flex-col p-4 rounded-lg bg-gray-50">
                        <div className="mb-2">{feature.icon}</div>
                        <h3 className="font-medium">{feature.title}</h3>
                        <p className="text-sm text-neutral-600 mt-1">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-12 md:py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-neutral-900">How It Works</h2>
            <p className="mt-4 text-lg text-neutral-600 max-w-3xl mx-auto">
              TradesmenPortal connects skilled tradespeople with property management companies looking for reliable contractors.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-medium">Create Your Profile</h3>
              <p className="mt-2 text-neutral-600">
                Sign up and set up your professional profile with your skills, service area, and hourly rates.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-medium">Accept Jobs</h3>
              <p className="mt-2 text-neutral-600">
                Browse available jobs in your area, review details, and accept work that fits your schedule.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-medium">Complete & Get Paid</h3>
              <p className="mt-2 text-neutral-600">
                Finish the job, upload verification photos, and receive payment directly to your account.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-neutral-900">Why Join TradesmenPortal?</h2>
              <p className="mt-4 text-lg text-neutral-600">
                Our platform is designed specifically for tradespeople who want to grow their business and find reliable work.
              </p>
              
              <div className="mt-8 space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <p>{benefit}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <Link to="/register">
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                    Join Now
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="mt-12 md:mt-0 md:w-1/2">
              <div className="bg-neutral-50 rounded-lg p-8 border border-border">
                <h3 className="text-xl font-medium mb-4">What Our Tradespeople Say</h3>
                
                <div className="space-y-6">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex text-amber-400 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < testimonial.rating ? 'fill-current' : ''}`} 
                          />
                        ))}
                      </div>
                      <p className="text-neutral-600 italic">"{testimonial.quote}"</p>
                      <div className="mt-3">
                        <p className="font-medium">{testimonial.author}</p>
                        <p className="text-sm text-neutral-500">{testimonial.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-blue-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to Find More Work?</h2>
          <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto">
            Join thousands of tradespeople who are growing their business with TradesmenPortal.
          </p>
          <div className="mt-8">
            <Link to="/register">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                Create Your Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-bold mb-4">TradesmenPortal</h3>
              <p className="text-sm">
                Connecting skilled tradespeople with property management companies nationwide.
              </p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/register" className="hover:text-white">Register</Link></li>
                <li><Link to="/login" className="hover:text-white">Log In</Link></li>
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Lawn Care</a></li>
                <li><a href="#" className="hover:text-white">Roofing</a></li>
                <li><a href="#" className="hover:text-white">Plumbing</a></li>
                <li><a href="#" className="hover:text-white">Electrical</a></li>
                <li><a href="#" className="hover:text-white">Maintenance</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-neutral-800 text-sm text-center">
            <p>&copy; {new Date().getFullYear()} TradesmenPortal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
