import AnnotationPopover from "./annotation-popover";

interface AnnotatedTextProps {
  text: string;
  sections: { phrase: string; description: string }[];
}

export default function AnnotatedText({ text, sections }: AnnotatedTextProps) {
  // Defines the structure for each occurrence of the phrases in the text
  type Occurrence = {
    start: number;
    end: number;
    phrase: string;
    description: string;
  };

  // Finds all occurrences of each phrase in the text and sorts them by their start position
  const findAllOccurrences = (): Occurrence[] => {
    let occurrences: Occurrence[] = [];

    // Iterate over each section to find all occurrences of its phrase
    sections.forEach((section) => {
      let start = text.indexOf(section.phrase);
      // Continue finding occurrences until there are no more
      while (start > -1) {
        occurrences.push({
          start,
          end: start + section.phrase.length,
          phrase: section.phrase,
          description: section.description,
        });
        start = text.indexOf(section.phrase, start + 1);
      }
    });

    // Sort occurrences by their starting position in the text
    return occurrences.sort((a, b) => a.start - b.start);
  };

  // Merges overlapping occurrences to avoid nested spans
  const mergeOverlaps = (occurrences: Occurrence[]): Occurrence[] => {
    let merged: Occurrence[] = [];
    let last: Occurrence | undefined;

    occurrences.forEach((occ) => {
      // If current occurrence does not overlap with the last, add it to the merged list
      if (!last || occ.start > last.end) {
        merged.push((last = occ));
      }
      // If they overlap and current occurrence ends later, update the end of the last occurrence
      else if (occ.end > last.end) {
        last.end = occ.end;
      }
    });

    return merged;
  };

  // Splits and wraps the text into segments, with phrases wrapped in spans
  const getHighlightedText = (): JSX.Element[] => {
    let occurrences = findAllOccurrences();
    occurrences = mergeOverlaps(occurrences);

    let parts: JSX.Element[] = [];
    let lastIndex = 0;

    occurrences.forEach((occ, index) => {
      // Add text before the current phrase occurrence
      parts.push(
        <span key={"text-" + index}>
          {text.substring(lastIndex, occ.start)}
        </span>
      );

      // Add the highlighted phrase with a tooltip containing its description
      parts.push(
        
        <AnnotationPopover
          key={"highlight-" + index}
          description={occ.description}
          phrase={occ.phrase}
        />

      );

      // Update the index to the end of the current occurrence
      lastIndex = occ.end;
    });

    // Add the remaining text after the last occurrence
    parts.push(<span key={"text-end"}>{text.substring(lastIndex)}</span>);

    return parts;
  };

  return <div className="">{getHighlightedText()}</div>;
}
