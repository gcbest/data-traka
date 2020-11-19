/* eslint-disable max-len */
import React from 'react';
import {
  Box, Button, Flex, HStack, Skeleton, Spacer,
} from '@chakra-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { saveStock } from '../store/actionCreators';
import CurrencyRadioBtns from './CurrencyRadioBtns';
import PreviewChart from './PreviewChart';

interface Props {
  loading: boolean
}

const PreviewDetails: React.FC<Props> = ({ loading }) => {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-shadow
  const { stockPreview: previewData, error }: {stockPreview: IStockPreview | undefined, error: string} = useSelector(({ stockPreview, error }: IState) => ({ stockPreview, error }));
  const savedStocks: IStockPreview[] = useSelector((state: IState) => state.saved);
  // TODO: add test isNew and displaying the button
  const isNew = savedStocks.filter((stock: IStockPreview) => stock.Name === previewData?.Name).length < 1;

  const handleClick = () => {
    if (!previewData) return;
    dispatch(saveStock(previewData));
    // add to localStorage
    const newSavedStocks = [...savedStocks, previewData];
    localStorage.setItem('savedStocks', JSON.stringify(newSavedStocks));
  };

  // TODO: add test showing correct currency symbol on radio btn change

  return (
    <Box>
      {loading && (
        <HStack spacing={8} justify="center">
          <Skeleton isLoaded={!loading} height="300px" width="400px" />
          <Skeleton isLoaded={!loading} height="300px" width="400px" />
        </HStack>
      )}
      {
        !loading && !error && previewData && (
          <Flex justify="center">
            <PreviewChart data={previewData.timeSeriesData} />
            <Box margin="2rem">

              <p className="symbol">{previewData?.Symbol}</p>
              <p className="name">{previewData?.Name}</p>
              <CurrencyRadioBtns defaultValue={previewData?.Currency} />
              <p className="price">
                Current Price: &nbsp;
                {previewData.Currency === 'USD' ? '$' : '€'}
                {previewData.Price}
              </p>
              <p className="high">
                52 Week High: &nbsp;
                {previewData.Currency === 'USD' ? '$' : '€'}
                {previewData?.['52WeekHigh']}
              </p>
              <p className="low">
                52 Week Low: &nbsp;
                {previewData.Currency === 'USD' ? '$' : '€'}
                {previewData?.['52WeekLow']}
              </p>
              {isNew
            && (
              <Button colorScheme="green" type="button" onClick={handleClick}>
                Add to List
              </Button>
            )}
            </Box>
          </Flex>
        )
      }
    </Box>
  );
};

export default PreviewDetails;
