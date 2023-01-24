import React from 'react';
import Head from 'next/head';
import MemberForm from '../../components/forms/MemberForm';

export default function AddMember() {
  return (
    <>
      <Head>
        <title>Join The X-Men!</title>
      </Head>
      <MemberForm />;
    </>
  );
}
