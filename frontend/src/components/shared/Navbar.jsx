import React, { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, Menu, User2, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Logout failed');
    }
  };

  const navLinks = user && user.role === 'recruiter' ? (
    <>
      <li><Link to="/admin/companies">Companies</Link></li>
      <li><Link to="/admin/jobs">Jobs</Link></li>
    </>
  ) : (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/jobs">Jobs</Link></li>
      <li><Link to="/browse">Browse</Link></li>
    </>
  );

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3">
        {/* Logo */}
        <div className="text-2xl font-bold text-[#6A38C2]">
          Career<span className="text-[#F83002]">Crafter</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          <ul className="flex items-center gap-6 font-medium text-gray-700">
            {navLinks}
          </ul>

          {!user ? (
            <div className="flex gap-2">
              <Link to="/login"><Button variant="outline">Login</Button></Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white">Signup</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                  <Avatar>
                    {user?.profile?.profilePhoto ? (
                      <AvatarImage src={user.profile.profilePhoto} />
                    ) : (
                      <span className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600 font-bold text-xl">
                        {user?.fullname ? user.fullname.charAt(0).toUpperCase() : <User2 />}
                      </span>
                    )}
                  </Avatar>
                  <span className="font-medium text-gray-700 hidden sm:inline">Profile</span>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-3 mb-4">
                  <Avatar>
                    {user?.profile?.profilePhoto ? (
                      <AvatarImage src={user.profile.profilePhoto} />
                    ) : (
                      <span className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600 font-bold text-xl">
                        {user?.fullname ? user.fullname.charAt(0).toUpperCase() : <User2 />}
                      </span>
                    )}
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-gray-600">
                  {user?.role === 'student' && (
                    <div className="flex items-center gap-2">
                      <User2 />
                      <Button variant="link">
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 shadow-md">
          <ul className="flex flex-col gap-3 font-medium text-gray-700">
            {navLinks}
          </ul>

          {!user ? (
            <div className="flex flex-col gap-2 mt-4">
              <Link to="/login">
                <Button variant="outline" className="w-full">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] text-white hover:bg-[#5b30a6] w-full">Signup</Button>
              </Link>
            </div>
          ) : (
            <div className="mt-4 space-y-2 text-gray-700">
              {user.role === 'student' && (
                <Button variant="link" className="w-full justify-start">
                  <User2 className="mr-2" />
                  <Link to="/profile">View Profile</Link>
                </Button>
              )}
              <Button variant="link" className="w-full justify-start" onClick={logoutHandler}>
                <LogOut className="mr-2" />
                Logout
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
