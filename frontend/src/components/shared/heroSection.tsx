import * as React from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

const jobs = [
  "Agricultural Worker", "Bus Driver", "Carpenter", "Construction Worker", "Cook",
  "Dock Worker", "Electrician", "Factory Worker", "Farm Laborer", "Fisherman",
  "Hotel Worker", "JCB Driver", "Janitor", "Lift Technician", "Machinist",
  "Maid", "Mechanic", "Miner", "Painter", "Plumber",
  "Pump Operator", "Truck Driver", "Waiter", "Warehouse Worker"
];

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredJobs, setFilteredJobs] = React.useState([]);
  const [dropdownVisible, setDropdownVisible] = React.useState(false);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.length > 0) {
      const filtered = jobs.filter((job) =>
        job.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredJobs(filtered);
      setDropdownVisible(true);
    } else {
      setDropdownVisible(false);
    }
  };

  const text = "Jobs That Keep the World Moving!";
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.03, duration: 0.2 },
    }),
  };

  return (
    <div className="relative text-center z-10">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-[center_20%] bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://jobgrin.co.in/blog/wp-content/uploads/2021/08/Boilermaker.jpg')",
        }}
      />
      {/* Overlay for Transparency */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Content */}
      <div className="relative flex flex-col gap-7 my-10 z-10">
        {/* Updated Badge with Lower Position */}
        <span className="mx-auto px-4 py-2 rounded-full bg-white text-[#EF0107] font-medium mt-4">
          No.1 Blue Collar Job Hunt Website
        </span>

        {/* Animated Text with Spaces & Colored "World" */}
        <h1 className="text-5xl font-bold text-white flex flex-wrap justify-center">
          {text.split(" ").map((word, wordIndex) => (
            <span key={wordIndex} className="mr-2 flex">
              {word.split("").map((char, charIndex) => (
                <motion.span
                  key={charIndex}
                  custom={wordIndex * 6 + charIndex} // Adjust delay per letter
                  initial="hidden"
                  animate="visible"
                  variants={textVariants}
                  className={word === "World" ? "text-[#0039a6]" : ""}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </h1>

        <p className="text-white text-lg">
          Find the best jobs for blue-collar professionals. Search and apply easily!
        </p>

        {/* Search Bar */}
        <div className="relative w-[40%] shadow-lg border-gray-200 rounded-full flex items-center mx-auto bg-white">
          <input
            type="text"
            placeholder=" Find your job"
            className="outline-none border-none w-full px-4 py-3 rounded-full"
            value={searchTerm}
            onChange={handleSearch}
          />

          {/* Search Button Covering Full Height */}
          <Button className="absolute right-0 top-0 h-full rounded-r-full px-6 bg-[#0039a6] flex items-center justify-center">
            <Search className="h-5 w-5 text-white" />
          </Button>

          {/* Dropdown */}
          {dropdownVisible && (
            <div className="absolute left-0 top-full w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 z-50 max-h-52 overflow-y-auto">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSearchTerm(job);
                      setDropdownVisible(false);
                    }}
                  >
                    {job}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500">No results found</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
