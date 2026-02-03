import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Itinerary, BankDetails } from '@/types/itinerary';
import { Eye } from 'lucide-react';

interface StepPoliciesProps {
  formData: Partial<Itinerary>;
  updateFormData: (updates: Partial<Itinerary>) => void;
  onPrevious: () => void;
  onSave: () => void;
  onPreview: () => void;
}

const StepPolicies = ({ formData, updateFormData, onPrevious, onSave, onPreview }: StepPoliciesProps) => {
  const updateBankDetails = (updates: Partial<BankDetails>) => {
    updateFormData({
      bankDetails: { ...formData.bankDetails!, ...updates },
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Terms & Conditions */}
        <div className="card-navy p-6">
          <h2 className="heading-md text-foreground mb-4">Terms & Conditions</h2>
          <Textarea
            value={formData.termsConditions || ''}
            onChange={(e) => updateFormData({ termsConditions: e.target.value })}
            className="bg-input border-border text-foreground min-h-[400px] text-sm"
          />
        </div>

        {/* Cancellation Policy */}
        <div className="card-navy p-6">
          <h2 className="heading-md text-foreground mb-4">Cancellation Policy</h2>
          <Textarea
            value={formData.cancellationPolicy || ''}
            onChange={(e) => updateFormData({ cancellationPolicy: e.target.value })}
            className="bg-input border-border text-foreground min-h-[400px] text-sm"
          />
        </div>
      </div>

      {/* Bank Details */}
      <div className="card-navy p-6">
        <h2 className="heading-md text-foreground mb-4">Company Bank Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label className="text-muted-foreground text-sm">Bank & branch</Label>
            <Input
              value={formData.bankDetails?.bank || ''}
              onChange={(e) => updateBankDetails({ bank: e.target.value })}
              placeholder="Yes Bank, Gandhipuram"
              className="bg-input border-border text-foreground"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-muted-foreground text-sm">A/c name</Label>
            <Input
              value={formData.bankDetails?.accountName || ''}
              onChange={(e) => updateBankDetails({ accountName: e.target.value })}
              placeholder="Adventure Holidays"
              className="bg-input border-border text-foreground"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-muted-foreground text-sm">A/c number</Label>
            <Input
              value={formData.bankDetails?.accountNumber || ''}
              onChange={(e) => updateBankDetails({ accountNumber: e.target.value })}
              placeholder="135261900002320"
              className="bg-input border-border text-foreground"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-muted-foreground text-sm">IFSC code</Label>
            <Input
              value={formData.bankDetails?.ifscCode || ''}
              onChange={(e) => updateBankDetails({ ifscCode: e.target.value })}
              placeholder="YESB0001352"
              className="bg-input border-border text-foreground"
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={onPrevious}
          className="border-border text-foreground hover:bg-secondary px-8"
        >
          Previous
        </Button>
        <div className="flex gap-3">
          <Button
            onClick={onSave}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
          >
            Confirm & Save
          </Button>
          <Button
            variant="outline"
            onClick={onPreview}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview itinerary
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StepPolicies;
