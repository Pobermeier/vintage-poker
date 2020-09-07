import React from 'react';
import Container from '../components/layout/Container';
import HeadingWithLogo from '../components/typography/HeadingWithLogo';
import Heading from '../components/typography/Heading';
import Text from '../components/typography/Text';
import ColoredText from '../components/typography/ColoredText';
import Button from '../components/buttons/Button';
import { Link } from 'react-router-dom';
import useScrollToTopOnPageLoad from '../hooks/useScrollToTopOnPageLoad';

const PrivacyPage = () => {
  useScrollToTopOnPageLoad();

  return (
    <>
      <Container
        display="block"
        padding="5rem 2rem 2rem 2rem"
        contentCenteredMobile
      >
        <HeadingWithLogo textCentered>Privacy Policy</HeadingWithLogo>
        <Heading as="h3" headingClass="h5" textCenteredOnMobile>
          Contact
        </Heading>
        <Text>
          If you contact us using the form on the website or by e-mail, your
          data will be stored for six months for the purpose of processing the
          request and in the event of follow-up questions. We will not pass on
          this data without your consent.
        </Text>
        <Heading as="h3" headingClass="h5" textCenteredOnMobile>
          Cookies
        </Heading>
        <Text>
          Our website uses so-called cookies. These are small text files that
          are stored on your device using the browser. They do no harm.
          <br />
          <br />
          We use cookies to make our offer user-friendly. Some cookies remain on
          your device until you delete them. They enable us to recognize your
          browser the next time you visit.
          <br />
          <br />
          If you do not want this, you can set up your browser so that it
          informs you about the setting of cookies and you only allow this in
          individual cases.
          <br />
          <br />
          If cookies are deactivated, the functionality of our website may be
          restricted.
        </Text>
        <Heading as="h3" headingClass="h5" textCenteredOnMobile>
          Web analysis
        </Heading>
        <Text>
          Our website uses the "Google Analytics" service, which is offered by
          Google Inc. (1600 Amphitheater Parkway Mountain View, CA 94043, USA).
          Cookies are used for this purpose, which enable an analysis of the use
          of the website by your users. The information collected by the cookies
          is usually sent to a Google server in the USA and stored there. The
          information collected by the cookies is usually sent to a Google
          server in the USA and stored there.
          <br />
          <br />
          Cookies do no damage to your computer and contain no viruses. Cookies
          serve to make our offer more user-friendly, more effective and safer.
          Cookies are small text files that are stored on your computer and
          saved by your browser. Most of the cookies used are so-called "session
          cookies". They will be automatically deleted after your visit. Other
          cookies remain on your device until you delete them. These cookies
          enable us to recognize your browser the next time you visit. You can
          set your browser so that you are informed about the setting of cookies
          and only allow cookies in individual cases, exclude the acceptance of
          cookies for certain cases or in general, and activate the automatic
          deletion of cookies when the browser is closed. If cookies are
          deactivated, the functionality of this website may be restricted.
          <br />
          <br />
          We have concluded corresponding contracts for order data processing
          with the providers.
          <br />
          <br />
          IP anonymization applies to this website. The user's IP address is
          shortened within the member states of the EU and the European Economic
          Area. This shortening eliminates the personal reference to your IP
          address. As part of the agreement on the order data agreement that the
          website operator has concluded with Google Inc., the website operator
          uses the information collected to evaluate website usage and website
          activity and provides services related to internet usage.
          <br />
          <br />
          Data processing takes place on the basis of the legal provisions of
          Section 96 (3) TKG and Art 6 (1) lit a (consent) and / or f
          (legitimate interest) of the GDPR.
          <br />
          <br />
          Our concern within the meaning of the GDPR (legitimate interest) is
          the improvement of our offer and our website. Since the privacy of our
          users is important to us, the user data is pseudonymized
          [pseudonymization is recommended for the legal reason "legitimate
          interest"; this has to be clarified with the web analysis service].
          <br />
          <br />
          The user data is kept for a period of 26 months.
        </Text>
        <Heading as="h3" headingClass="h5" textCenteredOnMobile>
          Your rights
        </Heading>
        <Text>
          In principle, you have the right to information, correction, deletion,
          restriction, data portability, revocation and objection. If you
          believe that the processing of your data violates data protection law
          or your data protection claims have otherwise been violated, you can
          complain to the supervisory authority. In Austria this is the data
          protection authority.
          <br />
          <br />
          You can reach us using the following contact details:
          <br />
          <br />
          <ColoredText emphazised>Vintage Poker</ColoredText>
          <br />
          Patrick Obermeier
          <br />
          <a href="mailto:patrick.obermeier@outlook.com">
            patrick.obermeier@outlook.com
          </a>
        </Text>
      </Container>
      <Container
        display="flex"
        justifyContent="center"
        contentCenteredMobile
        margin="2rem auto"
      >
        <Button as={Link} to="/" secondary small>
          Back To Home
        </Button>
      </Container>
    </>
  );
};

export default PrivacyPage;
