import React, { useEffect, useState } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import io from 'socket.io-client';

const socket = io('http://localhost:3001', {
  transports: ['websocket', 'polling'],
});

const options: Highcharts.Options = {
  chart: {
    type: 'spline',
    // animation: Highcharts.svg, // don't animate in old IE
    marginRight: 10,
    events: {
      load() {
        // set up the updating of the chart each second
        const series = this.series[0];
        // setInterval(() => {
        //   const x = new Date().getTime(); // current time
        //   const y = Math.random();
        //   series.addPoint([x, y], true, true);
        // }, 1000);

        socket.on('cpu', (cpuPercent: any) => {
          console.log(cpuPercent);
          //   const x = cpuPercent.name; // current time
          //   const y = cpuPercent.value;
          const x = new Date().getTime(); // current time
          const y = Math.random();
          series.addPoint([x, y], true, true);
        });
      },
    },
  },

  time: {
    useUTC: false,
  },

  title: {
    text: 'Live random data',
  },

  accessibility: {
    announceNewData: {
      enabled: true,
      minAnnounceInterval: 15000,
      announcementFormatter(allSeries, newSeries, newPoint) {
        if (newPoint) {
          return `New point added. Value: ${newPoint.y}`;
        }
        return false;
      },
    },
  },

  xAxis: {
    type: 'datetime',
    tickPixelInterval: 150,
  },

  yAxis: {
    title: {
      text: 'Value',
    },
    plotLines: [
      {
        value: 0,
        width: 1,
        color: '#808080',
      },
    ],
  },

  tooltip: {
    headerFormat: '<b>{series.name}</b><br/>',
    pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}',
  },

  legend: {
    enabled: false,
  },

  exporting: {
    enabled: false,
  },

  series: [
    {
      type: 'spline',
      name: 'Random data',
      data: (function () {
        // generate an array of random data
        const data = [];
        const time = new Date().getTime();
        let i;

        for (i = -19; i <= 0; i += 1) {
          data.push({
            x: time + i * 1000,
            y: Math.random(),
          });
        }
        return data;
      }()),
    },
  ],
};

const ForexChartServer: React.FC = (props: HighchartsReact.Props) =>
//   const [data, setData] = useState<any>([]);

//   useEffect(() => {
//     socket.on('cpu', (cpuPercent: any) => {
//       console.log(cpuPercent);
//       setData((currentData: any) => [...currentData, cpuPercent]);
//       // setOptions((currentOptions: any) => {
//       //   console.log(currentOptions);

//       //   return ({ ...currentOptions, data: [...currentOptions.data, cpuPercent] })
//       // })
//       // options = {...options, data: [...percents, cpuPercent]};
//     });

//     return () => {
//       socket.close();
//     };
//   }, []);

  // eslint-disable-next-line implicit-arrow-linebreak
  (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    </>
  );
export default ForexChartServer;
