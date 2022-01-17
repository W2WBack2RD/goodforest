import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import R from 'ramda';
import request from 'superagent';
<<<<<<< HEAD


=======
>>>>>>> 1a08c3e38a1387a8e702fda8e1b56970efda011a
import Section from 'react-bulma-companion/lib/Section';
import Container from 'react-bulma-companion/lib/Container';
import Title from 'react-bulma-companion/lib/Title';
import Button from 'react-bulma-companion/lib/Button';
<<<<<<< HEAD

=======
>>>>>>> 1a08c3e38a1387a8e702fda8e1b56970efda011a

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
<<<<<<< HEAD
        console.log(result)
        setResponse(result.body.message)
      })
      .catch();

=======
        console.log(result.body.message)
        setResponse(result.body.message)
      })
      .catch();
>>>>>>> 1a08c3e38a1387a8e702fda8e1b56970efda011a
  }

  return (
    <div className="home-page page">
      <Section>
        <Container>
          <Title size="1">
            Home Page
          </Title>


<<<<<<< HEAD
=======
          hi
>>>>>>> 1a08c3e38a1387a8e702fda8e1b56970efda011a
          <Button color="success" onClick={handleAddTodo} fullwidth>
            Add
          </Button>
          {response}

        </Container>
      </Section>
    </div>
  );
}
