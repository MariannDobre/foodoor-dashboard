import { auth } from '@/_lib/auth';
import Sidebar from './Sidebar';

export default async function SidebarWrapper() {
  const session = await auth();

  return <Sidebar session={session} />;
}
