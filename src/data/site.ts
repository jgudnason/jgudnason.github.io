/**
 * Site-wide profile data shared by the header, footer, home page and /contact.
 *
 * A profile with a `null` url renders as plain text rather than a link, so an
 * unverified or not-yet-created profile never ships as a broken link.
 */

export const site = {
  name: "Jón Guðnason",
  title: "Professor",
  department: "Department of Engineering",
  institution: "Reykjavik University",
  email: "jg@ru.is",
  address: "Menntavegur 1, 102 Reykjavik, Iceland",
  description:
    "Academic homepage of Jón Guðnason, Professor of Engineering at Reykjavik University — speech signal processing, speech recognition and synthesis, and Icelandic language technology.",
} as const;

export type ProfileLink = {
  label: string;
  url: string | null;
  description: string;
};

export const profiles: ProfileLink[] = [
  {
    label: "IRIS",
    url: "https://iris.rais.is/en/persons/j%C3%B3n-gu%C3%B0nason",
    description: "Icelandic Research Information System profile",
  },
  {
    label: "Google Scholar",
    url: "https://scholar.google.com/citations?user=WC-4UtwAAAAJ&hl=en",
    description: "Citations and publication metrics",
  },
  {
    label: "ORCID",
    url: "https://orcid.org/0000-0001-6560-5543",
    description: "Persistent researcher identifier",
  },
  {
    label: "GitHub",
    url: "https://github.com/jgudnason",
    description: "Code, tools and research software",
  },
];

/** Profiles that have a verified URL — the only ones rendered as links. */
export const linkedProfiles = profiles.filter(
  (profile): profile is ProfileLink & { url: string } => profile.url !== null,
);

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/research", label: "Research" },
  { href: "/teaching", label: "Teaching" },
  { href: "/activities", label: "Activities" },
  { href: "/publications", label: "Publications" },
  { href: "/contact", label: "Contact" },
] as const;
