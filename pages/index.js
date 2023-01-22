import React, { useEffect, useState } from 'react';
import { getMember } from '../api/memberData';
import MemberCard from '../components/MemberCard';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const [members, setMembers] = useState([]);
  const { user } = useAuth();
  const getAlltheMembers = () => {
    getMember(user.uid).then(setMembers);
  };

  useEffect(() => {
    getAlltheMembers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        {members.map((mutant) => (
          <MemberCard key={mutant.firebaseKey} memberObj={mutant} onUpdate={getAlltheMembers} />
        ))}
      </div>
    </div>
  );
}

export default Home;
