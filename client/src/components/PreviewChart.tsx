import React, { useState } from 'react';
import { AgChartsReact } from 'ag-charts-react';

interface Props {
  data: any[]
}

const PreviewChart: React.FC<Props> = ({ data }) => {
  const options = {
    data,
    title: { text: 'Stock Prices' },
    subtitle: { text: 'per minute' },
    padding: {
      top: 40,
      right: 40,
      bottom: 40,
      left: 40,
    },
    series: [
      {
        type: 'line',
        xKey: 'time',
        yKeys: 'amount',
      },
    ],
    legend: { spacing: 40 },
  };
  // const [options, setOptions] = useState(data);

  return (
    <>
      <AgChartsReact options={options} />
    </>
  );
};

export default PreviewChart;
