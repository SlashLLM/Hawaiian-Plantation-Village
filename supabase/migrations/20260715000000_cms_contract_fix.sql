-- Normalize editorial content_type: legacy 'event' rows become 'program' for Home events grid.
update public.content_entries
set content_type = 'program',
    updated_at = now()
where content_type = 'event';
