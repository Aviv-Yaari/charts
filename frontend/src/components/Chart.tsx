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

interface Props {
  setAlert: React.Dispatch<React.SetStateAction<Alert | null>>;
}

export function Chart({ setAlert }: Props) {
  const { fetchData: fetchPoint, error } = useFetch(setAlert);
  const [points, setPoints] = useState<DataPoint[]>([]);
  const [labels, setLabels] = useState<number[]>([]);
  const [dataset1, setDataset1] = useState<number[]>([]);
  const [dataset2, setDataset2] = useState<number[]>([]);

  // Update Chart
  useInterval(() => {
    const { labels, dataset1, dataset2 } = points.reduce(
      (res, point) => {
        res.labels.push(point.timestamp);
        res.dataset1.push(point.num1);
        res.dataset2.push(point.num2);
        return res;
      },
      { labels: [] as number[], dataset1: [] as number[], dataset2: [] as number[] }
    );
    setLabels(labels);
    setDataset1(dataset1);
    setDataset2(dataset2);
  }, 1000);

  // Update Points
  useInterval(async () => {
    if (error) return; // prevent too many requests when server is potentially down
    const point1 = await fetchPoint(pointService.get);
    const point2 = await fetchPoint(pointService.get);
    if (!point1 || !point2) return;
    setPoints(points => {
      const copy = [...points];
      if (points[0] && differenceInSeconds(Date.now(), points[0].timestamp) > 180) copy.shift();
      copy.push({ timestamp: Date.now(), num1: point1.num, num2: point2.num });
      return copy;
    });
  }, 2500);

  const data = {
    labels,
    datasets: [
      {
        borderWidth: 1,
        data: dataset1,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointRadius: 0,
      },
      {
        borderWidth: 1,
        data: dataset2,
        borderColor: 'rgb(99, 128, 255)',
        backgroundColor: 'rgba(109, 99, 255, 0.5)',
        pointRadius: 0,
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
