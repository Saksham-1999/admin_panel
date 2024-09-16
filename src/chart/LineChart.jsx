import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: [
    "0-2",
    "2-4",
    "4-6",
    "6-8",
    "8-10",
    "10-12",
    "12-14",
    "14-16",
    "16-18",
    "18-20",
    "20-22",
    "22-24",
  ],
  datasets: [
    {
      label: "Emails Received",
      data: [
        0, 3500, 5000, 4200, 6000, 7500, 8200, 9000, 7800, 6500, 5200, 3800,
        10000,
      ],
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      pointRadius: 5,
      pointHitRadius: 10,
    },
  ],
};

const options = {
  //   scales: {
  //     yAxes: [
  //       {
  //         ticks: {
  //           beginAtZero: true,
  //           max: 10000,
  //         },
  //       },
  //     ],
  //   },
};

const LineChart = () => {
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "1px",
        width: "400px",
        height: "200px",
        margin: "50px",
      }}
    >
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
