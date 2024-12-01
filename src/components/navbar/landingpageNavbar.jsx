import logo from "../../assets/logo.svg";

export default function LandingNavbar() {
  return (
    <nav className="fixed top-0 left-0 z-50  w-full h-16 bg-primary flex items-center justify-center ">
      <div className="flex  items-center justify-between  w-mainWidth  py-8  text-white">
        <p className="text-2xl font-semibold hidden md:block hover:cursor-pointer">
          Coherence
        </p>
        <img
          src={logo}
          alt="logo"
          className="h-8 md:hidden hover:cursor-pointer"
        />
        <div className="flex items-center gap-4 md:gap-8 ">
          <p className="text-sm md:text-lg hover:text-secondary hover:cursor-pointer ">
            Pricing
          </p>
          <p className="text-sm md:text-lg hover:text-secondary hover:cursor-pointer">
            About Us
          </p>
          <p className="text-sm md:text-lg hover:text-secondary hover:cursor-pointer">
            Contact
          </p>
          {/*<p className="text-sm md:text-lg hover:text-secondary hover:cursor-pointer">
      Coherence Applied
    </p>*/}
        </div>
      </div>
    </nav>
  );
}
