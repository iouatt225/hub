import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nfkvkekbbwmwtfnpfpux.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ma3ZrZWtiYndtd3RmbnBmcHV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM4ODgzNDUsImV4cCI6MjA5OTQ2NDM0NX0.mCYfNNWgTO-Xlg20SV8awwhTSMd5nyJhgFsOcEJiGk8';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  const { data: projects, error } = await supabase
    .from('projects')
    .select(`
      id,
      title,
      problem,
      solution,
      team_status,
      tags,
      votes,
      is_official_selection,
      created_at,
      image_url,
      author_id,
      profiles:author_id (
        id,
        full_name,
        avatar_url
      )
    `);

  console.log('Projects error:', error);
  console.log('Projects data count:', projects?.length);
  console.log('Projects details:', JSON.stringify(projects, null, 2));

  // Let's also check profiles table
  const { data: profiles, error: profError } = await supabase
    .from('profiles')
    .select('*');
  console.log('Profiles count:', profiles?.length);
  console.log('Profiles details:', JSON.stringify(profiles, null, 2));
}

test().catch(err => console.error(err));
