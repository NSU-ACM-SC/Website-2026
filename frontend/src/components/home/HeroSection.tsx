"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Play, X } from "lucide-react";
import Image from "next/image";
import { NeoButton } from "@/components/ui/NeoButton";
import { NeoCard } from "@/components/ui/NeoCard";

export interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
  description: string;
  exploreLink: string;
  video: {
    thumbnail: string;
    url: string;
  };
}

const defaultSlides: HeroSlide[] = [
  {
    id: "slide-1",
    image: "https://mgguorsyrkybikaggjpj.supabase.co/storage/v1/object/public/IC20/IC20Plaza.webp",
    subtitle: "NSU ACM STUDENT CHAPTER PRESENTS",
    title: "Innovation Challenge\nSeason 20",
    description: "Discover the next generation of tech leaders as they showcase their groundbreaking final-year projects, featuring cutting-edge software solutions and innovative designs.",
    exploreLink: "/about",
    video: {
      thumbnail: "https://img.youtube.com/vi/ahRs2kAS15A/maxresdefault.jpg",
      url: "https://www.youtube.com/embed/ahRs2kAS15A?autoplay=1"
    }
  },
  {
    id: "slide-2",
    image: "https://mgguorsyrkybikaggjpj.supabase.co/storage/v1/object/public/IC20/IC20VolunteerVsign.webp",
    subtitle: "NSU ACM STUDENT CHAPTER PRESENTS",
    title: "Innovation Challenge\nSeason 20 Volunteers",
    description: "people who makes the event possible",
    exploreLink: "/about",
    video: {
      thumbnail: "https://img.youtube.com/vi/ahRs2kAS15A/maxresdefault.jpg",
      url: "https://www.youtube.com/embed/ahRs2kAS15A?autoplay=1"
    }
  }
];

export function HeroSection({ slides = defaultSlides }: { slides?: HeroSlide[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    if (!slides || slides.length <= 1 || isVideoOpen) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides, isVideoOpen]);

  if (!slides || slides.length === 0) return null;
  const slide = slides[currentSlide];

  return (
    <section className="relative w-full h-screen min-h-[650px] max-h-[1080px] -mt-[112px] overflow-hidden bg-black">
      {/* Background Image Slideshow */}
      {slides.map((s, idx) => (
        <div 
          key={s.id} 
          className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentSlide ? "opacity-100 z-0" : "opacity-0 -z-10"}`}
        >
          <Image
            src={s.image}
            alt={s.title}
            fill
            className="object-cover"
            priority={idx === 0}
          />
        </div>
      ))}
      
      {/* Dark Overlay Filter for better contrast */}
      <div className="absolute inset-0 z-0 bg-black/40 pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 w-full h-full max-w-[1400px] mx-auto px-4 md:px-8 pt-[112px] flex flex-col justify-end pb-8">
        {/* items-end aligns the text block and video card at their bottom edges */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mt-auto">
          
          {/* Left: Text Content */}
          <div className="flex-1 max-w-4xl text-white">
            {slide.subtitle && (
              <p className="text-xs md:text-sm font-bold uppercase tracking-[0.25em] mb-3 text-[#ffde59]">
                {slide.subtitle}
              </p>
            )}
            <h1 className="whitespace-pre-line text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight font-heading text-white drop-shadow-xl">
              {slide.title}
            </h1>
            <p className="text-base md:text-lg text-gray-200 mb-8 max-w-3xl font-body leading-relaxed drop-shadow-md">
              {slide.description}
            </p>
            
            <NeoButton 
              href={slide.exploreLink}
              variant="secondary"
              size="lg"
            >
              Explore <ArrowRight size={20} />
            </NeoButton>
          </div>

          {/* Right: Video Card */}
          <div className="w-full md:w-[320px] lg:w-[360px] shrink-0 pb-2">
            <button 
              onClick={() => setIsVideoOpen(true)}
              className="w-full text-left outline-none"
              aria-label="Watch the video"
            >
              <NeoCard interactive shadow="lg" className="w-full p-2 bg-white flex flex-col relative group">
                <div className="relative w-full aspect-[4/3] bg-black overflow-hidden border-2 border-black">
                  <Image 
                    src={slide.video.thumbnail}
                    alt="Video thumbnail"
                    fill
                    className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Play icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
                     <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                       <Play size={28} className="text-white fill-white ml-1" />
                     </div>
                  </div>
                </div>
                
                {/* Bottom text banner */}
                <div className="w-full py-4 flex items-center justify-center gap-2 bg-white text-black font-bold text-sm tracking-widest">
                  WATCH THE VIDEO 
                  <div className="w-6 h-6 rounded-full bg-[#3392cc] flex items-center justify-center text-white">
                    <Play size={12} className="fill-white ml-0.5" />
                  </div>
                </div>
              </NeoCard>
            </button>
          </div>
        </div>
        
        {/* Slideshow dots/controls */}
        {slides.length > 1 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-white w-8' : 'bg-white/50 w-2 hover:bg-white/80'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4 md:p-12 backdrop-blur-sm"
          onClick={() => setIsVideoOpen(false)}
        >
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsVideoOpen(false);
            }}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-3 border-2 border-transparent hover:border-white z-[10000]"
            aria-label="Close video"
          >
            <X size={32} />
          </button>
          <div 
            className="w-full max-w-6xl aspect-video bg-black overflow-hidden shadow-2xl relative border-2 border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={slide.video.url}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
