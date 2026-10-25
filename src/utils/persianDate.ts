// Persian (Jalali) Calendar utilities

export function toJalali(gy: number, gm: number, gd: number): [number, number, number] {
  const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  let jy: number;
  
  if (gy > 1600) {
    jy = 979;
    gy -= 1600;
  } else {
    jy = 0;
    gy -= 621;
  }
  
  const gy1 = gm > 2 ? gy + 1 : gy;
  let days = 365 * gy + Math.floor((gy1 + 3) / 4) - Math.floor((gy1 + 99) / 100) + 
             Math.floor((gy1 + 399) / 400) - 80 + gd + g_d_m[gm - 1];
  
  jy += 33 * Math.floor(days / 12053);
  days %= 12053;
  
  jy += 4 * Math.floor(days / 1461);
  days %= 1461;
  
  if (days > 365) {
    jy += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }
  
  const jm = days < 186 ? 1 + Math.floor(days / 31) : 7 + Math.floor((days - 186) / 30);
  const jd = 1 + (days < 186 ? days % 31 : (days - 186) % 30);
  
  return [jy, jm, jd];
}

export function getPersianDate(): string {
  const now = new Date();
  const [jy, jm, jd] = toJalali(now.getFullYear(), now.getMonth() + 1, now.getDate());
  
  const monthNames = [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ];
  
  return `${jy}/${String(jm).padStart(2, '0')}/${String(jd).padStart(2, '0')}`;
}

export function getPersianDateTime(): string {
  const now = new Date();
  const [jy, jm, jd] = toJalali(now.getFullYear(), now.getMonth() + 1, now.getDate());
  
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  
  return `${jy}/${String(jm).padStart(2, '0')}/${String(jd).padStart(2, '0')} ${hours}:${minutes}`;
}

export function toPersianNumber(num: number | string): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(num).replace(/[0-9]/g, (d) => persianDigits[parseInt(d)]);
}

export function formatPersianDate(date: Date = new Date()): string {
  const [jy, jm, jd] = toJalali(date.getFullYear(), date.getMonth() + 1, date.getDate());
  return `${jy}/${String(jm).padStart(2, '0')}/${String(jd).padStart(2, '0')}`;
}
