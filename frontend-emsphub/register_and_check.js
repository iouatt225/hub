import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nfkvkekbbwmwtfnpfpux.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ma3ZrZWtiYndtd3RmbnBmcHV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM4ODgzNDUsImV4cCI6MjA5OTQ2NDM0NX0.mCYfNNWgTO-Xlg20SV8awwhTSMd5nyJhgFsOcEJiGk8';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  // Use a unique email
  const email = `tester_${Date.now()}@gmail.com`;
  const password = 'Password123!';
  const fullName = 'Auto Tester';

  console.log(`Trying to register ${email}...`);
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
    console.error('Sign up failed:', signUpError.message);
    return;
  }

  console.log('Sign up succeeded. User ID:', signUpData.user?.id);

  // Now, log in as this user to get authenticated state
  console.log('Logging in...');
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (signInError) {
    console.error('Sign in failed:', signInError.message);
    return;
  }

  console.log('Logged in successfully!');

  // Query profiles table
  console.log('Querying profiles table as authenticated user...');
  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('*');

  console.log('Profiles error:', profilesError);
  console.log('Profiles retrieved count:', profiles?.length);
  console.log('Profiles:', JSON.stringify(profiles, null, 2));

  // Query projects table
  console.log('Querying projects table as authenticated user...');
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

  console.log('Projects error:', projectsError);
  console.log('Projects retrieved count:', projects?.length);
  console.log('Projects:', JSON.stringify(projects, null, 2));
}

test().catch(err => console.error(err));
