import React, { useEffect, useState } from 'react';
import { AgChartsReact } from 'ag-charts-react';
import * as agCharts from 'ag-charts-community';

interface Props {
  data: any[]
}

const PreviewChart: React.FC<Props> = ({ data }) => {
  const [options, setOptions] = useState({});

  useEffect(() => {
    const initialOptions = {
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
          yKey: 'price',
        },
      ],
      axes: [
        {
          type: 'category',
          position: 'bottom',
          label: {
            formatter() {
              return '';
            },
          },
        },
        {
          type: 'number',
          position: 'left',
        },
      ],
      legend: { spacing: 40 },
    };
    setOptions(initialOptions);
  }, [data]);

  return (
    <>
      <AgChartsReact options={options} />
    </>
  );
};

export default PreviewChart;
