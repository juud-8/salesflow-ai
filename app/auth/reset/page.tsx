'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createSupabaseBrowserClient } from '@/lib/supabase-browser';

const schema = z.object({ password: z.string().min(6) });

export default function ResetPasswordPage() {
  const supabase = createSupabaseBrowserClient();
  const searchParams = useSearchParams();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ password: string }>({ resolver: zodResolver(schema) });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [tokenVerified, setTokenVerified] = useState(false);

  useEffect(() => {
    const code = searchParams.get('code') || searchParams.get('token');
    if (!code) {
      setLoading(false);
      setMessage('Invalid token');
      return;
    }
    supabase.auth
      .exchangeCodeForSession(code)
      .then(({ error }) => {
        if (error) {
          setMessage(error.message);
        } else {
          setTokenVerified(true);
        }
      })
      .finally(() => setLoading(false));
  }, [searchParams, supabase]);

  const onSubmit = async ({ password }: { password: string }) => {
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) setMessage(error.message);
    else {
      setMessage('Password updated.');
      router.push('/auth/login');
    }
    setLoading(false);
  };

  if (loading) {
    return <p className="p-4">Loading...</p>;
  }

  if (!tokenVerified) {
    return <p className="p-4 text-red-500">{message}</p>;
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Set New Password</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">New Password</label>
          <input
            type="password"
            className="w-full border p-2 rounded"
            {...register('password')}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-2 rounded"
        >
          {loading ? 'Saving...' : 'Update Password'}
        </button>
        {message && <p className="text-sm mt-2">{message}</p>}
      </form>
    </div>
  );
}
