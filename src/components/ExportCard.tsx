import { forwardRef } from 'react';
import { CharacterData } from '@/types/character';

interface ExportCardProps {
  data: CharacterData;
}

/**
 * A dedicated export-only card with stable block layout for html2canvas.
 * No flex/grid/transform — only block + inline-block for reliability.
 */
const ExportCard = forwardRef<HTMLDivElement, ExportCardProps>(({ data }, ref) => {
  const tags = data.keywords.split(',').map((t) => t.trim()).filter(Boolean);
  const gallerySlots = Array.from({ length: 4 }, (_, i) => data.galleryImages[i] || null);
  const storiesWithContent = data.stories.filter((s) => s.content.trim());
  const hasPersonality = data.personality?.trim();

  const s = {
    fontFamily: "'Inter', 'Noto Sans KR', system-ui, sans-serif",
    color: '#09090b',
    lineHeight: '1.5',
    letterSpacing: 'normal',
    whiteSpace: 'pre-wrap' as const,
    wordBreak: 'break-word' as const,
    overflowWrap: 'break-word' as const,
  };

  return (
    <div
      ref={ref}
      style={{
        width: 900,
        padding: 40,
        background: '#ffffff',
        borderRadius: 12,
        boxShadow: '0 0 0 1px rgba(0,0,0,.08), 0 4px 6px -1px rgba(0,0,0,.1)',
        ...s,
        position: 'absolute',
        left: '-9999px',
        top: 0,
      }}
    >
      {/* Two-column via inline-block */}
      <div style={{ display: 'block', overflow: 'hidden' }}>
        {/* Left Column */}
        <div style={{ display: 'inline-block', verticalAlign: 'top', width: 300 }}>
          {/* Full Body */}
          <div
            style={{
              width: 300,
              height: 720,
              background: '#f4f4f5',
              borderRadius: 8,
              overflow: 'hidden',
              outline: '1px solid rgba(0,0,0,0.05)',
              outlineOffset: -1,
              textAlign: 'center',
              lineHeight: '720px',
            }}
          >
            {data.bodyImage ? (
              <img
                src={data.bodyImage}
                alt="전신"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            ) : (
              <span style={{ fontSize: 10, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                전신 이미지
              </span>
            )}
          </div>

          {/* Character Colors */}
          <div style={{ marginTop: 16, padding: 14, border: '2px dashed #f4f4f5', borderRadius: 8 }}>
            <span
              style={{
                display: 'block',
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "'Paperozi', sans-serif",
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: data.primaryColor,
                marginBottom: 8,
              }}
            >
              캐릭터 색상
            </span>
            {([
              [data.characterColors.hair, '머리'],
              [data.characterColors.eye1, '눈1'],
              [data.characterColors.eye2, '눈2'],
              [data.characterColors.skin, '피부'],
              [data.characterColors.other, '기타'],
            ] as const).map(([color, label], i) => (
              <div key={i} style={{ display: 'inline-block', textAlign: 'center', marginRight: 8 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: color,
                    border: '2px solid #fff',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
                    margin: '0 auto',
                  }}
                />
                <span style={{ fontSize: 9, color: '#a1a1aa', marginTop: 2, display: 'block' }}>{label}</span>
              </div>
            ))}
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div style={{ marginTop: 12, padding: 14, border: '2px dashed #f4f4f5', borderRadius: 8 }}>
              <span
                style={{
                  display: 'block',
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: "'Paperozi', sans-serif",
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: data.primaryColor,
                  marginBottom: 8,
                }}
              >
                키워드
              </span>
              {tags.map((tag, i) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-block',
                    padding: '4px 10px',
                    background: data.primaryColor,
                    color: '#fff',
                    borderRadius: 20,
                    fontSize: 11,
                    fontWeight: 600,
                    marginRight: 6,
                    marginBottom: 6,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div style={{ display: 'inline-block', verticalAlign: 'top', width: 500, marginLeft: 28 }}>
          {/* Header */}
          <div style={{ overflow: 'hidden', marginBottom: 24 }}>
            <div style={{ display: 'inline-block', verticalAlign: 'top', width: 340 }}>
              <h2
                style={{
                  fontSize: 44,
                  fontWeight: 800,
                  fontFamily: "'Paperozi', sans-serif",
                  letterSpacing: '-0.03em',
                  textTransform: 'uppercase',
                  lineHeight: 1.2,
                  color: data.primaryColor,
                  margin: 0,
                  display: 'block',
                  marginBottom: 8,
                }}
              >
                {data.name || '이름 없음'}
              </h2>
              <p
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  color: data.secondaryColor,
                  margin: 0,
                  display: 'block',
                }}
              >
                {data.occupation || '직업'}
              </p>
            </div>
            <div
              style={{
                display: 'inline-block',
                verticalAlign: 'top',
                width: 120,
                height: 120,
                borderRadius: '50%',
                overflow: 'hidden',
                border: '4px solid #fff',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                background: '#f4f4f5',
                textAlign: 'center',
                lineHeight: '120px',
                float: 'right',
              }}
            >
              {data.faceImage ? (
                <img src={data.faceImage} alt="얼굴" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              ) : (
                <span style={{ fontSize: 9, color: '#a1a1aa' }}>얼굴</span>
              )}
            </div>
          </div>

          {/* Stats */}
          <div
            style={{
              borderTop: '1px solid #f4f4f5',
              borderBottom: '1px solid #f4f4f5',
              padding: '20px 0',
              marginBottom: 24,
              overflow: 'hidden',
            }}
          >
            {[
              { label: '나이', value: data.age },
              { label: '종족', value: data.species },
              { label: '젠더', value: data.gender },
            ].map((item, i) => (
              <div key={item.label} style={{ display: 'inline-block', verticalAlign: 'top', width: '33%' }}>
                <span
                  style={{
                    display: 'block',
                    fontSize: 14,
                    fontWeight: 600,
                    fontFamily: "'Paperozi', sans-serif",
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: '#71717a',
                  }}
                >
                  {item.label}
                </span>
                <p style={{ fontSize: 17, fontWeight: 700, margin: '4px 0 0 0' }}>{item.value || '—'}</p>
              </div>
            ))}
          </div>

          {/* Gallery */}
          <div style={{ marginBottom: 24 }}>
            <span
              style={{
                display: 'block',
                fontSize: 11,
                fontWeight: 600,
                fontFamily: "'Paperozi', sans-serif",
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#71717a',
                marginBottom: 12,
              }}
            >
              갤러리
            </span>
            <div style={{ overflow: 'hidden' }}>
              {gallerySlots.map((img, i) => (
                <div
                  key={i}
                  style={{
                    display: 'inline-block',
                    width: 'calc(50% - 6px)',
                    marginRight: i % 2 === 0 ? 12 : 0,
                    marginBottom: 12,
                    verticalAlign: 'top',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      paddingBottom: '100%',
                      background: '#f4f4f5',
                      borderRadius: 8,
                      overflow: 'hidden',
                      outline: '1px solid rgba(0,0,0,0.05)',
                      outlineOffset: -1,
                      position: 'relative',
                    }}
                  >
                    {img && (
                      <img
                        src={img}
                        alt={`갤러리 ${i + 1}`}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Personality */}
          {hasPersonality && (
            <div style={{ borderTop: '1px solid #f4f4f5', paddingTop: 20, marginBottom: 20 }}>
              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  fontFamily: "'Paperozi', sans-serif",
                  color: data.primaryColor,
                  margin: '0 0 6px 0',
                }}
              >
                성격
              </h3>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: '#3f3f46', margin: 0, ...s }}>{data.personality}</p>
            </div>
          )}

          {/* Stories */}
          {storiesWithContent.length > 0 && (
            <div style={{ borderTop: '1px solid #f4f4f5', paddingTop: 20, marginBottom: 20 }}>
              {storiesWithContent.map((story, i) => (
                <div key={i} style={{ marginBottom: i < storiesWithContent.length - 1 ? 20 : 0 }}>
                  <h3
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      fontFamily: "'Paperozi', sans-serif",
                      color: data.primaryColor,
                      margin: '0 0 6px 0',
                    }}
                  >
                    {story.title}
                  </h3>
                  <p style={{ fontSize: 13, lineHeight: 1.7, color: '#3f3f46', margin: 0, ...s }}>{story.content}</p>
                </div>
              ))}
            </div>
          )}

          {/* Footer */}
          <div
            style={{
              paddingTop: 24,
              borderTop: '1px solid #f4f4f5',
              overflow: 'hidden',
            }}
          >
            <span
              style={{
                fontSize: 9,
                color: '#d4d4d8',
                fontFamily: 'monospace',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                float: 'left',
              }}
            >
              Generated via Archetype Protocol // {new Date().getFullYear()}
            </span>
            {data.credit?.trim() && (
              <span style={{ fontSize: 11, color: '#a1a1aa', float: 'right' }}>
                {data.credit.split(',').map((c) => c.trim()).filter(Boolean).map((c) => `© ${c}`).join(', ')}
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
