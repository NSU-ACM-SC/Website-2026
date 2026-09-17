import { SocialDock } from "@/components/contact/SocialDock";
import { chapterEmail } from "@/data/contactData";
import { withBasePath } from "@/lib/assets";
import Image from "next/image";
import Link from "next/link";
import { NeoCard } from "@/components/ui/NeoCard";

export function Footer() {
  return (
    <footer className="w-full bg-[#f1eee7] px-4 md:px-8 py-6 md:py-10 border-t-[3px] border-black font-body">
      <div className="w-full max-w-[1240px] mx-auto flex flex-col lg:flex-row gap-5 lg:gap-8">
        
        {/* Left Side - White Card */}
        <NeoCard 
          variant="default" 
          shadow="md" 
          className="w-full lg:w-1/3 flex flex-col justify-between p-6 md:p-8 bg-white"
        >
          <div>
            <Image
              src={withBasePath("/assets/brand/acm-logo.webp")}
              width={330}
              height={280}
              sizes="55px"
              style={{ width: 55, height: "auto" }}
              alt="NSU ACM Student Chapter"
              className="mb-5 drop-shadow-[3px_3px_0_#3392cc]"
            />
            <h2 className="text-xl md:text-2xl font-black font-heading mb-3 uppercase tracking-wider text-black">
              NSU ACM SC
            </h2>
            
            <a
              href="https://maps.google.com/?q=North+South+University,+Bashundhara,+Dhaka"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-black hover:text-[#f47b2b] transition-colors max-w-sm mb-4 text-[13px] font-medium leading-relaxed"
            >
              South Academic Building (10th Floor),<br />
              North South University,<br />
              Bashundhara R/A, Dhaka-1229
            </a>
            
            <a 
              href={"mailto:" + chapterEmail}
              className="inline-block text-black hover:text-[#5227FF] font-bold mb-8 text-sm transition-colors"
            >
              {chapterEmail}
            </a>
          </div>
          
          <div>
            <SocialDock />
          </div>
        </NeoCard>

        {/* Right Side - Black Card */}
        <NeoCard 
          variant="dark" 
          shadow="md" 
          className="w-full lg:w-2/3 flex flex-col justify-between p-6 md:p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-5 mb-10">
            
            {/* Column 1: Explore */}
            <div className="flex flex-col space-y-2 text-[13px]">
              <h3 className="text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest font-heading">Explore</h3>
              <Link href="/" className="hover:text-[#ffde59] transition-colors w-fit">Home</Link>
              <Link href="/activities/events" className="hover:text-[#ffde59] transition-colors w-fit">Events</Link>
              <Link href="/activities/calender" className="hover:text-[#ffde59] transition-colors w-fit">Calendar</Link>
              <Link href="/activities/achievements" className="hover:text-[#ffde59] transition-colors w-fit">Achievements</Link>
              <Link href="/about" className="hover:text-[#ffde59] transition-colors w-fit">About</Link>
            </div>

            {/* Column 2: Resources */}
            <div className="flex flex-col space-y-2 text-[13px]">
              <h3 className="text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest font-heading">Resources</h3>
              <Link href="/publications/researchs" className="hover:text-[#00d084] transition-colors w-fit">Research</Link>
              <Link href="/publications/projects" className="hover:text-[#00d084] transition-colors w-fit">Projects</Link>
              <Link href="/publications/blogs" className="hover:text-[#00d084] transition-colors w-fit">Blogs</Link>
              <Link href="/publications/news" className="hover:text-[#00d084] transition-colors w-fit">News</Link>
              <Link href="/publications/megazines" className="hover:text-[#00d084] transition-colors w-fit">Magazine</Link>
              <Link href="/publications/gallery" className="hover:text-[#00d084] transition-colors w-fit">Gallery</Link>
              <Link href="/publications/toolkits" className="hover:text-[#00d084] transition-colors w-fit">Tool Kit</Link>
              <Link href="/publications/learningResources" className="hover:text-[#00d084] transition-colors w-fit">Learning Resources</Link>
            </div>

            {/* Column 3: Community */}
            <div className="flex flex-col space-y-2 text-[13px] col-span-2 md:col-span-1 mt-2 md:mt-0">
              <h3 className="text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest font-heading">Community</h3>
              <Link href="/teams&sig" className="hover:text-[#ff66c4] transition-colors w-fit">Teams & SIGs</Link>
              <Link href="/members" className="hover:text-[#ff66c4] transition-colors w-fit">Member directory</Link>
              <Link href="/certificates" className="hover:text-[#ff66c4] transition-colors w-fit">Verify a certificate</Link>
              <Link href="/contact" className="hover:text-[#ff66c4] transition-colors w-fit">Contact Us</Link>
              <a href="https://dash.nsuacmsc.org" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff66c4] transition-colors flex items-center gap-1 w-fit">
                Member portal ↗
              </a>
            </div>

          </div>

          {/* Bottom Footer Info */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-5 border-t-2 border-white/20 text-gray-400 text-[11px] gap-2">
            <span>© {new Date().getFullYear()} NSU ACM SC. All rights reserved.</span>
            <span className="font-bold text-white uppercase tracking-widest text-[9px] sm:text-[10px]">Join. Collaborate. Build. Repeat.</span>
          </div>

        </NeoCard>
      </div>
    </footer>
  );
}
