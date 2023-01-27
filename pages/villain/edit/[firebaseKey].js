import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleVillain } from '../../../api/villainData';
import VillainForm from '../../../components/forms/VillainForm';

export default function EditVillain() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleVillain(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<VillainForm obj={editItem} />);
}
