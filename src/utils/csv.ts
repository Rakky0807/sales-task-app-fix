// csv.ts - FIXED VERSION
// ✅ ADDITIONAL FIX: Proper CSV escaping and stable header generation

import { Task } from '@/types';

export function toCSV(tasks: ReadonlyArray<Task>): string {
  // ✅ FIX: Use stable, predefined headers instead of deriving from first row
  const headers = [
    'id',
    'title',
    'revenue',
    'timeTaken',
    'priority',
    'status',
    'notes',
    'createdAt',
    'completedAt'
  ];
  
  const rows = tasks.map(t => [
    escapeCsv(t.id || ''),
    escapeCsv(t.title || ''),
    String(t.revenue || 0),
    String(t.timeTaken || 0),
    escapeCsv(t.priority || ''),
    escapeCsv(t.status || ''),
    escapeCsv(t.notes || ''),
    escapeCsv(t.createdAt || ''),
    escapeCsv(t.completedAt || '')
  ]);
  
  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}

// ✅ FIX: Proper CSV escaping for quotes, commas, and newlines
function escapeCsv(v: string): string {
  // If value contains comma, quote, or newline, wrap in quotes and escape internal quotes
  if (v.includes(',') || v.includes('"') || v.includes('\n') || v.includes('\r')) {
    return `"${v.replace(/"/g, '""')}"`;
  }
  return v;
}

export function downloadCSV(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}