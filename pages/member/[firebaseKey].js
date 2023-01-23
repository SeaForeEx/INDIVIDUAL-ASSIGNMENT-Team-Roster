/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewMemberDetails } from '../../api/mergedData';

export default function ViewMember() {
  const [memberDetails, setMemberDetails] = useState({}); // useState & Effect are react
  const router = useRouter(); // useRouter is next.js

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewMemberDetails(firebaseKey).then(setMemberDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={memberDetails.image} alt={memberDetails.image} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {memberDetails.name}
        </h5>
        <p>Role: {memberDetails.role}</p>
        <p>Power: {memberDetails.power}</p>
        <p>Team: {memberDetails.team}</p>
        {console.warn(memberDetails.team)}
      </div>
    </div>
  );
}
