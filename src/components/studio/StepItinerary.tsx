import { useState } from 'react';
import { Plus, Trash2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Itinerary, DayPlan } from '@/types/itinerary';
import { useItineraryStore } from '@/store/itineraryStore';

interface StepItineraryProps {
  formData: Partial<Itinerary>;
  updateFormData: (updates: Partial<Itinerary>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const StepItinerary = ({ formData, updateFormData, onNext, onPrevious }: StepItineraryProps) => {
  const [showDay0, setShowDay0] = useState(false);
  const { searchKeywords } = useItineraryStore();

  const addDay = () => {
    const currentDays = formData.dayPlans || [];
    const nextDayNumber = showDay0 
      ? currentDays.length 
      : currentDays.length + 1;
    
    const newDay: DayPlan = {
      id: crypto.randomUUID(),
      dayNumber: nextDayNumber,
      keyword: '',
      title: '',
      date: '',
      activities: [],
    };
    updateFormData({
      dayPlans: [...currentDays, newDay],
    });
  };

  const updateDay = (id: string, updates: Partial<DayPlan>) => {
    updateFormData({
      dayPlans: (formData.dayPlans || []).map((d) =>
        d.id === id ? { ...d, ...updates } : d
      ),
    });
  };

  const removeDay = (id: string) => {
    const updatedDays = (formData.dayPlans || []).filter((d) => d.id !== id);
    // Re-number days
    const renumberedDays = updatedDays.map((day, index) => ({
      ...day,
      dayNumber: showDay0 ? index : index + 1,
    }));
    updateFormData({ dayPlans: renumberedDays });
  };

  const handleKeywordSearch = (dayId: string, keyword: string) => {
    const results = searchKeywords(keyword);
    if (results.length > 0) {
      const match = results.find(
        (k) => k.keyword.toLowerCase() === keyword.toLowerCase()
      );
      if (match) {
        updateDay(dayId, { 
          keyword, 
          activities: match.activities 
        });
        return;
      }
    }
    updateDay(dayId, { keyword });
  };

  const handleDay0Toggle = (enabled: boolean) => {
    setShowDay0(enabled);
    if (enabled) {
      // Add Day 0 at the beginning
      const day0: DayPlan = {
        id: crypto.randomUUID(),
        dayNumber: 0,
        keyword: '',
        title: 'Arrival & Check-in',
        date: '',
        activities: [],
      };
      const updatedDays = [day0, ...(formData.dayPlans || [])];
      updateFormData({ dayPlans: updatedDays });
    } else {
      // Remove Day 0 and renumber
      const updatedDays = (formData.dayPlans || [])
        .filter((d) => d.dayNumber !== 0)
        .map((day, index) => ({ ...day, dayNumber: index + 1 }));
      updateFormData({ dayPlans: updatedDays });
    }
  };

  return (
    <div className="space-y-6">
      {/* Day 0 Toggle */}
      <div className="card-navy p-4">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-foreground font-medium">Show day 0</Label>
            <p className="text-sm text-muted-foreground">Enable day 0 for pre-trip details</p>
          </div>
          <Switch
            checked={showDay0}
            onCheckedChange={handleDay0Toggle}
          />
        </div>
      </div>

      {/* Day Cards */}
      <div className="space-y-4">
        {(formData.dayPlans || []).map((day) => (
          <div key={day.id} className="card-navy p-6 animate-fade-in">
            <div className="flex items-start gap-4">
              {/* Day Number Badge */}
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0">
                <span className="text-primary-foreground font-bold text-lg">{day.dayNumber}</span>
              </div>

              {/* Day Content */}
              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                    {/* Keyword Search */}
                    <div className="space-y-2">
                      <Label className="text-muted-foreground text-sm">Keyword</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          value={day.keyword}
                          onChange={(e) => handleKeywordSearch(day.id, e.target.value)}
                          placeholder="e.g. Ooty1day"
                          className="bg-input border-border text-foreground pl-10"
                        />
                      </div>
                    </div>

                    {/* Day Title */}
                    <div className="space-y-2">
                      <Label className="text-muted-foreground text-sm">Day title</Label>
                      <Input
                        value={day.title}
                        onChange={(e) => updateDay(day.id, { title: e.target.value })}
                        placeholder="e.g. Arrival & Welcome"
                        className="bg-input border-border text-foreground"
                      />
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeDay(day.id)}
                    className="text-muted-foreground hover:text-destructive ml-4"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-sm">Specific date</Label>
                  <Input
                    type="date"
                    value={day.date}
                    onChange={(e) => updateDay(day.id, { date: e.target.value })}
                    className="bg-input border-border text-foreground max-w-xs"
                  />
                </div>

                {/* Activities */}
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-sm">Activities (one per line)</Label>
                  <Textarea
                    value={day.activities.join('\n')}
                    onChange={(e) =>
                      updateDay(day.id, {
                        activities: e.target.value.split('\n').filter((a) => a.trim()),
                      })
                    }
                    placeholder="Check-in and relaxation&#10;Visit Mysore Palace&#10;Lunch at local hotel&#10;Chamundi Hills sunset"
                    className="bg-input border-border text-foreground min-h-[120px]"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Day Button */}
      <Button
        onClick={addDay}
        variant="outline"
        className="w-full border-dashed border-border text-muted-foreground hover:text-foreground hover:bg-secondary py-6"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add day
      </Button>

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

export default StepItinerary;
