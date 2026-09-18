import Noticeboard from "../components/Noticeboard";
import HeroSection from "../components/HeroSection";
import MissionSection from "../components/MissionSection";
import CourseOverviewSection from "../components/CourseOverviewSection";
import TestimonialsSection from "../components/TestimonialsSection";
import GallerySection from "../components/GallerySection";
import LetsConnectSection from "../components/LetsConnectSection";
import { getHomepageAnnouncements, getPublishedCourses } from "@/lib/courses";

export default async function Home() {
  const [courses, notices] = await Promise.all([
    getPublishedCourses(),
    getHomepageAnnouncements(),
  ]);
  const featured = courses.find((c) => c.is_featured) ?? null;

  return (
    <div className="flex flex-col min-h-screen">
      <Noticeboard featured={featured} notices={notices} />

      <HeroSection />

      <MissionSection />

      <CourseOverviewSection courses={courses} />

      <TestimonialsSection />

      <GallerySection />

      <LetsConnectSection />
    </div>
  );
}
