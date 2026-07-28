import type { SelectedLesson, ScormVersion } from './types';

function xmlEscape(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const NS_CP = 'http://www.imsproject.org/xsd/imscp_rootv1p1p2';
const NS_ADL = 'http://www.adlnet.org/xsd/adlcp_rootv1p2';

export function generateManifest(
  selected: SelectedLesson[],
  version: ScormVersion,
  title: string,
): string {
  const isSingle = selected.length === 1;
  const orgIdentifier = 'cafeycodigo-org';
  const schemaVer = version === '2004' ? '2004 4th Edition' : '1.2';
  const adlVer = version === '2004' ? '2004 4th Edition' : '1.2';

  const items = selected.map((s, i) => {
    const id = `item-${i + 1}`;
    const res = `resource-${i + 1}`;
    const dir = isSingle ? '.' : `${String(i + 1).padStart(2, '0')}-${s.lesson.slug}`;
    return { id, res, dir, title: s.lesson.title };
  });

  let manifest = `<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="cafeycodigo-${selected[0]?.course.slug ?? 'scorm'}"
          version="1.0"
          xmlns="${NS_CP}"
          xmlns:adlcp="${NS_ADL}"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="${NS_CP} imscp_rootv1p1p2.xsd ${NS_ADL} adlcp_rootv1p2.xsd">

  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>${schemaVer}</schemaversion>
  </metadata>

  <organizations default="${orgIdentifier}">
    <organization identifier="${orgIdentifier}" structure="hierarchical">
      <title>${xmlEscape(title)}</title>
`;

  for (const item of items) {
    manifest += `      <item identifier="${item.id}" identifierref="${item.res}">
        <title>${xmlEscape(item.title)}</title>
      </item>
`;
  }

  manifest += `    </organization>
  </organizations>

  <resources>
`;

  for (const item of items) {
    const href = isSingle ? 'index.html' : `${item.dir}/index.html`;
    manifest += `    <resource identifier="${item.res}" type="webcontent" adlcp:scormtype="sco" href="${href}">
      <file href="${href}"/>
      <file href="scorm-api/SCORM_API.js"/>
    </resource>
`;
  }

  manifest += `  </resources>
</manifest>`;

  return manifest;
}
