import ScrollVideo from "./components/ScrollVideo";
import Navbar from "./components/Navbar";
import SectionOne from "./components/SectionOne";
import SectionProducts from "./components/SectionProducts";
import SectionTwo from "./components/SectionTwo";
import SectionContact from "./components/SectionContact";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="relative">
      <ScrollVideo />

      <div className="relative z-10">
        <Navbar />

        <main>
          <SectionOne />

          {/* Critical: gives the scroll video room to scrub between sections */}
          <div className="h-[80vh]" aria-hidden="true" />

          <SectionProducts />

          <SectionTwo />

          <SectionContact />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
