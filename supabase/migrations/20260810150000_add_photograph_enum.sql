-- Extend content_type enum with 'photograph'
do $$ 
begin 
  alter type public.content_type add value if not exists 'photograph'; 
exception 
  when duplicate_object then null; 
end $$;
