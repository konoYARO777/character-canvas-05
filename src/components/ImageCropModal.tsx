import { useState, useCallback } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface ImageCropModalProps {
  open: boolean;
  imageSrc: string;
  aspectRatio?: number;
  onComplete: (croppedDataUrl: string) => void;
  onCancel: () => void;
}

function createCroppedImage(imageSrc: string, pixelCrop: Area): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas context failed'));

      ctx.drawImage(
        image,
        pixelCrop.x, pixelCrop.y,
        pixelCrop.width, pixelCrop.height,
        0, 0,
        pixelCrop.width, pixelCrop.height,
      );
      resolve(canvas.toDataURL('image/png'));
    };
    image.onerror = reject;
    image.src = imageSrc;
  });
}

const ImageCropModal = ({ open, imageSrc, aspectRatio = 3 / 4, onComplete, onCancel }: ImageCropModalProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((_: Area, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const handleConfirm = useCallback(async () => {
    if (!croppedAreaPixels) return;
    const result = await createCroppedImage(imageSrc, croppedAreaPixels);
    onComplete(result);
  }, [croppedAreaPixels, imageSrc, onComplete]);

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onCancel()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>이미지 자르기</DialogTitle>
        </DialogHeader>
        <div className="relative w-full h-80 bg-muted rounded-md overflow-hidden">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspectRatio}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
        <div className="flex items-center gap-3 px-1">
          <span className="text-xs text-muted-foreground shrink-0">줌</span>
          <Slider
            min={1}
            max={3}
            step={0.05}
            value={[zoom]}
            onValueChange={([v]) => setZoom(v)}
            className="flex-1"
          />
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onCancel}>취소</Button>
          <Button onClick={handleConfirm}>적용</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageCropModal;
