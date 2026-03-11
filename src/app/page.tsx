import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import WhyBuilders from "@/components/WhyBuilders";
import ActiveOpportunities from "@/components/ActiveOpportunities";
import MembershipSection from "@/components/MembershipSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <WhyBuilders />
      <ActiveOpportunities />
      <MembershipSection />
      <AboutSection />
      <Footer />
    </div>
  );
}
