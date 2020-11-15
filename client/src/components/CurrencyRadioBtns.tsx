/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactText } from 'react';
import {
  Box, Flex, useRadio, useRadioGroup,
} from '@chakra-ui/core';

// 1. Create a component that consumes the `useRadio` hook
function RadioCard(props: any) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: 'teal.600',
          color: 'white',
          borderColor: 'teal.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={5}
        py={3}
      >
        {/* eslint-disable-next-line react/destructuring-assignment */}
        {props.children}
      </Box>
    </Box>
  );
}

// Step 2: Use the `useRadioGroup` hook to control a group of custom radios.

interface Props {
  defaultValue?: string
}

const CurrencyRadioBtns: React.FC<Props> = ({ defaultValue = 'USD' }) => {
  const options = ['USD', 'EUR'];

  const handleChange = (nextValue: ReactText) => {
    console.log(nextValue);
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue,
    onChange: handleChange,
  });

  const group = getRootProps();

  return (
    <Box {...group}>
      <Flex>
        {options.map((value) => {
          const radio = getRadioProps({ value });
          return (
            <RadioCard key={value} {...radio}>
              {value}
            </RadioCard>
          );
        })}
      </Flex>
    </Box>
  );
};

export default CurrencyRadioBtns;
