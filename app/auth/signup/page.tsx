'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';
import Link from 'next/link';
import { createSupabaseBrowserClient } from '@/lib/supabase-browser';

const schema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    company: z.string().min(1),
    terms: z.literal(true, {
      errorMap: () => ({ message: 'You must accept the terms' }),
    }),
  })
  .required();

type FormData = z.infer<typeof schema>;

export default function SignupPage() {
  const supabase = createSupabaseBrowserClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: { data: { company: data.company } },
    });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Check your email to verify your account.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
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
        <div>
          <label className="block mb-1">Company Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            {...register('company')}
          />
          {errors.company && (
            <p className="text-red-500 text-sm">{errors.company.message}</p>
          )}
        </div>
        <div className="flex items-center">
          <input type="checkbox" className="mr-2" {...register('terms')} />
          <label>I agree to the Terms of Service</label>
        </div>
        {errors.terms && (
          <p className="text-red-500 text-sm">{errors.terms.message}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-2 rounded"
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        {message && <p className="text-sm mt-2">{message}</p>}
      </form>
      <p className="mt-4 text-sm">
        Already have an account? <Link href="/auth/login">Login</Link>
      </p>
    </div>
  );
}
