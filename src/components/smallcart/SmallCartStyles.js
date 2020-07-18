import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flow-direction:column;
  justify-content: center;

  @media (min-width: 1024px) {
  flex-wrap: nowrap;
  }

  @media (max-width: 430px) {
  flow-direction:column;
  }
`;
