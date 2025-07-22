import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer"
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-16 overflow-hidden">
      {/* Carousel container must be relative */}
      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent>
            {category.map((cat, index) => (
              <CarouselItem
                key={index}
                className="basis-[80%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 flex justify-center"
              >
                <Button
                  onClick={() => searchJobHandler(cat)}
                  variant="outline"
                  className="rounded-full border-[#6A38C2] text-[#6A38C2] hover:bg-[#6A38C2] hover:text-white transition px-6 py-3 font-medium whitespace-nowrap shadow"
                >
                  {cat}
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Responsive arrows inside container */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 sm:block hidden">
            <CarouselPrevious className="ml-2" />
          </div>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 sm:block hidden">
            <CarouselNext className="mr-2" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default CategoryCarousel;
