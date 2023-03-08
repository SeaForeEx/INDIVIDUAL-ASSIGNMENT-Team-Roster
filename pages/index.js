import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { getMemberWithoutUID } from '../api/memberData';
import MemberCard from '../components/MemberCard';

function Home() {
  const [members, setMembers] = useState([]);
  const getAllTheMembers = () => {
    getMemberWithoutUID().then(setMembers);
  };

  useEffect(() => {
    getAllTheMembers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>Welcome To Xavier&apos;s School For Gifted Youngsters!</title>
      </Head>
      <div className="text-center my-4">
        <div className="d-flex flex-wrap">
          {members.map((mutant) => (
            <MemberCard key={mutant.firebaseKey} memberObj={mutant} onUpdate={getAllTheMembers} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
