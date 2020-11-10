import React from 'react';
import { Box, Button } from '@chakra-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { saveStock } from '../store/actionCreators';

const PreviewDetails: React.FC = () => {
  const dispatch = useDispatch();
  const previewData: IStockPreview | undefined = useSelector((state: IState) => state.stockPreview);
  const savedStocks: IStockPreview[] = useSelector((state: IState) => state.saved);
  // TODO: add test isNew and displaying the button
  const isNew = savedStocks.filter((stock: IStockPreview) => stock.Name === previewData?.Name).length < 1;

  const handleClick = () => {
    // add preview data to saved array
    if (!previewData) return;

    dispatch(saveStock(previewData));
  };

  return (
    <Box>
      {
        previewData && (
          <>
            <p className="symbol">{previewData?.Symbol}</p>
            <p className="name">{previewData?.Name}</p>
            <p className="high">{previewData?.['52WeekHigh']}</p>
            <p className="low">{previewData?.['52WeekLow']}</p>
            {isNew
            && (
              <Button colorScheme="green" type="button" onClick={handleClick}>
                Add
              </Button>
            )}
          </>
        )
      }
    </Box>
  );
};

export default PreviewDetails;
