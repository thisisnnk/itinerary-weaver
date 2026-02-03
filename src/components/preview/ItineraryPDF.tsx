import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Car,
  FileText,
  IndianRupee,
  CheckCircle2,
  XCircle,
  Phone,
  Mail,
  Globe,
  Building,
  Star,
  MessageSquare,
  Info
} from 'lucide-react';
import { Itinerary, COMPANY_INFO } from '@/types/itinerary';
import Logo from '@/components/Logo';

interface ItineraryPDFProps {
  itinerary: Itinerary;
}

const ItineraryPDF = ({ itinerary }: ItineraryPDFProps) => {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  return (
    <div className="bg-[#000435] text-white font-poppins rounded-xl">
      {/* Cover Section */}
      <section className="relative py-16 px-8 text-center">
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 10c-11 0-20 9-20 20s9 20 20 20 20-9 20-20-9-20-20-20zm0 35c-8.3 0-15-6.7-15-15s6.7-15 15-15 15 6.7 15 15-6.7 15-15 15z' fill='%23FECC00' fill-opacity='0.3'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          }} />
        </div>
        <div className="relative z-10">
          <div className="flex justify-center mb-12">
            <Logo size="xl" />
          </div>
          <h1 className="text-3xl font-bold text-[#FECC00] mb-2">
            Greetings from Adventure Holidays
          </h1>
          <p className="text-gray-300 text-lg mb-6">It is our heartfelt pleasure to present this quotation to</p>
          <div className="inline-block bg-[#000435] border border-gray-700/50 rounded-lg px-12 py-6 mb-6">
            <p className="text-4xl font-bold text-white uppercase tracking-wider">{itinerary.clientName}</p>
          </div>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            We would be truly honoured to craft a journey filled with comfort, care, and unforgettable moments, tailored especially for you.
          </p>
        </div>
      </section>

      {/* Journey Overview */}
      <section className="px-8 py-12 bg-[#000435]">
        <h2 className="text-2xl font-bold text-center mb-8 tracking-wider">JOURNEY OVERVIEW</h2>
        {/* Row 1: Quotation Details */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#000435] border border-[#FECC00] rounded-lg p-4 flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FECC00]/20 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-[#FECC00]" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Quotation Date</p>
              <p className="font-semibold">{formatDate(itinerary.quotationDate)}</p>
            </div>
          </div>
          {itinerary.sourceOfLead && (
            <div className="bg-[#000435] border border-[#FECC00] rounded-lg p-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FECC00]/20 flex items-center justify-center shrink-0">
                <Globe className="w-5 h-5 text-[#FECC00]" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Source of Lead</p>
                <p className="font-semibold">{itinerary.sourceOfLead}</p>
              </div>
            </div>
          )}
        </div>

        {/* Row 2: Trip Details */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="col-span-2 md:col-span-3 bg-[#000435] border border-[#FECC00] rounded-lg p-4 flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FECC00]/20 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-[#FECC00]" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Destination</p>
              <p className="font-semibold">{itinerary.destination}</p>
            </div>
          </div>
          <div className="bg-[#000435] border border-[#FECC00] rounded-lg p-4 flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FECC00]/20 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-[#FECC00]" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Travel Date</p>
              <p className="font-semibold">{formatDate(itinerary.travelDate)}</p>
            </div>
          </div>
          <div className="bg-[#000435] border border-[#FECC00] rounded-lg p-4 flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FECC00]/20 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-[#FECC00]" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Duration</p>
              <p className="font-semibold">{itinerary.duration}</p>
            </div>
          </div>
          <div className="bg-[#000435] border border-[#FECC00] rounded-lg p-4 flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FECC00]/20 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-[#FECC00]" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Group Size</p>
              <p className="font-semibold">{itinerary.groupSize} Pax</p>
            </div>
          </div>
          <div className="bg-[#000435] border border-[#FECC00] rounded-lg p-4 flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FECC00]/20 flex items-center justify-center shrink-0">
              <Car className="w-5 h-5 text-[#FECC00]" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Transport</p>
              <p className="font-semibold">{itinerary.transportDetails}</p>
            </div>
          </div>
          {itinerary.purpose && (
            <div className="bg-[#000435] border border-[#FECC00] rounded-lg p-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FECC00]/20 flex items-center justify-center shrink-0">
                <Star className="w-5 h-5 text-[#FECC00]" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Purpose</p>
                <p className="font-semibold">{itinerary.purpose}</p>
              </div>
            </div>
          )}
        </div>

        {/* Custom Headings Separated */}
        {itinerary.customHeadings && itinerary.customHeadings.filter(h => h.enabled).length > 0 && (
          <div className="mt-4 grid grid-cols-1 gap-4">
            {itinerary.customHeadings.filter(h => h.enabled).map((heading) => (
              <div key={heading.id} className="bg-[#000435] border border-[#FECC00] rounded-lg p-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FECC00]/20 flex items-center justify-center shrink-0">
                  <Info className="w-5 h-5 text-[#FECC00]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">{heading.title}</p>
                  <p className="font-semibold">{heading.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Pricing Section */}
      {itinerary.pricingSlots && itinerary.pricingSlots.length > 0 && (
        <section className="px-8 py-4 flex justify-center">
          <div className={`grid gap-4 ${itinerary.pricingSlots.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} max-w-2xl w-full`}>
            {itinerary.pricingSlots.map((slot) => (
              <div key={slot.id} className="bg-[#FECC00] rounded-xl p-4 text-center shadow-xl">
                <div className="space-y-1">
                  <p className="text-[#010030]/80 text-lg font-semibold leading-tight">
                    {slot.label}
                  </p>
                  <p className="text-4xl font-black text-[#010030] leading-none">
                    ₹{formatPrice(slot.price)}
                  </p>
                  <p className="text-[#010030]/80 text-lg font-semibold leading-tight">
                    {slot.unit}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}



      {/* Day Plans */}
      {itinerary.dayPlans && itinerary.dayPlans.length > 0 && (
        <section className="px-8 py-12">
          <h2 className="text-2xl font-bold text-center mb-8 tracking-wider">THE EXPERIENCE</h2>
          <div className="space-y-6">
            {itinerary.dayPlans.map((day) => (
              <div key={day.id} className="bg-[#000435] border border-gray-700/50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#FECC00] flex items-center justify-center shrink-0">
                    <span className="text-[#010030] font-bold text-2xl">
                      {String(day.dayNumber).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">{day.title.toUpperCase()}</h3>
                    {day.date && (
                      <p className="text-gray-400 text-sm mb-4">{formatDate(day.date)}</p>
                    )}
                    <ul className="space-y-2">
                      {day.activities.map((activity, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-300">
                          <CheckCircle2 className="w-4 h-4 text-[#FECC00] mt-1 shrink-0" />
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Inclusions & Exclusions */}
      <section className="px-8 py-12 bg-[#000435]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Inclusions */}
          {itinerary.inclusions && itinerary.inclusions.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-6 h-6 text-green-400" />
                <h3 className="text-xl font-bold">INCLUSIONS</h3>
              </div>
              <ul className="space-y-2">
                {itinerary.inclusions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-300">
                    <span className="text-[#FECC00]">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Exclusions */}
          {itinerary.exclusions && itinerary.exclusions.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <XCircle className="w-6 h-6 text-red-400" />
                <h3 className="text-xl font-bold">EXCLUSIONS</h3>
              </div>
              <ul className="space-y-2">
                {itinerary.exclusions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-300">
                    <span className="text-red-400">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Consultant Details */}
      <section className="px-8 py-8">
        <div className="bg-[#000435] border border-gray-700/50 rounded-xl p-6 text-center">
          <p className="text-gray-300 text-lg mb-1">Your Travel Consultant</p>
          <div className="flex items-center justify-center gap-3 mb-1">
            <p className="text-4xl font-bold text-[#FECC00] uppercase">{itinerary.consultantName} - {itinerary.consultantNumber}</p>
          </div>
          <p className="text-gray-300 text-lg">is here to fulfill your wishes</p>
        </div>
      </section>

      {/* Terms & Conditions */}
      {itinerary.termsConditions && (
        <section className="px-8 py-8 bg-[#000435]">
          <h3 className="text-xl font-bold mb-4">TERMS & CONDITIONS</h3>
          <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">
            {itinerary.termsConditions}
          </p>
        </section>
      )}

      {/* Cancellation Policy */}
      {itinerary.cancellationPolicy && (
        <section className="px-8 py-8">
          <h3 className="text-xl font-bold mb-4">CANCELLATION POLICY</h3>
          <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">
            {itinerary.cancellationPolicy}
          </p>
        </section>
      )}

      {/* Social Proof */}
      <section className="px-8 py-12 bg-[#000435]">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[#000435] border border-gray-700/50 rounded-full px-6 py-3">
            <Star className="w-6 h-6 text-[#FECC00] fill-[#FECC00]" />
            <Star className="w-6 h-6 text-[#FECC00] fill-[#FECC00]" />
            <Star className="w-6 h-6 text-[#FECC00] fill-[#FECC00]" />
            <Star className="w-6 h-6 text-[#FECC00] fill-[#FECC00]" />
            <Star className="w-6 h-6 text-[#FECC00] fill-[#FECC00]" />
            <span className="ml-2 text-2xl font-bold">{COMPANY_INFO.googleRating}</span>
          </div>
          <p className="text-gray-400 mt-2">Google Rating</p>
        </div>
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          <div className="bg-[#FECC00] rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-[#010030]">{COMPANY_INFO.happyTravelers}</p>
            <p className="text-[#010030]/70 text-sm">Happy Travelers</p>
          </div>
          <div className="bg-[#FECC00] rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-[#010030]">{COMPANY_INFO.destinations}</p>
            <p className="text-[#010030]/70 text-sm">Curated Destinations</p>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="px-8 py-12">
        <h3 className="text-xl font-bold text-center mb-4">ABOUT US</h3>
        <p className="text-gray-400 text-center max-w-2xl mx-auto">
          Adventure Holidays is your trusted travel partner, dedicated to creating unforgettable
          journeys across India and beyond. With years of experience and thousands of happy travelers,
          we specialize in crafting personalized itineraries that match your travel dreams.
        </p>
      </section>

      {/* CTA Section */}
      <section className="px-8 py-12 bg-[#000435] text-center">
        <p className="text-3xl font-bold mb-2">
          need a <span className="text-[#FECC00]">PERSONALISED</span> TOUR PACKAGE?
        </p>
        <p className="text-gray-400 text-lg">we are HERE to hear your vibe</p>
      </section>

      {/* Footer */}
      <footer className="px-8 py-8 bg-[#000435]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Phone className="w-4 h-4 text-[#FECC00]" />
            <span className="text-gray-300">{COMPANY_INFO.phone}</span>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Mail className="w-4 h-4 text-[#FECC00]" />
            <span className="text-gray-300">{COMPANY_INFO.email}</span>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Globe className="w-4 h-4 text-[#FECC00]" />
            <span className="text-gray-300">{COMPANY_INFO.website}</span>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Building className="w-4 h-4 text-[#FECC00]" />
            <span className="text-gray-300 text-sm">{COMPANY_INFO.address}</span>
          </div>
        </div>


      </footer>
    </div>
  );
};

export default ItineraryPDF;
