import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Pencil, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useItineraryStore } from '@/store/itineraryStore';
import { COMPANY_INFO } from '@/types/itinerary';
import Logo from '@/components/Logo';
import ItineraryPDF from '@/components/preview/ItineraryPDF';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRef, useState } from 'react';

const Preview = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const { getItinerary } = useItineraryStore();
  const contentRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const itinerary = id ? getItinerary(id) : undefined;

  if (!itinerary) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="heading-lg text-foreground mb-4">Itinerary not found</h1>
          <Button onClick={() => navigate('/')} className="bg-primary text-primary-foreground">
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;

    setIsGenerating(true);
    toast({
      title: 'Generating PDF...',
      description: 'Please wait while we create your itinerary.',
    });

    try {
      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        logging: true,
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const pdf = new jsPDF({
        orientation: imgHeight > imgWidth ? 'portrait' : 'portrait',
        unit: 'mm',
        format: [imgWidth, imgHeight],
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.8);
      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);

      // Generate filename
      const fileName = `${itinerary.itineraryCode}-${itinerary.clientName.replace(/\s+/g, '')}-${itinerary.destination.replace(/\s+/g, '')}-${itinerary.duration.replace('/', '')}-${itinerary.groupSize}.pdf`;

      pdf.save(fileName);

      toast({
        title: 'PDF downloaded!',
        description: `Saved as ${fileName}`,
      });
    } catch (error) {
      toast({
        title: 'Error generating PDF',
        description: 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border py-4 px-6 flex items-center justify-between bg-card sticky top-0 z-10">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="text-foreground hover:bg-secondary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          DASHBOARD
        </Button>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(`/studio/${id}`)}
            className="bg-secondary text-foreground hover:bg-secondary/80 rounded-full"
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Download className="w-4 h-4 mr-2" />
            {isGenerating ? 'Generating...' : 'Download PDF'}
          </Button>
        </div>
      </header>

      {/* Preview Content */}
      <main className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div ref={contentRef}>
            <ItineraryPDF itinerary={itinerary} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Preview;
