import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/layout/Container';
import HeadingWithLogo from '../components/typography/HeadingWithLogo';
import Button from '../components/buttons/Button';
import { FormGroup } from '../components/forms/FormGroup';
import { Label } from '../components/forms/Label';
import { Input } from '../components/forms/Input';
import styled from 'styled-components';
import { Form } from '../components/forms/Form';
import RelativeWrapper from '../components/layout/RelativeWrapper';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
  margin-bottom: 2rem;

  ${FormGroup} > *~* {
    margin: 0.5rem 0;
  }

  @media screen and (max-width: 624px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 320px;

    ${FormGroup} > *~* {
      margin: 0.5rem 0;
    }
  }
`;

// const DangerButton = styled(Button)`
//   background-color: ${(props) => props.theme.colors.dangerColorLighter};
//   color: ${(props) => props.theme.colors.fontColorLight};

//   &:visited,
//   &:hover,
//   &:active,
//   &:focus {
//     background-color: ${(props) => props.theme.colors.dangerColor};
//     color: ${(props) => props.theme.colors.fontColorLight};
//   }
// `;

const Dashboard = ({ userName, email }) => {
  return (
    <RelativeWrapper>
      {/* <TiledBackgroundImage /> */}
      <Container
        fullHeight
        flexDirection="column"
        justifyContent="center"
        contentCenteredMobile
        alignItems="center"
        padding="6rem 2rem 2rem 2rem"
      >
        <Form onSubmit={(e) => e.preventDefault()}>
          <HeadingWithLogo textCentered hideIconOnMobile={false}>
            My Dashboard
          </HeadingWithLogo>
          <Wrapper>
            <FormGroup>
              <Label>Nickname</Label>
              <Input value={userName} />
              <Button primary>Change Nickname</Button>
            </FormGroup>
            <FormGroup>
              <Label>E-mail</Label>
              <Input type="email" value={email} />
              <Button primary>Change E-mail</Button>
            </FormGroup>
            <FormGroup style={{ gridColumnStart: '1', gridColumnEnd: '3' }}>
              <Button primary>Reset Password</Button>
              <Button>Delete Account</Button>
            </FormGroup>
            <Button
              as={Link}
              to="/"
              secondary
              style={{ gridColumnStart: '1', gridColumnEnd: '3' }}
            >
              Back To Main Menu
            </Button>
          </Wrapper>
        </Form>
      </Container>
    </RelativeWrapper>
  );
};

export default Dashboard;
