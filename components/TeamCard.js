import React from 'react';
import { PropTypes } from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
// import { useAuth } from '../utils/context/authContext';
// import { getAuthors } from '../api/authorData';
import { deleteTeamMembers } from '../api/mergedData';

export default function TeamCard({ teamObj, onUpdate }) {
  const deleteThisTeam = () => {
    if (window.confirm(`Delete ${teamObj.name}?`)) {
      deleteTeamMembers(teamObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={teamObj.image} alt={teamObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>
          {teamObj.name}
        </Card.Title>
        <Link href={`/author/${teamObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE AUTHOR DETAILS  */}
        <Link href={`/author/edit/${teamObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisTeam} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

TeamCard.propTypes = {
  teamObj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    location: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
