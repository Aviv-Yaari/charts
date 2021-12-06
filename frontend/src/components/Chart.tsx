import { StyledChart } from '../assets/styles/Chart.styled';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Point,
} from 'chart.js';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from '../App';
import { useFetch } from '../hooks/useFetch';
import { httpService } from '../services/http.service';
import { DataPoint, pointService } from '../services/point.service';
import { useInterval } from '../hooks/useInterval';
import 'chartjs-adapter-date-fns';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, TimeScale, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};

interface Props {
  setAlert: React.Dispatch<React.SetStateAction<Alert | null>>;
}

export function Chart({ setAlert }: Props) {
  const { fetchData: fetchPoint } = useFetch(setAlert);
  const [points, setPoints] = useState<DataPoint[]>([]);
  const [labels, setLabels] = useState<number[]>([]);
  const [dataset, setDataset] = useState<number[]>([]);

  // Update Chart
  useInterval(() => {
    // better time complexity, less accurate:
    const now = new Date(Date.now());
    const formattedTime = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    // setLabels(labels => [...labels, formattedTime]);
    // setDataset(dataset => [...dataset, points[points.length - 1]?.num || 0]);

    // bad time complexity, accurate:
    setLabels(() => points.map(point => point.timestamp));
    setDataset(() => points.map(point => point.num));
  }, 1000);

  // Update Points
  useInterval(async () => {
    const { num } = await fetchPoint(pointService.get);
    setPoints(points => [...points, { timestamp: Date.now(), num }]);
  }, 250);

  const data = {
    labels,
    datasets: [
      {
        label: 'value',
        data: dataset,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return (
    <StyledChart>
      <h2>Chart</h2>
      <Line
        options={{
          responsive: true,
          scales: {
            x: {
              type: 'time',

              time: {
                unit: 'second',
                stepSize: 10,
                displayFormats: { second: 'hh:mm:ss' },
              },
            },
          },
          plugins: {
            legend: {
              position: 'top' as const,
            },
          },
        }}
        data={data}
      />
    </StyledChart>
  );
}
