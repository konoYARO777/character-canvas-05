import { useCallback, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import EditorPanel from '@/components/EditorPanel';
import ProfileCard from '@/components/ProfileCard';
import { CharacterData, DEFAULT_CHARACTER } from '@/types/character';

const Index = () => {
  const [data, setData] = useState<CharacterData>(DEFAULT_CHARACTER);
  const [exporting, setExporting] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleChange = useCallback((partial: Partial<CharacterData>) => {
    setData((prev) => ({ ...prev, ...partial }));
  }, []);

  const handleExport = useCallback(async () => {
    if (!cardRef.current) return;
    setExporting(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      });
      const link = document.createElement('a');
      link.download = `OC_Profile_${data.name || 'Unnamed'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Export failed', err);
    } finally {
      setExporting(false);
    }
  }, [data.name]);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8">
        <EditorPanel
          data={data}
          onChange={handleChange}
          onExport={handleExport}
          exporting={exporting}
        />

        <main className="flex justify-center items-start overflow-x-auto">
          <div className="origin-top scale-[0.4] sm:scale-[0.5] md:scale-[0.6] lg:scale-[0.7] xl:scale-100 transition-transform">
            <ProfileCard ref={cardRef} data={data} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
