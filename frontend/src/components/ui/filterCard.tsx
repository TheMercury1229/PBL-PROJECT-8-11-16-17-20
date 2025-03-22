import { Label } from "@radix-ui/react-label";
import { Checkbox } from "@radix-ui/react-checkbox";
import * as React from "react";

const filterData = [
  {
    filterType: "Location",
    array: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata"]
  },
  {
    filterType: "Job Type",
    array: ["Part-Time", "Full-Time"]
  },
  {
    filterType: "Salary",
    array: ["₹000 - ₹10,000", "₹10,000 - ₹20,000", "₹20,000 - ₹30,000", "₹30,000 - ₹40,000", "₹40,000 - ₹50,000", "₹50,000+"]
  },
  {
    filterType: "Job Roles",
    array: [
      "Agricultural Worker", "Bus Driver", "Carpenter", "Construction Worker", "Cook",
      "Dock Worker", "Electrician", "Factory Worker", "Farm Laborer", "Fisherman",
      "Hotel Worker", "JCB Driver", "Janitor", "Lift Technician", "Machinist",
      "Maid", "Mechanic", "Miner", "Painter", "Plumber",
      "Pump Operator", "Truck Driver", "Waiter", "Warehouse Worker"
    ]
  }
];

const FilterCard = () => {
  const [selectedFilters, setSelectedFilters] = React.useState({});

  return (
    <div className="bg-white p-4 rounded-md shadow-md w-72 ml-4">
      <div className="flex justify-between items-center mb-2">
        <h1 className="font-bold text-lg">Filter Jobs</h1>
        <button className="bg-[#2a52be] text-white px-3 py-1 text-sm rounded-md hover:bg-blue-600 transition">
          Browse
        </button>
      </div>
      <hr className="mb-4" />

      {filterData.map((data, index) => (
        <div key={index} className="mb-4">
          <h2 className="font-semibold text-md">{data.filterType}</h2>

          {/* If the category is "Job Roles", show items in two columns */}
          <div className={`mt-2 ${data.filterType === "Job Roles" ? "grid grid-cols-2 gap-2" : "flex flex-col gap-2"}`}>
            {data.array.map((item, idx) => {
              const checkboxId = `${data.filterType}-${idx}`;
              return (
                <div key={idx} className="flex items-center space-x-2 cursor-pointer">
                  <Checkbox
                    id={checkboxId}
                    className="w-4 h-4 border-gray-400 border rounded-sm bg-white focus:ring-2 focus:ring-blue-500 data-[state=checked]:bg-blue-500"
                  />
                  <Label htmlFor={checkboxId} className="cursor-pointer">{item}</Label>
                </div>
              );
            })}
          </div>

        </div>
      ))}
    </div>
  );
};

export default FilterCard;
