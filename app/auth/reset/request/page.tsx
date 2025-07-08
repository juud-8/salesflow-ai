'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import Link from 'next/link';
import { createSupabaseBrowserClient } from '@/lib/supabase-browser';

const schema = z.object({ email: z.string().email() });

export default function RequestResetPage() {
  const supabase = createSupabaseBrowserClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({ resolver: zodResolver(schema) });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async ({ email }: { email: string }) => {
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/auth/reset`,
    });
    if (error) setMessage(error.message);
    else setMessage('Check your email for a password reset link.');
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="w-full border p-2 rounded"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-2 rounded"
        >
          {loading ? 'Loading...' : 'Send reset link'}
        </button>
        {message && <p className="text-sm mt-2">{message}</p>}
      </form>
      <p className="mt-4 text-sm">
        Remembered? <Link href="/auth/login">Login</Link>
      </p>
    </div>
  );
}
