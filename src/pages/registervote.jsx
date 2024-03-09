import React, { useState } from 'react';
import { useGlobalContext } from "../context";
import 'animate.css';

const RegisterVote = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState();
  const [isSubmitted, setSubmitted] = useState(false);

  const {address,contract,instance}=useGlobalContext();


  const handleSubmit =async () => {

    const encryptedAge=instance.encrypt32(Number(age));
    const tx=await contract.requestVoteright(firstName,lastName,encryptedAge);

    await tx.wait();
    
    setSubmitted(true);
  };

  return (
    <div className="relative flex justify-center items-center h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black">
      {/* Shapes */}
      <div className="absolute top-0 left-0 right-0 bottom-0 z-0">
      <div className="absolute w-32 h-32 bg-purple-600 rounded-full top-1/4 left-1/4 animate-flash"></div>
<div className="absolute w-16 h-16 bg-indigo-600 rounded-full bottom-1/4 right-1/4 animate-bounce"></div>
<div className="absolute w-20 h-20 bg-purple-600 rounded-full top-1/2 left-1/2 animate-spin"></div>
<div className="absolute w-24 h-24 bg-indigo-600 rounded-full bottom-1/2 right-1/2 animate-spin"></div>
<div className="absolute w-12 h-12 bg-purple-600 rounded-full top-3/4 left-3/4 animate-"></div>
<div className="absolute w-28 h-28 bg-indigo-600 rounded-full bottom-3/4 right-3/4 animate-"></div>
<div className="absolute w-16 h-16 bg-purple-600 rounded-full top-1/3 left-2/3 animate-spin"></div>
<div className="absolute w-24 h-24 bg-indigo-600 rounded-full bottom-1/3 right-2/3 animate-spin"></div>
      
      </div>

      {/* Form */}
      <div className="bg-gray-900 p-8 rounded-lg shadow-md w-96 relative z-10">
        <h2 className="text-2xl mb-4 font-bold text-center text-white">🗳️ Voter Registration</h2>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-400">First Name:</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-700 rounded mt-1 focus:outline-none focus:ring focus:border-blue-500 bg-gray-800 text-white"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-400">Last Name:</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-700 rounded mt-1 focus:outline-none focus:ring focus:border-blue-500 bg-gray-800 text-white"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-400">Age:</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-700 rounded mt-1 focus:outline-none focus:ring focus:border-blue-500 bg-gray-800 text-white"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <button
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-2 rounded hover:opacity-80 cursor-pointer focus:outline-none transition-all duration-300"
          onClick={handleSubmit}
        >
          Submit
        </button>

        {isSubmitted && (
          <div className="mt-4 text-green-400 font-semibold text-center">
            Form submitted successfully! 🎉
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterVote;
