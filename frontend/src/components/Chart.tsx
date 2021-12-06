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
} from 'chart.js';
import { useState } from 'react';
import { Alert } from '../App';
import { useFetch } from '../hooks/useFetch';
import { DataPoint, pointService } from '../services/point.service';
import { useInterval } from '../hooks/useInterval';
import 'chartjs-adapter-date-fns';
import { differenceInSeconds } from 'date-fns';

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
    setLabels(() => points.map(point => point.timestamp));
    setDataset(() => points.map(point => point.num));
  }, 1000);

  // Update Points
  useInterval(async () => {
    const { num } = await fetchPoint(pointService.get);
    setPoints(points => {
      const copy = [...points];
      if (points[0] && differenceInSeconds(Date.now(), points[0].timestamp) > 180) copy.shift();
      copy.push({ timestamp: Date.now(), num });
      return copy;
    });
  }, 250);

  const data = {
    labels,
    datasets: [
      {
        label: 'value',
        data: dataset,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointRadius: 1,
      },
    ],
  };
  return (
    <StyledChart>
      <Line
        options={{
          responsive: true,
          animation: {
            duration: 0,
          },
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
              display: false,
            },
          },
        }}
        data={data}
      />
    </StyledChart>
  );
}
