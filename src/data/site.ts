/**
 * Site-wide profile data shared by the header, footer, home page and /contact.
 *
 * TODO (owner): fill in the `url` for Google Scholar and ORCID with your real
 * profile IDs. Links with a `null` url are simply not rendered, so the site
 * never ships a broken or guessed profile link.
 */

export const site = {
  name: "Jón Guðnason",
  title: "Professor",
  department: "Department of Engineering",
  institution: "Reykjavik University",
  email: "jg@ru.is",
  phone: "+354 599 6435",
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
    url: "https://iris.landsbokasafn.is/",
    description: "Icelandic Research Information System profile",
  },
  {
    label: "Google Scholar",
    url: null,
    description: "Citations and publication metrics",
  },
  {
    label: "ORCID",
    url: null,
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
