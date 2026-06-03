import { SHEET_CSV_URL } from './config';

export interface TransparencyData {
  fecha: string;
  totalRecaudado: number;
}

export async function getLatestTransparency(): Promise<TransparencyData> {
  // Fallback data when sheet URL is not configured yet
  const fallback: TransparencyData = {
    fecha: new Date().toISOString().split('T')[0],
    totalRecaudado: 0,
  };

  if (!SHEET_CSV_URL) {
    return fallback;
  }

  try {
    const res = await fetch(SHEET_CSV_URL);
    const text = await res.text();
    const rows = text.trim().split('\n');

    if (rows.length < 2) return fallback;

    // Get last row — parse quoted CSV (Google Sheets wraps "16,083,198.00")
    const lastRow = rows[rows.length - 1];
    const cols: string[] = [];
    let inQuote = false, field = '';
    for (const c of lastRow) {
      if (c === '"') { inQuote = !inQuote; }
      else if (c === ',' && !inQuote) { cols.push(field); field = ''; }
      else { field += c; }
    }
    cols.push(field);

    return {
      fecha: cols[0]?.trim() || fallback.fecha,
      totalRecaudado: parseInt(cols[1]?.trim().split('.')[0].replace(/[^\d]/g, '') || '0', 10),
    };
  } catch {
    return fallback;
  }
}

export function formatCOP(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
