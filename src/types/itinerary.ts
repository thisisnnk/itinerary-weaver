export interface CustomHeading {
  id: string;
  title: string;
  content: string;
  enabled: boolean;
}

export interface PricingSlot {
  id: string;
  label: string;
  price: number;
  unit: 'Per Pax' | 'Per Room' | 'Per Person' | 'Total Package';
}

export interface DayPlan {
  id: string;
  dayNumber: number;
  keyword: string;
  title: string;
  date: string;
  activities: string[];
}

export interface BankDetails {
  bank: string;
  accountName: string;
  accountNumber: string;
  ifscCode: string;
}

export interface Itinerary {
  id: string;
  itineraryCode: string;
  consultantName: string;
  consultantNumber: string;
  quotationDate: string;
  destination: string;
  duration: string;
  travelDate: string;
  transportDetails: string;
  clientName: string;
  sourceOfLead?: string;
  purpose?: string;
  groupSize: number;
  customHeadings: CustomHeading[];
  pricingSlots: PricingSlot[];
  dayPlans: DayPlan[];
  inclusions: string[];
  exclusions: string[];
  termsConditions: string;
  cancellationPolicy: string;
  bankDetails: BankDetails;
  createdAt: string;
  updatedAt: string;
}

export interface Keyword {
  id: string;
  keyword: string;
  activities: string[];
  createdAt: string;
  updatedAt: string;
}

export const COMPANY_INFO = {
  name: "Adventure Holidays",
  tagline: "Greetings from Adventure",
  phone: "+91 70109 33178",
  email: "contact@adventureholidays.co",
  website: "www.adventureholidays.co",
  address: "2nd Floor, Vishnu Complex, 1st Cross Street, Gandhipuram, Coimbatore - 641012",
  googleRating: 4.8,
  happyTravelers: "25000+",
  destinations: "1500+"
};

export const DEFAULT_BANK_DETAILS: BankDetails = {
  bank: "Yes Bank, Gandhipuram",
  accountName: "Adventure Holidays",
  accountNumber: "135261900002320",
  ifscCode: "YESB0001352"
};

export const DEFAULT_TERMS_CONDITIONS = `Package confirmation will only be upon half of the payment and the balance before 72 Hours of Departure.

The Accommodation, Vehicle, Tour Organizer allotments will be done thereafter.

Hotels are Subject to Availability.

Natural Calamities, Road Traffic, Public Crowd, Sightseeing Walk is mandatory.

A Detailed PPT Presentation will be done before 72 hours before the tour date.

The Co-operation of all the Tourists are merely important as traffic delays, some long Walks are unavoidable in a trip.

The Tourists should Co-operate the organizers in the timings allotted for all sightseeing places, which in delay will end in the forthcoming place which was planned to visit.

The Internal/External belongings of the Tourists should be taken care by themselves whereas the Organizers or the Management or the Chauffer is not responsible for the same.

The Prices given above has a validity of 48 hours from the date of quote provided. Please contact the undersigned before making payment without fail.

The payments made without intimation will be on hold.

Account Details will be sent as per Request.

Changes in tour must be before 30 days of the tour.

If so 5% of the package cost will be deducted.`;

export const DEFAULT_CANCELLATION_POLICY = `45 days prior to Tour: 10% of the Tour package.

15 days prior to Tour: 25% of the Tour Package.

07 days prior to Tour: 50% of the Tour Package.

72 hours prior to Tour OR No Show: No Refund.`;
