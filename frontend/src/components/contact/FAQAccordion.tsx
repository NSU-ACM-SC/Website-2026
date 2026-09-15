"use client";

import { faqsData } from "@/data/faqsData";
import { ChevronDown, Search } from "lucide-react";
import React, { useMemo, useState } from "react";
import { SectionHeading } from "../ui/SectionHeading";

export const FAQAccordion: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [openFaqId, setOpenFaqId] = useState<string | null>(faqsData[0].id);

  const categories = [
    "All",
    "General",
    "Membership",
    "SIGs & Projects",
    "Events & Workshops",
    "Research",
  ];

  const filteredFaqs = useMemo(() => {
    return faqsData.filter((faq) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat =
        selectedCategory === "All" || faq.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategory]);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section id="faqs" className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="FREQUENTLY ASKED QUESTIONS"
          badgeVariant="orange"
          title="A FEW THINGS"
          highlightText="WORTH KNOWING."
          highlightColor="purple"
          subtitle="Everything you need to know about joining NSU ACM SC, participating in SIG cohorts, and submitting research."
          alignment="center"
        />

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-black/60" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search frequently asked questions"
            placeholder="Search FAQs by question or keyword..."
            className="w-full pl-10 pr-4 py-3 bg-[#f1eee7] border-2 border-black font-body text-sm font-medium shadow-[4px_4px_0px_0px_#000] focus:outline-none focus:bg-[#f1eee7]"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              aria-pressed={selectedCategory === cat}
              className={`px-3 py-1.5 text-xs font-display font-black uppercase border-2 border-black transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-black text-[#f1eee7] shadow-[2px_2px_0px_0px_#f47b2b]"
                  : "bg-[#f1eee7] text-black hover:bg-[#f1eee7] shadow-[2px_2px_0px_0px_#000]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="bg-[#f1eee7] border-2 border-black p-8 text-center shadow-[4px_4px_0px_0px_#000]">
              <p className="font-display font-black text-sm uppercase text-black">
                No FAQs matched your query.
              </p>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-[#f1eee7] border-[3px] border-black shadow-[4px_4px_0px_0px_#000000] overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={"answer-" + faq.id}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#f1eee7] transition-colors cursor-pointer"
                  >
                    <div className="space-y-1">
                      <span className="bg-[#5227FF] text-[#f1eee7] px-2 py-0.2 text-[10px] font-display font-black uppercase inline-block">
                        {faq.category}
                      </span>
                      <h4 className="font-heading font-black text-lg uppercase text-black leading-snug">
                        {faq.question}
                      </h4>
                    </div>

                    <div
                      className={`p-2 bg-black text-[#f1eee7] shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 bg-[#f47b2b]" : ""
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      id={"answer-" + faq.id}
                      className="p-5 pt-0 border-t-2 border-black/10 bg-[#f1eee7]/50 font-body text-sm text-black/85 leading-relaxed"
                    >
                      <p className="pt-3">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
