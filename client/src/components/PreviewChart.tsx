import React, { useEffect, useState } from 'react';
import { AgChartsReact } from 'ag-charts-react';

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
          yKey: 'amount',
        },
      ],
      // axes: [
      //   {
      //     // type: 'time',
      //     // nice: false,
      //     position: 'bottom',
      //     // tick: {
      //     //   count: agCharts.time.month,
      //     // },
      //     label: {
      //       // format: '%b %Y',
      //       rotation: 330,
      //     },
      //   },
      // {
      //   type: 'number',
      //   position: 'left',
      //   label: {
      //     formatter: function (params) {
      //       return params.value + ' °C';
      //     },
      //   },
      // },
      // ],
      legend: { spacing: 40 },
    };
    // eslint-disable-next-line no-debugger
    debugger;
    setOptions(initialOptions);
    // return () => {
    //   cleanup;
    // };
  }, [data]);

  return (
    <>
      <AgChartsReact options={options} />
    </>
  );
};

export default PreviewChart;
