import React from 'react';
import {
  // Alert,
  // AlertIcon,
  Button, FormLabel, Input,
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
    <form onSubmit={handleSubmit}>
      <FormLabel>Stock Symbol</FormLabel>
      <Input
        variant="outline"
        placeholder="e.g. IBM"
        value={value}
        onChange={handleChange}
      />
      <Button colorScheme="blue" type="submit">
        Search
      </Button>
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

      <PreviewDetails />
      <GridView />
      {/* <ForexChart /> */}
      <ForexChartServer />
    </form>
  );
};

export default Stocks;
