// ponytail: placeholders, replace before launch
export const WHATSAPP = "21600000000";
export const SITE_URL = "https://avyro.tn";

export type Lang = "fr" | "en";

export const waLink = (lang: Lang, msg?: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    msg ?? (lang === "fr" ? "Bonjour Avyro, je veux transformer mes abonnés en clients." : "Hello Avyro, I want to turn my followers into customers.")
  )}`;

type Pair = readonly [string, string];
type Plan = readonly [string, string, readonly string[]];

export type CalcCopy = {
  title: string;
  intro: string;
  reach: string;
  price: string;
  rate: string;
  result: string;
  perYear: string;
  note: string;
  cta: string;
  msg: string; // {amount} is replaced with the monthly figure
};

export type Copy = {
  metaTitle: string;
  metaDescription: string;
  skip: string;
  nav: Pair[]; // [label, anchor]
  switchLabel: string;
  switchAria: string;
  waShort: string;
  h1: string;
  story: string[]; // statements that follow the h1 in the pinned hero
  sub: string;
  cta: string;
  reply: string;
  problemTitle: string;
  problemIntro: string;
  leaks: Pair[];
  statement: string;
  calc: CalcCopy;
  industriesTitle: string;
  industries: string[];
  processTitle: string;
  process: Pair[];
  servicesTitle: string;
  services: Pair[];
  pricingTitle: string;
  plans: Plan[];
  faqTitle: string;
  faq: Pair[];
  endTitle: string;
  endText: string;
  endCta: string;
  footer: string;
};

// French typography: a narrow no-break space before ? ! : ; so the mark never wraps onto its own line.
function frenchTypography<T>(v: T): T {
  if (typeof v === "string") return v.replace(/ ([?!:;])/g, "\u202f$1") as T;
  if (Array.isArray(v)) return v.map(frenchTypography) as T;
  if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, frenchTypography(x)])) as T;
  return v;
}

export const copy: Record<Lang, Copy> = {
  fr: frenchTypography({
    metaTitle: "Avyro | Site web, branding et réseaux sociaux pour entreprises tunisiennes",
    metaDescription:
      "Transformez vos abonnés Instagram et Facebook en clients : site web, branding et campagnes sur les réseaux sociaux pour les entreprises en Tunisie.",
    skip: "Aller au contenu",
    nav: [["le problème", "#probleme"], ["calculateur", "#calculateur"], ["services", "#services"], ["tarifs", "#tarifs"]],
    switchLabel: "EN",
    switchAria: "Read this page in English",
    waShort: "whatsapp",
    h1: "Votre travail est meilleur que votre site.",
    story: ["Vos abonnés vous regardent.", "Mais ils n'achètent pas.", "On transforme ce regard en chiffre d'affaires."],
    sub: "Vos abonnés vous suivent, mais ils n'achètent pas. Nous créons le site, l'image de marque et les campagnes qui les transforment en clients.",
    cta: "Parlons-en sur WhatsApp",
    reply: "réponse sous 24 h",
    problemTitle: "Beaucoup de monde vous regarde. Très peu deviennent clients.",
    problemIntro: "Chaque personne qui vous quitte sans acheter, c'est de l'argent qui part ailleurs. Voici pourquoi :",
    leaks: [
      ["Ils ne trouvent pas comment réserver", "Un client qui hésite deux minutes part chez le concurrent."],
      ["Votre image ne montre pas votre valeur", "Un logo et des visuels amateurs vous obligent à baisser vos prix."],
      ["Vos publications n'aboutissent à rien", "Des likes, mais personne ne sait où acheter ou prendre rendez-vous."],
    ],
    statement: "Chaque like qui ne devient pas un client est un client offert à votre concurrent.",
    calc: {
      title: "Combien d'argent laissez-vous sur la table ?",
      intro: "Bougez les curseurs avec vos propres chiffres. Le calcul est simple et transparent.",
      reach: "Personnes qui voient votre entreprise chaque mois",
      price: "Dépense moyenne d'un client",
      rate: "Si seulement ce pourcentage de plus achetait",
      result: "de chiffre d'affaires en plus, chaque mois",
      perYear: "par an",
      note: "Estimation indicative calculée avec vos réponses : personnes × pourcentage × dépense moyenne. Ce n'est pas une promesse de résultat.",
      cta: "Récupérer cet argent",
      msg: "Bonjour Avyro, d'après votre calculateur je pourrais gagner environ {amount} de plus par mois. Parlons-en.",
    },
    industriesTitle: "Pour les entreprises qui vivent de leurs clients",
    industries: ["Restaurants", "Cafés", "Cliniques et cabinets", "Salons de beauté", "Salles de sport", "Boutiques", "Hôtels et maisons d'hôtes", "Écoles et formations", "Agences immobilières", "Artisans"],
    processTitle: "Ce qui se passe après votre message",
    process: [
      ["On fait connaissance", "Un échange simple pour comprendre votre activité, vos clients et vos objectifs."],
      ["On construit votre image", "Logo, couleurs et visuels, validés avec vous à chaque étape."],
      ["On met votre site en ligne", "Réservation ou commande, relié à votre WhatsApp et visible sur Google."],
      ["On lance vos campagnes", "Publicités et contenus sur Instagram et Facebook pour attirer les bonnes personnes."],
      ["Les clients arrivent", "Vous recevez les demandes, et nous suivons les résultats avec vous."],
    ],
    servicesTitle: "Nous réparons chaque fuite, de la publication à l'encaissement",
    services: [
      ["Un site qui vend pour vous", "Vos clients voient vos produits, vos prix et vos horaires, et réservent ou commandent en quelques clics, même la nuit."],
      ["Un branding qui justifie vos prix", "Logo, couleurs, photos et style : une image professionnelle qui donne confiance dès le premier regard."],
      ["Des campagnes sur les réseaux sociaux", "Instagram, Facebook et TikTok : des publicités et des contenus pensés pour amener des clients, pas seulement des likes."],
      ["Des réservations et commandes automatiques", "Le client choisit son créneau ou son produit, vous recevez la confirmation sur WhatsApp. Plus de messages perdus."],
    ],
    pricingTitle: "Tarifs clairs, en dinars",
    plans: [
      ["Lancement", "1\u00a0200\u00a0TND", ["Site simple et professionnel", "Logo et charte de couleurs", "Bouton WhatsApp et carte Google", "Visible sur Google dans votre ville"]],
      ["Croissance", "2\u00a0900\u00a0TND", ["Site complet avec réservation", "Branding complet et photos", "Campagnes Instagram et Facebook", "Rapport mensuel de vos clients"]],
      ["Sur mesure", "Sur devis", ["Boutique en ligne avec paiement", "Espace client", "Campagnes continues", "Un interlocuteur dédié"]],
    ],
    faqTitle: "Questions fréquentes",
    faq: [
      ["Combien de temps avant de voir des clients ?", "Votre site et votre image sont prêts en 1 à 4 semaines. Les premières demandes arrivent dès que la campagne démarre."],
      ["Je n'ai ni logo ni photos professionnelles.", "Nous créons tout avec vous : logo, couleurs, textes et photos à partir de ce que vous faites déjà."],
      ["Je ne sais pas utiliser un site web.", "Aucun problème. Vous gérez tout depuis votre téléphone, et nous restons disponibles sur WhatsApp."],
      ["Mes clients paient en espèces.", "Pas de souci : paiement sur place ou à la livraison. Le paiement en ligne reste optionnel."],
    ],
    endTitle: "Vos abonnés vous aiment déjà. Faisons-les payer.",
    endText: "Un message WhatsApp suffit pour commencer. Pas de jargon, pas d'engagement.",
    endCta: "Commencer sur WhatsApp",
    footer: "© 2026 avyro, tunisie",
  }),
  en: {
    metaTitle: "Avyro | Websites, branding and social media for Tunisian businesses",
    metaDescription:
      "Turn your Instagram and Facebook followers into paying customers: websites, branding and social media campaigns for businesses in Tunisia.",
    skip: "Skip to content",
    nav: [["the problem", "#problem"], ["calculator", "#calculator"], ["services", "#services"], ["pricing", "#pricing"]],
    switchLabel: "FR",
    switchAria: "Lire cette page en français",
    waShort: "whatsapp",
    h1: "Your work is better than your website.",
    story: ["Your followers are watching.", "But they don't buy.", "We turn that attention into revenue."],
    sub: "Your followers like what you do, but they don't buy. We build the website, the brand and the campaigns that turn them into customers.",
    cta: "Let's talk on WhatsApp",
    reply: "we reply within 24 h",
    problemTitle: "Plenty of people watch you. Very few become customers.",
    problemIntro: "Every person who leaves without buying is money going to someone else. Here is why:",
    leaks: [
      ["They can't find how to book", "A customer who hesitates for two minutes goes to your competitor."],
      ["Your image doesn't show your value", "An amateur logo and weak visuals force you to lower your prices."],
      ["Your posts lead nowhere", "Plenty of likes, but nobody knows where to buy or book."],
    ],
    statement: "Every like that doesn't become a customer is a customer you hand to your competitor.",
    calc: {
      title: "How much money are you leaving on the table?",
      intro: "Move the sliders with your own numbers. The maths is simple and transparent.",
      reach: "People who see your business each month",
      price: "Average customer spend",
      rate: "If only this percentage more bought",
      result: "in extra revenue, every month",
      perYear: "per year",
      note: "Indicative estimate based on your answers: people × percentage × average spend. It is not a promise of results.",
      cta: "Get this money back",
      msg: "Hello Avyro, your calculator says I could earn about {amount} more per month. Let's talk.",
    },
    industriesTitle: "For businesses that live from their customers",
    industries: ["Restaurants", "Cafés", "Clinics and practices", "Beauty salons", "Gyms", "Shops", "Hotels and guesthouses", "Schools and training", "Real estate agencies", "Craftspeople"],
    processTitle: "What happens after your message",
    process: [
      ["We get to know you", "A simple conversation to understand your business, your customers and your goals."],
      ["We build your brand", "Logo, colours and visuals, approved by you at every step."],
      ["We put your website online", "Booking or ordering, connected to your WhatsApp and found on Google."],
      ["We launch your campaigns", "Ads and content on Instagram and Facebook that bring the right people to you."],
      ["Customers arrive", "You receive the requests, and we track the results with you."],
    ],
    servicesTitle: "We fix every leak, from the post to the payment",
    services: [
      ["A website that sells for you", "Customers see your products, prices and opening hours, then book or order in a few taps, even at night."],
      ["Branding that justifies your prices", "Logo, colours, photos and style: a professional image that earns trust at first glance."],
      ["Social media campaigns", "Instagram, Facebook and TikTok: ads and content designed to bring customers, not just likes."],
      ["Automatic bookings and orders", "The customer picks a time or a product and you get the confirmation on WhatsApp. No more lost messages."],
    ],
    pricingTitle: "Clear prices, in dinars",
    plans: [
      ["Launch", "1,200\u00a0TND", ["Simple, professional website", "Logo and colour palette", "WhatsApp button and Google Maps listing", "Found on Google in your city"]],
      ["Growth", "2,900\u00a0TND", ["Full website with booking", "Complete branding and photos", "Instagram and Facebook campaigns", "Monthly report on your customers"]],
      ["Custom", "On quote", ["Online shop with payment", "Customer account area", "Ongoing campaigns", "A dedicated contact person"]],
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      ["How long until I see customers?", "Your website and brand are ready in 1 to 4 weeks. The first requests arrive as soon as the campaign starts."],
      ["I have no logo or professional photos.", "We create everything with you: logo, colours, text and photos, starting from what you already do."],
      ["I don't know how to use a website.", "No problem. You manage everything from your phone, and we stay available on WhatsApp."],
      ["My customers pay in cash.", "That's fine: payment on site or on delivery. Online payment is optional."],
    ],
    endTitle: "Your followers already love you. Let's make them pay.",
    endText: "One WhatsApp message is enough to start. No jargon, no commitment.",
    endCta: "Start on WhatsApp",
    footer: "© 2026 avyro, tunisia",
  },
};
