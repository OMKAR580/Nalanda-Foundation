import { redirect } from "next/navigation";

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  redirect(`/programs/${resolvedParams.slug}`);
}
