import { useMemo, type ReactNode } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ScatterController,
} from 'chart.js';
import { Bar, Line, Pie, Scatter, Chart } from 'react-chartjs-2';

const EXCEL_GREEN = '#107c41';
const EXCEL_GREEN_SOFT = 'rgba(16, 124, 65, 0.75)';
const ACCENT = '#118AB2';
const AMBER = '#f59e0b';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ScatterController,
);

const baseOpts = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top' as const,
      labels: { boxWidth: 12, font: { family: 'Nunito, system-ui, sans-serif' } },
    },
  },
};

function histogramBins(values: number[], binWidth: number) {
  const minV = Math.min(...values);
  const maxV = Math.max(...values);
  const start = Math.floor(minV / binWidth) * binWidth;
  const end = Math.ceil(maxV / binWidth) * binWidth;
  const labels: string[] = [];
  const counts: number[] = [];
  for (let a = start; a < end; a += binWidth) {
    const b = a + binWidth;
    labels.push(`${a}–${b}`);
    counts.push(values.filter((v) => v >= a && v < b).length);
  }
  return { labels, counts };
}

export type ExcelLessonChartKind =
  | 'column'
  | 'bar'
  | 'line'
  | 'pie'
  | 'area'
  | 'scatter'
  | 'mixed'
  | 'histogram';

const axisFont = { family: 'Nunito, system-ui, sans-serif', size: 11 };

/** Vista previa del gráfico alineada a cada ejemplo de la lección (mismos dólares / unidades que la tabla). */
export function ExcelLessonChart({ kind }: { kind: ExcelLessonChartKind }) {
  const minutos = useMemo(() => [4, 7, 5, 12, 6, 8, 15, 5, 9, 11], []);
  const hist = useMemo(() => histogramBins(minutos, 5), [minutos]);

  const columnData = {
    labels: ['Norte', 'Sur', 'Este', 'Oeste'],
    datasets: [
      {
        label: 'Ventas (miles USD)',
        data: [120, 95, 140, 88],
        backgroundColor: [EXCEL_GREEN_SOFT, 'rgba(16, 124, 65, 0.45)', EXCEL_GREEN_SOFT, 'rgba(16, 124, 65, 0.45)'],
        borderColor: EXCEL_GREEN,
        borderWidth: 2,
      },
    ],
  };

  const barHorizontalData = {
    labels: ['Migración CRM', 'Web corporativa', 'Informe BI'],
    datasets: [
      {
        label: 'Horas',
        data: [210, 165, 92],
        backgroundColor: EXCEL_GREEN_SOFT,
        borderColor: EXCEL_GREEN,
        borderWidth: 2,
      },
    ],
  };

  const lineData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
    datasets: [
      {
        label: 'Ingreso (miles USD)',
        data: [42, 45, 41, 52, 49],
        borderColor: EXCEL_GREEN,
        backgroundColor: 'rgba(16, 124, 65, 0.15)',
        fill: true,
        tension: 0.25,
        borderWidth: 2,
      },
    ],
  };

  const pieData = {
    labels: ['Tienda', 'Online', 'Mayorista'],
    datasets: [
      {
        data: [45, 35, 20],
        backgroundColor: [EXCEL_GREEN, ACCENT, AMBER],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const areaData = {
    labels: ['T1', 'T2', 'T3'],
    datasets: [
      {
        label: 'Nuevos',
        data: [18, 22, 20],
        borderColor: EXCEL_GREEN,
        backgroundColor: 'rgba(16, 124, 65, 0.35)',
        fill: true,
        tension: 0.2,
      },
      {
        label: 'Renovados',
        data: [12, 14, 16],
        borderColor: ACCENT,
        backgroundColor: 'rgba(17, 138, 178, 0.25)',
        fill: true,
        tension: 0.2,
      },
    ],
  };

  const scatterData = {
    datasets: [
      {
        label: 'Semanas (pub. vs ventas)',
        data: [
          { x: 2, y: 48 },
          { x: 3, y: 52 },
          { x: 2.5, y: 50 },
          { x: 4, y: 58 },
          { x: 5, y: 62 },
          { x: 4.5, y: 60 },
          { x: 6, y: 65 },
          { x: 5.5, y: 63 },
        ],
        backgroundColor: EXCEL_GREEN,
        borderColor: EXCEL_GREEN,
        pointRadius: 6,
      },
    ],
  };

  const mixedData = {
    labels: ['Ene', 'Feb', 'Mar'],
    datasets: [
      {
        type: 'bar' as const,
        label: 'Unidades',
        data: [320, 340, 310],
        backgroundColor: EXCEL_GREEN_SOFT,
        borderColor: EXCEL_GREEN,
        borderWidth: 2,
        yAxisID: 'y',
      },
      {
        type: 'line' as const,
        label: 'Margen %',
        data: [22, 24, 21],
        borderColor: AMBER,
        backgroundColor: 'rgba(245, 158, 11, 0.2)',
        borderWidth: 2,
        yAxisID: 'y1',
        tension: 0.2,
        pointRadius: 4,
      },
    ],
  };

  const histData = {
    labels: hist.labels,
    datasets: [
      {
        label: 'Frecuencia (min hasta 1.ª respuesta)',
        data: hist.counts,
        backgroundColor: 'rgba(16, 124, 65, 0.65)',
        borderColor: EXCEL_GREEN,
        borderWidth: 2,
      },
    ],
  };

  const wrap = (title: string, node: ReactNode) => (
    <div className="flex h-full flex-col rounded-xl border-2 border-[#107c41]/25 bg-linear-to-br from-white to-[#ecfdf5]/90 p-3 shadow-sm">
      <p className="m-0 mb-2 text-center font-nunito text-xs font-black leading-snug text-[#107c41]">{title}</p>
      <div className="relative min-h-56 flex-1">{node}</div>
    </div>
  );

  switch (kind) {
    case 'column':
      return wrap(
        'Gráfico de columnas — ventas por región (miles USD)',
        <Bar
          data={columnData}
          options={{
            ...baseOpts,
            scales: {
              x: { ticks: { font: axisFont }, grid: { display: false } },
              y: { beginAtZero: true, ticks: { font: axisFont } },
            },
          }}
        />,
      );
    case 'bar':
      return wrap(
        'Gráfico de barras — horas dedicadas por proyecto',
        <Bar
          data={barHorizontalData}
          options={{
            indexAxis: 'y' as const,
            ...baseOpts,
            scales: {
              x: { beginAtZero: true, ticks: { font: axisFont } },
              y: { ticks: { font: axisFont }, grid: { display: false } },
            },
          }}
        />,
      );
    case 'line':
      return wrap(
        'Gráfico de líneas — ingresos mensuales (miles USD)',
        <Line
          data={lineData}
          options={{
            ...baseOpts,
            scales: {
              x: { ticks: { font: axisFont }, grid: { display: false } },
              y: { beginAtZero: true, ticks: { font: axisFont } },
            },
          }}
        />,
      );
    case 'pie':
      return wrap(
        'Gráfico circular — participación por canal de venta (%)',
        <Pie
          data={pieData}
          options={{
            ...baseOpts,
            plugins: {
              ...baseOpts.plugins,
              legend: { ...baseOpts.plugins.legend, position: 'right' as const },
            },
          }}
        />,
      );
    case 'area':
      return wrap(
        'Gráfico de áreas — contratos nuevos y renovados por trimestre',
        <Line
          data={areaData}
          options={{
            ...baseOpts,
            scales: {
              x: { ticks: { font: axisFont }, grid: { display: false } },
              y: { beginAtZero: true, ticks: { font: axisFont } },
            },
          }}
        />,
      );
    case 'scatter':
      return wrap(
        'Dispersión (XY) — publicidad vs ventas (miles USD, 8 semanas)',
        <Scatter
          data={scatterData}
          options={{
            ...baseOpts,
            scales: {
              x: {
                type: 'linear',
                position: 'bottom',
                title: { display: true, text: 'Publicidad (miles USD)', font: axisFont },
                ticks: { font: axisFont },
              },
              y: {
                title: { display: true, text: 'Ventas (miles USD)', font: axisFont },
                ticks: { font: axisFont },
              },
            },
          }}
        />,
      );
    case 'mixed':
      return wrap(
        'Gráfico combinado — unidades vendidas y margen (dos ejes)',
        <Chart
          type="bar"
          data={mixedData}
          options={{
            ...baseOpts,
            scales: {
              x: { ticks: { font: axisFont }, grid: { display: false } },
              y: {
                type: 'linear',
                position: 'left',
                beginAtZero: true,
                title: { display: true, text: 'Unidades', font: axisFont },
                ticks: { font: axisFont },
              },
              y1: {
                type: 'linear',
                position: 'right',
                beginAtZero: true,
                grid: { drawOnChartArea: false },
                title: { display: true, text: 'Margen %', font: axisFont },
                ticks: { font: axisFont },
              },
            },
          }}
        />,
      );
    case 'histogram':
      return wrap(
        'Histograma — distribución de minutos hasta la 1.ª respuesta',
        <Bar
          data={histData}
          options={{
            ...baseOpts,
            scales: {
              x: { ticks: { font: axisFont }, grid: { display: false } },
              y: {
                beginAtZero: true,
                ticks: { stepSize: 1, font: axisFont },
                title: { display: true, text: 'Frecuencia', font: axisFont },
              },
            },
          }}
        />,
      );
    default:
      return null;
  }
}
