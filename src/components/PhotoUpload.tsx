import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { CropModal } from './CropModal';

interface PhotoUploadProps {
  value?: string;
  onChange: (photo: string | undefined) => void;
}

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export function PhotoUpload({ value, onChange }: PhotoUploadProps) {
  const { t } = useTranslation();
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      alert(t('photo.invalidType', 'Dozwolone formaty: JPG, PNG, WebP'));
      return;
    }

    if (file.size > MAX_SIZE) {
      alert(t('photo.tooLarge', 'Maksymalny rozmiar: 10MB'));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setTempImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    // Reset input so same file can be selected again
    e.target.value = '';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleCropSave = (croppedImage: string) => {
    onChange(croppedImage);
    setTempImage(null);
  };

  const handleCropCancel = () => {
    setTempImage(null);
  };

  return (
    <>
      <div className="flex-shrink-0">
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            w-32 h-32 rounded-full
            flex items-center justify-center
            cursor-pointer transition-all duration-200
            overflow-hidden
            ${isDragging
              ? 'border-2 border-solid border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
              : value
                ? 'border-2 border-solid border-slate-200 dark:border-slate-600 hover:border-indigo-500 dark:hover:border-indigo-400'
                : 'border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400'
            }
          `}
        >
          {value ? (
            <img
              src={value}
              alt={t('personal.photo')}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center text-slate-400 dark:text-slate-500 p-2">
              <svg className="w-8 h-8 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs leading-tight block">
                {t('photo.dropOrClick', 'Upusc lub kliknij')}
              </span>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleInputChange}
          className="hidden"
        />

        {value && (
          <button
            onClick={() => onChange(undefined)}
            className="mt-2 text-sm text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 w-full text-center"
          >
            {t('common.remove', 'Usun')}
          </button>
        )}
      </div>

      {tempImage && (
        <CropModal
          image={tempImage}
          onSave={handleCropSave}
          onCancel={handleCropCancel}
        />
      )}
    </>
  );
}
