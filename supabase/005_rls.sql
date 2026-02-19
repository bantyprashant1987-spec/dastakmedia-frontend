-- Enable Row Level Security

alter table saints enable row level security;
alter table bhakts enable row level security;
alter table saint_gallery enable row level security;
alter table content_items enable row level security;

-- Public read access
create policy "Public read saints" on saints
for select using (true);

create policy "Public read bhakts" on bhakts
for select using (true);

create policy "Public read gallery" on saint_gallery
for select using (true);

create policy "Public read content" on content_items
for select using (true);
