import React from 'react';
import {
  Box, FormLabel, Input, Button, Alert, AlertIcon,
} from '@chakra-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { resetSearch, queryStock } from '../store/actionCreators';

const StockSearch: React.FC = () => {
  // eslint-disable-next-line no-shadow
  const { loading, error } = useSelector(({ loading, error }: IState) => ({ loading, error }));
  const dispatch = useDispatch();

  const [value, setValue] = React.useState<string>('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (error) dispatch(resetSearch());
    setValue(event.target.value.toUpperCase());
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(queryStock(value));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box w="40%" textAlign="center" margin="2rem auto">
        <FormLabel textAlign="center"><h2>Enter Stock Symbol</h2></FormLabel>
        <Input
          w="50%"
          variant="outline"
          placeholder="e.g. IBM"
          data-testid="stockQuery"
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
          <Alert status="error" width="400px" margin="auto">
            <AlertIcon />
            {`${error}`}
          </Alert>
        )
      }
    </form>
  );
};

export default StockSearch;
