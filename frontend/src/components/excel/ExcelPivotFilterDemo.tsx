import { ExcelInteractiveFilterChart, PIVOT_DEFAULT_ROWS } from './ExcelInteractiveFilterChart';

/** Demo de tabla dinámica + gráfico: mismos datos que la lección de tablas dinámicas. */
export default function ExcelPivotFilterDemo() {
  return (
    <div className="excel-pivot-demo space-y-5">
      <p className="m-0 font-nunito text-sm font-semibold text-textSecondary">
        Simulación de <strong>resumen por categoría</strong> (como filas en una tabla dinámica): al{' '}
        <strong>ordenar</strong> o <strong>filtrar</strong> categorías, la tabla y el gráfico se actualizan juntos, como
        un gráfico dinámico ligado al informe.
      </p>
      <ExcelInteractiveFilterChart
        chartKind="bar"
        rows={PIVOT_DEFAULT_ROWS}
        rowLabel="Categoría"
        valueColumnLabel="Total (USD)"
        valueFormat="currency"
        chartTitle="Gráfico de columnas — mismo resumen filtrado y ordenado"
        tableBadge="Resumen"
        tableSubtitle="Ventas netas por categoría"
        searchPlaceholder="Buscar categoría…"
        showIntro={false}
      />
    </div>
  );
}
