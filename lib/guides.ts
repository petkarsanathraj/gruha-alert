// Evergreen guides — genuinely useful content (also strengthens SEO + AdSense).
// Facts are kept general and always point readers to the official notification.

export interface Guide {
  slug: string;
  title: string;
  description: string;
  intro: string;
  sections: { h: string; body: string[] }[];
}

export const GUIDES: Guide[] = [
  {
    slug: "how-khb-plot-allotment-works",
    title: "How KHB plot allotment works (step by step)",
    description:
      "A simple, plain-English guide to how the Karnataka Housing Board allots residential sites and houses — application, lottery, payment and possession.",
    intro:
      "The Karnataka Housing Board (KHB) develops layouts across Karnataka and allots residential sites and houses to the public. Here's how the whole process actually works, from notification to possession.",
    sections: [
      { h: "1. KHB issues a notification", body: [
        "When a layout has sites or houses available, KHB publishes a public notification (in newspapers and on khb.karnataka.gov.in). It lists the project, the number of sites, the dimensions, the price, and the dates to apply.",
        "GruhaAlert collects these notifications and shows the open ones in plain English with the last date.",
      ]},
      { h: "2. You apply online and pay a deposit", body: [
        "Eligible applicants apply online during the application window. You choose an income category (EWS, LIG, MIG or HIG) and pay a non-refundable registration fee plus an initial deposit by e-payment.",
        "The initial deposit is refunded if you are not allotted a site.",
      ]},
      { h: "3. Allotment — by lottery or auction", body: [
        "If applications are more than the available sites, allotment is decided by a transparent computerised lottery, with reservation quotas applied (SC/ST, women, ex-servicemen, differently-abled and other categories).",
        "Some developed sites and houses are instead sold by e-auction, where they go to the highest bidder above a fixed upset (reserve) price.",
      ]},
      { h: "4. Allotment letter and payment", body: [
        "If you're selected, KHB issues an allotment letter stating the final price and payment schedule. The cost is usually paid in instalments over a set period.",
        "Missing the payment deadlines can lead to cancellation, so read the allotment letter carefully.",
      ]},
      { h: "5. Registration and possession", body: [
        "After full payment, the site is registered in your name and possession is handed over. You can then build as per the layout's rules.",
      ]},
      { h: "Always verify on the official notice", body: [
        "Rules, fees and timelines change between projects. Always confirm the exact details on the official KHB notification (PDF) before applying. GruhaAlert is an independent information service and is not affiliated with KHB.",
      ]},
    ],
  },
  {
    slug: "khb-income-categories-ews-lig-mig-hig",
    title: "KHB income categories explained: EWS, LIG, MIG, HIG",
    description:
      "What EWS, LIG, MIG and HIG mean for Karnataka Housing Board applications, and how to choose the right category.",
    intro:
      "KHB allots sites and houses across four income categories. The category decides which sites you can apply for, the registration fee and the deposit. Here's what each one means.",
    sections: [
      { h: "The four categories", body: [
        "EWS — Economically Weaker Section: the lowest income band, usually the smallest sites and lowest fees.",
        "LIG — Low Income Group: a step above EWS.",
        "MIG — Middle Income Group: mid-sized sites for middle-income families.",
        "HIG — High Income Group: the largest sites, highest income band.",
      ]},
      { h: "How to pick your category", body: [
        "You apply under the category that matches your household income, supported by an income certificate. The exact income limits for each band are set in the current notification and revised from time to time — check the notification PDF for the figures that apply to your application.",
        "Each category also has its own site dimensions, registration fee and deposit, listed in the notification.",
      ]},
      { h: "Reservations within categories", body: [
        "Within these categories, KHB reserves a share of sites for SC/ST and other backward categories, women, ex-servicemen, differently-abled persons and government employees. If you belong to a reserved group, keep the relevant certificate ready.",
      ]},
      { h: "Verify the current limits", body: [
        "Income limits and fees differ by project and year. Always confirm the current EWS/LIG/MIG/HIG limits on the official KHB notification before applying.",
      ]},
    ],
  },
  {
    slug: "documents-needed-for-khb-application",
    title: "Documents needed to apply for a KHB site",
    description:
      "A practical checklist of the documents usually required to apply for a Karnataka Housing Board residential site or house.",
    intro:
      "Keeping your documents ready makes the online application quick. Exact requirements are listed in each notification, but these are the ones usually needed.",
    sections: [
      { h: "Identity and address", body: [
        "Aadhaar card (identity and address proof).",
        "PAN card.",
        "A recent passport-size photograph.",
      ]},
      { h: "Karnataka residence / domicile", body: [
        "Proof that you are a resident of Karnataka (domicile or residence proof), since allotments are for Karnataka residents.",
      ]},
      { h: "Income proof", body: [
        "An income certificate matching the category you apply under (EWS / LIG / MIG / HIG).",
      ]},
      { h: "Category certificate (if applicable)", body: [
        "If you're applying under a reserved category — SC/ST, OBC, ex-servicemen, differently-abled — the relevant valid certificate.",
      ]},
      { h: "Declaration", body: [
        "Many notifications require a declaration/affidavit that you (and your family) do not already own a site or house allotted by a government housing body.",
      ]},
      { h: "Confirm in the notification", body: [
        "The official notification lists the exact documents and formats for that project. Always check it before you apply.",
      ]},
    ],
  },
  {
    slug: "khb-vs-muda-vs-bda",
    title: "KHB vs MUDA vs BDA: which one is for you?",
    description:
      "The difference between the Karnataka Housing Board, Mysuru Urban Development Authority and Bangalore Development Authority for buying a site.",
    intro:
      "Three government bodies allot residential sites in Karnataka. Which one you apply to depends mostly on where you want a plot.",
    sections: [
      { h: "KHB — Karnataka Housing Board", body: [
        "A statewide board that develops layouts and allots sites and houses across many districts of Karnataka. Best if you're open to locations across the state. This is what GruhaAlert tracks.",
      ]},
      { h: "MUDA — Mysuru Urban Development Authority", body: [
        "Develops and allots sites in and around Mysuru city. If you specifically want a plot in the Mysuru urban area, watch MUDA notifications.",
      ]},
      { h: "BDA — Bangalore Development Authority", body: [
        "Develops layouts and allots sites in the Bengaluru region. For Bengaluru city plots, BDA is the main authority alongside KHB.",
      ]},
      { h: "What they have in common", body: [
        "All three allot sites through application + computerised lottery or e-auction, use income categories, apply reservations, and publish official notifications. The process is similar — the jurisdiction and the exact rules differ.",
      ]},
      { h: "How to decide", body: [
        "Pick by location first: statewide flexibility → KHB; Mysuru city → MUDA; Bengaluru → BDA. You can apply to more than one. Always follow each authority's official site for current notifications.",
      ]},
    ],
  },
];

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug) ?? null;
