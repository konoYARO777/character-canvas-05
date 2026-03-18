import { forwardRef } from 'react';
import { CharacterData } from '@/types/character';

interface ProfileCardProps {
  data: CharacterData;
}

const ProfileCard = forwardRef<HTMLDivElement, ProfileCardProps>(({ data }, ref) => {
  const tags = data.keywords
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  const gallerySlots = Array.from({ length: 4 }, (_, i) => data.galleryImages[i] || null);

  return (
    <div
      ref={ref}
      style={{
        width: 800,
        height: 1000,
        display: 'grid',
        gridTemplateColumns: '320px 1fr',
        gap: 32,
        padding: 40,
        background: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 12,
        boxShadow: '0 0 0 1px rgba(0,0,0,.08), 0 4px 6px -1px rgba(0,0,0,.1)',
        fontFamily: "'Inter', system-ui, sans-serif",
        color: '#09090b',
      }}
    >
      {/* Left Column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Full Body */}
        <div
          style={{
            height: 800,
            background: '#f4f4f5',
            borderRadius: 8,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            outline: '1px solid rgba(0,0,0,0.05)',
            outlineOffset: -1,
          }}
        >
          {data.bodyImage ? (
            <img src={data.bodyImage} alt="Full body" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span style={{ fontSize: 10, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Full Body Asset
            </span>
          )}
        </div>

        {/* Tags */}
        <div
          style={{
            padding: 16,
            border: '2px dashed #f4f4f5',
            borderRadius: 8,
            flex: 1,
          }}
        >
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: data.primaryColor,
            }}
          >
            Keywords
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {tags.map((tag, i) => (
              <span
                key={i}
                style={{
                  padding: '4px 10px',
                  background: data.primaryColor,
                  color: '#fff',
                  borderRadius: 20,
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2
              style={{
                fontSize: 48,
                fontWeight: 900,
                letterSpacing: '-0.04em',
                textTransform: 'uppercase',
                lineHeight: 1,
                textWrap: 'balance',
                color: data.primaryColor,
              }}
            >
              {data.name || 'Unnamed'}
            </h2>
            <p style={{ fontSize: 20, fontWeight: 500, color: data.secondaryColor, marginTop: 4 }}>
              {data.occupation || 'Occupation'}
            </p>
          </div>
          <div
            style={{
              width: 128,
              height: 128,
              borderRadius: '50%',
              overflow: 'hidden',
              border: '4px solid #fff',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              background: '#f4f4f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {data.faceImage ? (
              <img src={data.faceImage} alt="Face" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : null}
          </div>
        </div>

        {/* Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 24,
            padding: '24px 0',
            borderTop: '1px solid #f4f4f5',
            borderBottom: '1px solid #f4f4f5',
          }}
        >
          {[
            { label: 'Age', value: data.age, tabular: true },
            { label: 'Species', value: data.species },
            { label: 'Gender', value: data.gender },
          ].map((item) => (
            <div key={item.label}>
              <span style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#71717a' }}>
                {item.label}
              </span>
              <p
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  marginTop: 2,
                  ...(item.tabular ? { fontVariantNumeric: 'tabular-nums' } : {}),
                }}
              >
                {item.value || '—'}
              </p>
            </div>
          ))}
        </div>

        {/* Gallery */}
        <div>
          <span style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#71717a', marginBottom: 16, display: 'block' }}>
            Gallery / Details
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {gallerySlots.map((img, i) => (
              <div
                key={i}
                style={{
                  aspectRatio: '1',
                  background: '#f4f4f5',
                  borderRadius: 8,
                  overflow: 'hidden',
                  outline: '1px solid rgba(0,0,0,0.05)',
                  outlineOffset: -1,
                }}
              >
                {img && (
                  <img src={img} alt={`Gallery ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: 32,
            borderTop: '1px solid #f4f4f5',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <span style={{ fontSize: 10, color: '#d4d4d8', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Generated via Archetype Protocol // {new Date().getFullYear()}
          </span>
          <div
            style={{
              width: 48,
              height: 48,
              background: data.primaryColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 900,
              fontSize: 20,
              borderRadius: 4,
            }}
          >
            A
          </div>
        </div>
      </div>
    </div>
  );
});

ProfileCard.displayName = 'ProfileCard';

export default ProfileCard;
