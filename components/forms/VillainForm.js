import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createVillain, updateVillain } from '../../api/villainData';

const initialState = {
  image: '',
  name: '',
  power: '',
  firebaseKey: '',
  uid: '',
};

function VillainForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateVillain(formInput)
        .then(() => router.push('/villains'));
    } else {
      const payload = { ...formInput, uid: user.uid };

      createVillain(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateVillain(patchPayload).then(() => {
          router.push('/villains');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update Info In' : 'Join'} The Villains!</h2>

      <FloatingLabel controlId="floatingInput1" label="Code Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="What is your Evil Code Name?"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Power" className="mb-3">
        <Form.Control
          type="text"
          placeholder="What is your Evil Power?"
          name="power"
          value={formInput.power}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Give us your Evil Headshot"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Button type="submit">{obj.firebaseKey ? 'Update Info For' : 'Join'} The Villains!</Button>
    </Form>
  );
}

VillainForm.propTypes = {
  obj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    power: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }),
};

VillainForm.defaultProps = {
  obj: initialState,
};

export default VillainForm;
