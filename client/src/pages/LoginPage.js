import React, { useRef, useContext } from 'react';
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
import useScrollToTopOnPageLoad from '../hooks/useScrollToTopOnPageLoad';
import authContext from '../context/auth/authContext';
import contentContext from '../context/content/contentContext';
import { TiledBackgroundImage } from '../components/decoration/TiledBackgroundImage';

const LoginPage = () => {
  const { getLocalizedString } = useContext(contentContext);
  const { login, isLoggedIn } = useContext(authContext);

  useScrollToTopOnPageLoad();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  if (isLoggedIn) return <Redirect to="/" />;
  return (
    <RelativeWrapper>
      <TiledBackgroundImage />
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
            {getLocalizedString('login_page-header_txt')}
          </HeadingWithLogo>
          <FormGroup>
            <Label htmlFor="email">
              {getLocalizedString('login_page-email_lbl_txt')}
            </Label>
            <Input
              type="email"
              name="email"
              ref={emailRef}
              required
              autoComplete="email"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">
              {getLocalizedString('login_page-password_lbl_txt')}
            </Label>
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
              {getLocalizedString('login_page-cta_btn_txt')}
            </Button>
            {/* <Link to="/">I foI do not have an account yet!rgot my password!</Link> */}
            <Link to="/register">
              {getLocalizedString('login_page-no_account_txt')}
            </Link>
          </ButtonGroup>
        </Form>
      </Container>
    </RelativeWrapper>
  );
};

export default LoginPage;
