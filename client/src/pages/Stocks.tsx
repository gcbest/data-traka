import React from 'react';
import {
  Box,
  // Alert,
  // AlertIcon,
  Button, Flex, FormLabel, Input,
} from '@chakra-ui/core';
import { useDispatch } from 'react-redux';
import { queryStock } from '../store/actionCreators';
import PreviewDetails from '../components/PreviewDetails';
import GridView from '../components/GridView';
// import ForexChart from '../components/ForexChart';
import ForexChartServer from '../components/ForexChartServer';

const Stocks: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState<string>('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value.toUpperCase());

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(queryStock(value));
  };

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
          <Button marginLeft="1rem" colorScheme="blue" type="submit">
            Search
          </Button>
        </Box>
        {/* TODO: add alert message */}
        {/* {
        successfulAdd
        && (
          <Alert status="success">
            <AlertIcon />
            `${payload.Name} added to list`
          </Alert>
        )
      } */}
      </form>
      <PreviewDetails />
      <Flex justify="center" marginTop="2rem">
        <Box marginRight="2rem">
          <GridView />
        </Box>
        {/* <ForexChart /> */}
        <ForexChartServer />
      </Flex>
    </>
  );
};

export default Stocks;
