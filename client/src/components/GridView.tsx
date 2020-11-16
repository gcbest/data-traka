import React, { useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { useSelector } from 'react-redux';

const GridView: React.FC = () => {
  const [, setGridApi] = useState(null);
  const [, setGridColumnApi] = useState(null);

  const rowData = useSelector((state: IState) => state.saved);

  function onGridReady(params: any) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      <AgGridReact
        onGridReady={onGridReady}
        rowData={rowData}
      >
        <AgGridColumn field="Symbol" sortable filter />
        <AgGridColumn field="Name" sortable filter />
        <AgGridColumn field="52WeekHigh" sortable />
        <AgGridColumn field="52WeekLow" sortable />
      </AgGridReact>
    </div>
  );
};

export default GridView;
