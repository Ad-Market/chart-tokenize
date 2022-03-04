import { CrosshairMode } from 'lightweight-charts';
import { Option } from '../model';

export const chartOption = {
  upColor: '#4bffb5',
  downColor: '#ff4976',
  borderDownColor: '#ff4976',
  borderUpColor: '#4bffb5',
  wickDownColor: '#838ca1',
  wickUpColor: '#838ca1',
};

export const mainChartOption = {
  layout: {
    backgroundColor: '#253248',
    textColor: 'rgba(255, 255, 255, 0.9)',
  },
  grid: {
    vertLines: {
      color: '#334158',
    },
    horzLines: {
      color: '#334158',
    },
  },
  crosshair: {
    mode: CrosshairMode.Magnet,
  },
  leftPriceScale: {
    borderColor: '#485c7b',
  },
  rightPriceScale: {
    borderColor: '#485c7b',
  },
  timeScale: {
    borderColor: '#485c7b',
  },
};

export const resolutionOptions: Array<Option> = [
  {
    label: 'Time',
    value: 'Time',
  },
  {
    label: '1m',
    value: '1m',
  },
  {
    label: '3m',
    value: '3m',
  },
  {
    label: '5m',
    value: '5m',
  },
  {
    label: '15m',
    value: '15m',
  },
  {
    label: '30m',
    value: '30m',
  },
  {
    label: '1H',
    value: '1h',
  },
  {
    label: '2H',
    value: '2h',
  },
  {
    label: '4H',
    value: '4h',
  },
  {
    label: '6H',
    value: '6h',
  },
  {
    label: '8H',
    value: '8h',
  },
  {
    label: '12H',
    value: '12h',
  },
  {
    label: '1D',
    value: '1d',
  },
  {
    label: '3D',
    value: '3d',
  },
  {
    label: '1W',
    value: '1w',
  },
  {
    label: '1M',
    value: '1M',
  },
];
