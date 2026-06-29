"use client";

import type { ComponentType } from "react";
import { Hero } from "@/components/sections/Hero";
import { Statistics } from "@/components/sections/Statistics";
import { WhatYouLearn } from "@/components/sections/WhatYouLearn";
import { ForWhom } from "@/components/sections/ForWhom";
import { CourseProgramSlider } from "@/components/sections/CourseProgramSlider";
import { LearningPath } from "@/components/sections/LearningPath";
import { StudentResults } from "@/components/sections/StudentResults";
import { Testimonials } from "@/components/sections/Testimonials";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { useSiteConfig } from "@/context/SiteConfigContext";
import type { SiteConfig } from "@/config/index";

type SectionKey =
  | "hero"
  | "whatYouLearn"
  | "forWhom"
  | "courseProgram"
  | "learningPath"
  | "studentResults"
  | "videoReviews"
  | "pricing"
  | "faq"
  | "cta"
  | "results";

type PageSections = Partial<Record<SectionKey, { enabled?: boolean; order?: number }>>;

const SECTION_COMPONENTS: Record<SectionKey, ComponentType> = {
  hero: Hero,
  whatYouLearn: WhatYouLearn,
  forWhom: ForWhom,
  courseProgram: CourseProgramSlider,
  learningPath: LearningPath,
  studentResults: StudentResults,
  videoReviews: Testimonials,
  pricing: Pricing,
  faq: FAQ,
  cta: CTA,
  results: Statistics,
};

const DEFAULT_ORDER: SectionKey[] = [
  "hero",
  "whatYouLearn",
  "forWhom",
  "courseProgram",
  "learningPath",
  "studentResults",
  "videoReviews",
  "pricing",
  "faq",
  "cta",
];

function getPageSections(config: SiteConfig): PageSections {
  const ext = config as SiteConfig & { pageSections?: PageSections };
  if (ext.pageSections && typeof ext.pageSections === "object") {
    return ext.pageSections;
  }
  return DEFAULT_ORDER.reduce((acc, key, i) => {
    acc[key] = { enabled: true, order: i + 1 };
    return acc;
  }, {} as PageSections);
}

export function isSectionEnabled(config: SiteConfig, key: SectionKey): boolean {
  const sections = getPageSections(config);
  return sections[key]?.enabled !== false;
}

const HREF_SECTION: Record<string, SectionKey> = {
  "#hero": "hero",
  "#what-you-learn": "whatYouLearn",
  "#for-whom": "forWhom",
  "#course-program": "courseProgram",
  "#learning-path": "learningPath",
  "#student-results": "studentResults",
  "#video-reviews": "videoReviews",
  "#pricing": "pricing",
  "#faq": "faq",
  "#cta": "cta",
  "#results": "results",
};

export function filterNavigation(config: SiteConfig) {
  return config.navigation.filter((item) => {
    const key = HREF_SECTION[item.href];
    if (!key) return true;
    return isSectionEnabled(config, key);
  });
}

export function HomeSections() {
  const config = useSiteConfig();
  const pageSections = getPageSections(config);

  const ordered = DEFAULT_ORDER.filter((key) => pageSections[key]?.enabled !== false).sort(
    (a, b) => (pageSections[a]?.order ?? 99) - (pageSections[b]?.order ?? 99)
  );

  return (
    <>
      {ordered.map((key) => {
        const Component = SECTION_COMPONENTS[key];
        return <Component key={key} />;
      })}
    </>
  );
}
