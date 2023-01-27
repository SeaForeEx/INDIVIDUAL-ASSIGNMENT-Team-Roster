import React from 'react';
import Head from 'next/head';
import VillainForm from '../../components/forms/VillainForm';

export default function AddVillain() {
  return (
    <>
      <Head>
        <title>Join The Villains!</title>
      </Head>
      <VillainForm />
    </>
  );
}
