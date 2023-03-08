import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteVillain } from '../api/villainData';
import { useAuth } from '../utils/context/authContext';

function VillainCard({ villainObj, onUpdate }) {
  const deleteThisVillain = () => {
    if (window.confirm(`Delete ${villainObj.name}?`)) {
      deleteVillain(villainObj.firebaseKey).then(() => onUpdate());
    }
  };

  const { user } = useAuth();

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={villainObj.image} alt={villainObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{villainObj.name}</Card.Title>
        {/* DYNAMIC LINK TO VIEW THE MEMBER DETAILS  */}
        <Link href={`/villains/${villainObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE MEMBER DETAILS  */}
        <Link href={`/villains/edit/${villainObj.firebaseKey}`} passHref>
          {villainObj.uid === user.uid ? (<Button variant="info">EDIT</Button>) : ''}
        </Link>
        {villainObj.uid === user.uid ? (
          <Button variant="danger" onClick={deleteThisVillain} className="m-2">
            DELETE
          </Button>
        ) : ''}
      </Card.Body>
    </Card>
  );
}

VillainCard.propTypes = {
  villainObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    power: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default VillainCard;
