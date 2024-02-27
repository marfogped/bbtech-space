import React, { useEffect, useState } from 'react';

type TypewriterEffectProps = {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
};

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  texts,
  typingSpeed = 150,
  deletingSpeed = 50,
}) => {
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [typingDelay, setTypingDelay] = useState(typingSpeed);

  useEffect(() => {
    let timer: number;

    if (isDeleting) {
      setTypingDelay(deletingSpeed);
    } else {
      setTypingDelay(typingSpeed);
    }

    if (!isDeleting && currentText === texts[textIndex]) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && currentText === '') {
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
  }, [currentText, isDeleting, textIndex, texts, typingDelay, deletingSpeed, typingSpeed]);

  return <span className="bg-purplePrimary block w-max text-black">{currentText.length ? currentText : '\u00A0'}</span>;
};

export default TypewriterEffect;
