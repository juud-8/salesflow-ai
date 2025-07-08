'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { createSupabaseBrowserClient } from '@/lib/supabase-browser';

interface UserContextState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  refresh: () => Promise<void>;
  signOut: () => Promise<void>;
}

const UserContext = createContext<UserContextState | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const supabase = createSupabaseBrowserClient();
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    const {
      data: { session: current },
    } = await supabase.auth.getSession();
    setSession(current);
    setUser(current?.user ?? null);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    await refresh();
  };

  useEffect(() => {
    refresh().finally(() => setLoading(false));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      refresh();
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <UserContext.Provider value={{ user, session, loading, refresh, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
};
