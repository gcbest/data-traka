// eslint-disable-next-line no-use-before-define
import React from 'react';
import {
  Button, FormLabel, Input,
} from '@chakra-ui/core';

const Stocks: React.FC = () => {
  const [value, setValue] = React.useState<string>('');
  // eslint-disable-next-line no-trailing-spaces
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => 
    // eslint-disable-next-line implicit-arrow-linebreak
    setValue(event.target.value.toUpperCase());

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    fetch(`/api/stock?symbol=${value}`)
      .then((res) => res.json())
      .then((res) => (res));
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
      <Button colorScheme="blue" type="button">
        Button
      </Button>
    </form>
  );
};

export default Stocks;
