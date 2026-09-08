export type SiteType = "dental" | "diagnostics" | "gym" | "portfolio";

export type FontName =
  | "Fraunces"
  | "Instrument Serif"
  | "Plus Jakarta Sans"
  | "Inter"
  | "DM Sans";

export interface SiteConfig {
  siteId: string;
  type: SiteType;
  isDemo: boolean;
  siteUrl: string;
  geo: { latitude: number; longitude: number };
  priceRevisionNote?: string;
  emergencyNote?: string;
  registrationLine?: string;
  /** Localities named in the ticker under the treatments grid. */
  serviceAreas?: string[];
  brand: {
    name: string;
    shortName: string;
    tagline: string;
    logoText: string;
    established: string;
    yearsInService: number;
  };
  theme: {
    primary: string;
    primaryDark: string;
    surface: string;
    accent: string;
    text: string;
    muted: string;
    fontHeading: FontName;
    fontBody: FontName;
    radius: string;
  };
  contact: {
    phonePrimary: string;
    phoneAlt: string;
    whatsapp: string;
    email: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    pincode: string;
    mapEmbedUrl: string;
    mapDirectionsUrl: string;
    landmark: string;
    parkingNote?: string;
    languagesLine?: string;
  };
  hours: {
    day: string;
    open: string;
    close: string;
    breakStart?: string;
    breakEnd?: string;
    closed?: boolean;
  }[];
  stats: { value: string; label: string }[];
  services: {
    id: string;
    name: string;
    shortDesc: string;
    longDesc: string;
    price: string;
    priceNote?: string;
    duration?: string;
    featured: boolean;
    whatsappMessage: string;
    category?: string;
    whoNeeds?: string;
    visits?: string;
    aftercare?: string;
  }[];
  team: {
    name: string;
    qualification: string;
    specialization: string;
    experience: string;
    bio: string;
    languages: string[];
    photo: string;
    education?: string[];
    memberships?: string[];
    treatmentFocus?: string[];
    photoAlt?: string;
  }[];
  reviews: {
    name: string;
    area: string;
    rating: number;
    date: string;
    text: string;
    service: string;
    ownerReply?: string;
  }[];
  gallery: { src: string; alt: string; caption: string; category: string }[];
  faqs: { question: string; answer: string }[];
  seo: { title: string; description: string; keywords: string[]; ogImage: string };
  enquiryFields: {
    name: string;
    label: string;
    type: "text" | "tel" | "email" | "textarea" | "select";
    required?: boolean;
    placeholder?: string;
    options?: string[];
  }[];
  contactFaqs?: { question: string; answer: string }[];
  about?: {
    story: string[];
    timeline: { year: string; title: string; text: string }[];
    sterilization?: { title: string; text: string }[];
    equipment?: { name: string; text: string; photo?: string }[];
  };
  home?: {
    hero: {
      eyebrow: string;
      heading: string;
      subheading: string;
      image: { src: string; alt: string };
      whatsappMessage: string;
    };
    sections: {
      services: { eyebrow: string; heading: string; subheading: string };
      whyChoose: { eyebrow: string; heading: string; subheading: string };
      doctors: { eyebrow: string; heading: string; subheading: string };
      beforeAfter: { eyebrow: string; heading: string; subheading: string };
      gallery: { eyebrow: string; heading: string; subheading: string };
      reviews: { eyebrow: string; heading: string; subheading: string };
      location: { eyebrow: string; heading: string; parkingLabel: string; directionsLabel: string };
      appointment: { eyebrow: string; heading: string; subheading: string; reassuranceHeading: string; reassuranceText: string };
    };
    whyChoose: { heading: string; text: string }[];
    beforeAfter: {
      beforeSrc: string;
      beforeAlt: string;
      afterSrc: string;
      afterAlt: string;
      treatment: string;
      duration: string;
    }[];
    paymentNotes: string[];
    googleReviews: { label: string; url: string };
  };
  diagnostics?: {
    home: {
      hero: { eyebrow: string; heading: string; subheading: string; bookingLabel: string };
      collectionStrip: string[];
      howItWorks: { title: string; text: string }[];
      facilities: { name: string; text: string; photo: string; photoAlt?: string }[];
      corporate: { heading: string; text: string; linkLabel: string };
      googleReviews?: { label: string; url: string };
    };
    packages: {
      id: string;
      name: string;
      testCount: number;
      price: string;
      mrp: string;
      includedTests: string[];
      whatsappMessage: string;
    }[];
    tests: {
      id: string;
      name: string;
      category: "Blood" | "Hormone" | "Imaging" | "Cardiac" | "Urine";
      price: string;
      sampleType: string;
      reportTime: string;
    }[];
    imaging: { id: string; name: string; price: string; description: string; whatsappMessage: string }[];
    homeCollection: {
      areas: string[];
      freeAbove: string;
      standardCharge: string;
      slots: string[];
      reportPromise: string;
    };
    pathologist: { name: string; qualification: string; experience: string; photo: string; bio: string; signedReportNote: string };
  };
  gym?: {
    /** Sits under the hero as the joining offer strip on the membership page. */
    joiningNote: string;
    inductionNote: string;
    plans: {
      id: string;
      name: string;
      price: string;
      period: string;
      mrp?: string;
      joiningFee: string;
      bestFor: string;
      featured?: boolean;
      inclusions: string[];
      whatsappMessage: string;
    }[];
    /** One row per feature, one value per plan, in plan order. */
    planComparison: { feature: string; values: string[] }[];
    addOns: { name: string; price: string; note: string }[];
    /** Seven values per row: Monday to Sunday. "—" means no class in that slot. */
    timetable: { slot: string; classes: string[] }[];
    timetableNote: string;
    classes: { name: string; text: string; coach: string; level: string; duration: string }[];
    floor: { name: string; count: string; text: string; photo: string; photoAlt?: string }[];
    rules: { title: string; text: string }[];
  };
  portfolio?: {
    ownerName: string;
    availability: string;
    whatsappMessage: string;
    work: { name: string; type: string; url: string; tags: string[]; previewTitle: string; previewLocality: string; previewColor: string }[];
    included: string[];
    packages: { id: string; name: string; price: string; timeline: string; featured?: boolean; inclusions: string[] }[];
    maintenance: string;
    founderOffer: string;
    process: string[];
    faqs: { question: string; answer: string }[];
    upi: string;
  };
}
