import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`, {
          withCredentials: true, // Ensure cookies/token are sent
        });

        // console.log("GET ALL JOBS RESPONSE:", res.data); // 🔍 Debug log

        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.error("❌ Error fetching jobs:", error);
      }
    };

    fetchAllJobs();
  }, [searchedQuery, dispatch]); // Runs again if search changes
};

export default useGetAllJobs;
