import { NextResponse } from 'next/server';
import { sharedDb } from '@bancactiu/db';

export async function GET() {
  return NextResponse.json({
    ok: true,
    entitat: "Creu Roja Catalunya / AVV",
    voluntarisActius: 38,
    tallersManteniment: 12,
    donacionsAny2026: 87
  });
}
