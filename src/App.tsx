import Navbar from "./components/Navbar";
import SectionOne from "./components/SectionOne";
import SectionProducts from "./components/SectionProducts";
import SectionTwo from "./components/SectionTwo";
import SectionContact from "./components/SectionContact";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="relative">
      <Navbar />

      <main>
        <SectionOne />
        <SectionProducts />
        <SectionTwo />
        <SectionContact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
