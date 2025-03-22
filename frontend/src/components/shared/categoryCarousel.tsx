import * as React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Button } from "../ui/button";

const category = [
  "Agricultural Worker", "Bus Driver", "Carpenter", "Construction Worker", "Cook",
  "Dock Worker", "Electrician", "Factory Worker", "Farm Laborer", "Fisherman",
  "Hotel Worker", "JCB Driver", "Janitor", "Lift Technician", "Machinist",
  "Maid", "Mechanic", "Miner", "Painter", "Plumber",
  "Pump Operator", "Truck Driver", "Waiter", "Warehouse Worker"
];

const CategoryCarousel = () => {
  return (
    <div className="relative z-0"> {/* Lower z-index so it's behind */}
      <Carousel className="w-full max-w-xl mx-auto my-10">
        <CarouselContent className="gap-2">
          {category.map((cat, index) => (
            <CarouselItem key={index} className="basis-1/3 px-1">
              <Button variant="outline" className="rounded-full text-sm px-3 py-1">
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
