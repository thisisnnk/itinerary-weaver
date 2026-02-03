import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Itinerary, CustomHeading, PricingSlot } from '@/types/itinerary';

interface StepSummaryProps {
  formData: Partial<Itinerary>;
  updateFormData: (updates: Partial<Itinerary>) => void;
  onNext: () => void;
}

const StepSummary = ({ formData, updateFormData, onNext }: StepSummaryProps) => {
  const addCustomHeading = () => {
    const newHeading: CustomHeading = {
      id: crypto.randomUUID(),
      title: '',
      content: '',
      enabled: true,
    };
    updateFormData({
      customHeadings: [...(formData.customHeadings || []), newHeading],
    });
  };

  const updateCustomHeading = (id: string, updates: Partial<CustomHeading>) => {
    updateFormData({
      customHeadings: (formData.customHeadings || []).map((h) =>
        h.id === id ? { ...h, ...updates } : h
      ),
    });
  };

  const removeCustomHeading = (id: string) => {
    updateFormData({
      customHeadings: (formData.customHeadings || []).filter((h) => h.id !== id),
    });
  };

  const addPricingSlot = () => {
    const newSlot: PricingSlot = {
      id: crypto.randomUUID(),
      label: '',
      price: 0,
      unit: 'Per Pax',
    };
    updateFormData({
      pricingSlots: [...(formData.pricingSlots || []), newSlot],
    });
  };

  const updatePricingSlot = (id: string, updates: Partial<PricingSlot>) => {
    updateFormData({
      pricingSlots: (formData.pricingSlots || []).map((s) =>
        s.id === id ? { ...s, ...updates } : s
      ),
    });
  };

  const removePricingSlot = (id: string) => {
    updateFormData({
      pricingSlots: (formData.pricingSlots || []).filter((s) => s.id !== id),
    });
  };

  return (
    <div className="space-y-8">
      {/* Consultant Details */}
      <section className="card-navy p-6">
        <h2 className="heading-md text-foreground mb-4">Consultant Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="consultantName" className="text-muted-foreground">Consultant name</Label>
            <Input
              id="consultantName"
              value={formData.consultantName || ''}
              onChange={(e) => updateFormData({ consultantName: e.target.value })}
              placeholder="Enter consultant name"
              className="bg-input border-border text-foreground"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="consultantNumber" className="text-muted-foreground">Consultant number</Label>
            <Input
              id="consultantNumber"
              value={formData.consultantNumber || ''}
              onChange={(e) => updateFormData({ consultantNumber: e.target.value })}
              placeholder="+91 9876543210"
              className="bg-input border-border text-foreground"
            />
          </div>
        </div>
      </section>

      {/* Quotation Details */}
      <section className="card-navy p-6">
        <h2 className="heading-md text-foreground mb-4">Quotation Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="quotationDate" className="text-muted-foreground">Quotation date</Label>
            <Input
              id="quotationDate"
              type="date"
              value={formData.quotationDate || ''}
              onChange={(e) => updateFormData({ quotationDate: e.target.value })}
              className="bg-input border-border text-foreground"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sourceOfLead" className="text-muted-foreground">Source of Lead</Label>
            <Input
              id="sourceOfLead"
              value={formData.sourceOfLead || ''}
              onChange={(e) => updateFormData({ sourceOfLead: e.target.value })}
              placeholder="e.g. Website, Referral..."
              className="bg-input border-border text-foreground"
            />
          </div>
        </div>
      </section>

      {/* Trip Details */}
      <section className="card-navy p-6">
        <h2 className="heading-md text-foreground mb-4">Trip Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="destination" className="text-muted-foreground">Destination</Label>
            <Input
              id="destination"
              value={formData.destination || ''}
              onChange={(e) => updateFormData({ destination: e.target.value })}
              placeholder="e.g. Kerala, Munnar..."
              className="bg-input border-border text-foreground"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration" className="text-muted-foreground">Duration</Label>
            <Input
              id="duration"
              value={formData.duration || ''}
              onChange={(e) => updateFormData({ duration: e.target.value })}
              placeholder="e.g. 2N/3D"
              className="bg-input border-border text-foreground"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="travelDate" className="text-muted-foreground">Date of travel</Label>
            <Input
              id="travelDate"
              type="date"
              value={formData.travelDate || ''}
              onChange={(e) => updateFormData({ travelDate: e.target.value })}
              className="bg-input border-border text-foreground"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="transportDetails" className="text-muted-foreground">Transport details</Label>
            <Input
              id="transportDetails"
              value={formData.transportDetails || ''}
              onChange={(e) => updateFormData({ transportDetails: e.target.value })}
              placeholder="Enter transport details"
              className="bg-input border-border text-foreground"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="purpose" className="text-muted-foreground">Purpose</Label>
            <Input
              id="purpose"
              value={formData.purpose || ''}
              onChange={(e) => updateFormData({ purpose: e.target.value })}
              placeholder="e.g. Honeymoon, Family Vacation..."
              className="bg-input border-border text-foreground"
            />
          </div>
        </div>
      </section>

      {/* Client Details */}
      <section className="card-navy p-6">
        <h2 className="heading-md text-foreground mb-4">Client Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="clientName" className="text-muted-foreground">Client name</Label>
            <Input
              id="clientName"
              value={formData.clientName || ''}
              onChange={(e) => updateFormData({ clientName: e.target.value })}
              placeholder="Enter client name"
              className="bg-input border-border text-foreground"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="groupSize" className="text-muted-foreground">Group size (Pax)</Label>
            <Input
              id="groupSize"
              type="number"
              min={1}
              value={formData.groupSize || 1}
              onChange={(e) => updateFormData({ groupSize: parseInt(e.target.value) || 1 })}
              className="bg-input border-border text-foreground"
            />
          </div>
        </div>
      </section>

      {/* Custom Information */}
      <section className="card-navy p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="heading-md text-foreground">Custom Information</h2>
          <Button
            onClick={addCustomHeading}
            variant="outline"
            size="sm"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add heading
          </Button>
        </div>
        {(formData.customHeadings || []).length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No custom headings added.</p>
        ) : (
          <div className="space-y-4">
            {(formData.customHeadings || []).map((heading) => (
              <div key={heading.id} className="bg-secondary/50 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={heading.enabled}
                      onCheckedChange={(checked) =>
                        updateCustomHeading(heading.id, { enabled: checked })
                      }
                    />
                    <Input
                      value={heading.title}
                      onChange={(e) =>
                        updateCustomHeading(heading.id, { title: e.target.value })
                      }
                      placeholder="Heading title"
                      className="bg-input border-border text-foreground max-w-xs"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeCustomHeading(heading.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <Textarea
                  value={heading.content}
                  onChange={(e) =>
                    updateCustomHeading(heading.id, { content: e.target.value })
                  }
                  placeholder="Heading content..."
                  className="bg-input border-border text-foreground min-h-[80px]"
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Costing */}
      <section className="card-navy p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="heading-md text-foreground">Costing</h2>
          <Button
            onClick={addPricingSlot}
            variant="outline"
            size="sm"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add pricing slot
          </Button>
        </div>
        {(formData.pricingSlots || []).length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No pricing slots added.</p>
        ) : (
          <div className="space-y-4">
            {(formData.pricingSlots || []).map((slot) => (
              <div key={slot.id} className="bg-secondary/50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-sm">Label</Label>
                    <Input
                      value={slot.label}
                      onChange={(e) =>
                        updatePricingSlot(slot.id, { label: e.target.value })
                      }
                      placeholder="e.g. Inclusive of all meals"
                      className="bg-input border-border text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-sm">Price (₹)</Label>
                    <Input
                      type="number"
                      value={slot.price || ''}
                      onChange={(e) =>
                        updatePricingSlot(slot.id, { price: parseFloat(e.target.value) || 0 })
                      }
                      placeholder="15,000"
                      className="bg-input border-border text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-sm">Unit</Label>
                    <Select
                      value={slot.unit}
                      onValueChange={(value) =>
                        updatePricingSlot(slot.id, { unit: value as PricingSlot['unit'] })
                      }
                    >
                      <SelectTrigger className="bg-input border-border text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="Per Pax">Per Pax</SelectItem>
                        <SelectItem value="Per Room">Per Room</SelectItem>
                        <SelectItem value="Per Person">Per Person</SelectItem>
                        <SelectItem value="Total Package">Total Package</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removePricingSlot(slot.id)}
                    className="text-muted-foreground hover:text-destructive self-end"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Navigation */}
      <div className="flex justify-end pt-4">
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

export default StepSummary;
