import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { getVillainWithoutUID } from '../api/villainData';
import VillainCard from '../components/VillainCard';

export default function ShowVillains() {
  const [villains, setVillains] = useState([]);

  const getAllVillains = () => {
    getVillainWithoutUID().then(setVillains);
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
      <Link passHref href="/villains/new">
        <Button variant="outline-warning">
          Join The Hellfire Club
        </Button>
      </Link>
      <div className="d-flex flex-wrap">
        {villains.map((villain) => (
          <VillainCard key={villain.firebaseKey} villainObj={villain} onUpdate={getAllVillains} />
        ))}
      </div>
    </div>
  );
}
