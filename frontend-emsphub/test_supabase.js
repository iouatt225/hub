import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nfkvkekbbwmwtfnpfpux.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ma3ZrZWtiYndtd3RmbnBmcHV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM4ODgzNDUsImV4cCI6MjA5OTQ2NDM0NX0.mCYfNNWgTO-Xlg20SV8awwhTSMd5nyJhgFsOcEJiGk8';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  console.log('Testing connection to Supabase...');
  
  // Test simple select projects
  const { data: projPlain, error: errorPlain } = await supabase
    .from('projects')
    .select('id, title');
  
  console.log('Plain projects response:', { dataCount: projPlain?.length, error: errorPlain });

  // Test query with profiles:author_id
  const { data: projWithProfiles, error: errorWithProfiles } = await supabase
    .from('projects')
    .select(`
      id,
      title,
      profiles:author_id (
        id,
        full_name
      )
    `);

  console.log('Projects with profiles query response:', { dataCount: projWithProfiles?.length, error: errorWithProfiles });

  // Test join with profiles!author_id
  const { data: projWithJoin, error: errorWithJoin } = await supabase
    .from('projects')
    .select(`
      id,
      title,
      profiles!author_id (
        id,
        full_name
      )
    `);

  console.log('Projects with join query response:', { dataCount: projWithJoin?.length, error: errorWithJoin });
}

test().catch(err => console.error('Unexpected error:', err));
