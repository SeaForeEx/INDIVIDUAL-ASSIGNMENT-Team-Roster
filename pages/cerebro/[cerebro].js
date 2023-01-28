/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getMember } from '../../api/memberData';
import { useAuth } from '../../utils/context/authContext';
import MemberCard from '../../components/MemberCard';

export default function Cerebro() {
  const [searchMembers, setSearchMembers] = useState([]);
  const { user } = useAuth();
  const router = useRouter();
  const { cerebro } = router.query;

  const searchAllMembers = () => {
    getMember(user.uid).then((members) => {
      const filteredMembers = members.filter((member) => member.name.toLowerCase().includes(cerebro) || member.role.toLowerCase().includes(cerebro) || member.power.toLowerCase().includes(cerebro));
      setSearchMembers(filteredMembers);
    });
  };

  useEffect(() => {
    searchAllMembers();
    return () => {
      setSearchMembers([]);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cerebro]);

  return (
    <>
      <div className="d-flex flex-wrap">
        {searchMembers.map((mutant) => <MemberCard key={mutant.firebaseKey} memberObj={mutant} onUpdate={searchAllMembers} />)}
      </div>
    </>
  );
}
