import React from 'react';
import { Box, Flex } from '@chakra-ui/core';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import PreviewDetails from '../components/PreviewDetails';
import GridView from '../components/GridView';
// import ForexChart from '../components/ForexChart';
import ForexChartServer from '../components/ForexChartServer';
import StockSearch from '../components/StockSearch';

const rightBoxVariants = {
  initial: {
    x: '100vw',
  },
  animate: {
    x: -5,
    transition: { delay: 2, duration: 1.5 },
  },
};
const MotionBox = motion.custom(Box);

const Stocks: React.FC = () => {
  // eslint-disable-next-line no-shadow
  const { loading } = useSelector(({ loading }: IState) => ({ loading }));

  return (
    <>
      <StockSearch />
      <PreviewDetails loading={loading} />
      <Flex justify="center">
        <Box margin="2rem 1rem">
          <ForexChartServer />
        </Box>
        <MotionBox drag variants={rightBoxVariants} initial="initial" animate="animate" margin="2rem 1rem">
          <GridView />
        </MotionBox>
      </Flex>
    </>
  );
};

export default Stocks;
