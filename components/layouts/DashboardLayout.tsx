'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Home, Users, Shield, ListChecks } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Avatar } from '@radix-ui/react-avatar';
import { useUser } from '@/components/user-context';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/dashboard/leads', label: 'Leads', icon: Users },
  { href: '/dashboard/competitors', label: 'Competitors', icon: Shield },
  { href: '/dashboard/sequences', label: 'Sequences', icon: ListChecks },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, signOut } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
      <button
        className="md:hidden p-4"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle navigation"
      >
        <Menu />
      </button>
      <aside
        className={cn(
          'fixed md:static z-20 inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 p-4 transition-transform',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        <nav className="space-y-2">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700',
                pathname === href && 'bg-gray-200 dark:bg-gray-700'
              )}
            >
              <Icon className="w-4 h-4" /> {label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="flex-1 flex flex-col min-h-screen ml-0 md:ml-64">
        <header className="h-14 bg-white dark:bg-gray-800 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
          <div className="font-semibold">SalesFlow AI</div>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="flex items-center gap-2">
                <Avatar className="w-6 h-6 rounded-full bg-gray-200" />
                <span className="text-sm">{user?.email}</span>
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content className="bg-white dark:bg-gray-800 p-2 rounded shadow min-w-[140px]">
                <DropdownMenu.Item className="px-2 py-1 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Link href="/settings">Settings</Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item asChild>
                  <button
                    className="w-full text-left px-2 py-1 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={signOut}
                  >
                    Sign out
                  </button>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </header>
        <main className="flex-1 p-4 md:p-6">
          <Breadcrumb />
          {children}
        </main>
      </div>
    </div>
  );
}
