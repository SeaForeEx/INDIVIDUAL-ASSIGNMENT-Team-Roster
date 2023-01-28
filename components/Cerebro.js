import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Form, FormControl } from 'react-bootstrap';

export default function Cerebro() {
  const [cerebro, setCerebro] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setCerebro(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cerebro !== '') router.push(`/cerebro/${cerebro}`);
    setCerebro('');
  };
  return (
    <Form className="cerebro" onSubmit={handleSubmit}>
      <FormControl type="text" placeholder="Cerebro" onChange={handleChange} value={cerebro} />
    </Form>
  );
}
