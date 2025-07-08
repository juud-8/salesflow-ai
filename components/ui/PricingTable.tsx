'use client';
import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface Plan {
  id: string;
  name: string;
  price: number;
  userRange: string;
  recommended?: boolean;
  features: string[];
}

const plans: Plan[] = [
  {
    id: process.env.NEXT_PUBLIC_STARTER_PRICE_ID || 'starter',
    name: 'Starter',
    price: 297,
    userRange: '1-3 users',
    features: ['Lead scoring', 'Basic analytics'],
  },
  {
    id: process.env.NEXT_PUBLIC_GROWTH_PRICE_ID || 'growth',
    name: 'Growth',
    price: 797,
    userRange: '4-10 users',
    recommended: true,
    features: ['Everything in Starter', 'Sequence automation'],
  },
  {
    id: process.env.NEXT_PUBLIC_SCALE_PRICE_ID || 'scale',
    name: 'Scale',
    price: 1997,
    userRange: '11-50 users',
    features: ['All features', 'Priority support'],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 0,
    userRange: '50+ users',
    features: ['Custom pricing', 'Dedicated manager'],
  },
];

export default function PricingTable() {
  const [currency, setCurrency] = useState<'USD' | 'EUR'>('USD');
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  });
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <select
          className="border rounded p-1 text-sm"
          value={currency}
          onChange={(e) => setCurrency(e.target.value as 'USD' | 'EUR')}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
      </div>
      <div className="grid md:grid-cols-4 gap-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              'p-4 rounded shadow bg-white dark:bg-gray-800 flex flex-col',
              plan.recommended && 'border-2 border-primary'
            )}
          >
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{plan.userRange}</p>
              {plan.price > 0 ? (
                <p className="text-3xl font-bold mb-4">
                  {format.format(plan.price)}
                </p>
              ) : (
                <p className="text-3xl font-bold mb-4">Contact us</p>
              )}
              <ul className="text-sm space-y-1 mb-4">
                {plan.features.map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>
            </div>
            {plan.price > 0 ? (
              <Link
                href="/api/billing/checkout"
                className="block text-center mt-2 rounded bg-primary text-white py-2"
              >
                Select
              </Link>
            ) : (
              <Link
                href="/contact"
                className="block text-center mt-2 rounded border border-primary py-2"
              >
                Contact sales
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
