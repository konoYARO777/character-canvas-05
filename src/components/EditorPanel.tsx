import { useCallback, useState } from 'react';
import { CharacterData, OCCUPATIONS } from '@/types/character';
import { Upload, ChevronDown, ChevronUp } from 'lucide-react';
import ImageCropModal from '@/components/ImageCropModal';

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

type SectionKey = 'profile' | 'personality' | 'story' | 'appearance';

const EditorPanel = ({ data, onChange, onExport, exporting }: EditorPanelProps) => {
  const [openSections, setOpenSections] = useState<Record<SectionKey, boolean>>({
    profile: true,
    personality: true,
    story: true,
    appearance: true
  });
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const [cropTarget, setCropTarget] = useState<'face' | 'body' | null>(null);

  const toggle = (key: SectionKey) =>
  setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const openCropper = useCallback(async (file: File, target: 'face' | 'body') => {
    const url = await readFileAsDataURL(file);
    setCropSrc(url);
    setCropTarget(target);
  }, []);

  const handleCropComplete = useCallback((croppedDataUrl: string) => {
    if (cropTarget === 'face') onChange({ faceImage: croppedDataUrl });
    else if (cropTarget === 'body') onChange({ bodyImage: croppedDataUrl });
    setCropSrc(null);
    setCropTarget(null);
  }, [cropTarget, onChange]);

  const handleCropCancel = useCallback(() => {
    setCropSrc(null);
    setCropTarget(null);
  }, []);

  const handleFace = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) openCropper(file, 'face');
  }, [openCropper]);

  const handleBody = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) openCropper(file, 'body');
  }, [openCropper]);

  const handleGallery = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, 6);
    const urls = await Promise.all(files.map(readFileAsDataURL));
    onChange({ galleryImages: [...data.galleryImages, ...urls].slice(0, 6) });
  }, [onChange, data.galleryImages]);

  const handleDrop = useCallback(async (e: React.DragEvent, type: 'face' | 'body' | 'gallery') => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith('image/'));
    if (!files.length) return;
    if (type === 'face') { openCropper(files[0], 'face'); return; }
    if (type === 'body') { openCropper(files[0], 'body'); return; }
    {
      const urls = await Promise.all(files.slice(0, 6).map(readFileAsDataURL));
      onChange({ galleryImages: [...data.galleryImages, ...urls].slice(0, 6) });
    }
  }, [onChange, data.galleryImages]);

  const prevent = (e: React.DragEvent) => e.preventDefault();

  const updateStory = (index: number, field: 'title' | 'content', value: string) => {
    const stories = [...data.stories];
    stories[index] = { ...stories[index], [field]: value };
    onChange({ stories });
  };

  const updateCharColor = (key: keyof typeof data.characterColors, value: string) => {
    onChange({ characterColors: { ...data.characterColors, [key]: value } });
  };

  const SectionHeader = ({ label, sectionKey }: {label: string;sectionKey: SectionKey;}) =>
  <button
    onClick={() => toggle(sectionKey)}
    className="w-full flex items-center justify-between py-2 text-sm font-bold uppercase tracking-wider text-foreground hover:opacity-70 transition-opacity" style={{ fontFamily: "'Paperozi', sans-serif" }}>
    
      {label}
      {openSections[sectionKey] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
    </button>;


  const UploadZone = ({ label, hasFile, id, onFileChange, dropType



  }: {label: string;hasFile: boolean;id: string;onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;dropType: 'face' | 'body' | 'gallery';}) =>
  <div
    className="relative p-3 rounded-lg border-2 border-dashed border-muted-foreground/20 hover:border-muted-foreground/40 transition-colors cursor-pointer flex justify-between items-center"
    onDrop={(e) => handleDrop(e, dropType)}
    onDragOver={prevent}
    onClick={() => document.getElementById(id)?.click()}>
    
      <span className="text-xs font-medium">
        {hasFile ? `✓ ${label}` : label}
      </span>
      <Upload className="w-3.5 h-3.5 text-muted-foreground" />
      <input
      type="file"
      id={id}
      className="hidden"
      accept="image/*"
      multiple={dropType === 'gallery'}
      onChange={onFileChange} />
    
    </div>;


  return (
    <aside className="space-y-4 overflow-y-auto max-h-[calc(100vh-4rem)] pr-1">
      <header>
        <h1 className="text-xl font-black tracking-tight">CHARACTER PROFILE MAKER</h1>
        <p className="text-sm text-muted-foreground">캐릭터 프로필 생성기</p>
      </header>

      <div className="glass-panel p-5 space-y-4">
        {/* ── 프로필 ── */}
        <SectionHeader label="프로필" sectionKey="profile" />
        {openSections.profile &&
        <div className="space-y-4 animate-in fade-in duration-200">
            {/* Character Colors */}
            <div>
              <label className="label-text">캐릭터 색상</label>
              <div className="grid grid-cols-5 gap-2">
                {([
              ['hair', '머리카락'],
              ['eye1', '눈동자1'],
              ['eye2', '눈동자2'],
              ['skin', '피부색'],
              ['other', '기타']] as
              const).map(([key, label]) =>
              <div key={key} className="text-center">
                    <input
                  type="color"
                  value={data.characterColors[key]}
                  onChange={(e) => updateCharColor(key, e.target.value)}
                  className="w-full h-7 rounded-md cursor-pointer border-0" />
                
                    <span className="text-[10px] text-muted-foreground mt-0.5 block">{label}</span>
                  </div>
              )}
              </div>
            </div>

            {/* Text fields */}
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="label-text">이름</label>
                <input type="text" className="input-field" placeholder="캐릭터 이름" value={data.name} onChange={(e) => onChange({ name: e.target.value })} />
              </div>
              <div>
                <label className="label-text">나이</label>
                <input type="text" className="input-field" placeholder="24" value={data.age} onChange={(e) => onChange({ age: e.target.value })} />
              </div>
              <div>
                <label className="label-text">종족</label>
                <input type="text" className="input-field" placeholder="인간" value={data.species} onChange={(e) => onChange({ species: e.target.value })} />
              </div>
              <div>
                <label className="label-text">젠더</label>
                <input type="text" className="input-field" placeholder="남성" value={data.gender} onChange={(e) => onChange({ gender: e.target.value })} />
              </div>
              <div>
                <label className="label-text">직업</label>
                <input type="text" className="input-field" placeholder="직업을 입력하세요" value={data.occupation} onChange={(e) => onChange({ occupation: e.target.value })} />
              </div>
            </div>

            <div>
              <label className="label-text">키워드 (쉼표 또는 줄바꿈으로 구분)</label>
              <textarea className="input-field resize-none" rows={3} placeholder="강인함, 민첩함&#10;충성" value={data.keywords} onChange={(e) => onChange({ keywords: e.target.value })} />
            </div>

            {/* Theme colors */}
            <div className="pt-3 border-t border-border grid grid-cols-2 gap-3">
              <div>
                <label className="label-text">메인 색상</label>
                <input type="color" value={data.primaryColor} onChange={(e) => onChange({ primaryColor: e.target.value })} className="w-full h-8 rounded-md cursor-pointer border-0" />
              </div>
              <div>
                <label className="label-text">서브 색상 1</label>
                <input type="color" value={data.secondaryColor} onChange={(e) => onChange({ secondaryColor: e.target.value })} className="w-full h-8 rounded-md cursor-pointer border-0" />
              </div>
              <div>
                <label className="label-text">서브 색상 2</label>
                <input type="color" value={data.tertiaryColor} onChange={(e) => onChange({ tertiaryColor: e.target.value })} className="w-full h-8 rounded-md cursor-pointer border-0" />
              </div>
              <div>
                <label className="label-text">구분색</label>
                <input type="color" value={data.dividerColor} onChange={(e) => onChange({ dividerColor: e.target.value })} className="w-full h-8 rounded-md cursor-pointer border-0" />
              </div>
              <div>
                <label className="label-text">이미지 배경색</label>
                <input type="color" value={data.imageBgColor} onChange={(e) => onChange({ imageBgColor: e.target.value })} className="w-full h-8 rounded-md cursor-pointer border-0" />
              </div>
            </div>
          </div>
        }

        {/* ── 성격 ── */}
        <SectionHeader label="성격" sectionKey="personality" />
        {openSections.personality &&
        <div className="space-y-1.5 animate-in fade-in duration-200">
            <textarea
            className="input-field min-h-[120px] resize-y"
            placeholder="캐릭터의 성격을 자유롭게 서술하세요..."
            value={data.personality}
            onChange={(e) => onChange({ personality: e.target.value })} />
          
          </div>
        }

        {/* ── 스토리 ── */}
        <SectionHeader label="스토리" sectionKey="story" />
        {openSections.story &&
        <div className="space-y-4 animate-in fade-in duration-200">
            {data.stories.map((story, i) =>
          <div key={i} className="space-y-1.5">
                <input
              type="text"
              className="input-field font-semibold"
              value={story.title}
              onChange={(e) => updateStory(i, 'title', e.target.value)} />
            
                <textarea
              className="input-field min-h-[100px] resize-y"
              placeholder="스토리를 입력하세요..."
              value={story.content}
              onChange={(e) => updateStory(i, 'content', e.target.value)} />
            
              </div>
          )}
          </div>
        }

        {/* ── 캐릭터 외관 ── */}
        <SectionHeader label="캐릭터 외관" sectionKey="appearance" />
        {openSections.appearance &&
        <div className="space-y-2 animate-in fade-in duration-200">
            <UploadZone label="메인 얼굴 이미지" hasFile={!!data.faceImage} id="file-face" onFileChange={handleFace} dropType="face" />
            <UploadZone label="전신 이미지" hasFile={!!data.bodyImage} id="file-body" onFileChange={handleBody} dropType="body" />
            <UploadZone
            label={data.galleryImages.length ? `기타 이미지 (${data.galleryImages.length})` : '기타 이미지 (복수 선택 가능)'}
            hasFile={data.galleryImages.length > 0}
            id="file-extra"
            onFileChange={handleGallery}
            dropType="gallery" />
          
            {data.galleryImages.length > 0 &&
          <button
            onClick={() => onChange({ galleryImages: [] })}
            className="text-xs text-destructive hover:underline">
            
                기타 이미지 모두 삭제
              </button>
          }
          </div>
        }

        {/* ── 그림 출처 ── */}
        <div className="pt-3 border-t border-border">
          <label className="label-text">그림 출처</label>
          <input type="text" className="input-field" placeholder="작가 계정명을 입력하세요" value={data.credit} onChange={(e) => onChange({ credit: e.target.value })} />
        </div>

        <button
          onClick={onExport}
          disabled={exporting}
          className="w-full py-3 bg-foreground text-background rounded-lg font-bold text-sm hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-50">
          
          {exporting ? '생성 중...' : '이미지로 저장'}
        </button>
      </div>

      {cropSrc && cropTarget && (
        <ImageCropModal
          open={!!cropSrc}
          imageSrc={cropSrc}
          aspectRatio={cropTarget === 'body' ? 5 / 12 : 1}
          onComplete={handleCropComplete}
          onCancel={handleCropCancel}
        />
      )}
    </aside>);

};

export default EditorPanel;