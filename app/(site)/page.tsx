import Noticeboard from "../components/Noticeboard";
import HeroSection from "../components/HeroSection";
import GallerySection from "../components/GallerySection";
import LetsConnectSection from "../components/LetsConnectSection";
import { getHomepageAnnouncements, getPublishedCourses } from "@/lib/courses";
import { DUMMY_COURSES } from "../(site)/courses/dummy";

export default async function Home() {
  const [liveCourses, notices] = await Promise.all([
    getPublishedCourses(),
    getHomepageAnnouncements(),
  ]);
  const courses = liveCourses.length > 0 ? liveCourses : DUMMY_COURSES;
  const featured = courses.find((c) => c.is_featured) ?? null;

  return (
    <div className="flex min-h-screen flex-col">
      <Noticeboard featured={featured} notices={notices} />

      {/* Unified Salesforce-style Green Canvas: Hero + 5 Vision Cards + Infinite Course Marquee + Trust Stories + Convex Arch */}
      <HeroSection courses={courses} />

      {/* Light contrast sections after the convex arch */}
      <GallerySection />

      <LetsConnectSection />
    </div>
  );
}