import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <section className="w-full bg-gradient-to-b from-white via-[#f9f4ff] to-[#f2eaff] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">
          <span className="text-[#6A38C2]">Latest & Top </span> Job Openings
        </h2>

        {allJobs.length <= 0 ? (
          <p className="text-center text-gray-500 text-lg">🚫 No Job Available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allJobs.slice(0, 6).map((job) => (
              <LatestJobCards key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestJobs;
