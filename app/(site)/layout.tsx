import Header from "../components/Header";
import Footer from "../components/Footer";
import { getProfile } from "@/lib/auth";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getProfile();

  return (
    <>
      <Header
        user={
          profile
            ? {
                name: profile.full_name,
                email: profile.email,
                avatarUrl: profile.avatar_url,
                isAdmin: profile.role === "admin",
              }
            : null
        }
      />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
    </>
  );
}
