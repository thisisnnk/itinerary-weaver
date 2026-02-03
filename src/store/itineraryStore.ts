import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Itinerary, Keyword } from '@/types/itinerary';

interface ItineraryStore {
  itineraries: Itinerary[];
  keywords: Keyword[];
  currentItinerary: Partial<Itinerary> | null;
  
  // Itinerary actions
  addItinerary: (itinerary: Itinerary) => void;
  updateItinerary: (id: string, updates: Partial<Itinerary>) => void;
  deleteItinerary: (id: string) => void;
  duplicateItinerary: (id: string) => Itinerary;
  getItinerary: (id: string) => Itinerary | undefined;
  setCurrentItinerary: (itinerary: Partial<Itinerary> | null) => void;
  
  // Keyword actions
  addKeyword: (keyword: Keyword) => void;
  updateKeyword: (id: string, updates: Partial<Keyword>) => void;
  deleteKeyword: (id: string) => void;
  searchKeywords: (query: string) => Keyword[];
  
  // Code generation
  generateItineraryCode: () => string;
}

export const useItineraryStore = create<ItineraryStore>()(
  persist(
    (set, get) => ({
      itineraries: [],
      keywords: [],
      currentItinerary: null,

      addItinerary: (itinerary) =>
        set((state) => ({
          itineraries: [itinerary, ...state.itineraries],
        })),

      updateItinerary: (id, updates) =>
        set((state) => ({
          itineraries: state.itineraries.map((it) =>
            it.id === id ? { ...it, ...updates, updatedAt: new Date().toISOString() } : it
          ),
        })),

      deleteItinerary: (id) =>
        set((state) => ({
          itineraries: state.itineraries.filter((it) => it.id !== id),
        })),

      duplicateItinerary: (id) => {
        const original = get().itineraries.find((it) => it.id === id);
        if (!original) throw new Error('Itinerary not found');
        
        const newCode = get().generateItineraryCode();
        const duplicate: Itinerary = {
          ...original,
          id: crypto.randomUUID(),
          itineraryCode: newCode,
          clientName: `${original.clientName} (Copy)`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        set((state) => ({
          itineraries: [duplicate, ...state.itineraries],
        }));
        
        return duplicate;
      },

      getItinerary: (id) => get().itineraries.find((it) => it.id === id),

      setCurrentItinerary: (itinerary) =>
        set({ currentItinerary: itinerary }),

      addKeyword: (keyword) =>
        set((state) => ({
          keywords: [keyword, ...state.keywords],
        })),

      updateKeyword: (id, updates) =>
        set((state) => ({
          keywords: state.keywords.map((kw) =>
            kw.id === id ? { ...kw, ...updates, updatedAt: new Date().toISOString() } : kw
          ),
        })),

      deleteKeyword: (id) =>
        set((state) => ({
          keywords: state.keywords.filter((kw) => kw.id !== id),
        })),

      searchKeywords: (query) => {
        const keywords = get().keywords;
        if (!query) return keywords;
        return keywords.filter((kw) =>
          kw.keyword.toLowerCase().includes(query.toLowerCase())
        );
      },

      generateItineraryCode: () => {
        const year = new Date().getFullYear().toString().slice(-2);
        const prefix = `AH${year}-DOM-FIT-`;
        const existingCodes = get().itineraries.map((it) => it.itineraryCode);
        
        let counter = 1;
        let newCode = `${prefix}${String(counter).padStart(3, '0')}`;
        
        while (existingCodes.includes(newCode)) {
          counter++;
          newCode = `${prefix}${String(counter).padStart(3, '0')}`;
        }
        
        return newCode;
      },
    }),
    {
      name: 'adventure-holidays-storage',
    }
  )
);
