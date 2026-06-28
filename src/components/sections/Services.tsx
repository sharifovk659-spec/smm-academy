import { ForWhom } from "@/components/sections/ForWhom";
import { WhatYouLearn } from "@/components/sections/WhatYouLearn";

/** @deprecated Use separate whatYouLearn + forWhom sections */
export function Services() {
  return (
    <>
      <WhatYouLearn />
      <ForWhom />
    </>
  );
}
