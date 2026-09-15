import { DetailPage } from "@/components/ui/ContentDetail";
import { collections } from "@/data/siteContent";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const collection = collections["publications/toolkits"];
type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return collection.items.map((item) => ({ slug: item.id }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = collection.items.find((item) => item.id === slug);
  return {
    title: (item?.title || "Not found") + " | NSU ACM SC",
    description: item?.description,
  };
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const item = collection.items.find((item) => item.id === slug);
  if (!item) notFound();
  return <DetailPage item={item} back="/publications/toolkits" />;
}
