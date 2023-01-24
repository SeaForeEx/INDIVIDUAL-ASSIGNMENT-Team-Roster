import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createMember, updateMember } from '../../api/memberData';

const initialState = {
  image: '',
  name: '',
  role: '',
  power: '',
  team: 'X-Men',
};

function MemberForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter(); // router travels pages
  const { user } = useAuth();

  useEffect(() => { // what happens when the component mounts
    if (obj.firebaseKey) setFormInput(obj); // if obj prop is true (has a key), form input is set to the object
  }, [obj]); // if anything in obj changes (user) run it again

  // useEffect(() => {function callback}, [dependency array])
  // dependency arrays trigger hook to run when they are changed

  const handleChange = (e) => { // handling change of input
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateMember(formInput)
        .then(() => router.push('/'));
    } else {
      const payload = { ...formInput, uid: user.uid }; // spreading object data, appending uid
      createMember(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMember(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update Info In' : 'Join'} The X-Men</h2>

      <FloatingLabel controlId="floatingInput1" label="Code Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="What is your Code Name?"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Role" className="mb-3">
        <Form.Control
          type="text"
          placeholder="What is your Role?"
          name="role"
          value={formInput.role}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Power" className="mb-3">
        <Form.Control
          type="text"
          placeholder="What is your Power?"
          name="power"
          value={formInput.power}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput4" label="Image" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Give us your Headshot"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Button type="submit">{obj.firebaseKey ? 'Update Info In' : 'Join'} The X-Men</Button>
    </Form>
  );
}

MemberForm.propTypes = {
  obj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    power: PropTypes.string,
    team: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

MemberForm.defaultProps = {
  obj: initialState,
};

// work on vocab, explain code

export default MemberForm;
