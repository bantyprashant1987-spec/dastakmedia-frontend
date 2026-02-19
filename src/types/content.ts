export type ContentItem = {
  id: string;
  type: string;
  category: string;
  title: string;
  description: string | null;
  image_url: string | null;
  external_link: string | null;
  platform: string | null;
  event_date: string | null;
  is_featured: boolean;
  created_at: string;
};
