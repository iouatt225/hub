import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nfkvkekbbwmwtfnpfpux.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ma3ZrZWtiYndtd3RmbnBmcHV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM4ODgzNDUsImV4cCI6MjA5OTQ2NDM0NX0.mCYfNNWgTO-Xlg20SV8awwhTSMd5nyJhgFsOcEJiGk8';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  const email = `test_hub_user_${Math.floor(Math.random() * 100000)}@gmail.com`;
  const password = 'Password123!';
  const fullName = 'Test Hub User';

  console.log(`Attempting to sign up ${email}...`);
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      }
    }
  });

  if (signUpError) {
    console.error('Sign up error:', signUpError);
    return;
  }

  const user = signUpData.user;
  console.log('Signed up user ID:', user?.id);

  // Now query the profile for this user
  console.log('Fetching profiles table for authenticated user...');
  const { data: profiles, error: profileError } = await supabase
    .from('profiles')
    .select('*');

  console.log('Profiles table error:', profileError);
  console.log('Profiles table content count:', profiles?.length);
  console.log('Profiles details:', JSON.stringify(profiles, null, 2));

  // Let's query projects as well
  const { data: projects, error: projectsError } = await supabase
    .from('projects')
    .select(`
      id,
      title,
      profiles:author_id (
        id,
        full_name,
        avatar_url
      )
    `);
  console.log('Projects count:', projects?.length);
  console.log('Projects details:', JSON.stringify(projects, null, 2));
}

test().catch(err => console.error(err));
