import { FaqData, FaqItem } from "@/data/FaqData";
import { getPayload } from "@/lib/payload";

type FaqDoc = {
  id: number | string;
  question: string;
  answer: string;
  category?: string | null;
  order?: number | null;
};

function mapFaq(doc: FaqDoc): FaqItem {
  return {
    id: String(doc.id),
    question: doc.question,
    answer: doc.answer,
    category: doc.category ?? "general",
    order: doc.order ?? 0,
  };
}

export async function getFaqs(): Promise<FaqItem[]> {
  try {
    const payload = await getPayload();
    const result = await payload.find({
      collection: "faqs",
      where: { published: { equals: true } },
      sort: "order",
      limit: 100,
      pagination: false,
    });
    if (!result.docs.length) return FaqData;
    return result.docs.map((d) => mapFaq(d as unknown as FaqDoc));
  } catch (error) {
    console.error("[faqs] CMS fetch failed, using fallback:", error);
    return FaqData;
  }
}
