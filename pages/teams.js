import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { getTeamsWithoutUID } from '../api/teamData';
import TeamCard from '../components/TeamCard';

export default function ShowTeams() {
  const [teams, setTeams] = useState([]);

  const getAllTeams = () => {
    getTeamsWithoutUID().then(setTeams);
  };

  useEffect(() => {
    getAllTeams();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>Meet The X-Teams!</title>
      </Head>
      <div className="d-flex flex-wrap">
        {teams.map((team) => (
          <TeamCard key={team.firebaseKey} teamObj={team} onUpdate={getAllTeams} />
        ))}
      </div>
    </>
  );
}
