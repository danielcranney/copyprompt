"use client";
import { useState } from "react";
import { prompts } from "../../lib/prompts";
import { Sparkles } from "lucide-react";
import Link from "next/link";

const BlueskyIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width={22}
    height={22}
    {...props}
  >
    <path
      d="M7.57,4.63c3.41,2.57,7.08,7.78,8.43,10.57,1.35-2.8,5.02-8,8.43-10.57,2.46-1.85,6.45-3.29,6.45,1.28,0,.91-.52,7.66-.83,8.75-1.06,3.81-4.93,4.78-8.38,4.19,6.02,1.03,7.55,4.43,4.24,7.83-6.28,6.46-9.02-1.62-9.73-3.69-.2-.6-.17-.61-.38,0-.7,2.07-3.45,10.16-9.73,3.69-3.31-3.4-1.78-6.81,4.24-7.83-3.44.59-7.31-.38-8.38-4.19-.31-1.1-.83-7.84-.83-8.75,0-4.56,3.99-3.13,6.45-1.28Z"
      style={{
        fill: "none",
        stroke: "#fff",
        strokeMiterlimit: 10,
        strokeWidth: "2px",
      }}
    />
  </svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width={22}
    height={22}
    {...props}
  >
    <path
      d="M24.79,2.19h4.69l-10.24,11.7,12.04,15.92h-9.43l-7.38-9.66-8.45,9.66H1.32l10.95-12.51L.72,2.19h9.67l6.68,8.83,7.72-8.83ZM23.14,27.01h2.6L8.98,4.85h-2.79l16.95,22.16Z"
      style={{
        fill: "#fff",
      }}
    />
  </svg>
);

const GitIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width={22}
    height={22}
    {...props}
  >
    <path
      d="M21.19,28.99v-5.19c.18-1.63-.29-3.26-1.3-4.54,3.9,0,7.79-2.6,7.79-7.14.1-1.62-.35-3.22-1.3-4.54.36-1.49.36-3.05,0-4.54,0,0-1.3,0-3.9,1.95-3.43-.65-6.96-.65-10.39,0-2.6-1.95-3.9-1.95-3.9-1.95-.39,1.49-.39,3.05,0,4.54-.95,1.32-1.4,2.93-1.3,4.54,0,4.54,3.9,7.14,7.79,7.14-.51.64-.88,1.36-1.1,2.14-.22.78-.29,1.6-.19,2.4v5.19"
      style={{
        fill: "none",
        stroke: "#fff",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2px",
      }}
    />
    <path
      d="M13.4,23.79c-5.86,2.6-6.49-2.6-9.09-2.6"
      style={{
        fill: "none",
        stroke: "#fff",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2px",
      }}
    />
  </svg>
);

const categories = [
  "All",
  ...Array.from(new Set(prompts.map((prompt) => prompt.category))),
];

export default function Home() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [modalCard, setModalCard] = useState<null | (typeof prompts)[0]>(null);
  const [modalCopied, setModalCopied] = useState(false);
  const [customInputs, setCustomInputs] = useState<Record<string, string>>({});

  const getCustomisedPrompt = (text: string) => {
    let customisedText = text;
    Object.entries(customInputs).forEach(([key, value]) => {
      customisedText = customisedText.replace(
        new RegExp(`\\[${key}\\]`, "g"),
        value || `[${key}]`
      );
    });
    return customisedText;
  };

  const copyToClipboard = async (
    text: string,
    index?: number,
    isModal?: boolean
  ) => {
    const customisedText = getCustomisedPrompt(text);
    await navigator.clipboard.writeText(customisedText);
    if (isModal) {
      setModalCopied(true);
      setTimeout(() => setModalCopied(false), 1000);
    } else if (typeof index === "number") {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  const filteredCards =
    selectedCategory === "All"
      ? prompts
      : prompts.filter((prompt) => prompt.category === selectedCategory);

  return (
    <div className="bg-neutral-900 min-h-screen text-white">
      {/* Header */}
      <header className="flex justify-between items-center mx-auto px-6 py-4 w-full max-w-7xl h-24">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-white text-2xl tracking-tight"
        >
          <Sparkles className="bg-clip-text w-8 h-8 text-purple-400" />
          copyprompt
        </Link>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/danielcranney/copyprompt"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <GitIcon />
          </a>
          <a
            href="https://x.com/danielcranney"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <XIcon />
          </a>
          <a
            href="https://bsky.app/profile/danielcranney.bsky.social"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <BlueskyIcon />
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto pt-20 pb-16 max-w-4xl text-center">
        <h1 className="mb-4 font-bold text-white text-4xl md:text-5xl">
          Roleplay with AI for Better Results
        </h1>
        <div className="bg-purple-400 mx-auto mb-6 rounded-full w-20 h-1" />
        <p className="mb-3 text-neutral-300 text-lg">
          Get better results from AI with roleplay prompts.
        </p>

        <p className="mb-3 text-neutral-300 text-lg">
          Find a role that suits your needs, make some tweaks and copy the
          prompt.
        </p>

        <div className="flex justify-center">
          <svg
            className="w-8 h-8 text-white/70 animate-bounce"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </section>

      {/* Cards Grid */}
      <main className="mx-auto px-4 pb-16 max-w-5xl">
        {/* Filter Bar */}
        <div className="relative mb-8 pb-2">
          <div className="flex items-center gap-2 pr-8 pl-2 h-20 overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center px-5 py-2 rounded-full font-semibold text-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/40 h-10 cursor-pointer
                  ${
                    selectedCategory === cat
                      ? "bg-white text-neutral-900 shadow font-bold border border-neutral-200"
                      : "bg-neutral-800 text-white hover:bg-neutral-700 border border-transparent"
                  }
                `}
                style={{ minWidth: 44, flexShrink: 0 }}
              >
                {cat === "All" && (
                  <svg
                    className="mr-2 w-4 h-4 text-neutral-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <rect x="3" y="3" width="7" height="7" rx="2" />
                    <rect x="14" y="3" width="7" height="7" rx="2" />
                    <rect x="14" y="14" width="7" height="7" rx="2" />
                    <rect x="3" y="14" width="7" height="7" rx="2" />
                  </svg>
                )}
                {cat}
              </button>
            ))}
          </div>
          {/* Fade-out overlay */}
          <div className="top-0 right-0 absolute bg-gradient-to-l from-neutral-900 to-transparent w-16 h-full pointer-events-none" />
          {/* <div className="top-0 left-0 absolute bg-gradient-to-r from-neutral-900 to-transparent w-16 h-full pointer-events-none" /> */}
        </div>
        <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {filteredCards.map((prompt, index) => (
            <div
              key={index}
              className={`group p-6 rounded-2xl cursor-pointer shadow-lg transition-all duration-200 flex flex-col items-start relative ${prompt.bg} ${prompt.hover}`}
              onClick={() => setModalCard(prompt)}
            >
              <div className="flex justify-between items-start mb-4 w-full">
                <prompt.icon className="opacity-90 w-9 h-9 text-black" />
              </div>
              <h2 className="opacity-95 mb-2 font-semibold text-black text-xl">
                {prompt.title}
              </h2>
              <p className="mb-4 text-black/80 line-clamp-3">
                {prompt.shortText}
              </p>
              <div className="flex items-center min-h-[1.5em] text-black/70 group-hover:text-black text-sm transition-colors duration-200">
                {copiedIndex === index && (
                  <>
                    <svg
                      className="mr-1 w-5 h-5 text-black/70"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Copied!
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* Modal */}
        {modalCard && (
          <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/80">
            <div className="relative bg-neutral-900 shadow-xl p-8 rounded-2xl w-full max-w-3xl text-white">
              <button
                onClick={() => {
                  setModalCard(null);
                  setCustomInputs({});
                }}
                className="top-4 right-4 absolute flex justify-center items-center hover:bg-neutral-800 border border-neutral-800 rounded-md w-9 h-9 transition cursor-pointer"
                title="Close"
              >
                <span className="sr-only">Close</span>
                <span className="font-bold text-2xl">×</span>
              </button>
              <div className="flex items-center gap-3 mb-4">
                <modalCard.icon className="w-7 h-7 text-white/80" />
                <span className="bg-neutral-800 px-2 py-1 rounded font-semibold text-white/80 text-sm">
                  {modalCard.category}
                </span>
              </div>
              <h2 className="mb-2 font-bold text-white text-2xl">
                {modalCard.title}
              </h2>

              {/* Customisation Fields */}
              <div className="space-y-4 mb-6">
                {modalCard.fullText
                  .match(/\[([^\]]+)\]/g)
                  ?.map((placeholder, idx, arr) => {
                    // Only render unique placeholders
                    const key = placeholder.slice(1, -1);
                    if (arr.indexOf(placeholder) !== idx) return null;
                    // Make a user-friendly label
                    const label = key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase());
                    return (
                      <div key={key}>
                        <label className="block mb-1 font-medium text-white/70 text-sm">
                          {label}
                        </label>
                        <input
                          type="text"
                          value={customInputs[key] || ""}
                          onChange={(e) =>
                            setCustomInputs({
                              ...customInputs,
                              [key]: e.target.value,
                            })
                          }
                          placeholder={`Enter ${label.toLowerCase()}`}
                          className="bg-neutral-800 px-4 py-2 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 w-full text-white text-sm"
                        />
                      </div>
                    );
                  })}
              </div>

              <span className="font-bold text-white/50 text-sm uppercase">
                Full prompt:
              </span>
              <div className="relative mt-3 mb-6">
                <div className="pr-4 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent">
                  <p className="text-white text-sm whitespace-pre-line">
                    {modalCard.fullText
                      .split(/(\[[^\]]+\])/)
                      .map((part, index) => {
                        if (part.startsWith("[") && part.endsWith("]")) {
                          const key = part.slice(1, -1);
                          const value = customInputs[key] || part;
                          return (
                            <span
                              key={index}
                              className="bg-neutral-800 px-1 py-0.5 rounded font-mono text-purple-400"
                            >
                              {value}
                            </span>
                          );
                        }
                        return part;
                      })}
                  </p>
                </div>
                <div className="right-0 bottom-0 left-0 absolute bg-gradient-to-t from-neutral-900 to-transparent h-8 pointer-events-none" />
              </div>
              <button
                onClick={() =>
                  copyToClipboard(modalCard.fullText, undefined, true)
                }
                className={`px-4 py-2 rounded-full font-semibold transition border-2 flex items-center gap-2 cursor-pointer ${
                  modalCopied
                    ? "bg-neutral-800 text-white/80 border-neutral-700 cursor-default"
                    : "bg-white text-neutral-900 hover:bg-neutral-200 border-transparent"
                }`}
                disabled={modalCopied}
              >
                {modalCopied ? (
                  <>
                    <svg
                      className="w-5 h-5 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Copied!
                  </>
                ) : (
                  "Copy Prompt"
                )}
              </button>
            </div>
          </div>
        )}
      </main>
      <footer className="py-8 text-neutral-400 text-sm text-center">
        <p className="mb-8 text-neutral-300 text-xs">
          Disclaimer: Prompts should be used as a guide, not a replacement for
          your own research, judgment or consulting a real-world expert or
          professional.
        </p>
        <p>
          Created by{" "}
          <a
            href="https://danielcranney.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            Daniel Cranney
          </a>
        </p>
        <p className="mt-2">© {new Date().getFullYear()} All rights reserved</p>
      </footer>
    </div>
  );
}
