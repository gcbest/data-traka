// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { AgChartsReact } from 'ag-charts-react';
import {
  LineChart, Line, XAxis, YAxis,
} from 'recharts';

// interface Props {}

const socket = io('http://localhost:3001', {
  transports: ['websocket', 'polling'],
});

const originalOptions = {
  container: document.querySelector('#myChart'),
  autoSize: true,
  data: [],
  title: {
    text: 'Road fuel prices (2019)',
    fontSize: 18,
  },
  subtitle: {
    text: 'Source: Department for Business, Energy & Industrial Strategy',
  },
  series: [
    {
      type: 'line',
      xKey: 'date',
      yKey: 'petrol',
      stroke: '#01c185',
      marker: {
        stroke: '#01c185',
        fill: '#01c185',
      },
    },
    {
      type: 'line',
      xKey: 'date',
      yKey: 'diesel',
      stroke: '#000000',
      marker: {
        stroke: '#000000',
        fill: '#000000',
      },
    },
  ],
  axes: [
    {
      position: 'bottom',
      type: 'time',
      // tick: {
      //   count: agCharts.time.month.every(2),
      // },
      title: {
        text: 'Date',
      },
    },
    {
      position: 'left',
      type: 'number',
      title: {
        text: 'Price in pence',
      },
    },
  ],
};

const CpuUsage: React.FC = () => {
  const [data, setData] = useState<any>([]);
  // const [options, setOptions] = useState<any>(originalOptions);

  useEffect(() => {
    socket.on('cpu', (cpuPercent: any) => {
      console.log(cpuPercent);
      setData((currentData: any) => [...currentData, cpuPercent]);
      // setOptions((currentOptions: any) => {
      //   console.log(currentOptions);

      //   return ({ ...currentOptions, data: [...currentOptions.data, cpuPercent] })
      // })
      // options = {...options, data: [...percents, cpuPercent]};
    });

    return () => {
      socket.close();
    };
  }, []);

  return (
    <>
      {/* <AgChartsReact options={options} /> */}
      <LineChart
        width={730}
        height={250}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Line dataKey="value" />
      </LineChart>
    </>
  );
};

export default CpuUsage;
