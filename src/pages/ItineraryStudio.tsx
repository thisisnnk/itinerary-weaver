import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { X, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useItineraryStore } from '@/store/itineraryStore';
import { 
  Itinerary, 
  DEFAULT_BANK_DETAILS, 
  DEFAULT_TERMS_CONDITIONS, 
  DEFAULT_CANCELLATION_POLICY 
} from '@/types/itinerary';
import StepSummary from '@/components/studio/StepSummary';
import StepItinerary from '@/components/studio/StepItinerary';
import StepDetails from '@/components/studio/StepDetails';
import StepPolicies from '@/components/studio/StepPolicies';

const STEPS = [
  { id: 1, label: 'summary' },
  { id: 2, label: 'itinerary' },
  { id: 3, label: 'details' },
  { id: 4, label: 'policies' },
];

const ItineraryStudio = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const isEditing = id !== 'new';
  
  const { 
    getItinerary, 
    addItinerary, 
    updateItinerary, 
    generateItineraryCode 
  } = useItineraryStore();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<Itinerary>>({
    consultantName: '',
    consultantNumber: '+91 ',
    quotationDate: new Date().toISOString().split('T')[0],
    destination: '',
    duration: '',
    travelDate: '',
    transportDetails: '',
    clientName: '',
    groupSize: 1,
    customHeadings: [],
    pricingSlots: [],
    dayPlans: [],
    inclusions: [],
    exclusions: [],
    termsConditions: DEFAULT_TERMS_CONDITIONS,
    cancellationPolicy: DEFAULT_CANCELLATION_POLICY,
    bankDetails: DEFAULT_BANK_DETAILS,
  });

  const [itineraryCode, setItineraryCode] = useState('');

  useEffect(() => {
    if (isEditing && id) {
      const existing = getItinerary(id);
      if (existing) {
        setFormData(existing);
        setItineraryCode(existing.itineraryCode);
      } else {
        navigate('/');
        toast({
          title: 'Itinerary not found',
          description: 'The requested itinerary does not exist.',
          variant: 'destructive',
        });
      }
    } else {
      setItineraryCode(generateItineraryCode());
    }
  }, [id, isEditing, getItinerary, generateItineraryCode, navigate, toast]);

  const updateFormData = (updates: Partial<Itinerary>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSave = () => {
    const now = new Date().toISOString();
    
    if (isEditing && id) {
      updateItinerary(id, formData);
      toast({
        title: 'Itinerary updated',
        description: 'Your changes have been saved.',
      });
    } else {
      const newItinerary: Itinerary = {
        ...formData as Itinerary,
        id: crypto.randomUUID(),
        itineraryCode,
        createdAt: now,
        updatedAt: now,
      };
      addItinerary(newItinerary);
      toast({
        title: 'Itinerary created',
        description: `${itineraryCode} has been saved.`,
      });
      navigate(`/preview/${newItinerary.id}`);
      return;
    }
  };

  const handlePreview = () => {
    handleSave();
    if (isEditing && id) {
      navigate(`/preview/${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border py-4 px-6 flex items-center justify-between bg-card sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Itinerary studio</h1>
            <p className="text-sm text-primary font-medium">{itineraryCode}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handlePreview}
            className="border-border text-foreground hover:bg-secondary"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview itinerary
          </Button>
          <Button
            onClick={handleSave}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Confirm & save
          </Button>
        </div>
      </header>

      {/* Step Navigation */}
      <nav className="border-b border-border py-4 px-6 bg-card/50">
        <div className="flex items-center gap-3 max-w-4xl mx-auto">
          {STEPS.map((step) => (
            <button
              key={step.id}
              onClick={() => setCurrentStep(step.id)}
              className={`step-pill ${
                currentStep === step.id ? 'step-pill-active' : 'step-pill-inactive'
              }`}
            >
              Step {step.id}: {step.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Form Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6 animate-fade-in">
          {currentStep === 1 && (
            <StepSummary
              formData={formData}
              updateFormData={updateFormData}
              onNext={handleNext}
            />
          )}
          {currentStep === 2 && (
            <StepItinerary
              formData={formData}
              updateFormData={updateFormData}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          )}
          {currentStep === 3 && (
            <StepDetails
              formData={formData}
              updateFormData={updateFormData}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          )}
          {currentStep === 4 && (
            <StepPolicies
              formData={formData}
              updateFormData={updateFormData}
              onPrevious={handlePrevious}
              onSave={handleSave}
              onPreview={handlePreview}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default ItineraryStudio;
