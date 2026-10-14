import React from "react";

interface FormattedMarkdownProps {
  content: string;
}

export function FormattedMarkdown({ content }: FormattedMarkdownProps) {
  if (!content) return null;

  // Split into paragraphs / lines
  const lines = content.split("\n");

  return (
    <div className="space-y-1.5 leading-relaxed text-xs sm:text-sm">
      {lines.map((line, lineIdx) => {
        const trimmed = line.trim();

        // Handle Bullet Points
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          const bulletText = trimmed.substring(2);
          return (
            <div key={lineIdx} className="flex items-start gap-2 pl-2 my-0.5">
              <span className="text-blue-500 font-bold select-none">•</span>
              <span>{parseBoldText(bulletText)}</span>
            </div>
          );
        }

        // Handle Empty Lines / Spacing
        if (!trimmed) {
          return <div key={lineIdx} className="h-1" />;
        }

        // Regular Text Paragraph
        return <p key={lineIdx}>{parseBoldText(line)}</p>;
      })}
    </div>
  );
}

/**
 * Helper to parse **bold text** syntax into <strong> elements
 */
function parseBoldText(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-bold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}
