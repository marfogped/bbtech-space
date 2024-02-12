import React from "react";

interface SectionTagsProps {
  index: number;
  label: string;
}

const SectionTag: React.FC<SectionTagsProps> = ({ index, label }) => {
  return (
    <div className="flex items-center gap-5 xs:w-full sm:w-full lg:w-1/3 font-vt323 text-2xl">
      <div className="w-1/6">0{index}</div>
      <div className="w-5/6 bg-neutral text-black text-center">{label}</div>
    </div>
  );
};

export default SectionTag;
