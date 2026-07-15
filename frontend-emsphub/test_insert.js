import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nfkvkekbbwmwtfnpfpux.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ma3ZrZWtiYndtd3RmbnBmcHV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM4ODgzNDUsImV4cCI6MjA5OTQ2NDM0NX0.mCYfNNWgTO-Xlg20SV8awwhTSMd5nyJhgFsOcEJiGk8';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  const nonExistentAuthorId = '00000000-0000-0000-0000-000000000000';
  console.log(`Attempting to insert a project with a fake author_id: ${nonExistentAuthorId}`);
  
  const { data, error } = await supabase
    .from('projects')
    .insert({
      title: 'Fake project',
      problem: 'Fake problem',
      solution: 'Fake solution',
      team_status: 'solo',
      author_id: nonExistentAuthorId
    });

  if (error) {
    console.log('Insert failed (Constraint active):', error.message);
  } else {
    console.log('Insert succeeded (Constraint NOT active!):', data);
  }
}

test().catch(err => console.error(err));
