'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useState } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  remember: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { remember: true } });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (error) {
      setMessage(error.message);
    } else {
      router.push('/');
    }
    setLoading(false);
  };

  const oauthLogin = async (provider: 'google' | 'azure') => {
    await supabase.auth.signInWithOAuth({ provider });
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
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
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            className="w-full border p-2 rounded"
            {...register('password')}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div className="flex items-center">
          <input type="checkbox" className="mr-2" {...register('remember')} />
          <label>Remember me</label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-2 rounded"
        >
          {loading ? 'Loading...' : 'Login'}
        </button>
        {message && <p className="text-sm mt-2">{message}</p>}
      </form>
      <div className="mt-4 space-y-2">
        <button
          onClick={() => oauthLogin('google')}
          className="w-full border p-2 rounded"
        >
          Login with Google
        </button>
        <button
          onClick={() => oauthLogin('azure')}
          className="w-full border p-2 rounded"
        >
          Login with Microsoft
        </button>
      </div>
      <div className="mt-4 text-sm flex justify-between">
        <Link href="/auth/reset/request" className="text-primary hover:underline">
          Forgot password?
        </Link>
        <Link href="/auth/signup" className="text-primary hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
}
