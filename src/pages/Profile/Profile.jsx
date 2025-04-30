import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance.js';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get('/user/profile');
        console.log(response, 'response');
        setProfile(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="text-center text-lg text-gray-500">Loading...</div>;
  if (error) return <div className="text-center text-lg text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-200">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Your Profile</h1>

        {profile && (
          <div className="space-y-4">
            <div className="flex gap-3">
              <span className="text-lg font-medium ">Name:</span>
              <span className="text-lg text-gray-900">{profile?.data.profile.name}</span>
            </div>
            <div className="flex gap-4">
              <span className="text-lg font-medium ">Email:</span>
              <span className="text-lg text-gray-900">{profile?.data.profile.email}</span>
            </div>
            {/* Add more fields here as per your User model */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
