import { redirect } from 'next/navigation';

export default function RootPage() {
  // Otomatis mengalihkan navigasi ke halaman /dashboard
  redirect('/dashboard');
}
