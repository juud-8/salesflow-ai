'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumb() {
  const pathname = usePathname();
  const parts = pathname.split('/').filter(Boolean);
  const crumbs = parts.map((part, i) => ({
    href: '/' + parts.slice(0, i + 1).join('/'),
    label: part.charAt(0).toUpperCase() + part.slice(1),
  }));
  return (
    <nav className="text-sm mb-4" aria-label="Breadcrumb">
      <ol className="flex flex-wrap gap-1">
        <li>
          <Link href="/dashboard" className="underline">
            Home
          </Link>
        </li>
        {crumbs.map((c, i) => (
          <li key={c.href} className="flex items-center">
            <span className="mx-1">/</span>
            {i === crumbs.length - 1 ? (
              <span className="text-gray-500">{c.label}</span>
            ) : (
              <Link href={c.href} className="underline">
                {c.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
