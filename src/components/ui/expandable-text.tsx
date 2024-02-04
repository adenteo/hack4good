import { useState, useRef, useEffect } from 'react';

export default function ExpandableText({ text }: { text: string }) {
  const [isToggled, setIsToggled] = useState(false);
  const [needClick, setNeedClick] = useState(false);
  const contentRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const element = contentRef.current;

    if (element) {
      if (
        element.offsetHeight < element.scrollHeight ||
        element.offsetWidth < element.scrollWidth
      ) {
        setIsToggled(false);
        setNeedClick(true);
      } else {
        setIsToggled(true);
        setNeedClick(false);
      }
    }
  }, []);

  const handleReadMore = () => {
    const element = contentRef.current;
    if (element) {
      element.classList.remove('line-clamp-3');
      setIsToggled(true);
      setNeedClick(true);
    }
  };

  const handleReadLess = () => {
    const element = contentRef.current;
    if (element) {
      element.classList.add('line-clamp-3');
      setIsToggled(false);
      setNeedClick(true);
    }
  };
  return (
    <div>
      <p
        ref={contentRef}
        className="line-clamp-3 overflow-hidden text-[0.95rem] lg:text-base"
      >
        {text}
      </p>

      {needClick ? (
        <>
          {isToggled ? (
            <button
              onClick={handleReadLess}
              className="text-blue-500 text-xs lg:text-sm"
            >
              Read less
            </button>
          ) : (
            <button
              onClick={handleReadMore}
              className="text-blue-600 text-xs lg:text-sm"
            >
              Read more
            </button>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
