import React from 'react';
import Head from 'next/head';
import TeamForm from '../../components/forms/TeamForm';

export default function AddTeam() {
  return (
    <>
      <Head>
        <title>Create a New X-Team</title>
      </Head>
      <TeamForm />
    </>
  );
}
