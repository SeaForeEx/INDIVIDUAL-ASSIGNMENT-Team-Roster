/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewVillainDetails } from '../../api/mergedData';

export default function ViewVillain() {
  const [villainDetails, setVillainDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewVillainDetails(firebaseKey).then(setVillainDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={villainDetails.image} alt={villainDetails.image} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {villainDetails.name}
        </h5>
        <p>Role: {villainDetails.role}</p>
        <p>Power: {villainDetails.power}</p>
        <p>Team: {villainDetails.teamObject?.name}</p>
      </div>
    </div>
  );
}
