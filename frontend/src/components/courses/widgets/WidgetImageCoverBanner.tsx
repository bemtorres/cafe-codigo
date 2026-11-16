import type { BrandPreset, ImageCoverBannerBlockData } from '../../../data/courses/courseJsonTypes';
import { ApaReferenceFooter } from './ZoomableFigure';

export interface WidgetImageCoverBannerProps {
  data: ImageCoverBannerBlockData;
  brand?: BrandPreset;
  institutionName: string;
}

export function WidgetImageCoverBanner({
  data,
  institutionName,
}: WidgetImageCoverBannerProps) {
  const showInst = data.includeInstitutionName !== false;
  const fullHeading = showInst
    ? `${data.bannerTitlePrefix} ${institutionName}`.trim()
    : data.bannerTitlePrefix;

  return (
    <div>
      <div
        style={{
          width: '100%',
          minHeight: data.minHeight || '320px',
          backgroundImage: `linear-gradient(90deg, rgba(14,18,24,0.88) 0%, rgba(14,18,24,0.74) 55%, rgba(14,18,24,0.45) 100%), url("${data.bannerImageUrl}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 12px 28px rgba(0,0,0,0.08)',
        }}
      >
        <div style={{ maxWidth: '820px', width: '100%', margin: '0 auto', padding: '48px 32px' }}>
          <div
            style={{
              width: '48px',
              height: '3px',
              backgroundColor: '#FFFFFF',
              marginBottom: '22px',
            }}
          />
          <h3
            style={{
              fontSize: '32px',
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.25,
              maxWidth: '540px',
              margin: '0 0 14px 0',
            }}
          >
            {fullHeading}
          </h3>
          <p
            style={{
              fontSize: '15px',
              lineHeight: 1.6,
              color: '#E2E8F0',
              maxWidth: '520px',
              margin: 0,
            }}
          >
            {data.bannerDescription}
          </p>
        </div>
      </div>

      {data.apaCitation && (
        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '8px 24px 12px 24px' }}>
          <ApaReferenceFooter citation={data.apaCitation} />
        </div>
      )}
    </div>
  );
}

