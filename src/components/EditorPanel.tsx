import { useCallback } from 'react';
import { CharacterData, OCCUPATIONS } from '@/types/character';
import { Upload } from 'lucide-react';

interface EditorPanelProps {
  data: CharacterData;
  onChange: (data: Partial<CharacterData>) => void;
  onExport: () => void;
  exporting: boolean;
}

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.readAsDataURL(file);
  });
}

const EditorPanel = ({ data, onChange, onExport, exporting }: EditorPanelProps) => {
  const handleFace = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onChange({ faceImage: await readFileAsDataURL(file) });
  }, [onChange]);

  const handleBody = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onChange({ bodyImage: await readFileAsDataURL(file) });
  }, [onChange]);

  const handleGallery = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, 4);
    const urls = await Promise.all(files.map(readFileAsDataURL));
    onChange({ galleryImages: urls });
  }, [onChange]);

  const handleDrop = useCallback(async (e: React.DragEvent, type: 'face' | 'body' | 'gallery') => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    if (!files.length) return;
    if (type === 'face') onChange({ faceImage: await readFileAsDataURL(files[0]) });
    else if (type === 'body') onChange({ bodyImage: await readFileAsDataURL(files[0]) });
    else {
      const urls = await Promise.all(files.slice(0, 4).map(readFileAsDataURL));
      onChange({ galleryImages: urls });
    }
  }, [onChange]);

  const prevent = (e: React.DragEvent) => e.preventDefault();

  return (
    <aside className="space-y-6">
      <header>
        <h1 className="text-xl font-black tracking-tight">ARCHETYPE</h1>
        <p className="text-sm text-muted-foreground">Character Documentation System</p>
      </header>

      <div className="glass-panel p-6 space-y-6">
        {/* Text Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="label-text">Character Name</label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g. Kaelen Voss"
              value={data.name}
              onChange={(e) => onChange({ name: e.target.value })}
            />
          </div>
          <div>
            <label className="label-text">Age</label>
            <input
              type="text"
              className="input-field"
              placeholder="24"
              value={data.age}
              onChange={(e) => onChange({ age: e.target.value })}
            />
          </div>
          <div>
            <label className="label-text">Species</label>
            <input
              type="text"
              className="input-field"
              placeholder="Human"
              value={data.species}
              onChange={(e) => onChange({ species: e.target.value })}
            />
          </div>
          <div>
            <label className="label-text">Gender</label>
            <input
              type="text"
              className="input-field"
              placeholder="Non-binary"
              value={data.gender}
              onChange={(e) => onChange({ gender: e.target.value })}
            />
          </div>
          <div>
            <label className="label-text">Occupation</label>
            <select
              className="input-field"
              value={data.occupation}
              onChange={(e) => onChange({ occupation: e.target.value })}
            >
              {OCCUPATIONS.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="label-text">Keywords (Comma separated)</label>
          <input
            type="text"
            className="input-field"
            placeholder="Stoic, Agile, Loyal"
            value={data.keywords}
            onChange={(e) => onChange({ keywords: e.target.value })}
          />
        </div>

        {/* Image Uploads */}
        <div className="space-y-3">
          <label className="label-text">Imagery</label>

          <div
            className="relative p-3 rounded-lg border-2 border-dashed border-muted-foreground/20 hover:border-muted-foreground/40 transition-colors cursor-pointer flex justify-between items-center"
            onDrop={(e) => handleDrop(e, 'face')}
            onDragOver={prevent}
            onClick={() => document.getElementById('file-face')?.click()}
          >
            <span className="text-xs font-medium">
              {data.faceImage ? '✓ Face Portrait' : 'Face Portrait'}
            </span>
            <Upload className="w-3.5 h-3.5 text-muted-foreground" />
            <input type="file" id="file-face" className="hidden" accept="image/*" onChange={handleFace} />
          </div>

          <div
            className="relative p-3 rounded-lg border-2 border-dashed border-muted-foreground/20 hover:border-muted-foreground/40 transition-colors cursor-pointer flex justify-between items-center"
            onDrop={(e) => handleDrop(e, 'body')}
            onDragOver={prevent}
            onClick={() => document.getElementById('file-body')?.click()}
          >
            <span className="text-xs font-medium">
              {data.bodyImage ? '✓ Full Body' : 'Full Body'}
            </span>
            <Upload className="w-3.5 h-3.5 text-muted-foreground" />
            <input type="file" id="file-body" className="hidden" accept="image/*" onChange={handleBody} />
          </div>

          <div
            className="relative p-3 rounded-lg border-2 border-dashed border-muted-foreground/20 hover:border-muted-foreground/40 transition-colors cursor-pointer flex justify-between items-center"
            onDrop={(e) => handleDrop(e, 'gallery')}
            onDragOver={prevent}
            onClick={() => document.getElementById('file-extra')?.click()}
          >
            <span className="text-xs font-medium">
              {data.galleryImages.length ? `✓ Gallery (${data.galleryImages.length})` : 'Gallery Images (Multiple)'}
            </span>
            <Upload className="w-3.5 h-3.5 text-muted-foreground" />
            <input type="file" id="file-extra" className="hidden" accept="image/*" multiple onChange={handleGallery} />
          </div>
        </div>

        {/* Color Customization */}
        <div className="pt-4 border-t border-border grid grid-cols-2 gap-4">
          <div>
            <label className="label-text">Primary</label>
            <input
              type="color"
              value={data.primaryColor}
              onChange={(e) => onChange({ primaryColor: e.target.value })}
              className="w-full h-8 rounded-md cursor-pointer border-0"
            />
          </div>
          <div>
            <label className="label-text">Secondary</label>
            <input
              type="color"
              value={data.secondaryColor}
              onChange={(e) => onChange({ secondaryColor: e.target.value })}
              className="w-full h-8 rounded-md cursor-pointer border-0"
            />
          </div>
        </div>

        <button
          onClick={onExport}
          disabled={exporting}
          className="w-full py-3 bg-foreground text-background rounded-lg font-bold text-sm hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {exporting ? 'GENERATING...' : 'EXPORT AS PNG'}
        </button>
      </div>
    </aside>
  );
};

export default EditorPanel;
