import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Button } from 'react-bootstrap';
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
    <div className="viktorvaughn">
      <Head>
        <title>Meet The Villains!</title>
      </Head>
      <h1>Welcome to the Hellfire Club!</h1>
      <Button variant="outline-warning">
        Join The Villains
      </Button>
      <Button variant="outline-warning">
        Leave The Villains
      </Button>
      <div className="d-flex flex-wrap">
        {villains.map((villain) => (
          <VillainCard key={villain.firebaseKey} villainObj={villain} onUpdate={getAllVillains} />
        ))}
      </div>
    </div>
  );
}
