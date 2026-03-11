import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import WhyBuilders from "@/components/WhyBuilders";
import ActiveOpportunities from "@/components/ActiveOpportunities";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <WhyBuilders />
      <ActiveOpportunities />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;
