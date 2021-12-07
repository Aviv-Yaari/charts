import { httpService } from './http.service';

export interface DataPoint {
  timestamp: number;
  num1: number;
  num2: number;
}

const get = async () => {
  const point = await httpService.get('point');
  return point;
};

export const pointService = { get };
