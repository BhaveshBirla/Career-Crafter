import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto my-8 px-4 sm:px-6'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between my-4'>
          <Input
            className="w-full sm:w-1/2"
            placeholder="Filter by name, role"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="w-full sm:w-auto"
          >
            New Job
          </Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  )
}

export default AdminJobs
