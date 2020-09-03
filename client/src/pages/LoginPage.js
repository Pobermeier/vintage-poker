import React, { useEffect } from 'react';
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

const LoginPage = ({ login, loggedIn }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
            login();
          }}
        >
          <HeadingWithLogo textCentered hideIconOnMobile={false}>
            Login
          </HeadingWithLogo>
          <FormGroup>
            <Label htmlFor="nickname">E-mail</Label>
            <Input type="email" name="email" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              autoComplete="current-password"
            />
          </FormGroup>
          <ButtonGroup>
            <Button primary type="submit" fullWidth>
              Login
            </Button>
            <Link to="/">I forgot my password!</Link>
            <Link to="/register">I do not have an account yet!</Link>
          </ButtonGroup>
        </Form>
      </Container>
    </RelativeWrapper>
  );
};

export default LoginPage;
