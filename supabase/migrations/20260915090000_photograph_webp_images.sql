-- Migration: 20260915090000_photograph_webp_images.sql
-- Archives photographs: serve the 1920px webp copies on detail pages and the
-- 800px thumbnails in grids instead of the multi-megabyte camera JPEGs.
-- Only rewrites URLs still pointing at the original /digitized-photos/*.jpeg
-- files, so anything re-pointed in the CMS is left alone.

update public.content_entries
set
  image_url = case
    when image_url ~ '^/digitized-photos/IMG_[0-9]+\.jpeg$'
      then regexp_replace(image_url, '\.jpeg$', '.webp')
    else image_url
  end,
  metadata = metadata || jsonb_strip_nulls(jsonb_build_object(
    'imageUrl', case
      when metadata->>'imageUrl' ~ '^/digitized-photos/IMG_[0-9]+\.jpeg$'
        then regexp_replace(metadata->>'imageUrl', '\.jpeg$', '.webp')
    end,
    'thumbnailUrl', case
      when metadata->>'thumbnailUrl' ~ '^/digitized-photos/IMG_[0-9]+\.jpeg$'
        then regexp_replace(metadata->>'thumbnailUrl', '^/digitized-photos/(IMG_[0-9]+)\.jpeg$', '/digitized-photos/thumbs/\1.webp')
    end
  )),
  updated_at = now()
where content_type = 'photograph'
  and (
    image_url ~ '^/digitized-photos/IMG_[0-9]+\.jpeg$'
    or metadata->>'imageUrl' ~ '^/digitized-photos/IMG_[0-9]+\.jpeg$'
    or metadata->>'thumbnailUrl' ~ '^/digitized-photos/IMG_[0-9]+\.jpeg$'
  );
