import styled from "styled-components";

export const HorizontalRule = styled.hr`
  border: 1px solid ${({ theme }) => theme.color.grayscale[5]};
  border-width: 0 0 2px;
  width: 100%;
`;
