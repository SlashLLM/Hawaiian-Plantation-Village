-- Allow oral-history audio uploads in the cms-media bucket
update storage.buckets
set
  file_size_limit = 26214400,
  allowed_mime_types = array[
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'audio/mpeg',
    'audio/mp4',
    'audio/wav',
    'audio/ogg',
    'audio/x-wav',
    'audio/webm'
  ]
where id = 'cms-media';
