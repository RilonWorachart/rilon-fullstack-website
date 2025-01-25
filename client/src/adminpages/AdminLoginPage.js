import React, { useState } from 'react'

function AdminLoginPage() {

  const [formData, setFormData] = useState({
    fname: '',
    password: '',
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the login logic here (e.g., authentication request)
    console.log('Form submitted', formData);
  };


  return (
    <>
      <div className="min-h-screen font-plex-sans-thai bg-[#f4f4f4] flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-semibold text-center text-[#333]">Admin Login</h1>
          <div className="text-[#E2B22C] h-[3px] w-[60px] bg-[#E2B22C] mx-auto my-2" />

          <form className="space-y-4" onSubmit={handleSubmit}>

            {/* First Name Input */}
            <div>
              <label htmlFor="fname" className="block font-semibold text-[#333]">UserName</label>
              <input
                type="text"
                id="fname"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
                required
                className="border w-full py-2 px-3 my-1 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block font-semibold text-[#333]">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="border w-full py-2 px-3 my-1 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <input
                type="submit"
                value="Login"
                className="py-2 px-4 text-white bg-[#28A745] border border-[#28A745] rounded-md hover:bg-[#218838] transition duration-300"
              />
            </div>
          </form>
        </div>
      </div>
    </>

  )
}

export default AdminLoginPage