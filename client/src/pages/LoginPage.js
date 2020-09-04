import React, { useEffect, useRef } from 'react';
import Container from '../components/layout/Container';
import { Redirect, Link } from 'react-router-dom';
import HeadingWithLogo from '../components/typography/HeadingWithLogo';
import Button from '../components/buttons/Button';
import { Input } from '../components/forms/Input';
import { Form } from '../components/forms/Form';
import { FormGroup } from '../components/forms/FormGroup';
import { ButtonGroup } from '../components/forms/ButtonGroup';
import { Label } from '../components/forms/Label';
import RelativeWrapper from '../components/layout/RelativeWrapper';
import ShowPasswordButton from '../components/buttons/ShowPasswordButton';

const LoginPage = ({ login, loggedIn }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  if (loggedIn) return <Redirect to="/" />;
  return (
    <RelativeWrapper>
      {/* <TiledBackgroundImage /> */}
      <Container
        fullHeight
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        padding="6rem 2rem 2rem 2rem"
        contentCenteredMobile
      >
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            const email = emailRef.current.value;
            const password = passwordRef.current.value;

            email &&
              password &&
              email.length > 0 &&
              password.length > 0 &&
              login(email, password);
          }}
        >
          <HeadingWithLogo textCentered hideIconOnMobile={false}>
            Login
          </HeadingWithLogo>
          <FormGroup>
            <Label htmlFor="nickname">E-mail</Label>
            <Input
              type="email"
              name="email"
              ref={emailRef}
              required
              autoComplete="email"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <ShowPasswordButton passwordRef={passwordRef} />
            <Input
              type="password"
              name="password"
              ref={passwordRef}
              autoComplete="current-password"
              required
            />
          </FormGroup>
          <ButtonGroup>
            <Button primary type="submit" fullWidth>
              Login
            </Button>
            {/* <Link to="/">I forgot my password!</Link> */}
            <Link to="/register">I do not have an account yet!</Link>
          </ButtonGroup>
        </Form>
      </Container>
    </RelativeWrapper>
  );
};

export default LoginPage;
