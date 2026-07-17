-- Allow curriculum video uploads in the cms-media bucket
update storage.buckets
set
  file_size_limit = 104857600,
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
    'audio/webm',
    'video/mp4',
    'video/webm',
    'video/quicktime',
    'video/ogg',
    'video/x-m4v'
  ]
where id = 'cms-media';
