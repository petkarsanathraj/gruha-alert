export type NoticeStatus = "open" | "closed" | "unknown";

export interface Notice {
  id: string;
  board: string; // 'KHB'
  district: string;
  place: string;
  type: string; // 'Demand survey' | 'Apply online' | 'e-Auction' | 'Extended' | 'New layout'
  title_kn: string | null;
  label_en: string;
  start: string | null; // 'YYYY-MM-DD' — apply window opens
  deadline: string | null; // 'YYYY-MM-DD' — last date to apply
  status: NoticeStatus;
  pdf_url: string;
  apply_url: string | null; // verified project form when open for application, else null
  oldapp_url: string; // returning-applicant login (generic)
  maps_url: string;
  price_url: string;
  first_seen: string;
  last_seen: string;
}
