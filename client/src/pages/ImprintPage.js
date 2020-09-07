import React from 'react';
import Container from '../components/layout/Container';
import HeadingWithLogo from '../components/typography/HeadingWithLogo';
import Heading from '../components/typography/Heading';
import Text from '../components/typography/Text';
import ColoredText from '../components/typography/ColoredText';
import { Link } from 'react-router-dom';
import Button from '../components/buttons/Button';
import useScrollToTopOnPageLoad from '../hooks/useScrollToTopOnPageLoad';

const ImprintPage = () => {
  useScrollToTopOnPageLoad();

  return (
    <>
      <Container
        display="block"
        padding="5rem 2rem 2rem 2rem"
        contentCenteredMobile
      >
        <HeadingWithLogo textCentered>Imprint</HeadingWithLogo>
        <Heading as="h3" headingClass="h5" textCenteredOnMobile>
          Disclosure requirement according to §25 p5 MedienG
        </Heading>
        <Text>
          <ColoredText emphazised>Vintage Poker</ColoredText>
          <br />
          Patrick Obermeier
          <br />
          1060 Vienna, Austria
        </Text>
        <Heading as="h3" headingClass="h5" textCenteredOnMobile>
          Terms of Use
        </Heading>
        <Text>
          The contents of this website can be used freely and are for
          information only. By using the selection options on the website, no
          legal transactions between Patrick Obermeier (henceforth called "the
          operator") and the users or between the users come about. The further
          procedure between providers and users and the possible subsequent
          conclusion of orders between providers and users are at the sole
          discretion of the users.
        </Text>
        <Heading as="h3" headingClass="h5" textCenteredOnMobile>
          Copyright / Disclaimer
        </Heading>
        <Text>
          With regard to the technical properties of the Internet, no guarantee
          can be given for the authenticity, correctness and completeness of the
          information made available on the Internet. There is also no guarantee
          for the availability or operation of the website and its content. Any
          liability for direct, indirect or other damage, regardless of its
          cause, which arises from the use or unavailability of the data and
          information on this website, is excluded to the extent permitted by
          law. The content of this website is protected by copyright. The
          information is for personal use only. Any further use, in particular
          storage in databases, duplication and any form of commercial use as
          well as transfer to third parties - also in parts or in a revised form
          - without the consent of the operator is prohibited. As far as the
          content on this page was not created by the operator, the copyrights
          of third parties are respected. In particular contents of third
          parties are marked as such. Should you nevertheless become aware of a
          copyright infringement, the operator asks you to notify us
          accordingly. Upon notification of violations, such content will be
          removed immediately. Hyperlinks on www.patrickobermeier.dev are
          welcome and welcome. However, any integration of individual pages into
          third-party frames is prohibited, and the RSS feed is not made
          available on third-party websites.
        </Text>
        <Heading as="h3" headingClass="h5" textCenteredOnMobile>
          Liability for links
        </Heading>
        <Text>
          This website contains links to external websites of third parties, the
          content of which the operator has no influence on. Therefore, the
          operator cannot accept any liability for this third-party content. The
          respective provider or operator of the pages is always responsible for
          the content of the linked pages. The linked pages were checked for
          possible legal violations at the time the link was created. No illegal
          content was discernible at the time the link was created. A permanent
          control of the content of the linked websites is not reasonable
          without concrete evidence of an infringement. Upon notification of
          rights violations, such links will be removed promptly.
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

export default ImprintPage;
