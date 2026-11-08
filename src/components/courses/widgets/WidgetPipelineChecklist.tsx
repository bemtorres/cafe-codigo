import type {
  BrandPreset,
  PipelineChecklistBlockData,
} from '../../../data/courses/courseJsonTypes';
import { WidgetStepToStep } from './WidgetStepToStep';
import { WidgetChecklist } from './WidgetChecklist';

export interface WidgetPipelineChecklistProps {
  data: PipelineChecklistBlockData;
  brand: BrandPreset;
  checkedItems: string[];
  onToggleChecklistItem: (id: string) => void;
}

export function WidgetPipelineChecklist({
  data,
  brand,
  checkedItems,
  onToggleChecklistItem,
}: WidgetPipelineChecklistProps) {
  return (
    <div>
      <WidgetStepToStep
        data={{ badge: data.badge, title: data.title, stages: data.stages }}
        brand={brand}
      />
      <WidgetChecklist
        data={{
          checklistTitle: data.checklistTitle,
          checklistSubtitle: data.checklistSubtitle,
          checklist: data.checklist,
        }}
        brand={brand}
        checkedItems={checkedItems}
        onToggleChecklistItem={onToggleChecklistItem}
      />
    </div>
  );
}

