import { useCallback, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import EditorPanel from '@/components/EditorPanel';
import ProfileCard from '@/components/ProfileCard';
import ExportCard from '@/components/ExportCard';
import { CharacterData, DEFAULT_CHARACTER } from '@/types/character';

const EXPORT_WIDTH = 1200;

const waitForExportAssets = async (container: HTMLElement) => {
  const images = Array.from(container.querySelectorAll('img'));

  await Promise.all(
    images.map(
      (image) =>
        new Promise<void>((resolve) => {
          if (image.complete) {
            resolve();
            return;
          }

          const handleDone = () => resolve();
          image.addEventListener('load', handleDone, { once: true });
          image.addEventListener('error', handleDone, { once: true });
        }),
    ),
  );
};

const waitForRenderStability = async () => {
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
};

const Index = () => {
  const [data, setData] = useState<CharacterData>(DEFAULT_CHARACTER);
  const [exporting, setExporting] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  const handleChange = useCallback((partial: Partial<CharacterData>) => {
    setData((prev) => ({ ...prev, ...partial }));
  }, []);

  const handleExport = useCallback(async () => {
    if (!exportRef.current) return;

    setExporting(true);

    try {
      const exportContainer = exportRef.current;

      await document.fonts.ready;
      await waitForExportAssets(exportContainer);
      await waitForRenderStability();

      const canvas = await html2canvas(exportContainer, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: EXPORT_WIDTH,
        windowWidth: EXPORT_WIDTH,
        height: exportContainer.scrollHeight,
        windowHeight: exportContainer.scrollHeight,
      });

      const link = document.createElement('a');
      link.download = `OC_프로필_${data.name || '미정'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('내보내기 실패', err);
    } finally {
      setExporting(false);
    }
  }, [data.name]);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8">
        <EditorPanel
          data={data}
          onChange={handleChange}
          onExport={handleExport}
          exporting={exporting}
        />

        <main className="flex justify-center items-start overflow-x-auto">
          <div className="origin-top scale-[0.4] sm:scale-[0.5] md:scale-[0.55] lg:scale-[0.65] xl:scale-90 transition-transform">
            <ProfileCard ref={cardRef} data={data} />
          </div>
        </main>
      </div>

      <ExportCard ref={exportRef} data={data} />
    </div>
  );
};

export default Index;
