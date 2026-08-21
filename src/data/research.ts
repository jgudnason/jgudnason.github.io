/**
 * Research themes, lab affiliations and collaborations.
 *
 * Reviewed annually (see docs/EDITORIAL.md). Themes marked `featured` appear on
 * the home page.
 */

export type Theme = {
  title: string;
  description: string;
  topics: string[];
  featured?: boolean;
};

export const themes: Theme[] = [
  {
    title: "Speech Signal Processing",
    description:
      "Analysis of the speech signal and of the voice source itself: estimating how the glottis opens and closes, separating source from filter, and characterising voice quality.",
    topics: [
      "Glottal closure and opening instants",
      "Glottal inverse filtering",
      "Voice quality",
    ],
    featured: true,
  },
  {
    title: "Speech, Health and Cognitive State",
    description:
      "Using acoustic and voice-source features to study how cognitive load and mental health conditions are reflected in speech.",
    topics: [
      "Cognitive workload in speech",
      "Depression and anxiety in speech",
    ],
    featured: true,
  },
  {
    title: "Speech Recognition and Synthesis",
    description:
      "Recognition and synthesis methods that work for languages with limited data and resources, with Icelandic as the primary case.",
    topics: [
      "Speech recognition with limited resources",
      "Speech vocoding",
      "Text-to-speech synthesis for Icelandic",
      "Speech recognition for Icelandic",
    ],
    featured: true,
  },
];

export type Affiliation = {
  title: string;
  description: string;
  url?: string;
};

/** TODO (owner): confirm the two lab URLs below resolve before launch. */
export const affiliations: Affiliation[] = [
  {
    title: "Language and Voice Lab",
    description:
      "Research group at Reykjavik University working on speech and language technology for Icelandic.",
    url: "https://lvl.ru.is/",
  },
  {
    title: "Center for Analysis and Design of Intelligent Agents (CADIA)",
    description:
      "Reykjavik University research centre for artificial intelligence and intelligent agents.",
    url: "https://cadia.ru.is/",
  },
  {
    title: "Icelandic Language Resources",
    description:
      "Open datasets, models and tools supporting Icelandic language technology.",
  },
];
