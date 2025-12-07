import { QRCodeSVG } from 'qrcode.react';
import type { PersonalData } from '../types';

interface QRCodeProps {
  data: PersonalData;
  size?: number;
}

export function QRCode({ data, size = 64 }: QRCodeProps) {
  // Generate vCard format
  const vCard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${data.name || ''}`,
    `EMAIL:${data.email || ''}`,
    `TEL:${data.phone || ''}`,
    `ADR:;;${data.location || ''};;;`,
    'END:VCARD',
  ].join('\n');

  if (!data.name && !data.email && !data.phone) {
    return null;
  }

  return (
    <div className="bg-white p-2 rounded-lg">
      <QRCodeSVG
        value={vCard}
        size={size}
        level="L"
        includeMargin={false}
        bgColor="#ffffff"
        fgColor="#1f2937"
      />
    </div>
  );
}
