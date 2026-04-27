/**
 * Route group (dashboard): URLs unchanged — e.g. /admin/* still resolves here.
 * Shared shell for authenticated business panel pages.
 */
export default function DashboardRouteGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
