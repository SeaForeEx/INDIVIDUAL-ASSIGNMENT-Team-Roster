import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getTeams } from '../../api/teamData';
import { createMember, updateMember } from '../../api/memberData';

const initialState = {
  image: '',
  name: '',
  role: '',
  power: '',
  team_id: '',
};

function MemberForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [teams, setTeams] = useState([]);
  const router = useRouter(); // router travels pages
  const { user } = useAuth();

  useEffect(() => { // what happens when the component mounts
    getTeams(user.uid).then(setTeams);
    if (obj.firebaseKey) setFormInput(obj); // if obj prop is true (has a key), form input is set to the object
  }, [obj, user]); // if anything in obj changes (user) run it again

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
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update Info In' : 'Join'} The Team!</h2>

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
          type="url"
          placeholder="Give us your Headshot"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingSelect" label="Team">
        <Form.Select
          aria-label="Team"
          name="team_id"
          onChange={handleChange}
          className="mb-3"
          value={formInput.team_id}
          required
        >
          <option value="">Select a Team</option>
          {
            teams.map((team) => ( // add ternary before line 107 to not show select author option if there are no authors if you want to
              <option
                key={team.firebaseKey}
                value={team.firebaseKey}
              >
                {team.name}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>

      <Button type="submit">{obj.firebaseKey ? 'Update Info In' : 'Join'} The Team</Button>
    </Form>
  );
}

MemberForm.propTypes = {
  obj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    power: PropTypes.string,
    team_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

MemberForm.defaultProps = {
  obj: initialState,
};

// work on vocab, explain code

export default MemberForm;
