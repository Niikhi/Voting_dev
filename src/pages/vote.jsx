import React, { useState, useEffect } from 'react';
import partiesData from '../context/party.json';
import ThankYouMessage from '../components/ThankYouMessage';

const Vote = () => {
  const [parties, setParties] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    setParties(partiesData);


    
  }, []);

  const handleVote = (partyId) => {
      console.log(`Vote casted for Party ${partyId}`);
      setHasVoted(true);
  };

  return (
    <div className="flex justify-start flex-col items-left rounded-lg p-4 shadow-md">
      <h2 className="text-2xl pb-4 font-semibold text-center text-white"><span className="text-purple-400">Election Contest</span></h2>
      <p className="text-lg mb-5 text-white font-semibold"><span className="italic text-gray-400">Vote for your favorite party!</span></p>

      <div className="mb-4 border-b-4 border-gray-300 p-2 flex items-center">
  <div className="flex items-center w-full py-2 px-8">
    <div className="w-1/3"> 
      <h3 className="text-lg text-white font-semibold mb-1">Party Name</h3>
    </div>
    <div className="w-1/3 items-center text-center flex-grow mb-1"> 
      <h3 className="text-lg text-white font-semibold mb-1">Description</h3>
    </div>
    <div className="w-1/3 items-center text-right"> 
      <h3 className="text-lg text-white font-semibold">Logo</h3>
    </div>
  </div>
</div>

      {parties.map((party) => (
        <div key={party.id} className="mb-4 border-b-2 border-gray-300 p-2 flex items-center">
          <div className="flex items-center w-full py-2 px-8">
            <h3 className="text-lg text-white font-semibold flex-grow">{party.name}</h3>
            <div className="max-w-100 overflow-x-auto items-center text-left flex-grow">
              <p className="text-sm text-gray-400">{party.description}</p>
            </div>
            <img
              src={party.logo}
              alt={`${party.name} Logo`}
              className="w-10 h-10 ml-3 cursor-pointer"
              onClick={() => handleVote(party.id)}
            />
          </div>
        </div>
      ))}
      {hasVoted && <ThankYouMessage />}
    </div>
  );
};

export default Vote;
