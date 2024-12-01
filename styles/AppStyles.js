import styled from 'styled-components';
import { motion } from 'framer-motion';

export const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
`;

export const PageTransition = styled(motion.div)`
  width: 100%;
`; 