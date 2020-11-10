import React from 'react';
import { Box, Button } from '@chakra-ui/core';
import { useSelector } from 'react-redux';

const PreviewDetails: React.FC = () => {
  const previewData: IStockPreview | undefined = useSelector((state: IState) => state.stockPreview);

  return (
    <Box>
      {
        previewData && (
          <>
            <p className="symbol">{previewData?.symbol}</p>
            <p className="name">{previewData?.name}</p>
            <p className="high">{previewData?.high}</p>
            <p className="low">{previewData?.low}</p>
            <Button colorScheme="green" type="button">
              Add
            </Button>
          </>
        )
      }
    </Box>
  );
};

export default PreviewDetails;
