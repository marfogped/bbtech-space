import React from "react";

interface SectionTagsProps {
  index: number;
  label: string;
}

const SectionTag: React.FC<SectionTagsProps> = ({ index, label }) => {
  return (
    <div className="flex items-center gap-5 xs:w-1/2 sm:w-1/2 lg:w-1/3 font-vt323 text-2xl">
      <div className="w-1/6">0{index}</div>
      <div className="w-5/6 bg-neutral/60 backdrop-blur-sm text-black text-center">
        {label}
      </div>
    </div>
  );
};

export default SectionTag;
