import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <section className="w-full bg-gradient-to-br from-white via-[#f9f4ff] to-[#f2eaff] py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <div className="inline-block px-5 py-2 mb-6 rounded-full bg-[#fdf2f2] text-[#F83002] font-medium text-sm shadow-sm">
          India’s Leading Career Maker for Freshers and Professionals
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
          Search, Apply & <br />
          Get Your <span className="text-[#6A38C2]">Dream Jobs</span>
        </h1>

        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto mb-8">
          Connecting talent with opportunity — we bridge the gap between job seekers and top employers.
        </p>

        <div className="flex items-center w-full max-w-xl mx-auto bg-white border border-gray-200 rounded-full px-4 py-2 shadow-md focus-within:ring-2 focus-within:ring-[#6A38C2] transition">
          <input
            type="text"
            placeholder="Find your dream jobs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow px-2 py-2 outline-none border-none text-sm sm:text-base"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-full px-4 py-2 bg-[#6A38C2] hover:bg-[#5a2dad] transition-colors duration-200"
          >
            <Search className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
