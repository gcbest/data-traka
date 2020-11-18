import React from 'react';
import {
  Alert,
  AlertIcon,
  Box,
  Button, Flex, FormLabel, Input,
} from '@chakra-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { queryStock, resetSearch } from '../store/actionCreators';
import PreviewDetails from '../components/PreviewDetails';
import GridView from '../components/GridView';
// import ForexChart from '../components/ForexChart';
import ForexChartServer from '../components/ForexChartServer';

const leftBoxVariants = {
  initial: {
    x: '-100vw',
  },
  animate: {
    x: 5,
    transition: { delay: 1, duration: 1.5 },
  },
};

const rightBoxVariants = {
  initial: {
    x: '100vw',
  },
  animate: {
    x: -5,
    transition: { delay: 1, duration: 1.5 },
  },
};

const Stocks: React.FC = () => {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-shadow
  const { loading, error } = useSelector(({ loading, error }: IState) => ({ loading, error }));
  const [value, setValue] = React.useState<string>('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (error) dispatch(resetSearch());
    setValue(event.target.value.toUpperCase());
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(queryStock(value));
  };

  const MotionBox = motion.custom(Box);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box w="40%" textAlign="center" margin="2rem auto">
          <FormLabel textAlign="center"><h2>Enter Stock Symbol</h2></FormLabel>
          <Input
            w="50%"
            variant="outline"
            placeholder="e.g. IBM"
            value={value}
            onChange={handleChange}
          />
          <Button
            disabled={loading}
            marginLeft="1rem"
            colorScheme="blue"
            type="submit"
            isLoading={loading}
            loadingText="Searching"
          >
            Search
          </Button>
        </Box>
        {
          error && (
            <Alert status="error">
              <AlertIcon />
              {`${error}`}
            </Alert>
          )
        }
      </form>
      <PreviewDetails loading={loading} />
      <Flex justify="center">
        <MotionBox variants={leftBoxVariants} initial="initial" animate="animate" margin="2rem 1rem">
          <ForexChartServer />
        </MotionBox>
        <MotionBox variants={rightBoxVariants} initial="initial" animate="animate" margin="2rem 1rem">
          <GridView />
        </MotionBox>
      </Flex>
    </>
  );
};

export default Stocks;
