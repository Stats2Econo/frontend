import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-white py-10">
      {/* Changed md:items-center to md:items-start to align the top lines perfectly! */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 md:grid-cols-3 md:items-start">
        
        {/* Left Side: Address (Now matching the exact font size and weight of the right side) */}
        <div className="flex flex-col items-center text-center text-base font-medium text-zinc-600 md:items-start md:text-left">
          <p>Palampur,</p>
          <p>Himachal Pradesh,</p>
          <p>India 176061</p>
        </div>

        {/* Center: Logo, Copyright, and Social Icons */}
        <div className="flex flex-col items-center gap-4">
          <Link href="/">
            <Image
              src="/image.png"
              alt="Stats2Econo"
              width={240}
              height={28}
              priority
            />
          </Link>
          <p className="text-sm font-medium text-zinc-500">
            © {new Date().getFullYear()} by Stats2Econo
          </p>
          
          {/* Social Icons moved to the center! */}
          <div className="flex gap-5">
            {/* YouTube Realistic Icon */}
            <Link 
              href="https://www.youtube.com/c/statisticstoeconometrics" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#FF0000] transition-transform hover:scale-110"
              aria-label="YouTube"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </Link>

            {/* LinkedIn Realistic Icon */}
            <Link 
              href="https://www.linkedin.com/in/mohamad-aslam-stats2econo/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#0A66C2] transition-transform hover:scale-110"
              aria-label="LinkedIn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* Right Side: Legal Links */}
        <div className="flex flex-col items-center gap-4 text-base font-medium text-zinc-600 md:items-end">
          <Link 
            href="/terms-of-use-and-refund-policy" 
            className="transition-colors hover:text-black"
          >
            Terms of Use and Refund Policy
          </Link>
          <Link 
            href="/privacy-policy" 
            className="transition-colors hover:text-black"
          >
            Privacy Policy
          </Link>
        </div>
        
      </div>
    </footer>
  );
}