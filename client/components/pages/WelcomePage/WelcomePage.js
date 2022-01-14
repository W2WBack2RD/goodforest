import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import R from 'ramda';
import { getNoaWelcoming, msg } from '/Users/macbookair/Documents/goodforest/goodforest/client/api/noaExample.js';

import Section from 'react-bulma-companion/lib/Section';
import Container from 'react-bulma-companion/lib/Container';
import Title from 'react-bulma-companion/lib/Title';
import Button from '/Users/macbookair/Documents/goodforest/goodforest/client/components/atoms/Button'


export default function WelcomePage() {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(['user']));
  const [response, setResponse] = useState('');
  useEffect(() => {
    if (!R.isEmpty(user)) {
      dispatch(push('/home'));
    }
  }, []);



  return (
    <div className="welcome-page page">
      <Section>
        <Container>
          <Title size="1">
            Welcome Page!
            <p>hello from noa</p>
            <Button label="click me" onClick={getNoaWelcoming}></Button>
            <p>{msg}</p>
          </Title>
        </Container>
      </Section>
    </div >
  );
}
