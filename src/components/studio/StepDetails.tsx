import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Itinerary } from '@/types/itinerary';

interface StepDetailsProps {
  formData: Partial<Itinerary>;
  updateFormData: (updates: Partial<Itinerary>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const StepDetails = ({ formData, updateFormData, onNext, onPrevious }: StepDetailsProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Inclusions */}
        <div className="card-navy p-6">
          <h2 className="heading-md text-foreground mb-4">Inclusions</h2>
          <p className="text-sm text-muted-foreground mb-3">Enter one item per line</p>
          <Textarea
            value={(formData.inclusions || []).join('\n')}
            onChange={(e) =>
              updateFormData({
                inclusions: e.target.value.split('\n').filter((i) => i.trim()),
              })
            }
            placeholder="Private Vehicle&#10;Driver Allowance&#10;Parking & Toll&#10;Accommodation&#10;Breakfast & Dinner&#10;Sightseeing tickets"
            className="bg-input border-border text-foreground min-h-[300px]"
          />
        </div>

        {/* Exclusions */}
        <div className="card-navy p-6">
          <h2 className="heading-md text-foreground mb-4">Exclusions</h2>
          <p className="text-sm text-muted-foreground mb-3">Enter one item per line</p>
          <Textarea
            value={(formData.exclusions || []).join('\n')}
            onChange={(e) =>
              updateFormData({
                exclusions: e.target.value.split('\n').filter((i) => i.trim()),
              })
            }
            placeholder="GST 5%&#10;Personal Expenses&#10;Airfare / Train fare&#10;Lunch&#10;Monument fees"
            className="bg-input border-border text-foreground min-h-[300px]"
          />
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
        <Button
          onClick={onNext}
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default StepDetails;
