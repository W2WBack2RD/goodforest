import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import R from 'ramda';
import request from 'superagent';
import Section from 'react-bulma-companion/lib/Section';
import Container from 'react-bulma-companion/lib/Container';
import Title from 'react-bulma-companion/lib/Title';
import Button from 'react-bulma-companion/lib/Button';

export default function HomePage() {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(['user']));

  const [response, setResponse] = React.useState('')

  useEffect(() => {
    if (R.isEmpty(user)) {
      dispatch(push('/login'));
    }
  }, []);

  const handleAddTodo = () => {
    request.get('/api/example/')
      .send()
      .then((result) => {
        console.log(result.body.message)
        setResponse(result.body.message)
      })
      .catch();
  }

  return (
    <div className="home-page page">
      <Section>
        <Container>
          <Title size="1">
            Home Page
          </Title>


          hi
          <Button color="success" onClick={handleAddTodo} fullwidth>
            Add
          </Button>
          {response}

        </Container>
      </Section>
    </div>
  );
}
