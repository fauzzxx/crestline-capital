import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-28 pb-20 section-container max-w-3xl">
      <h1 className="text-3xl font-heading font-bold mb-8">Terms & <span className="gold-gradient-text">Conditions</span></h1>
      <div className="prose prose-invert max-w-none space-y-6 text-cream-muted text-sm leading-relaxed">
        <p>These terms govern your use of the Crestline Capital platform and membership services.</p>
        <h3 className="text-foreground font-heading text-lg">1. Membership</h3>
        <p>Membership is granted at the sole discretion of Crestline Capital. All applicants must provide accurate information and meet eligibility criteria. Membership may be revoked at any time for breach of terms.</p>
        <h3 className="text-foreground font-heading text-lg">2. Capital Pool Participation</h3>
        <p>Joining a Capital Pool constitutes a soft commitment. Final commitments are subject to individual verification and agreement signing. Crestline Capital does not guarantee any specific discount or outcome.</p>
        <h3 className="text-foreground font-heading text-lg">3. Confidentiality</h3>
        <p>All project details, pricing, and deal terms shared on the platform are confidential. Members agree not to disclose these to any third party without prior written consent.</p>
        <h3 className="text-foreground font-heading text-lg">4. Limitation of Liability</h3>
        <p>Crestline Capital acts as a facilitator and aggregator. We do not provide financial, investment, or legal advice. All property transactions are between the buyer and the builder.</p>
        <h3 className="text-foreground font-heading text-lg">5. Modifications</h3>
        <p>These terms may be updated at any time. Continued use of the platform constitutes acceptance of any modifications.</p>
      </div>
    </div>
    <Footer />
  </div>
);

export default TermsPage;
