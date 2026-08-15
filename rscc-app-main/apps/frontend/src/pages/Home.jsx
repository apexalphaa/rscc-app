import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Features from "../components/Features";
import About from "../components/About";
import Gallery from "../components/Gallery";
import Footer from "../components/Footer";
import WhyChoose from "../components/WhyChoose";
import Coaches from "../components/Coaches";
import UpcomingEvents from "../components/UpcomingEvents";
import CTA from "../components/CTA";
import Announcement from "../components/Announcement";
import QuickLinks from "../components/QuickLinks";
import PortalExplorer from "../components/PortalExplorer";
import LatestNotice from "../components/LatestNotice";
export default function Home() {
  return (
    
  <>
  <Navbar />
  <Announcement />
  <Hero />
  <LatestNotice />
  <Stats />
  <QuickLinks />
  <WhyChoose />
  <Features />
  <About />
  <Coaches />
  <UpcomingEvents />
  <Gallery />
  <CTA />
  <PortalExplorer />
  <Footer />
</>

  );
}
