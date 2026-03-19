import { forwardRef } from 'react';
import { CharacterData } from '@/types/character';

interface ExportCardProps {
  data: CharacterData;
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const EXPORT_WIDTH = 1200;
const EXPORT_PADDING = 48;
const EXPORT_GAP = 32;
const LEFT_COLUMN_WIDTH = 420;
const BODY_HEIGHT = 1008;

const ExportCard = forwardRef<HTMLDivElement, ExportCardProps>(({ data }, ref) => {
  const tags = data.keywords.split(',').map((tag) => tag.trim()).filter(Boolean);
  const credits = data.credit.split(',').map((credit) => credit.trim()).filter(Boolean);
  const gallerySlots = Array.from({ length: 4 }, (_, index) => data.galleryImages[index] || null);
  const storiesWithContent = data.stories.filter((story) => story.content.trim());
  const hasPersonality = data.personality.trim();

  const pc = data.primaryColor;
  const sc2 = data.tertiaryColor;
  const dc = data.dividerColor;
  const bgTint = hexToRgba(data.secondaryColor, 0.2);
  const dividerStyle = `1px solid ${dc}`;

  const textStyle = {
    fontFamily: "'Inter', 'Noto Sans KR', system-ui, sans-serif",
    lineHeight: '1.5',
    letterSpacing: 'normal',
    whiteSpace: 'pre-wrap' as const,
    wordBreak: 'break-word' as const,
    overflowWrap: 'break-word' as const,
  };

  const sectionHeadingStyle = {
    display: 'block',
    fontSize: 14,
    fontWeight: 700,
    fontFamily: "'Paperozi', sans-serif",
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    marginBottom: 10,
    color: pc,
  };

  return (
    <div
      id="export-container"
      className="export-mode"
      ref={ref}
      style={{
        position: 'fixed',
        left: -99999,
        top: 0,
        zIndex: -1,
        width: EXPORT_WIDTH,
        minWidth: EXPORT_WIDTH,
        maxWidth: EXPORT_WIDTH,
        padding: EXPORT_PADDING,
        boxSizing: 'border-box',
        background: bgTint,
        borderRadius: 12,
        boxShadow: '0 0 0 1px rgba(0,0,0,.08), 0 4px 6px -1px rgba(0,0,0,.1)',
        ...textStyle,
        color: '#09090b',
      }}
    >
      <div
        className="export-layout"
        style={{
          width: '100%',
          minWidth: '100%',
          maxWidth: '100%',
          display: 'grid',
          gridTemplateColumns: `${LEFT_COLUMN_WIDTH}px minmax(0, 1fr)`,
          columnGap: EXPORT_GAP,
          alignItems: 'start',
        }}
      >
        <div style={{ display: 'block' }}>
          <div style={{ width: LEFT_COLUMN_WIDTH, height: BODY_HEIGHT, background: dc, borderRadius: 8, overflow: 'hidden', outline: '1px solid rgba(0,0,0,0.05)', outlineOffset: -1, textAlign: 'center' }}>
            {data.bodyImage ? (
              <img src={data.bodyImage} alt="전신" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
            ) : (
              <div style={{ paddingTop: 492 }}>
                <span style={{ fontSize: 10, fontWeight: 600, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.1em' }}>전신 이미지</span>
              </div>
            )}
          </div>

          <div style={{ marginTop: 18, padding: 16, border: `1px solid ${dc}`, borderRadius: 8 }}>
            <span style={{ ...sectionHeadingStyle }}>캐릭터 색상</span>
            {([
              [data.characterColors.hair, '머리'],
              [data.characterColors.eye1, '눈1'],
              [data.characterColors.eye2, '눈2'],
              [data.characterColors.skin, '피부'],
              [data.characterColors.other, '기타'],
            ] as const).map(([color, label], index) => (
              <div key={index} style={{ display: 'inline-block', textAlign: 'center', marginRight: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: color, border: '2px solid #fff', boxShadow: '0 1px 4px rgba(0,0,0,0.15)', margin: '0 auto' }} />
                <span style={{ display: 'block', marginTop: 2, fontSize: 11, fontWeight: 500, color: sc2 }}>{label}</span>
              </div>
            ))}
          </div>

          {tags.length > 0 && (
            <div style={{ marginTop: 14, padding: 16, border: `1px solid ${dc}`, borderRadius: 8, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ ...sectionHeadingStyle }}>키워드</span>
              <p style={{ margin: 0, fontSize: 16, fontWeight: 700, lineHeight: 1.8, color: sc2, whiteSpace: 'normal', wordBreak: 'break-word' }}>
                {tags.map((tag) => `#${tag}`).join('  ')}
              </p>
            </div>
          )}
        </div>

        <div style={{ display: 'block', minWidth: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 140px', columnGap: 24, alignItems: 'start', marginBottom: 28 }}>
            <div style={{ minWidth: 0 }}>
              <h2 style={{ margin: 0, display: 'block', fontSize: 58, fontWeight: 800, fontFamily: "'Paperozi', sans-serif", letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 1.2, color: pc, marginBottom: 10 }}>
                {data.name || '이름 없음'}
              </h2>
              <p style={{ margin: 0, display: 'block', fontSize: 22, fontWeight: 500, lineHeight: 1.5, color: sc2 }}>{data.occupation || '직업'}</p>
            </div>
            <div style={{ width: 140, height: 140, borderRadius: '50%', overflow: 'hidden', border: '4px solid #ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', background: '#f4f4f5', textAlign: 'center' }}>
              {data.faceImage ? (
                <img src={data.faceImage} alt="얼굴" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
              ) : (
                <div style={{ paddingTop: 62 }}>
                  <span style={{ fontSize: 10, fontWeight: 500, color: '#a1a1aa' }}>얼굴</span>
                </div>
              )}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 20, padding: '22px 0', borderTop: dividerStyle, borderBottom: dividerStyle, marginBottom: 28 }}>
            {[
              { label: '나이', value: data.age },
              { label: '종족', value: data.species },
              { label: '젠더', value: data.gender },
            ].map((item) => (
              <div key={item.label} style={{ minWidth: 0 }}>
                <span style={{ ...sectionHeadingStyle, fontSize: 14, marginBottom: 6 }}>{item.label}</span>
                <p style={{ margin: 0, fontSize: 18, fontWeight: 700, lineHeight: 1.5, color: sc2 }}>{item.value || '—'}</p>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 28 }}>
            <span style={{ ...sectionHeadingStyle, fontSize: 14, marginBottom: 12 }}>갤러리</span>
            <div className="gallery-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 16, rowGap: 16 }}>
              {gallerySlots.map((image, index) => (
                <div key={index} style={{ width: '100%', height: 318, background: dc, borderRadius: 8, overflow: 'hidden', outline: '1px solid rgba(0,0,0,0.05)', outlineOffset: -1 }}>
                  {image && <img src={image} alt={`갤러리 ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', display: 'block' }} />}
                </div>
              ))}
            </div>
          </div>

          {hasPersonality && (
            <div style={{ borderTop: dividerStyle, paddingTop: 22, marginBottom: 22 }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: 18, fontWeight: 700, fontFamily: "'Paperozi', sans-serif", lineHeight: 1.4, color: pc }}>성격</h3>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 400, color: sc2, ...textStyle }}>{data.personality}</p>
            </div>
          )}

          {storiesWithContent.length > 0 && (
            <div style={{ borderTop: dividerStyle, paddingTop: 22, marginBottom: 22 }}>
              {storiesWithContent.map((story, index) => (
                <div key={index} style={{ marginBottom: index < storiesWithContent.length - 1 ? 22 : 0 }}>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: 18, fontWeight: 700, fontFamily: "'Paperozi', sans-serif", lineHeight: 1.4, color: pc }}>{story.title}</h3>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 400, color: sc2, ...textStyle }}>{story.content}</p>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: credits.length > 0 ? '1fr auto' : '1fr', columnGap: 16, alignItems: 'end', paddingTop: 24, borderTop: dividerStyle }}>
            <span style={{ display: 'block', fontSize: 10, fontWeight: 500, color: '#d4d4d8', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Generated via Archetype Protocol // {new Date().getFullYear()}
            </span>
            {credits.length > 0 && (
              <span style={{ display: 'block', fontSize: 12, fontWeight: 500, lineHeight: 1.5, color: sc2 }}>
                {credits.map((credit) => `© ${credit}`).join(', ')}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

ExportCard.displayName = 'ExportCard';

export default ExportCard;
