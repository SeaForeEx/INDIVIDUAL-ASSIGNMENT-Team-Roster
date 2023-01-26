/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import MemberCard from '../../components/MemberCard';
import { viewTeamDetails } from '../../api/mergedData';

export default function ViewTeam() {
  const router = useRouter();
  const [teamDetails, setTeamDetails] = useState([]);
  const { firebaseKey } = router.query;

  const xavierTeamDetails = () => {
    viewTeamDetails(firebaseKey).then(setTeamDetails);
  };

  useEffect(() => {
    viewTeamDetails(firebaseKey).then(setTeamDetails);
  }, [firebaseKey]);

  return (
    <>
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column">
          <img src={teamDetails.image} alt={teamDetails.name} style={{ width: '300px' }} />
        </div>
        <div className="text-white ms-5 details">
          <h5>
            {teamDetails.name}
          </h5>
          <p>Location: {teamDetails.location}</p>
        </div>
      </div>
      <hr />
      <div className="d-flex flex-wrap">
        {teamDetails.members?.map((member) => (
          <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={xavierTeamDetails} />
        ))}
      </div>
    </>
  );
}
