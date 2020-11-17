import React, { useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { useSelector } from 'react-redux';

const GridView: React.FC = () => {
  const [gridApi, setGridApi] = useState<any>(null);
  const [, setGridColumnApi] = useState(null);

  const rowData = useSelector((state: IState) => state.saved);

  function onGridReady(params: any) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }

  const handleClick = () => {
    const selectedNodes = gridApi?.getSelectedNodes();
    const selectedSymbols: string[] = selectedNodes.map((node: any) => node?.data?.Symbol);
    const remainingRows = rowData.filter((row) => !selectedSymbols.includes(row.Symbol));
    console.log(remainingRows);
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      <button type="button" onClick={handleClick} style={{ color: 'red', backgroundColor: 'white', padding: '1rem' }}>remove</button>
      <AgGridReact
        rowSelection="multiple"
        onGridReady={onGridReady}
        rowData={rowData}
      >
        <AgGridColumn field="Symbol" sortable filter checkboxSelection />
        <AgGridColumn field="Name" sortable filter />
        <AgGridColumn field="52WeekHigh" sortable />
        <AgGridColumn field="52WeekLow" sortable />
      </AgGridReact>
    </div>
  );
};

export default GridView;
