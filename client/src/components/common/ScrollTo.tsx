import React from "react";

interface ScrollToProps {
  id: string;
  children: React.ReactNode;
}

const ScrollTo: React.FC<ScrollToProps> = ({ id, children }) => {
  const scrollToSection = () => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView();
    }
  };

  return (
    <div onClick={scrollToSection} className="cursor-pointer w-full h-full">
      {children}
    </div>
  );
};

export default ScrollTo;
