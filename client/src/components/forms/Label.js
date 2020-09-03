import styled from 'styled-components';

export const Label = styled.label`
  text-align: left;
  display: inline-block;
  padding-left: 0.25rem;
  margin: 0.25rem 0;
  font-size: ${(props) => props.theme.fonts.fontSizeParagraph};
`;
