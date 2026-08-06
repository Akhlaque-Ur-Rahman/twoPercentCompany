export type LeadType =
  | "contact"
  | "sell"
  | "rent_landlord"
  | "tenant_enquiry"
  | "investor"
  | "newsletter"
  | "tour"
  | "listing_enquiry"
  | "home_inquiry";

export type SubmitLeadInput = {
  type: LeadType;
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  [key: string]: unknown;
};

export async function submitLead(
  data: SubmitLeadInput
): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = (await res.json()) as { ok?: boolean; error?: string };
    if (!res.ok || !json.ok) {
      return { ok: false, error: json.error || "Something went wrong" };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "Network error — please try again" };
  }
}
