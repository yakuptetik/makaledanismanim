import { useCallback, useEffect, useRef, useState } from "react";
import { AmbientLights } from "@/components/AmbientLights";
import { Reveal } from "@/components/Reveal";
import { useTranslate } from "../LanguageContext";

const PATH_X = 56;

function buildCurvedPath(points) {
  if (points.length < 2) return "";

  let path = `M ${points[0].x} ${points[0].y}`;

  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1];
    const current = points[index];
    const midY = (previous.y + current.y) / 2;
    const curveOffset = 22;

    path += ` C ${previous.x + curveOffset} ${midY}, ${current.x - curveOffset} ${midY}, ${current.x} ${current.y}`;
  }

  return path;
}

function getPathProgressForPoints(pathElement, pathLength, points) {
  if (!pathElement || !pathLength || points.length === 0) return [];

  return points.map((point) => {
    let bestLength = 0;
    let bestDistance = Number.POSITIVE_INFINITY;
    const samples = Math.max(Math.floor(pathLength / 4), 120);

    for (let index = 0; index <= samples; index += 1) {
      const length = (pathLength / samples) * index;
      const sample = pathElement.getPointAtLength(length);
      const distance = (sample.x - point.x) ** 2 + (sample.y - point.y) ** 2;

      if (distance < bestDistance) {
        bestDistance = distance;
        bestLength = length;
      }
    }

    return bestLength / pathLength;
  });
}

export function Roadmap() {
  const { t } = useTranslate();
  const steps = t("roadmap.steps");

  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const pathRef = useRef(null);
  const stepRefs = useRef([]);

  const [svgHeight, setSvgHeight] = useState(0);
  const [pathD, setPathD] = useState("");
  const [pathLength, setPathLength] = useState(0);
  const [progress, setProgress] = useState(0);
  const [stepPathProgress, setStepPathProgress] = useState([]);

  const measurePath = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const trackRect = track.getBoundingClientRect();
    const height = track.offsetHeight;
    setSvgHeight(height);

    const points = stepRefs.current
      .map((element) => {
        if (!element) return null;
        const rect = element.getBoundingClientRect();
        return {
          x: PATH_X,
          y: rect.top - trackRect.top + rect.height / 2,
        };
      })
      .filter(Boolean);

    setPathD(buildCurvedPath(points));
  }, []);

  useEffect(() => {
    const runMeasure = () => requestAnimationFrame(measurePath);
    runMeasure();

    const track = trackRef.current;
    if (!track) return;

    const observer = new ResizeObserver(runMeasure);
    observer.observe(track);
    window.addEventListener("resize", runMeasure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", runMeasure);
    };
  }, [measurePath, steps]);

  useEffect(() => {
    const path = pathRef.current;
    if (!path || !pathD) return;

    const length = path.getTotalLength();
    setPathLength(length);

    const track = trackRef.current;
    if (!track) return;

    const trackRect = track.getBoundingClientRect();
    const points = stepRefs.current
      .map((element) => {
        if (!element) return null;
        const rect = element.getBoundingClientRect();
        return {
          x: PATH_X,
          y: rect.top - trackRect.top + rect.height / 2,
        };
      })
      .filter(Boolean);

    setStepPathProgress(getPathProgressForPoints(path, length, points));
  }, [pathD, svgHeight, steps]);

  useEffect(() => {
    const updateProgress = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight;
      const sectionTop = window.scrollY + rect.top;
      const sectionHeight = section.offsetHeight;
      const scrollRange = Math.max(sectionHeight - viewport * 0.35, 1);
      const raw = (window.scrollY - sectionTop + viewport * 0.25) / scrollRange;

      setProgress(Math.min(1, Math.max(0, raw)));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <section id="surec" ref={sectionRef} className="relative scroll-mt-24 overflow-hidden py-16 sm:py-24">
      <AmbientLights />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-12 text-center">
            <p className="text-sm font-medium tracking-wide text-primary">{t("roadmap.eyebrow")}</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {t("roadmap.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{t("roadmap.description")}</p>
          </div>
        </Reveal>

        <div ref={trackRef} className="relative">
          {svgHeight > 0 && pathD && (
            <svg
              className="pointer-events-none absolute left-0 top-0 hidden h-full w-24 sm:block"
              width="96"
              height={svgHeight}
              viewBox={`0 0 96 ${svgHeight}`}
              fill="none"
              aria-hidden
            >
              <path d={pathD} stroke="oklch(0.92 0.01 260)" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path
                ref={pathRef}
                d={pathD}
                stroke="oklch(0.36 0.09 260)"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                style={{
                  strokeDasharray: pathLength || 1,
                  strokeDashoffset: pathLength ? pathLength * (1 - progress) : 1,
                }}
              />
            </svg>
          )}

          <div className="space-y-8 sm:space-y-10">
            {steps.map((step, index) => {
              const threshold = stepPathProgress[index] ?? 1;
              const active = progress >= threshold;

              return (
                <article key={step.title} className="relative sm:pl-24">
                  <div
                    ref={(element) => {
                      stepRefs.current[index] = element;
                    }}
                    className={`absolute left-8 top-6 z-10 hidden size-12 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors duration-300 sm:flex ${
                      active
                        ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
                        : "border-border bg-card text-muted-foreground"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="rounded-2xl border border-border/80 bg-card/90 p-5 shadow-sm backdrop-blur-sm sm:p-6">
                    <p className="mb-1 text-xs font-semibold tracking-wider text-primary sm:hidden">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">{step.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
