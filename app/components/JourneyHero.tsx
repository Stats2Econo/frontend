import Image from "next/image";
import { Cormorant_Garamond } from "next/font/google";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600"], style: ["normal", "italic"] });

/**
 * Sunrise banner with the Iqbal couplet over the sky.
 * Photo: "People Silhouette during Sunset" by Min An on Pexels (free to use, no attribution required).
 * https://www.pexels.com/photo/people-silhouette-during-sunset-853168/
 */
export default function JourneyHero() {
  return (
    <section className="relative isolate h-[34rem] overflow-hidden bg-[#0b4a5e] sm:h-[38rem] md:h-[40rem]">
      <Image
        src="/journey-hero-clean.jpg"
        alt="Silhouettes of a group of people with their arms raised, facing the setting sun"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[50%_28%] sm:object-[50%_25%]"
      />
      {/* Darkens the top of the sky so the quote stays readable. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[#062c39]/75 via-[#062c39]/25 via-40% to-transparent to-70%"
      />

      <figure className="mx-auto flex max-w-3xl flex-col items-center px-6 pt-10 text-center text-white [text-shadow:0_1px_14px_rgb(0_0_0/0.45)] sm:pt-14">
        <blockquote className={`${serif.className} text-xl leading-snug font-medium text-balance italic sm:text-3xl`}>
          <p>The goal that you presume is far and out of view:</p>
          <p className="mt-1">What else can be this life but zeal for endless strife?</p>
        </blockquote>
        <figcaption className={`${serif.className} mt-3 text-lg font-semibold sm:text-xl`}>— Allama Iqbal</figcaption>
      </figure>
    </section>
  );
}
