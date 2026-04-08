import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
const EXCEL_GREEN_SOFT = 'rgba(16, 124, 65, 0.8)';
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

export type SimpleRow = { category: string; value: number };
export type AreaRow = { category: string; s1: number; s2: number };
export type ScatterRow = { category: string; x: number; y: number };
export type MixedRow = { category: string; units: number; marginPct: number };

export type ValueFormat = 'currency' | 'percent' | 'number' | 'hours';

export type InteractiveChartKind =
  | 'bar'
  | 'horizontalBar'
  | 'line'
  | 'pie'
  | 'area'
  | 'scatter'
  | 'mixed'
  | 'histogram';

type BaseProps = {
  rowLabel: string;
  chartTitle: string;
  tableBadge?: string;
  tableSubtitle?: string;
  searchPlaceholder?: string;
  compact?: boolean;
  showIntro?: boolean;
  histogramBinWidth?: number;
};

export type ExcelInteractiveFilterChartProps = BaseProps &
  (
    | {
        chartKind: 'bar' | 'horizontalBar' | 'line' | 'pie' | 'histogram';
        rows: SimpleRow[];
        valueColumnLabel: string;
        valueFormat: ValueFormat;
      }
    | {
        chartKind: 'area';
        rows: AreaRow[];
        valueColumnLabel: string;
        seriesLabels: [string, string];
        valueFormat: ValueFormat;
      }
    | {
        chartKind: 'scatter';
        rows: ScatterRow[];
        xLabel: string;
        yLabel: string;
        valueFormat: ValueFormat;
      }
    | {
        chartKind: 'mixed';
        rows: MixedRow[];
        valueColumnLabel: string;
      }
  );

function histogramBins(values: number[], binWidth: number) {
  if (values.length === 0) return { labels: [] as string[], counts: [] as number[] };
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

function formatValue(n: number, fmt: ValueFormat) {
  if (fmt === 'percent') return `${n}%`;
  if (fmt === 'hours') return `${n} h`;
  if (fmt === 'number') return String(n);
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(n);
}

const axisFont = { family: 'Nunito, system-ui, sans-serif', size: 11 };

type OpenFilter = 'col1' | 'col2' | 'col3' | null;

export function ExcelInteractiveFilterChart(props: ExcelInteractiveFilterChartProps) {
  const {
    chartKind,
    rowLabel,
    chartTitle,
    tableBadge,
    tableSubtitle,
    searchPlaceholder,
    compact,
    showIntro,
    histogramBinWidth = 5,
  } = props;

  const categories = useMemo(() => {
    return props.rows.map((r) => r.category);
  }, [props.rows, chartKind]);

  const [selected, setSelected] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(categories.map((c) => [c, true])),
  );
  /** Orden principal: desde qué columna se aplicó el último “Aceptar”. */
  const [sortKey, setSortKey] = useState<
    'category' | 'value' | 's1' | 's2' | 'x' | 'y' | 'units' | 'margin'
  >('value');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchCol1, setSearchCol1] = useState('');
  const [searchCol2, setSearchCol2] = useState('');
  const [searchCol3, setSearchCol3] = useState('');

  const [openFilter, setOpenFilter] = useState<OpenFilter>(null);
  const [draftSelected, setDraftSelected] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(categories.map((c) => [c, true])),
  );
  const [draftSortOrder, setDraftSortOrder] = useState<'asc' | 'desc'>('desc');
  const [draftSearchCol1, setDraftSearchCol1] = useState('');
  const [draftSearchCol2, setDraftSearchCol2] = useState('');
  const [draftSearchCol3, setDraftSearchCol3] = useState('');

  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    setSelected(Object.fromEntries(categories.map((c) => [c, true])));
    setDraftSelected(Object.fromEntries(categories.map((c) => [c, true])));
  }, [categories.join('|')]);

  const cancelFilter = useCallback(() => setOpenFilter(null), []);

  const openPanel = useCallback(
    (col: NonNullable<OpenFilter>) => {
      setDraftSelected({ ...selected });
      setDraftSearchCol1(searchCol1);
      setDraftSearchCol2(searchCol2);
      setDraftSearchCol3(searchCol3);
      if (col === 'col1') {
        setDraftSortOrder(sortKey === 'category' ? sortOrder : 'asc');
      } else if (col === 'col2') {
        const sk =
          chartKind === 'area'
            ? 's1'
            : chartKind === 'scatter'
              ? 'x'
              : chartKind === 'mixed'
                ? 'units'
                : 'value';
        setDraftSortOrder(sortKey === sk ? sortOrder : 'desc');
      } else if (col === 'col3') {
        const sk = chartKind === 'area' ? 's2' : chartKind === 'mixed' ? 'margin' : 'y';
        setDraftSortOrder(sortKey === sk ? sortOrder : 'desc');
      }
      setOpenFilter(col);
    },
    [selected, searchCol1, searchCol2, searchCol3, sortKey, sortOrder, chartKind],
  );

  const applyCol1 = useCallback(() => {
    setSelected({ ...draftSelected });
    setSearchCol1(draftSearchCol1);
    setSortKey('category');
    setSortOrder(draftSortOrder);
    setOpenFilter(null);
  }, [draftSelected, draftSearchCol1, draftSortOrder]);

  const applyCol2 = useCallback(() => {
    setSelected({ ...draftSelected });
    setSearchCol2(draftSearchCol2);
    if (chartKind === 'area') {
      setSortKey('s1');
    } else if (chartKind === 'scatter') {
      setSortKey('x');
    } else if (chartKind === 'mixed') {
      setSortKey('units');
    } else {
      setSortKey('value');
    }
    setSortOrder(draftSortOrder);
    setOpenFilter(null);
  }, [draftSelected, draftSearchCol2, draftSortOrder, chartKind]);

  const applyCol3 = useCallback(() => {
    setSelected({ ...draftSelected });
    setSearchCol3(draftSearchCol3);
    if (chartKind === 'area') {
      setSortKey('s2');
    } else if (chartKind === 'mixed') {
      setSortKey('margin');
    } else {
      setSortKey('y');
    }
    setSortOrder(draftSortOrder);
    setOpenFilter(null);
  }, [draftSelected, draftSearchCol3, draftSortOrder, chartKind]);

  useEffect(() => {
    if (!openFilter) return;
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node;
      if (tableRef.current?.contains(t)) return;
      setOpenFilter(null);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [openFilter]);

  const valueFmt: ValueFormat =
    chartKind === 'mixed'
      ? 'number'
      : chartKind === 'scatter'
        ? props.valueFormat
        : chartKind === 'area'
          ? props.valueFormat
          : (props as { valueFormat: ValueFormat }).valueFormat;

  const fmtForTable = (v: number) => formatValue(v, valueFmt);

  const sortRowsSimple = (list: SimpleRow[]) => {
    return [...list].sort((a, b) => {
      if (sortKey === 'category') {
        const cmp = a.category.localeCompare(b.category, 'es', { sensitivity: 'base' });
        return sortOrder === 'asc' ? cmp : -cmp;
      }
      const cmp = a.value - b.value;
      return sortOrder === 'asc' ? cmp : -cmp;
    });
  };

  const sortRowsArea = (list: AreaRow[]) => {
    return [...list].sort((a, b) => {
      if (sortKey === 'category') {
        const cmp = a.category.localeCompare(b.category, 'es', { sensitivity: 'base' });
        return sortOrder === 'asc' ? cmp : -cmp;
      }
      if (sortKey === 's1') {
        const cmp = a.s1 - b.s1;
        return sortOrder === 'asc' ? cmp : -cmp;
      }
      const cmp = a.s2 - b.s2;
      return sortOrder === 'asc' ? cmp : -cmp;
    });
  };

  const sortRowsScatter = (list: ScatterRow[]) => {
    return [...list].sort((a, b) => {
      if (sortKey === 'category') {
        const cmp = a.category.localeCompare(b.category, 'es', { sensitivity: 'base' });
        return sortOrder === 'asc' ? cmp : -cmp;
      }
      if (sortKey === 'x') {
        const cmp = a.x - b.x;
        return sortOrder === 'asc' ? cmp : -cmp;
      }
      const cmp = a.y - b.y;
      return sortOrder === 'asc' ? cmp : -cmp;
    });
  };

  const sortRowsMixed = (list: MixedRow[]) => {
    return [...list].sort((a, b) => {
      if (sortKey === 'category') {
        const cmp = a.category.localeCompare(b.category, 'es', { sensitivity: 'base' });
        return sortOrder === 'asc' ? cmp : -cmp;
      }
      if (sortKey === 'units') {
        const cmp = a.units - b.units;
        return sortOrder === 'asc' ? cmp : -cmp;
      }
      const cmp = a.marginPct - b.marginPct;
      return sortOrder === 'asc' ? cmp : -cmp;
    });
  };

  const visibleSimple = useMemo(() => {
    if (chartKind !== 'bar' && chartKind !== 'horizontalBar' && chartKind !== 'line' && chartKind !== 'pie' && chartKind !== 'histogram') {
      return [] as SimpleRow[];
    }
    const { rows } = props;
    let list = rows.filter((r) => selected[r.category]);
    const q1 = searchCol1.trim().toLowerCase();
    if (q1) list = list.filter((r) => r.category.toLowerCase().includes(q1));
    const q2 = searchCol2.trim().toLowerCase();
    if (q2) list = list.filter((r) => fmtForTable(r.value).toLowerCase().includes(q2));
    return sortRowsSimple(list);
  }, [props, chartKind, selected, searchCol1, searchCol2, sortKey, sortOrder, valueFmt]);

  const visibleArea = useMemo(() => {
    if (chartKind !== 'area') return [] as AreaRow[];
    const { rows } = props;
    let list = rows.filter((r) => selected[r.category]);
    const q1 = searchCol1.trim().toLowerCase();
    if (q1) list = list.filter((r) => r.category.toLowerCase().includes(q1));
    const q2 = searchCol2.trim().toLowerCase();
    if (q2) list = list.filter((r) => formatValue(r.s1, valueFmt).toLowerCase().includes(q2));
    const q3 = searchCol3.trim().toLowerCase();
    if (q3) list = list.filter((r) => formatValue(r.s2, valueFmt).toLowerCase().includes(q3));
    return sortRowsArea(list);
  }, [props, chartKind, selected, searchCol1, searchCol2, searchCol3, sortKey, sortOrder, valueFmt]);

  const visibleScatter = useMemo(() => {
    if (chartKind !== 'scatter') return [] as ScatterRow[];
    const { rows } = props;
    let list = rows.filter((r) => selected[r.category]);
    const q1 = searchCol1.trim().toLowerCase();
    if (q1) list = list.filter((r) => r.category.toLowerCase().includes(q1));
    const q2 = searchCol2.trim().toLowerCase();
    if (q2) list = list.filter((r) => String(r.x).toLowerCase().includes(q2));
    const q3 = searchCol3.trim().toLowerCase();
    if (q3) list = list.filter((r) => String(r.y).toLowerCase().includes(q3));
    return sortRowsScatter(list);
  }, [props, chartKind, selected, searchCol1, searchCol2, searchCol3, sortKey, sortOrder]);

  const visibleMixed = useMemo(() => {
    if (chartKind !== 'mixed') return [] as MixedRow[];
    const { rows } = props;
    let list = rows.filter((r) => selected[r.category]);
    const q1 = searchCol1.trim().toLowerCase();
    if (q1) list = list.filter((r) => r.category.toLowerCase().includes(q1));
    const q2 = searchCol2.trim().toLowerCase();
    if (q2) list = list.filter((r) => String(r.units).toLowerCase().includes(q2));
    const q3 = searchCol3.trim().toLowerCase();
    if (q3) list = list.filter((r) => String(r.marginPct).toLowerCase().includes(q3));
    return sortRowsMixed(list);
  }, [props, chartKind, selected, searchCol1, searchCol2, searchCol3, sortKey, sortOrder]);

  const filterColumnLabel =
    chartKind === 'scatter'
      ? props.yLabel
      : chartKind === 'mixed'
        ? props.valueColumnLabel
        : 'valueColumnLabel' in props
          ? props.valueColumnLabel
          : '';

  const seriesL = chartKind === 'area' ? props.seriesLabels : null;
  const xLab = chartKind === 'scatter' ? props.xLabel : '';
  const yLab = chartKind === 'scatter' ? props.yLabel : '';

  const draftCategoriesFiltered = useMemo(() => {
    const q = draftSearchCol1.trim().toLowerCase();
    return categories.filter((c) => !q || c.toLowerCase().includes(q));
  }, [categories, draftSearchCol1]);

  const simpleRowsForDraft = useMemo(() => {
    if (
      chartKind === 'bar' ||
      chartKind === 'horizontalBar' ||
      chartKind === 'line' ||
      chartKind === 'pie' ||
      chartKind === 'histogram'
    ) {
      return (props as { rows: SimpleRow[] }).rows;
    }
    return [];
  }, [props, chartKind]);

  const draftValuesFiltered = useMemo(() => {
    const q = draftSearchCol2.trim().toLowerCase();
    return categories.filter((c) => {
      if (chartKind === 'area') {
        const row = (props as { rows: AreaRow[] }).rows.find((r) => r.category === c);
        if (!row) return false;
        const t = `${formatValue(row.s1, valueFmt)} ${c}`.toLowerCase();
        return !q || t.includes(q);
      }
      if (chartKind === 'scatter') {
        const row = (props as { rows: ScatterRow[] }).rows.find((r) => r.category === c);
        if (!row) return false;
        const t = `${row.x} ${c}`.toLowerCase();
        return !q || t.includes(q);
      }
      if (chartKind === 'mixed') {
        const row = (props as { rows: MixedRow[] }).rows.find((r) => r.category === c);
        if (!row) return false;
        const t = `${row.units} ${c}`.toLowerCase();
        return !q || t.includes(q);
      }
      const row = simpleRowsForDraft.find((r) => r.category === c);
      if (!row) return false;
      const t = `${fmtForTable(row.value)} ${c}`.toLowerCase();
      return !q || t.includes(q);
    });
  }, [categories, draftSearchCol2, chartKind, props, simpleRowsForDraft, valueFmt]);

  const draftCol3Filtered = useMemo(() => {
    const q = draftSearchCol3.trim().toLowerCase();
    return categories.filter((c) => {
      if (chartKind === 'area') {
        const row = (props as { rows: AreaRow[] }).rows.find((r) => r.category === c);
        if (!row) return false;
        const t = `${formatValue(row.s2, valueFmt)} ${c}`.toLowerCase();
        return !q || t.includes(q);
      }
      if (chartKind === 'mixed') {
        const row = (props as { rows: MixedRow[] }).rows.find((r) => r.category === c);
        if (!row) return false;
        const t = `${row.marginPct} ${c}`.toLowerCase();
        return !q || t.includes(q);
      }
      if (chartKind === 'scatter') {
        const row = (props as { rows: ScatterRow[] }).rows.find((r) => r.category === c);
        if (!row) return false;
        const t = `${row.y} ${c}`.toLowerCase();
        return !q || t.includes(q);
      }
      return true;
    });
  }, [categories, draftSearchCol3, chartKind, props, valueFmt]);

  const allDraftChecked1 = draftCategoriesFiltered.every((c) => draftSelected[c]);
  const someDraftChecked1 = draftCategoriesFiltered.some((c) => draftSelected[c]);
  const selectAllRef1 = useRef<HTMLInputElement>(null);

  const allDraftChecked2 = draftValuesFiltered.every((c) => draftSelected[c]);
  const someDraftChecked2 = draftValuesFiltered.some((c) => draftSelected[c]);
  const selectAllRef2 = useRef<HTMLInputElement>(null);

  const allDraftChecked3 = draftCol3Filtered.every((c) => draftSelected[c]);
  const someDraftChecked3 = draftCol3Filtered.some((c) => draftSelected[c]);
  const selectAllRef3 = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = selectAllRef1.current;
    if (!el) return;
    el.indeterminate = !allDraftChecked1 && someDraftChecked1;
  }, [allDraftChecked1, someDraftChecked1]);

  useEffect(() => {
    const el = selectAllRef2.current;
    if (!el) return;
    el.indeterminate = !allDraftChecked2 && someDraftChecked2;
  }, [allDraftChecked2, someDraftChecked2]);

  useEffect(() => {
    const el = selectAllRef3.current;
    if (!el) return;
    el.indeterminate = !allDraftChecked3 && someDraftChecked3;
  }, [allDraftChecked3, someDraftChecked3]);

  const toggleSelectAll = (which: 1 | 2 | 3) => {
    const set = which === 1 ? draftCategoriesFiltered : which === 2 ? draftValuesFiltered : draftCol3Filtered;
    const all = which === 1 ? allDraftChecked1 : which === 2 ? allDraftChecked2 : allDraftChecked3;
    const next = !all;
    setDraftSelected((prev) => {
      const n = { ...prev };
      for (const c of set) n[c] = next;
      return n;
    });
  };

  const renderChart = () => {
    if (chartKind === 'histogram') {
      const vals = visibleSimple.map((r) => r.value);
      const hist = histogramBins(vals, histogramBinWidth);
      if (hist.labels.length === 0) return emptyChart();
      return (
        <Bar
          data={{
            labels: hist.labels,
            datasets: [
              {
                label: filterColumnLabel,
                data: hist.counts,
                backgroundColor: 'rgba(16, 124, 65, 0.65)',
                borderColor: EXCEL_GREEN,
                borderWidth: 2,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: (ctx) => ` ${ctx.raw} obs.`,
                },
              },
            },
            scales: {
              x: { ticks: { font: axisFont }, grid: { display: false } },
              y: {
                beginAtZero: true,
                ticks: { stepSize: 1, font: axisFont },
                title: { display: true, text: 'Frecuencia', font: axisFont },
              },
            },
          }}
        />
      );
    }
    if (chartKind === 'bar') {
      if (visibleSimple.length === 0) return emptyChart();
      const fmt = (props as { valueFormat?: ValueFormat }).valueFormat ?? 'number';
      return (
        <Bar
          data={{
            labels: visibleSimple.map((r) => r.category),
            datasets: [
              {
                label: filterColumnLabel,
                data: visibleSimple.map((r) => r.value),
                backgroundColor: visibleSimple.map(() => EXCEL_GREEN_SOFT),
                borderColor: EXCEL_GREEN,
                borderWidth: 2,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: { callbacks: { label: (ctx) => ` ${formatValue(Number(ctx.raw), fmt)}` } },
            },
            scales: {
              x: { ticks: { font: axisFont }, grid: { display: false } },
              y: {
                beginAtZero: true,
                ticks: { font: axisFont },
                title: { display: fmt === 'currency', text: 'USD', font: { size: 11 } },
              },
            },
          }}
        />
      );
    }
    if (chartKind === 'horizontalBar') {
      if (visibleSimple.length === 0) return emptyChart();
      const fmt = (props as { valueFormat?: ValueFormat }).valueFormat ?? 'number';
      return (
        <Bar
          data={{
            labels: visibleSimple.map((r) => r.category),
            datasets: [
              {
                label: filterColumnLabel,
                data: visibleSimple.map((r) => r.value),
                backgroundColor: EXCEL_GREEN_SOFT,
                borderColor: EXCEL_GREEN,
                borderWidth: 2,
              },
            ],
          }}
          options={{
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: { callbacks: { label: (ctx) => ` ${formatValue(Number(ctx.raw), fmt)}` } },
            },
            scales: {
              x: { beginAtZero: true, ticks: { font: axisFont } },
              y: { ticks: { font: axisFont }, grid: { display: false } },
            },
          }}
        />
      );
    }
    if (chartKind === 'line') {
      if (visibleSimple.length === 0) return emptyChart();
      const fmt = (props as { valueFormat?: ValueFormat }).valueFormat ?? 'number';
      return (
        <Line
          data={{
            labels: visibleSimple.map((r) => r.category),
            datasets: [
              {
                label: filterColumnLabel,
                data: visibleSimple.map((r) => r.value),
                borderColor: EXCEL_GREEN,
                backgroundColor: 'rgba(16, 124, 65, 0.15)',
                fill: true,
                tension: 0.25,
                borderWidth: 2,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: { callbacks: { label: (ctx) => ` ${formatValue(Number(ctx.raw), fmt)}` } },
            },
            scales: {
              x: { ticks: { font: axisFont }, grid: { display: false } },
              y: { beginAtZero: true, ticks: { font: axisFont } },
            },
          }}
        />
      );
    }
    if (chartKind === 'pie') {
      if (visibleSimple.length === 0) return emptyChart();
      const fmt = (props as { valueFormat?: ValueFormat }).valueFormat ?? 'number';
      return (
        <Pie
          data={{
            labels: visibleSimple.map((r) => r.category),
            datasets: [
              {
                data: visibleSimple.map((r) => r.value),
                backgroundColor: [EXCEL_GREEN, ACCENT, AMBER, '#94a3b8', '#ec4899', '#8b5cf6'].slice(
                  0,
                  visibleSimple.length,
                ),
                borderColor: '#fff',
                borderWidth: 2,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: 'right' },
              tooltip: { callbacks: { label: (ctx) => ` ${formatValue(Number(ctx.raw), fmt)}` } },
            },
          }}
        />
      );
    }
    if (chartKind === 'area') {
      if (visibleArea.length === 0) return emptyChart();
      const p = props as Extract<ExcelInteractiveFilterChartProps, { chartKind: 'area' }>;
      const fmt = p.valueFormat;
      return (
        <Line
          data={{
            labels: visibleArea.map((r) => r.category),
            datasets: [
              {
                label: p.seriesLabels[0],
                data: visibleArea.map((r) => r.s1),
                borderColor: EXCEL_GREEN,
                backgroundColor: 'rgba(16, 124, 65, 0.35)',
                fill: true,
                tension: 0.2,
              },
              {
                label: p.seriesLabels[1],
                data: visibleArea.map((r) => r.s2),
                borderColor: ACCENT,
                backgroundColor: 'rgba(17, 138, 178, 0.25)',
                fill: true,
                tension: 0.2,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'top' } },
            scales: {
              x: { ticks: { font: axisFont }, grid: { display: false } },
              y: { beginAtZero: true, ticks: { font: axisFont } },
            },
          }}
        />
      );
    }
    if (chartKind === 'scatter') {
      if (visibleScatter.length === 0) return emptyChart();
      const p = props as Extract<ExcelInteractiveFilterChartProps, { chartKind: 'scatter' }>;
      return (
        <Scatter
          data={{
            datasets: [
              {
                label: 'Puntos',
                data: visibleScatter.map((r) => ({ x: r.x, y: r.y })),
                backgroundColor: EXCEL_GREEN,
                borderColor: EXCEL_GREEN,
                pointRadius: 6,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: {
                type: 'linear',
                position: 'bottom',
                title: { display: true, text: p.xLabel, font: axisFont },
                ticks: { font: axisFont },
              },
              y: {
                title: { display: true, text: p.yLabel, font: axisFont },
                ticks: { font: axisFont },
              },
            },
          }}
        />
      );
    }
    if (chartKind === 'mixed') {
      if (visibleMixed.length === 0) return emptyChart();
      return (
        <Chart
          type="bar"
          data={{
            labels: visibleMixed.map((r) => r.category),
            datasets: [
              {
                type: 'bar',
                label: 'Unidades',
                data: visibleMixed.map((r) => r.units),
                backgroundColor: EXCEL_GREEN_SOFT,
                borderColor: EXCEL_GREEN,
                borderWidth: 2,
                yAxisID: 'y',
              },
              {
                type: 'line',
                label: 'Margen %',
                data: visibleMixed.map((r) => r.marginPct),
                borderColor: AMBER,
                backgroundColor: 'rgba(245, 158, 11, 0.2)',
                borderWidth: 2,
                yAxisID: 'y1',
                tension: 0.2,
                pointRadius: 4,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: true } },
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
        />
      );
    }
    return emptyChart();
  };

  function emptyChart() {
    return (
      <div className="flex h-56 items-center justify-center font-nunito text-sm text-textMuted">Sin datos para graficar</div>
    );
  }

  const hasData =
    chartKind === 'area'
      ? visibleArea.length > 0
      : chartKind === 'scatter'
        ? visibleScatter.length > 0
        : chartKind === 'mixed'
          ? visibleMixed.length > 0
          : visibleSimple.length > 0;

  const sortFooterLabel = () => {
    if (sortKey === 'category') return `categoría (${sortOrder === 'asc' ? 'A → Z' : 'Z → A'})`;
    if (sortKey === 'value') return `valores (${sortOrder === 'asc' ? 'menor → mayor' : 'mayor → menor'})`;
    if (sortKey === 's1') return `${seriesL?.[0] ?? 'Serie 1'} (${sortOrder === 'asc' ? '↑' : '↓'})`;
    if (sortKey === 's2') return `${seriesL?.[1] ?? 'Serie 2'} (${sortOrder === 'asc' ? '↑' : '↓'})`;
    if (sortKey === 'x') return `${xLab} (${sortOrder === 'asc' ? 'menor → mayor' : 'mayor → menor'})`;
    if (sortKey === 'y') return `${yLab} (${sortOrder === 'asc' ? 'menor → mayor' : 'mayor → menor'})`;
    if (sortKey === 'units') return `unidades (${sortOrder === 'asc' ? 'menor → mayor' : 'mayor → menor'})`;
    if (sortKey === 'margin') return `margen % (${sortOrder === 'asc' ? 'menor → mayor' : 'mayor → menor'})`;
    return '';
  };

  const filterPanelClass =
    'absolute right-0 top-full z-50 mt-1 w-[min(100%,18rem)] rounded border border-black/20 bg-[#2d2d30] p-2 text-left text-white shadow-xl';

  const FilterBtn = ({ col }: { col: 'col1' | 'col2' | 'col3' }) => (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        if (openFilter === col) {
          setOpenFilter(null);
        } else {
          openPanel(col);
        }
      }}
      className="inline-flex shrink-0 items-center gap-1 rounded border border-black/20 bg-white px-2 py-1 text-[0.65rem] font-black text-[#107c41] shadow-sm hover:bg-[#ecfdf5]"
      aria-expanded={openFilter === col}
      aria-haspopup="dialog"
    >
      Filtro
      <span className="text-[10px]" aria-hidden>
        ▼
      </span>
    </button>
  );

  const checkboxList = (ids: string[], selectRef: React.RefObject<HTMLInputElement | null>, which: 1 | 2 | 3) =>
    ids.map((c) => (
      <label key={c} className="flex cursor-pointer items-center gap-2 px-1 py-1 text-xs hover:bg-white/5">
        <input
          type="checkbox"
          checked={!!draftSelected[c]}
          onChange={() => setDraftSelected((prev) => ({ ...prev, [c]: !prev[c] }))}
        />
        {which === 1 && c}
        {which === 2 &&
          (chartKind === 'area'
            ? `${c} — ${formatValue((props as { rows: AreaRow[] }).rows.find((r) => r.category === c)!.s1, valueFmt)}`
            : chartKind === 'scatter'
              ? `${c} — x=${(props as { rows: ScatterRow[] }).rows.find((r) => r.category === c)!.x}`
              : chartKind === 'mixed'
                ? `${c} — ${(props as { rows: MixedRow[] }).rows.find((r) => r.category === c)!.units} u.`
                : `${c} — ${fmtForTable(simpleRowsForDraft.find((r) => r.category === c)!.value)}`)}
        {which === 3 &&
          (chartKind === 'area'
            ? `${c} — ${formatValue((props as { rows: AreaRow[] }).rows.find((r) => r.category === c)!.s2, valueFmt)}`
            : chartKind === 'mixed'
              ? `${c} — ${(props as { rows: MixedRow[] }).rows.find((r) => r.category === c)!.marginPct}%`
              : `${c} — y=${(props as { rows: ScatterRow[] }).rows.find((r) => r.category === c)!.y}`)}
      </label>
    ));

  return (
    <div className={compact ? '' : 'excel-interactive-filter space-y-5'}>
      {showIntro && !compact ? (
        <p className="m-0 font-nunito text-sm font-semibold text-textSecondary">
          Como en Excel: usá <strong>Filtro</strong> en <strong>cada columna</strong> para ordenar, buscar y marcar filas;
          la tabla y el gráfico se actualizan juntos.
        </p>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        <div className="overflow-visible rounded-lg border-2 border-[#1e1210]/20 bg-white shadow-md">
          {(tableBadge || tableSubtitle) && (
            <div className="flex items-center gap-2 border-b border-black/10 bg-[#f3f3f3] px-2 py-1.5 font-nunito text-xs font-bold text-[#333]">
              {tableBadge ? (
                <span className="rounded border border-black/20 bg-white px-2 py-0.5">{tableBadge}</span>
              ) : null}
              {tableSubtitle ? <span className="text-textMuted">{tableSubtitle}</span> : null}
            </div>
          )}
          <table ref={tableRef} className="w-full border-collapse font-nunito text-sm">
            <thead>
              <tr className="bg-[#e7e7e7] text-left text-xs font-extrabold uppercase tracking-wide text-[#333]">
                <th className="relative border border-black/10 px-2 py-2">
                  <div className="flex items-center justify-between gap-2">
                    <span>{rowLabel}</span>
                    <FilterBtn col="col1" />
                  </div>
                  {openFilter === 'col1' ? (
                    <div className={filterPanelClass} role="dialog" aria-label={`Filtro ${rowLabel}`}>
                      <p className="m-0 mb-2 border-b border-white/10 pb-2 text-[0.65rem] font-bold uppercase tracking-wide text-white/80">
                        {rowLabel}
                      </p>
                      <button
                        type="button"
                        className={`mb-1 flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs hover:bg-white/10 ${
                          draftSortOrder === 'asc' ? 'bg-[#107c41]/40' : ''
                        }`}
                        onClick={() => setDraftSortOrder('asc')}
                      >
                        Ordenar A → Z
                      </button>
                      <button
                        type="button"
                        className={`mb-2 flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs hover:bg-white/10 ${
                          draftSortOrder === 'desc' ? 'bg-[#107c41]/40' : ''
                        }`}
                        onClick={() => setDraftSortOrder('desc')}
                      >
                        Ordenar Z → A
                      </button>
                      <label className="mb-1 block text-[0.65rem] text-white/70">Buscar en {rowLabel}</label>
                      <input
                        type="search"
                        value={draftSearchCol1}
                        onChange={(e) => setDraftSearchCol1(e.target.value)}
                        placeholder={searchPlaceholder ?? 'Buscar…'}
                        className="mb-2 w-full rounded border border-white/20 bg-[#1e1e1e] px-2 py-1.5 text-xs text-white placeholder:text-white/40"
                      />
                      <div className="mb-2 max-h-36 overflow-y-auto rounded border border-white/10 bg-[#1e1e1e] p-1">
                        <label className="flex cursor-pointer items-center gap-2 px-1 py-1 text-xs hover:bg-white/5">
                          <input
                            ref={selectAllRef1}
                            type="checkbox"
                            checked={allDraftChecked1 && draftCategoriesFiltered.length > 0}
                            onChange={() => toggleSelectAll(1)}
                          />
                          (Seleccionar todo)
                        </label>
                        {checkboxList(draftCategoriesFiltered, selectAllRef1, 1)}
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="flex-1 rounded bg-[#107c41] px-2 py-2 text-xs font-black text-white hover:bg-[#0d5f32]"
                          onClick={applyCol1}
                        >
                          Aceptar
                        </button>
                        <button
                          type="button"
                          className="flex-1 rounded border border-white/30 px-2 py-2 text-xs font-bold text-white hover:bg-white/10"
                          onClick={cancelFilter}
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : null}
                </th>

                {chartKind === 'scatter' ? (
                  <>
                    <th className="relative border border-black/10 px-2 py-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="normal-case">{xLab}</span>
                        <FilterBtn col="col2" />
                      </div>
                      {openFilter === 'col2' ? (
                        <div className={filterPanelClass} role="dialog" aria-label={`Filtro ${xLab}`}>
                          <p className="m-0 mb-2 border-b border-white/10 pb-2 text-[0.65rem] font-bold uppercase tracking-wide text-white/80">
                            {xLab}
                          </p>
                          <button
                            type="button"
                            className={`mb-1 flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs hover:bg-white/10 ${
                              draftSortOrder === 'asc' ? 'bg-[#107c41]/40' : ''
                            }`}
                            onClick={() => setDraftSortOrder('asc')}
                          >
                            Ordenar de menor a mayor
                          </button>
                          <button
                            type="button"
                            className={`mb-2 flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs hover:bg-white/10 ${
                              draftSortOrder === 'desc' ? 'bg-[#107c41]/40' : ''
                            }`}
                            onClick={() => setDraftSortOrder('desc')}
                          >
                            Ordenar de mayor a menor
                          </button>
                          <label className="mb-1 block text-[0.65rem] text-white/70">Buscar en {xLab}</label>
                          <input
                            type="search"
                            value={draftSearchCol2}
                            onChange={(e) => setDraftSearchCol2(e.target.value)}
                            className="mb-2 w-full rounded border border-white/20 bg-[#1e1e1e] px-2 py-1.5 text-xs text-white placeholder:text-white/40"
                          />
                          <div className="mb-2 max-h-36 overflow-y-auto rounded border border-white/10 bg-[#1e1e1e] p-1">
                            <label className="flex cursor-pointer items-center gap-2 px-1 py-1 text-xs hover:bg-white/5">
                              <input
                                ref={selectAllRef2}
                                type="checkbox"
                                checked={allDraftChecked2 && draftValuesFiltered.length > 0}
                                onChange={() => toggleSelectAll(2)}
                              />
                              (Seleccionar todo)
                            </label>
                            {checkboxList(draftValuesFiltered, selectAllRef2, 2)}
                          </div>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              className="flex-1 rounded bg-[#107c41] px-2 py-2 text-xs font-black text-white hover:bg-[#0d5f32]"
                              onClick={applyCol2}
                            >
                              Aceptar
                            </button>
                            <button
                              type="button"
                              className="flex-1 rounded border border-white/30 px-2 py-2 text-xs font-bold text-white hover:bg-white/10"
                              onClick={cancelFilter}
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      ) : null}
                    </th>
                    <th className="relative border border-black/10 px-2 py-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="normal-case">{yLab}</span>
                        <FilterBtn col="col3" />
                      </div>
                      {openFilter === 'col3' ? (
                        <div className={filterPanelClass} role="dialog" aria-label={`Filtro ${yLab}`}>
                          <p className="m-0 mb-2 border-b border-white/10 pb-2 text-[0.65rem] font-bold uppercase tracking-wide text-white/80">
                            {yLab}
                          </p>
                          <button
                            type="button"
                            className={`mb-1 flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs hover:bg-white/10 ${
                              draftSortOrder === 'asc' ? 'bg-[#107c41]/40' : ''
                            }`}
                            onClick={() => setDraftSortOrder('asc')}
                          >
                            Ordenar de menor a mayor
                          </button>
                          <button
                            type="button"
                            className={`mb-2 flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs hover:bg-white/10 ${
                              draftSortOrder === 'desc' ? 'bg-[#107c41]/40' : ''
                            }`}
                            onClick={() => setDraftSortOrder('desc')}
                          >
                            Ordenar de mayor a menor
                          </button>
                          <label className="mb-1 block text-[0.65rem] text-white/70">Buscar en {yLab}</label>
                          <input
                            type="search"
                            value={draftSearchCol3}
                            onChange={(e) => setDraftSearchCol3(e.target.value)}
                            className="mb-2 w-full rounded border border-white/20 bg-[#1e1e1e] px-2 py-1.5 text-xs text-white placeholder:text-white/40"
                          />
                          <div className="mb-2 max-h-36 overflow-y-auto rounded border border-white/10 bg-[#1e1e1e] p-1">
                            <label className="flex cursor-pointer items-center gap-2 px-1 py-1 text-xs hover:bg-white/5">
                              <input
                                ref={selectAllRef3}
                                type="checkbox"
                                checked={allDraftChecked3 && draftCol3Filtered.length > 0}
                                onChange={() => toggleSelectAll(3)}
                              />
                              (Seleccionar todo)
                            </label>
                            {checkboxList(draftCol3Filtered, selectAllRef3, 3)}
                          </div>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              className="flex-1 rounded bg-[#107c41] px-2 py-2 text-xs font-black text-white hover:bg-[#0d5f32]"
                              onClick={applyCol3}
                            >
                              Aceptar
                            </button>
                            <button
                              type="button"
                              className="flex-1 rounded border border-white/30 px-2 py-2 text-xs font-bold text-white hover:bg-white/10"
                              onClick={cancelFilter}
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      ) : null}
                    </th>
                  </>
                ) : chartKind === 'area' ? (
                  <>
                    <th className="relative border border-black/10 px-2 py-2">
                      <div className="flex items-center justify-between gap-2">
                        <span>{seriesL![0]}</span>
                        <FilterBtn col="col2" />
                      </div>
                      {openFilter === 'col2' ? (
                        <div className={filterPanelClass} role="dialog">
                          <p className="m-0 mb-2 border-b border-white/10 pb-2 text-[0.65rem] font-bold uppercase tracking-wide text-white/80">
                            {seriesL![0]}
                          </p>
                          <button
                            type="button"
                            className={`mb-1 flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs hover:bg-white/10 ${
                              draftSortOrder === 'asc' ? 'bg-[#107c41]/40' : ''
                            }`}
                            onClick={() => setDraftSortOrder('asc')}
                          >
                            Ordenar de menor a mayor
                          </button>
                          <button
                            type="button"
                            className={`mb-2 flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs hover:bg-white/10 ${
                              draftSortOrder === 'desc' ? 'bg-[#107c41]/40' : ''
                            }`}
                            onClick={() => setDraftSortOrder('desc')}
                          >
                            Ordenar de mayor a menor
                          </button>
                          <label className="mb-1 block text-[0.65rem] text-white/70">Buscar en {seriesL![0]}</label>
                          <input
                            type="search"
                            value={draftSearchCol2}
                            onChange={(e) => setDraftSearchCol2(e.target.value)}
                            className="mb-2 w-full rounded border border-white/20 bg-[#1e1e1e] px-2 py-1.5 text-xs text-white"
                          />
                          <div className="mb-2 max-h-36 overflow-y-auto rounded border border-white/10 bg-[#1e1e1e] p-1">
                            <label className="flex cursor-pointer items-center gap-2 px-1 py-1 text-xs hover:bg-white/5">
                              <input
                                ref={selectAllRef2}
                                type="checkbox"
                                checked={allDraftChecked2 && draftValuesFiltered.length > 0}
                                onChange={() => toggleSelectAll(2)}
                              />
                              (Seleccionar todo)
                            </label>
                            {checkboxList(draftValuesFiltered, selectAllRef2, 2)}
                          </div>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              className="flex-1 rounded bg-[#107c41] px-2 py-2 text-xs font-black text-white hover:bg-[#0d5f32]"
                              onClick={applyCol2}
                            >
                              Aceptar
                            </button>
                            <button
                              type="button"
                              className="flex-1 rounded border border-white/30 px-2 py-2 text-xs font-bold text-white hover:bg-white/10"
                              onClick={cancelFilter}
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      ) : null}
                    </th>
                    <th className="relative border border-black/10 px-2 py-2">
                      <div className="flex items-center justify-between gap-2">
                        <span>{seriesL![1]}</span>
                        <FilterBtn col="col3" />
                      </div>
                      {openFilter === 'col3' ? (
                        <div className={filterPanelClass} role="dialog">
                          <p className="m-0 mb-2 border-b border-white/10 pb-2 text-[0.65rem] font-bold uppercase tracking-wide text-white/80">
                            {seriesL![1]}
                          </p>
                          <button
                            type="button"
                            className={`mb-1 flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs hover:bg-white/10 ${
                              draftSortOrder === 'asc' ? 'bg-[#107c41]/40' : ''
                            }`}
                            onClick={() => setDraftSortOrder('asc')}
                          >
                            Ordenar de menor a mayor
                          </button>
                          <button
                            type="button"
                            className={`mb-2 flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs hover:bg-white/10 ${
                              draftSortOrder === 'desc' ? 'bg-[#107c41]/40' : ''
                            }`}
                            onClick={() => setDraftSortOrder('desc')}
                          >
                            Ordenar de mayor a menor
                          </button>
                          <label className="mb-1 block text-[0.65rem] text-white/70">Buscar en {seriesL![1]}</label>
                          <input
                            type="search"
                            value={draftSearchCol3}
                            onChange={(e) => setDraftSearchCol3(e.target.value)}
                            className="mb-2 w-full rounded border border-white/20 bg-[#1e1e1e] px-2 py-1.5 text-xs text-white"
                          />
                          <div className="mb-2 max-h-36 overflow-y-auto rounded border border-white/10 bg-[#1e1e1e] p-1">
                            <label className="flex cursor-pointer items-center gap-2 px-1 py-1 text-xs hover:bg-white/5">
                              <input
                                ref={selectAllRef3}
                                type="checkbox"
                                checked={allDraftChecked3 && draftCol3Filtered.length > 0}
                                onChange={() => toggleSelectAll(3)}
                              />
                              (Seleccionar todo)
                            </label>
                            {checkboxList(draftCol3Filtered, selectAllRef3, 3)}
                          </div>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              className="flex-1 rounded bg-[#107c41] px-2 py-2 text-xs font-black text-white hover:bg-[#0d5f32]"
                              onClick={applyCol3}
                            >
                              Aceptar
                            </button>
                            <button
                              type="button"
                              className="flex-1 rounded border border-white/30 px-2 py-2 text-xs font-bold text-white hover:bg-white/10"
                              onClick={cancelFilter}
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      ) : null}
                    </th>
                  </>
                ) : chartKind === 'mixed' ? (
                  <>
                    <th className="relative border border-black/10 px-2 py-2">
                      <div className="flex items-center justify-between gap-2">
                        <span>{(props as Extract<ExcelInteractiveFilterChartProps, { chartKind: 'mixed' }>).valueColumnLabel}</span>
                        <FilterBtn col="col2" />
                      </div>
                      {openFilter === 'col2' ? (
                        <div className={filterPanelClass} role="dialog">
                          <p className="m-0 mb-2 border-b border-white/10 pb-2 text-[0.65rem] font-bold uppercase tracking-wide text-white/80">
                            {(props as Extract<ExcelInteractiveFilterChartProps, { chartKind: 'mixed' }>).valueColumnLabel}
                          </p>
                          <button
                            type="button"
                            className={`mb-1 flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs hover:bg-white/10 ${
                              draftSortOrder === 'asc' ? 'bg-[#107c41]/40' : ''
                            }`}
                            onClick={() => setDraftSortOrder('asc')}
                          >
                            Ordenar de menor a mayor
                          </button>
                          <button
                            type="button"
                            className={`mb-2 flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs hover:bg-white/10 ${
                              draftSortOrder === 'desc' ? 'bg-[#107c41]/40' : ''
                            }`}
                            onClick={() => setDraftSortOrder('desc')}
                          >
                            Ordenar de mayor a menor
                          </button>
                          <label className="mb-1 block text-[0.65rem] text-white/70">Buscar en unidades</label>
                          <input
                            type="search"
                            value={draftSearchCol2}
                            onChange={(e) => setDraftSearchCol2(e.target.value)}
                            className="mb-2 w-full rounded border border-white/20 bg-[#1e1e1e] px-2 py-1.5 text-xs text-white"
                          />
                          <div className="mb-2 max-h-36 overflow-y-auto rounded border border-white/10 bg-[#1e1e1e] p-1">
                            <label className="flex cursor-pointer items-center gap-2 px-1 py-1 text-xs hover:bg-white/5">
                              <input
                                ref={selectAllRef2}
                                type="checkbox"
                                checked={allDraftChecked2 && draftValuesFiltered.length > 0}
                                onChange={() => toggleSelectAll(2)}
                              />
                              (Seleccionar todo)
                            </label>
                            {checkboxList(draftValuesFiltered, selectAllRef2, 2)}
                          </div>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              className="flex-1 rounded bg-[#107c41] px-2 py-2 text-xs font-black text-white hover:bg-[#0d5f32]"
                              onClick={applyCol2}
                            >
                              Aceptar
                            </button>
                            <button
                              type="button"
                              className="flex-1 rounded border border-white/30 px-2 py-2 text-xs font-bold text-white hover:bg-white/10"
                              onClick={cancelFilter}
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      ) : null}
                    </th>
                    <th className="relative border border-black/10 px-2 py-2">
                      <div className="flex items-center justify-between gap-2">
                        <span>Margen %</span>
                        <FilterBtn col="col3" />
                      </div>
                      {openFilter === 'col3' ? (
                        <div className={filterPanelClass} role="dialog">
                          <p className="m-0 mb-2 border-b border-white/10 pb-2 text-[0.65rem] font-bold uppercase tracking-wide text-white/80">
                            Margen %
                          </p>
                          <button
                            type="button"
                            className={`mb-1 flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs hover:bg-white/10 ${
                              draftSortOrder === 'asc' ? 'bg-[#107c41]/40' : ''
                            }`}
                            onClick={() => setDraftSortOrder('asc')}
                          >
                            Ordenar de menor a mayor
                          </button>
                          <button
                            type="button"
                            className={`mb-2 flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs hover:bg-white/10 ${
                              draftSortOrder === 'desc' ? 'bg-[#107c41]/40' : ''
                            }`}
                            onClick={() => setDraftSortOrder('desc')}
                          >
                            Ordenar de mayor a menor
                          </button>
                          <label className="mb-1 block text-[0.65rem] text-white/70">Buscar en margen %</label>
                          <input
                            type="search"
                            value={draftSearchCol3}
                            onChange={(e) => setDraftSearchCol3(e.target.value)}
                            className="mb-2 w-full rounded border border-white/20 bg-[#1e1e1e] px-2 py-1.5 text-xs text-white"
                          />
                          <div className="mb-2 max-h-36 overflow-y-auto rounded border border-white/10 bg-[#1e1e1e] p-1">
                            <label className="flex cursor-pointer items-center gap-2 px-1 py-1 text-xs hover:bg-white/5">
                              <input
                                ref={selectAllRef3}
                                type="checkbox"
                                checked={allDraftChecked3 && draftCol3Filtered.length > 0}
                                onChange={() => toggleSelectAll(3)}
                              />
                              (Seleccionar todo)
                            </label>
                            {checkboxList(draftCol3Filtered, selectAllRef3, 3)}
                          </div>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              className="flex-1 rounded bg-[#107c41] px-2 py-2 text-xs font-black text-white hover:bg-[#0d5f32]"
                              onClick={applyCol3}
                            >
                              Aceptar
                            </button>
                            <button
                              type="button"
                              className="flex-1 rounded border border-white/30 px-2 py-2 text-xs font-bold text-white hover:bg-white/10"
                              onClick={cancelFilter}
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      ) : null}
                    </th>
                  </>
                ) : (
                  <th className="relative border border-black/10 px-2 py-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="normal-case">{(props as { valueColumnLabel: string }).valueColumnLabel}</span>
                      <FilterBtn col="col2" />
                    </div>
                    {openFilter === 'col2' ? (
                      <div className={filterPanelClass} role="dialog" aria-label={`Filtro ${filterColumnLabel}`}>
                        <p className="m-0 mb-2 border-b border-white/10 pb-2 text-[0.65rem] font-bold uppercase tracking-wide text-white/80">
                          {(props as { valueColumnLabel: string }).valueColumnLabel}
                        </p>
                        <button
                          type="button"
                          className={`mb-1 flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs hover:bg-white/10 ${
                            draftSortOrder === 'asc' ? 'bg-[#107c41]/40' : ''
                          }`}
                          onClick={() => setDraftSortOrder('asc')}
                        >
                          Ordenar de menor a mayor
                        </button>
                        <button
                          type="button"
                          className={`mb-2 flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs hover:bg-white/10 ${
                            draftSortOrder === 'desc' ? 'bg-[#107c41]/40' : ''
                          }`}
                          onClick={() => setDraftSortOrder('desc')}
                        >
                          Ordenar de mayor a menor
                        </button>
                        <label className="mb-1 block text-[0.65rem] text-white/70">
                          Buscar en {(props as { valueColumnLabel: string }).valueColumnLabel}
                        </label>
                        <input
                          type="search"
                          value={draftSearchCol2}
                          onChange={(e) => setDraftSearchCol2(e.target.value)}
                          placeholder="Buscar valor…"
                          className="mb-2 w-full rounded border border-white/20 bg-[#1e1e1e] px-2 py-1.5 text-xs text-white placeholder:text-white/40"
                        />
                        <div className="mb-2 max-h-36 overflow-y-auto rounded border border-white/10 bg-[#1e1e1e] p-1">
                          <label className="flex cursor-pointer items-center gap-2 px-1 py-1 text-xs hover:bg-white/5">
                            <input
                              ref={selectAllRef2}
                              type="checkbox"
                              checked={allDraftChecked2 && draftValuesFiltered.length > 0}
                              onChange={() => toggleSelectAll(2)}
                            />
                            (Seleccionar todo)
                          </label>
                          {checkboxList(draftValuesFiltered, selectAllRef2, 2)}
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            className="flex-1 rounded bg-[#107c41] px-2 py-2 text-xs font-black text-white hover:bg-[#0d5f32]"
                            onClick={applyCol2}
                          >
                            Aceptar
                          </button>
                          <button
                            type="button"
                            className="flex-1 rounded border border-white/30 px-2 py-2 text-xs font-bold text-white hover:bg-white/10"
                            onClick={cancelFilter}
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {!hasData ? (
                <tr>
                  <td
                    colSpan={
                      chartKind === 'area' || chartKind === 'mixed' || chartKind === 'scatter' ? 3 : 2
                    }
                    className="border border-black/10 px-3 py-6 text-center text-xs text-textMuted"
                  >
                    No hay filas visibles. Abrí el filtro y elegí al menos una categoría.
                  </td>
                </tr>
              ) : chartKind === 'area' ? (
                visibleArea.map((r) => (
                  <tr key={r.category} className="odd:bg-white even:bg-[#fafafa]">
                    <td className="border border-black/10 px-3 py-2 font-semibold text-textPrimary">{r.category}</td>
                    <td className="border border-black/10 px-3 py-2 tabular-nums">{fmtForTable(r.s1)}</td>
                    <td className="border border-black/10 px-3 py-2 tabular-nums">{fmtForTable(r.s2)}</td>
                  </tr>
                ))
              ) : chartKind === 'scatter' ? (
                visibleScatter.map((r) => (
                  <tr key={r.category} className="odd:bg-white even:bg-[#fafafa]">
                    <td className="border border-black/10 px-3 py-2 font-semibold text-textPrimary">{r.category}</td>
                    <td className="border border-black/10 px-3 py-2 tabular-nums">{r.x}</td>
                    <td className="border border-black/10 px-3 py-2 tabular-nums">{r.y}</td>
                  </tr>
                ))
              ) : chartKind === 'mixed' ? (
                visibleMixed.map((r) => (
                  <tr key={r.category} className="odd:bg-white even:bg-[#fafafa]">
                    <td className="border border-black/10 px-3 py-2 font-semibold text-textPrimary">{r.category}</td>
                    <td className="border border-black/10 px-3 py-2 tabular-nums">{r.units}</td>
                    <td className="border border-black/10 px-3 py-2 tabular-nums">{r.marginPct}%</td>
                  </tr>
                ))
              ) : (
                visibleSimple.map((r) => (
                  <tr key={r.category} className="odd:bg-white even:bg-[#fafafa]">
                    <td className="border border-black/10 px-3 py-2 font-semibold text-textPrimary">{r.category}</td>
                    <td className="border border-black/10 px-3 py-2 tabular-nums text-textPrimary">{fmtForTable(r.value)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <p className="m-0 border-t border-black/10 bg-[#fafafa] px-3 py-2 font-nunito text-[0.65rem] text-textMuted">
            Orden activo: {sortFooterLabel()}
          </p>
        </div>

        <div className="flex min-h-[280px] flex-col rounded-xl border-2 border-[#107c41]/25 bg-linear-to-br from-white to-[#ecfdf5]/90 p-3 shadow-sm">
          <p className="m-0 mb-2 text-center font-nunito text-xs font-black leading-snug text-[#107c41]">{chartTitle}</p>
          <div className="relative min-h-56 flex-1">{renderChart()}</div>
        </div>
      </div>
    </div>
  );
}

/** Datos por defecto para la lección de tablas dinámicas (ventas netas por categoría). */
export const PIVOT_DEFAULT_ROWS: SimpleRow[] = [
  { category: 'Electrónica', value: 149 },
  { category: 'Hogar', value: 114 },
  { category: 'Ropa', value: 104 },
  { category: 'Alimentos', value: 37.5 },
];
