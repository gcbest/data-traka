import React, { useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@chakra-ui/core';
import { DeleteIcon } from '@chakra-ui/icons';
import { updateSavedStocks } from '../store/actionCreators';

const GridView: React.FC = () => {
  const [gridApi, setGridApi] = useState<any>(null);
  const [, setGridColumnApi] = useState(null);
  const dispatch = useDispatch();
  const [numRowsSelected, setNumRowsSelected] = useState(0);

  const rowData = useSelector((state: IState) => state.saved);

  function onGridReady(params: any) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }

  const handleRowSelected = () => {
    const selectedRows = gridApi.getSelectedRows();
    setNumRowsSelected(selectedRows.length);
  };

  const handleClick = () => {
    const selectedNodes = gridApi?.getSelectedNodes();
    const selectedSymbols: string[] = selectedNodes.map((node: any) => node?.data?.Symbol);
    const remainingRows = rowData.filter((row) => !selectedSymbols.includes(row.Symbol));
    console.log(remainingRows);

    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure you want to remove selected rows?')) {
      dispatch(updateSavedStocks(remainingRows));
      setNumRowsSelected(0);
      localStorage.setItem('savedStocks', JSON.stringify(remainingRows));
    }
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      {
        numRowsSelected > 0 && (
          <IconButton
            colorScheme="blue"
            aria-label="Delete rows"
            icon={<DeleteIcon />}
            onClick={handleClick}
          />
        )
      }
      <AgGridReact
        rowSelection="multiple"
        onGridReady={onGridReady}
        rowData={rowData}
        onRowSelected={handleRowSelected}
      >
        <AgGridColumn field="Symbol" sortable filter />
        <AgGridColumn field="Name" sortable filter />
        <AgGridColumn field="Price" sortable filter />
        <AgGridColumn field="52WeekHigh" sortable />
        <AgGridColumn field="52WeekLow" sortable />
      </AgGridReact>
    </div>
  );
};

export default GridView;
