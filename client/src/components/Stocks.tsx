import React from 'react';
import {
  Button, FormLabel, Input,
} from '@chakra-ui/core';
import { useDispatch } from 'react-redux';
import { queryStock } from '../store/actionCreators';
import PreviewDetails from './PreviewDetails';

const Stocks: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState<string>('');
  // eslint-disable-next-line no-trailing-spaces
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => 
    // eslint-disable-next-line implicit-arrow-linebreak
    setValue(event.target.value.toUpperCase());

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
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
        Button
      </Button>
      <PreviewDetails />
    </form>
  );
};

export default Stocks;
