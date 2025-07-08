'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { useUser } from '@/components/user-context';
import { createSupabaseBrowserClient } from '@/lib/supabase-browser';

const profileSchema = z.object({ fullName: z.string().min(1) });
const passwordSchema = z.object({ password: z.string().min(6) });

export default function SettingsPage() {
  const { user } = useUser();
  const supabase = createSupabaseBrowserClient();
  const profileForm = useForm<{ fullName: string }>({
    resolver: zodResolver(profileSchema),
    defaultValues: { fullName: user?.user_metadata.fullName || '' },
  });
  const passwordForm = useForm<{ password: string }>({
    resolver: zodResolver(passwordSchema),
  });
  const [message, setMessage] = useState('');

  const updateProfile = async ({ fullName }: { fullName: string }) => {
    const { error } = await supabase.auth.updateUser({ data: { fullName } });
    if (error) setMessage(error.message);
    else setMessage('Profile updated');
  };

  const changePassword = async ({ password }: { password: string }) => {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) setMessage(error.message);
    else setMessage('Password changed');
  };

  if (!user) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-md mx-auto p-4 space-y-8">
      <h1 className="text-2xl font-bold">Settings</h1>
      <section>
        <h2 className="font-semibold mb-2">Profile</h2>
        <form
          onSubmit={profileForm.handleSubmit(updateProfile)}
          className="space-y-4"
        >
          <div>
            <label className="block mb-1">Full Name</label>
            <input
              className="w-full border p-2 rounded"
              {...profileForm.register('fullName')}
            />
            {profileForm.formState.errors.fullName && (
              <p className="text-red-500 text-sm">
                {profileForm.formState.errors.fullName.message}
              </p>
            )}
          </div>
          <button type="submit" className="bg-primary text-white py-2 px-4 rounded">
            Save
          </button>
        </form>
      </section>
      <section>
        <h2 className="font-semibold mb-2">Change Password</h2>
        <form
          onSubmit={passwordForm.handleSubmit(changePassword)}
          className="space-y-4"
        >
          <div>
            <label className="block mb-1">New Password</label>
            <input
              type="password"
              className="w-full border p-2 rounded"
              {...passwordForm.register('password')}
            />
            {passwordForm.formState.errors.password && (
              <p className="text-red-500 text-sm">
                {passwordForm.formState.errors.password.message}
              </p>
            )}
          </div>
          <button type="submit" className="bg-primary text-white py-2 px-4 rounded">
            Update Password
          </button>
        </form>
      </section>
      {message && <p className="text-sm">{message}</p>}
    </div>
  );
}
