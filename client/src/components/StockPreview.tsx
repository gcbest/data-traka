import { Box } from '@chakra-ui/core';
import React from 'react';
import PreviewDetails from './PreviewDetails';

const StockPreview: React.FC = () => (
  <Box borderWidth="1px" borderRadius="lg" display="flex">
    <img src="https://i.stack.imgur.com/veUID.png" alt="placeholder chart" />
    <PreviewDetails />
  </Box>
);

export default StockPreview;
