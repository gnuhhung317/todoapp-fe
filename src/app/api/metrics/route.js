import { NextResponse } from 'next/server';
import client from 'prom-client';

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

export async function GET() {
  const metrics = await client.register.metrics();
  return new NextResponse(metrics, {
    status: 200,
    headers: { 'Content-Type': client.register.contentType },
  });
} 