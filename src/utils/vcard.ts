import { UserProfile } from '../types';

export function downloadVCard(profile: UserProfile): void {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${profile.name}`,
    `N:Tambani;Juan Carlos;;;`,
    `TITLE:${profile.tagline}`,
    `EMAIL;TYPE=INTERNET,WORK:${profile.email}`,
    `TEL;TYPE=CELL:${profile.phone}`,
    `URL:${profile.website}`,
    `NOTE:${profile.bio}`,
    `ADR;TYPE=WORK:;;;${profile.location};;;`,
    'END:VCARD',
  ].join('\r\n');

  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${profile.name.toLowerCase().replace(/\s+/g, '_')}_contact.vcf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
