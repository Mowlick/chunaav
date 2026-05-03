import { v2 } from '@google-cloud/translate';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Load credentials once
const keyPath = path.join(process.cwd(), 'google-cloud-key.json');
const credentials = JSON.parse(fs.readFileSync(keyPath, 'utf8'));

const translate = new v2.Translate({
  projectId: credentials.project_id,
  credentials: {
    client_email: credentials.client_email,
    private_key: credentials.private_key,
  },
});

export async function POST(req: Request) {
  try {
    const { texts, targetLanguage } = await req.json();

    if (!texts || !Array.isArray(texts) || texts.length === 0) {
      return NextResponse.json({ translations: [] });
    }

    const [translations] = await translate.translate(texts, targetLanguage);
    const results = Array.isArray(translations) ? translations : [translations];

    return NextResponse.json({ translations: results });
  } catch (error: any) {
    console.error('Translation Error Details:', error);
    return NextResponse.json(
      { error: error.message || 'Translation failed' },
      { status: error.code || 500 }
    );
  }
}
