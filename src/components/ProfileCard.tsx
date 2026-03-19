import { forwardRef } from 'react';
import { CharacterData } from '@/types/character';

interface ProfileCardProps {
  data: CharacterData;
}

const ProfileCard = forwardRef<HTMLDivElement, ProfileCardProps>(({ data }, ref) => {
  const tags = data.keywords.
  split(',').
  map((t) => t.trim()).
  filter(Boolean);

  const gallerySlots = Array.from({ length: 4 }, (_, i) => data.galleryImages[i] || null);
  const storiesWithContent = data.stories.filter((s) => s.content.trim());

  const hasPersonality = data.personality?.trim();

  return (
    <div
      ref={ref}
      style={{
        width: 800,
        display: 'grid',
        gridTemplateColumns: '300px 1fr',
        gap: 28,
        padding: 36,
        background: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 12,
        boxShadow: '0 0 0 1px rgba(0,0,0,.08), 0 4px 6px -1px rgba(0,0,0,.1)',
        fontFamily: "'Inter', 'Noto Sans KR', system-ui, sans-serif",
        color: '#09090b'
      }}>
      
      {/* Left Column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Full Body */}
        <div
          style={{
            height: 720,
            background: '#f4f4f5',
            borderRadius: 8,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            outline: '1px solid rgba(0,0,0,0.05)',
            outlineOffset: -1
          }}>
          
          {data.bodyImage ?
          <img src={data.bodyImage} alt="전신" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} /> :

          <span style={{ fontSize: 10, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              전신 이미지
            </span>
          }
        </div>

        {/* Character Color Swatches */}
        <div style={{ padding: 14, border: '2px dashed #f4f4f5', borderRadius: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 600, fontFamily: "'Paperozi', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em', color: data.primaryColor }}>
            캐릭터 색상
          </span>
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            {([
            [data.characterColors.hair, '머리'],
            [data.characterColors.eye1, '눈1'],
            [data.characterColors.eye2, '눈2'],
            [data.characterColors.skin, '피부'],
            [data.characterColors.other, '기타']] as
            const).map(([color, label], i) =>
            <div key={i} style={{ textAlign: 'center' }}>
                <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: color,
                  border: '2px solid #fff',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.15)'
                }} />
              
                <span style={{ fontSize: 9, color: '#a1a1aa', marginTop: 2, display: 'block' }}>{label}</span>
              </div>
            )}
          </div>
        </div>

        {/* Tags */}
        {tags.length > 0 &&
        <div style={{ padding: 14, border: '2px dashed #f4f4f5', borderRadius: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 600, fontFamily: "'Paperozi', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em', color: data.primaryColor }}>
              키워드
            </span>
            <p style={{ marginTop: 8, fontSize: 12, fontWeight: 600, lineHeight: 1.8, color: data.primaryColor, whiteSpace: 'normal', wordBreak: 'break-word' }}>
              {tags.map((tag) => `#${tag}`).join('  ')}
            </p>
          </div>
        }
      </div>

      {/* Right Column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2
              style={{
                fontSize: 44,
                fontWeight: 800,
                fontFamily: "'Paperozi', sans-serif",
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                lineHeight: 1.1,
                color: data.primaryColor
              }}>
              
              {data.name || '이름 없음'}
            </h2>
            <p style={{ fontSize: 18, fontWeight: 500, color: data.secondaryColor, marginTop: 4 }} className="text-lg font-sans font-medium">
              {data.occupation || '직업'}
            </p>
          </div>
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              overflow: 'hidden',
              border: '4px solid #fff',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              background: '#f4f4f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
            
            {data.faceImage ?
            <img src={data.faceImage} alt="얼굴" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} /> :

            <span style={{ fontSize: 9, color: '#a1a1aa' }}>얼굴</span>
            }
          </div>
        </div>

        {/* Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 20,
            padding: '20px 0',
            borderTop: '1px solid #f4f4f5',
            borderBottom: '1px solid #f4f4f5'
          }}>
          
          {[
          { label: '나이', value: data.age },
          { label: '종족', value: data.species },
          { label: '젠더', value: data.gender }].
          map((item) =>
          <div key={item.label}>
              <span style={{ fontSize: 14, fontWeight: 600, fontFamily: "'Paperozi', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em', color: '#71717a' }}>
                {item.label}
              </span>
              <p style={{ fontSize: 17, fontWeight: 700, marginTop: 2 }}>
                {item.value || '—'}
              </p>
            </div>
          )}
        </div>

        {/* Gallery */}
        <div>
          <span style={{ fontSize: 11, fontWeight: 600, fontFamily: "'Paperozi', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em', color: '#71717a', marginBottom: 12, display: 'block' }}>
            갤러리
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {gallerySlots.map((img, i) =>
            <div
              key={i}
              style={{
                aspectRatio: '1',
                background: '#f4f4f5',
                borderRadius: 8,
                overflow: 'hidden',
                outline: '1px solid rgba(0,0,0,0.05)',
                outlineOffset: -1
              }}>
              
                {img &&
              <img src={img} alt={`갤러리 ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }} />
              }
              </div>
            )}
          </div>
        </div>

        {/* Personality */}
        {hasPersonality &&
        <div style={{ borderTop: '1px solid #f4f4f5', paddingTop: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Paperozi', sans-serif", color: data.primaryColor, marginBottom: 6 }}>
              성격
            </h3>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: '#3f3f46', whiteSpace: 'pre-wrap', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
              {data.personality}
            </p>
          </div>
        }

        {/* Stories */}
        {storiesWithContent.length > 0 &&
        <div style={{ borderTop: '1px solid #f4f4f5', paddingTop: 20 }}>
            {storiesWithContent.map((story, i) =>
          <div key={i} style={{ marginBottom: i < storiesWithContent.length - 1 ? 20 : 0 }}>
                <h3
              style={{
                fontSize: 16,
                fontWeight: 700,
                fontFamily: "'Paperozi', sans-serif",
                color: data.primaryColor,
                marginBottom: 6
              }}>
              
                  {story.title}
                </h3>
                <p style={{ fontSize: 13, lineHeight: 1.7, color: '#3f3f46', whiteSpace: 'pre-wrap', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  {story.content}
                </p>
              </div>
          )}
          </div>
        }

        {/* Footer */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: 24,
            borderTop: '1px solid #f4f4f5',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end'
          }}>
          
          <span style={{ fontSize: 9, color: '#d4d4d8', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Generated via Archetype Protocol // {new Date().getFullYear()}
          </span>
          {data.credit?.trim() && (
            <span style={{ fontSize: 11, color: '#a1a1aa' }}>
              {data.credit.split(',').map(c => c.trim()).filter(Boolean).map(c => `© ${c}`).join(', ')}
            </span>
          )}
        </div>
      </div>
    </div>);

});

ProfileCard.displayName = 'ProfileCard';

export default ProfileCard;