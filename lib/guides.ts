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
  {
    slug: "khb-notifications-latest",
    title: "KHB notifications 2026: how to find and read the latest notices",
    description:
      "Where to find the latest Karnataka Housing Board (KHB) notifications, what each notice means, and how to check the last date to apply — in plain English.",
    intro:
      "KHB announces new plots, sites, houses and e-auctions through official notifications. Here's where to find the latest KHB notifications, how to read them, and how to make sure you never miss a last date.",
    sections: [
      { h: "Where KHB publishes notifications", body: [
        "The Karnataka Housing Board publishes official notifications on its website, khb.karnataka.gov.in, and in newspapers. Each notification is a PDF that lists the project, the number and dimensions of sites, the prices, the income categories and the dates to apply.",
        "GruhaAlert reads every new KHB notification the day it appears and shows the open ones in plain English — with the district, the type of notice and the last date to apply — so you don't have to scan PDFs yourself.",
      ]},
      { h: "The main types of KHB notice", body: [
        "New layout / Apply online — a residential layout is open for online applications; allotment is by computerised lottery.",
        "Demand survey — KHB is measuring public demand before developing a layout; register your interest so the sites get built.",
        "e-Auction — developed sites or houses are sold to the highest bidder above a reserve (upset) price.",
        "Extended — the deadline for an existing layout has been pushed out, so you can still apply before the new last date.",
      ]},
      { h: "How to read a KHB notification", body: [
        "Check four things first: the location (district and layout), the last date to apply, the income category and site sizes on offer, and the fees (registration fee + initial deposit). Everything else in the PDF supports these.",
        "If any field is unclear on a summary, always open the official PDF — it is the final word on dates, prices and eligibility.",
      ]},
      { h: "Never miss a last date", body: [
        "Deadlines are the thing applicants miss most. On GruhaAlert every open notice shows a 'days left' countdown, and you can browse by your district to see only relevant notices. Bookmark the site and check weekly — new notifications are added daily.",
      ]},
      { h: "Always verify on the official notice", body: [
        "GruhaAlert is an independent information service and is not affiliated with KHB. Dates, prices and rules differ between projects — always confirm on the official KHB notification (PDF) and at khb.karnataka.gov.in before applying.",
      ]},
    ],
  },
  {
    slug: "how-to-check-khb-allotment-result-and-status",
    title: "How to check your KHB allotment result and application status",
    description:
      "A plain-English guide to checking your Karnataka Housing Board (KHB) application status and allotment (lottery) result after you apply.",
    intro:
      "After you apply for a KHB site, the next question is: did I get it? Here's how the KHB allotment result works, and how to check your application status and lottery outcome.",
    sections: [
      { h: "What happens after you apply", body: [
        "Once the application window closes, KHB verifies the applications and, if applications exceed available sites, holds a computerised lottery to decide allotment. For e-auctions, the outcome is decided by the highest valid bid instead of a lottery.",
        "KHB announces the lottery date and the result through a public notification and on its portal — GruhaAlert lists these result/lottery notices too.",
      ]},
      { h: "How to check your application status", body: [
        "Log in to the same KHB application portal you used to apply, using your application number and registered mobile/credentials. Your dashboard shows whether your application is received, verified, and its allotment status.",
        "Keep your application number and payment receipt safe — you'll need them to check status and, if allotted, to complete the next steps.",
      ]},
      { h: "How to check the lottery / allotment result", body: [
        "When the lottery is held, KHB publishes the result — usually a list of selected applicants and a waiting list — as an official notification. Check your name/application number against the published list, and look for a status update or allotment letter in your portal account.",
        "If you're not selected, your initial deposit is refunded as per the notification's terms.",
      ]},
      { h: "If you're allotted a site", body: [
        "KHB issues an allotment letter with the final price and payment schedule. Pay the instalments on time — missing deadlines can lead to cancellation. After full payment the site is registered in your name and possession is handed over.",
      ]},
      { h: "Verify on the official notice", body: [
        "Exact result dates, portals and steps vary by project. Always confirm on the official KHB notification and at khb.karnataka.gov.in. GruhaAlert is independent and not affiliated with KHB.",
      ]},
    ],
  },
  {
    slug: "khb-official-website-and-online-portals",
    title: "KHB official website and online portals (apply, pay, check status)",
    description:
      "The official Karnataka Housing Board (KHB) website and online portals for notifications, applying, paying fees and checking status — and how GruhaAlert helps.",
    intro:
      "Looking for the official Karnataka Housing Board website or the KHB application portal? Here are the official KHB online destinations, what each is for, and how GruhaAlert fits in.",
    sections: [
      { h: "The official KHB website", body: [
        "The Karnataka Housing Board's official website is khb.karnataka.gov.in (Karnataka Gruha Mandali / ಕರ್ನಾಟಕ ಗೃಹ ಮಂಡಳಿ). It is the authoritative source for notifications, tenders, contact details and policy.",
        "Always treat the official website and its notification PDFs as the final word on dates, prices and eligibility.",
      ]},
      { h: "Applying online for a site", body: [
        "KHB accepts applications for open layouts through its online application portal, linked from khb.karnataka.gov.in under 'Online application for allotment'. You register, choose your income category, upload documents and pay the fee online.",
        "Each notification tells you exactly which portal and form to use for that specific project.",
      ]},
      { h: "Paying fees and returning applicants", body: [
        "Registration fees and deposits are paid through KHB's online e-payment system. Returning applicants log in with their existing credentials to continue or check an earlier application.",
        "Keep every payment receipt and your application number — you'll need them to check status or claim a refund.",
      ]},
      { h: "How GruhaAlert helps", body: [
        "GruhaAlert is an independent, plain-English companion to the official site — not a replacement for it. We collect every open KHB notification in one place, translate the key details (district, type, last date) into simple language, and link straight to the official PDF and portals so you can act quickly.",
        "Use GruhaAlert to discover and understand what's open; use the official KHB website and portals to actually apply, pay and check your result.",
      ]},
      { h: "A note on trust", body: [
        "GruhaAlert is not affiliated with the Karnataka Housing Board or any government body, and we never take applications or payments. Always apply and pay only on the official KHB portals, and verify every detail on the official notification first.",
      ]},
    ],
  },
  {
    slug: "how-khb-e-auction-works",
    title: "KHB e-auction: how to register, bid and win a site",
    description:
      "A plain-English guide to Karnataka Housing Board (KHB) e-auctions — how the online auction works, the upset price, earnest money deposit, and how to bid and win.",
    intro:
      "Some KHB sites and houses aren't allotted by lottery — they're sold by online e-auction to the highest bidder. Here's how a KHB e-auction actually works, and how to take part.",
    sections: [
      { h: "What a KHB e-auction is", body: [
        "In an e-auction, KHB sells a developed site or house online to the highest bidder above a fixed 'upset price' (the reserve or minimum price). Unlike the lottery route, there's no income-category application — anyone eligible can bid, and money decides the outcome.",
        "e-Auctions are announced through official notifications, which list the properties, the upset prices, and the auction schedule.",
      ]},
      { h: "Step 1 — Register and pay the EMD", body: [
        "To bid, you register on the KHB e-auction portal and pay an Earnest Money Deposit (EMD) for each property you want to bid on. The EMD is refunded to unsuccessful bidders as per the notification.",
        "Registration usually needs your KYC details (ID, PAN) and a bank account for the EMD and refund.",
      ]},
      { h: "Step 2 — Bid during the auction window", body: [
        "During the live auction window you place bids above the upset price. Bids rise in fixed increments, and many auctions auto-extend by a few minutes if a bid comes in near the close, so watch the clock.",
        "The highest valid bid when the auction closes wins the property.",
      ]},
      { h: "Step 3 — Pay and complete the purchase", body: [
        "If you win, you pay the balance amount within the timeline set in the notification (the EMD is adjusted against the price). KHB then issues the sale/allotment documents and hands over the property after registration.",
        "Miss the payment deadline and you can forfeit the EMD and the property, so bid only up to what you can actually pay.",
      ]},
      { h: "Auction vs lottery — which should you choose?", body: [
        "Lottery (apply online) gives a chance at a lower, fixed price but no certainty. An e-auction gives certainty if you're the top bidder, but you may pay a market-driven premium. Pick based on your budget and how badly you want a specific site.",
      ]},
      { h: "Verify on the official notice", body: [
        "Upset prices, EMD amounts, increments and timelines are set per auction. Always confirm on the official KHB e-auction notification and portal. GruhaAlert is independent and not affiliated with KHB.",
      ]},
    ],
  },
  {
    slug: "khb-site-cost-fees-and-payment",
    title: "KHB site cost: registration fee, deposit and payment schedule",
    description:
      "What it actually costs to get a Karnataka Housing Board (KHB) site — the registration fee, initial deposit, site price and how payment is scheduled.",
    intro:
      "How much does a KHB site cost, and when do you pay? The total isn't a single number — it's a registration fee, an initial deposit, and the site price paid over time. Here's how KHB pricing works.",
    sections: [
      { h: "1. Registration fee (non-refundable)", body: [
        "When you apply, you pay a registration/application fee. It's usually small and non-refundable, and it differs by income category (EWS/LIG/MIG/HIG). The exact amount is in the notification.",
      ]},
      { h: "2. Initial deposit (refundable if not allotted)", body: [
        "You also pay an initial deposit with the application. This is a larger sum that shows you're a serious applicant. If you're not allotted a site in the lottery, this deposit is refunded to you as per the notification's terms.",
      ]},
      { h: "3. The site price", body: [
        "The main cost is the site price, based on the site's dimensions and the per-square-foot or per-square-metre rate for that layout and category. Different categories and layouts have very different rates — a small EWS site and a large HIG site are not comparable.",
        "GruhaAlert links each notice to a local price search so you can sanity-check the area's going rates, but the KHB price for the site itself is set in the notification.",
      ]},
      { h: "4. How payment is scheduled", body: [
        "If allotted, KHB issues an allotment letter with the final price and a payment schedule. The site cost is typically paid in instalments over a set period after allotment, not all at once. Registration, stamp duty and other charges apply at the registration stage.",
        "Paying instalments on time matters — missing deadlines can attract interest or even cancellation.",
      ]},
      { h: "Budgeting tip", body: [
        "Plan for three buckets: the upfront fee + deposit to apply, the site-price instalments if allotted, and registration/stamp-duty costs at handover. Read the notification's fee table before you apply so there are no surprises.",
      ]},
      { h: "Verify the current figures", body: [
        "Fees, deposits and rates are revised between projects and years. Always confirm the exact amounts on the official KHB notification before applying. GruhaAlert is independent and not affiliated with KHB.",
      ]},
    ],
  },
  {
    slug: "khb-reservation-quota-categories",
    title: "KHB reservations and quotas: SC/ST, women, ex-servicemen and more",
    description:
      "How Karnataka Housing Board (KHB) reserves sites for SC/ST, women, ex-servicemen, differently-abled and other categories — and how to claim a reserved quota.",
    intro:
      "Alongside income categories, KHB reserves a share of sites for specific groups. If you belong to one, a reservation can improve your chances in the lottery. Here's how KHB reservations work.",
    sections: [
      { h: "Reservations sit on top of income categories", body: [
        "First you apply under an income category — EWS, LIG, MIG or HIG. Within the sites available, KHB then sets aside a percentage for reserved groups. So you can be, say, an LIG applicant claiming an SC reservation.",
      ]},
      { h: "Common reserved categories", body: [
        "KHB notifications commonly reserve sites for: Scheduled Castes (SC) and Scheduled Tribes (ST); Other Backward Classes; women; ex-servicemen and defence personnel; differently-abled persons; and government/state employees. Some projects also reserve for specific local or occupational groups.",
        "The exact list and the percentage for each are set in each notification.",
      ]},
      { h: "How to claim a reservation", body: [
        "Select the correct reserved category in your online application, and keep the relevant valid certificate ready — a caste certificate, ex-servicemen ID, disability certificate, or the proof named in the notification. Claims without valid proof are usually rejected.",
        "Make sure certificates are current and in the format KHB asks for.",
      ]},
      { h: "How reservations affect the lottery", body: [
        "Reserved sites are allotted within their quota through the same computerised lottery. Belonging to a reserved group doesn't guarantee a site, but it means you compete within a smaller reserved pool, which can improve your odds.",
      ]},
      { h: "Verify on the official notice", body: [
        "Reserved categories, percentages and required certificates vary by project. Always confirm on the official KHB notification before applying. GruhaAlert is independent and not affiliated with KHB.",
      ]},
    ],
  },
  {
    slug: "is-khb-site-a-good-investment",
    title: "Is a KHB site a good investment? What to weigh before you apply",
    description:
      "The pros, cons and risks of buying a Karnataka Housing Board (KHB) site — pricing, title, location and resale — to help you decide before applying.",
    intro:
      "A KHB site can be one of the most affordable ways to own land in Karnataka, but it isn't risk-free. Here's a balanced look at what makes KHB sites attractive and what to check before you apply.",
    sections: [
      { h: "Why KHB sites appeal", body: [
        "Price: KHB allots at government-set rates that are often below open-market prices, especially for EWS/LIG categories. Title: sites come from a government board with a clear allotment trail, which buyers value. Planning: KHB layouts are developed with roads, drainage and civic spaces to approved plans.",
      ]},
      { h: "The trade-offs to weigh", body: [
        "Location: affordable layouts are often on a city's outskirts, so appreciation depends on how the area develops. Timeline: from application to possession can take time, and demand-survey layouts may take longer to actually build. Lock-in: allotments usually come with conditions (e.g. build within a period, restrictions on quick resale) — read them.",
      ]},
      { h: "What to check before applying", body: [
        "Confirm the layout's location and connectivity, the total cost including instalments and registration, the possession timeline, and any resale/holding conditions in the allotment terms. Compare the KHB price against local guidance value and market rates for a reality check.",
      ]},
      { h: "Sites vs other options", body: [
        "A KHB site is land you build on later, on your timeline — versus a ready apartment (immediate use, but shared ownership and maintenance) or a private plot (faster, but usually pricier and needs careful title checks). Choose by your budget, timeline and whether you want to build.",
      ]},
      { h: "Invest with eyes open", body: [
        "Treat a KHB site as a medium-to-long-term hold whose value tracks the area's growth. Apply only within your budget, and never rely on assumed appreciation. This is general information, not financial advice — verify everything on the official KHB notification.",
      ]},
    ],
  },
  {
    slug: "khb-home-loan-for-site",
    title: "KHB home loan: how to finance a KHB site or house",
    description:
      "How to fund a Karnataka Housing Board (KHB) site or house with a home/plot loan — what banks look for, and how the allotment letter fits in.",
    intro:
      "Not everyone can pay for a KHB site upfront. Many allottees use a bank loan. Here's how financing a KHB site or house typically works.",
    sections: [
      { h: "Loan on a site vs a house", body: [
        "For a KHB house, you can usually get a standard home loan. For a bare site, banks offer a 'plot loan' (also called a land loan) — often with a somewhat higher rate and shorter tenure than a home loan, and sometimes requiring you to start construction within a set period.",
      ]},
      { h: "The allotment letter is key", body: [
        "Banks lend against the allotment: once KHB issues your allotment letter with the price and payment schedule, it becomes the core document for your loan application. Some banks have tie-ups or familiarity with government housing-board allotments, which can smooth approval.",
      ]},
      { h: "What lenders typically check", body: [
        "Your income and repayment capacity, credit score, the allotment documents and price, and the layout's approvals/title. They finance a percentage of the value; you fund the rest as a down payment, plus registration and stamp-duty costs.",
      ]},
      { h: "Practical steps", body: [
        "Get pre-approval based on your income before you commit, so you know your budget. After allotment, submit the allotment letter and your documents, let the bank do its legal/technical check, and align the loan disbursement with KHB's instalment schedule so payments aren't missed.",
      ]},
      { h: "Verify current terms", body: [
        "Loan products, rates and construction conditions vary by bank and change over time, and KHB's payment terms are set per project. Confirm details with your bank and on the official KHB notification. GruhaAlert is independent, not affiliated with KHB, and this is general information, not financial advice.",
      ]},
    ],
  },
  {
    slug: "after-khb-allotment-registration-khata-possession",
    title: "After KHB allotment: payment, registration, khata and possession",
    description:
      "What happens after you're allotted a Karnataka Housing Board (KHB) site — completing payment, registration, getting the khata, and taking possession.",
    intro:
      "Winning the KHB lottery is the start, not the finish. Here's what happens between the allotment letter and actually holding a registered, buildable site in your name.",
    sections: [
      { h: "1. The allotment letter", body: [
        "KHB issues an allotment letter with the final price, the payment schedule and the conditions. Read it carefully — it's the contract for everything that follows. Note every payment date.",
      ]},
      { h: "2. Complete the payments", body: [
        "Pay the site cost as scheduled — usually in instalments over a set period. Paying on time is critical; delays can attract interest or, in the worst case, cancellation of the allotment.",
      ]},
      { h: "3. Registration and stamp duty", body: [
        "After payment, the site is registered in your name at the sub-registrar's office. You pay stamp duty and registration charges at this stage. This registered sale/allotment deed is your legal proof of ownership.",
      ]},
      { h: "4. Khata and possession", body: [
        "Get the khata (the property record used for paying property tax) transferred to your name with the local authority, using your registration documents. KHB hands over possession of the site, after which you can build as per the layout's rules and approvals.",
      ]},
      { h: "5. Keep your paperwork safe", body: [
        "Preserve the allotment letter, payment receipts, registered deed and khata — you'll need them to build, to get utilities, and if you ever sell. Missing paperwork is the most common cause of trouble later.",
      ]},
      { h: "Verify each step officially", body: [
        "Exact steps, charges and timelines are set in your allotment letter and by local rules. Always follow the official KHB documents and confirm with the relevant offices. GruhaAlert is independent and not affiliated with KHB.",
      ]},
    ],
  },
];

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug) ?? null;
