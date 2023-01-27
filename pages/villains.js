import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { getVillain } from '../api/villainData';
import VillainCard from '../components/VillainCard';
import { useAuth } from '../utils/context/authContext';

export default function ShowVillains() {
  const { user } = useAuth();
  const [villains, setVillains] = useState([]);

  const getAllVillains = () => {
    getVillain(user.uid).then(setVillains);
  };

  useEffect(() => {
    getAllVillains();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>Meet The Villains!</title>
      </Head>
      <div className="d-flex flex-wrap">
        {villains.map((villain) => (
          <VillainCard key={villain.firebaseKey} teamObj={villain} onUpdate={getAllVillains} />
        ))}
      </div>
    </>
  );
}
