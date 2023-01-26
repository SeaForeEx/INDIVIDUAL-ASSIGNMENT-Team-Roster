import React from 'react';
import { Button, Image } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <Image src="https://64.media.tumblr.com/52aa6a2f6aa2f2d425565b2814f29007/tumblr_nuc059sOCa1tl3ks4o1_1280.jpg" alt="Welcome to the X-Men, Kitty Pryde, Hope You Survive The Experience!" onClick={signIn} />
      <Button type="button" size="lg" className="copy-btn" onClick={signIn}>
        Join The Mutant Cause!
      </Button>
    </div>
  );
}

export default Signin;
