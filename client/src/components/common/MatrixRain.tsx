import React, { useEffect, useState, useRef } from "react";
import useInterval from "@use-it/interval/src/index";

const VALID_CHARS = `abcdefghijklmnopqrstuvwxyz0123456789$+-*/=%"'#&_(),.;:?!\\|{}<>[]^~`;
const STREAM_MUTATION_ODDS = 0.02;

const MIN_STREAM_SIZE = 15;
const MAX_STREAM_SIZE = 50;

const MIN_INTERVAL_DELAY = 50;
const MAX_INTERVAL_DELAY = 100;

const MIN_DELAY_BETWEEN_STREAMS = 0;
const MAX_DELAY_BETWEEN_STREAMS = 8000;

interface RainStreamProps {
  height: number;
}

interface ContainerSize {
  width: number;
  height: number;
}

const getRandInRange = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min)) + min;

const getRandChar = (): string =>
  VALID_CHARS.charAt(Math.floor(Math.random() * VALID_CHARS.length));

const getRandStream = (): string[] =>
  new Array(getRandInRange(MIN_STREAM_SIZE, MAX_STREAM_SIZE))
    .fill(null)
    .map(() => getRandChar());

const getMutatedStream = (stream: string[]): string[] => {
  const newStream = [];
  for (let i = 1; i < stream.length; i++) {
    newStream.push(
      Math.random() < STREAM_MUTATION_ODDS ? getRandChar() : stream[i]
    );
  }
  newStream.push(getRandChar());
  return newStream;
};

const RainStream: React.FC<RainStreamProps> = ({ height }) => {
  const [stream, setStream] = useState<string[]>(getRandStream());
  const [topPadding, setTopPadding] = useState<number>(stream.length * -50);
  const [intervalDelay, setIntervalDelay] = useState<number | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setIntervalDelay(getRandInRange(MIN_INTERVAL_DELAY, MAX_INTERVAL_DELAY));
    }, getRandInRange(MIN_DELAY_BETWEEN_STREAMS, MAX_DELAY_BETWEEN_STREAMS));
  }, []);

  useInterval(() => {
    if (!height || !intervalDelay) return;

    if (topPadding > height) {
      const newStream = getRandStream();
      setStream(newStream);
      setTopPadding(newStream.length * -44);
      setIntervalDelay(null);
      setTimeout(() => {
        setIntervalDelay(
          getRandInRange(MIN_INTERVAL_DELAY, MAX_INTERVAL_DELAY)
        );
      }, getRandInRange(MIN_DELAY_BETWEEN_STREAMS, MAX_DELAY_BETWEEN_STREAMS));
    } else {
      setTopPadding(topPadding + 44);
      setStream((prevStream) => getMutatedStream(prevStream));
    }
  }, intervalDelay);

  return (
    <div
      style={{
        fontFamily: "matrixFont",
        writingMode: "vertical-rl",
        textOrientation: "upright",
        userSelect: "none",
        whiteSpace: "nowrap",
        marginTop: topPadding,
        marginLeft: -15,
        marginRight: -15,
        textShadow: "0px 0px 8px #9A11D9",
        fontSize: 50,
      }}
      className="text-purplePrimary"
    >
      {stream.map((char, index) => (
        <span
          key={index}
          style={{
            marginTop: -12,
            opacity: index < 6 ? 0.1 + index * 0.15 : 1,
            color: index === stream.length - 1 ? "#fff" : undefined,
            textShadow:
              index === stream.length - 1
                ? "0px 0px 20px rgba(255, 255, 255, 1)"
                : undefined,
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

const MatrixRain: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState<ContainerSize | null>(
    null
  );

  useEffect(() => {
    const updateSize = () => {
      const boundingClientRect = containerRef.current?.getBoundingClientRect();
      if (boundingClientRect) {
        setContainerSize({
          width: boundingClientRect.width,
          height: boundingClientRect.height,
        });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const streamCount = containerSize ? Math.floor(containerSize.width / 26) : 0;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 -z-[9]"></div>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          overflow: "hidden",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          zIndex: -10,
        }}
        ref={containerRef}
      >
        {Array.from({ length: streamCount }, (_, i) => (
          <RainStream key={i} height={containerSize?.height ?? 0} />
        ))}
      </div>
    </>
  );
};

export default MatrixRain;
