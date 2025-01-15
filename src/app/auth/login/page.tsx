// sections
import { JwtLoginView } from '@/sections/auth/jwt';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'CRM PRO INJECAO: Login',
};

export default function LoginPage() {
  return <JwtLoginView />;
}
