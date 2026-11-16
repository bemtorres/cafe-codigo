import type { BrandPreset, EditorialQuoteBlockData } from '../../../data/courses/courseJsonTypes';

export function WidgetEditorialQuote({ data, brand, institutionName }: {
  data: EditorialQuoteBlockData;
  brand: BrandPreset;
  institutionName: string;
}) {
  const text = [data.text, data.includeInstitutionName && institutionName ? `${institutionName}.` : '']
    .filter(Boolean).join(' ');

  return (
    <blockquote className="mx-auto max-w-[720px] px-6 pb-16 pt-10 text-center text-[clamp(1.125rem,3vw,1.4375rem)] leading-relaxed wrap-anywhere">
      <span aria-hidden="true" className="mx-auto mb-6 block h-0.5 w-[52px]" style={{ backgroundColor: brand.primary }} />
      <p>
        {data.highlightLead && <><strong style={{ color: brand.primary }}>{data.highlightLead}</strong>{' '}</>}
        {text}
      </p>
    </blockquote>
  );
}
