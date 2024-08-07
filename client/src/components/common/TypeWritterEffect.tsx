import React, { useEffect, useState } from "react";

type TypewriterEffectProps = {
  texts: string[] | null | undefined;
  typingSpeed?: number;
  deletingSpeed?: number;
};

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  texts,
  typingSpeed = 150,
  deletingSpeed = 100,
}) => {
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [typingDelay, setTypingDelay] = useState(typingSpeed);

  useEffect(() => {
    if (texts === null || texts === undefined) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let timer: any;

    if (isDeleting) {
      setTypingDelay(deletingSpeed);
    } else {
      setTypingDelay(typingSpeed);
    }

    if (!isDeleting && currentText === texts[textIndex]) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    } else {
      timer = setTimeout(() => {
        setCurrentText((prev) =>
          isDeleting
            ? prev.slice(0, prev.length - 1)
            : prev + texts[textIndex][prev.length]
        );
      }, typingDelay);
    }

    return () => clearTimeout(timer);
  }, [
    currentText,
    isDeleting,
    textIndex,
    texts,
    typingDelay,
    deletingSpeed,
    typingSpeed,
  ]);

  useEffect(() => {
    setCurrentText("");
  }, [texts]);

  return (
    <span className="bg-purplePrimary w-max text-black font-vt323">
      {currentText.length ? currentText : "\u00A0"}
    </span>
  );
};

export default TypewriterEffect;
