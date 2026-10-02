import { trails } from '@/lib/data';
import TrailDetailClient from '@/components/TrailDetailClient';

interface Params { trailId: string }

export async function generateStaticParams() {
  return trails.map(t => ({ trailId: t.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { trailId } = await params;
  const trail = trails.find(t => t.id === trailId);
  if (!trail) return {};
  return {
    title: `${trail.name} — পুজোর পথে`,
    description: trail.description,
  };
}

export default async function TrailDetailPage({ params }: { params: Promise<Params> }) {
  const { trailId } = await params;
  return <TrailDetailClient trailId={trailId} />;
}
