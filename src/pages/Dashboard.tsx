import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Bookmark, Search, Eye, Pencil, Copy, Trash2, Users, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import Logo from '@/components/Logo';
import { useItineraryStore } from '@/store/itineraryStore';

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItineraryId, setSelectedItineraryId] = useState<string | null>(null);
  
  const { itineraries, deleteItinerary, duplicateItinerary } = useItineraryStore();

  const filteredItineraries = itineraries.filter((itinerary) => {
    const query = searchQuery.toLowerCase();
    return (
      itinerary.clientName.toLowerCase().includes(query) ||
      itinerary.destination.toLowerCase().includes(query) ||
      itinerary.duration.toLowerCase().includes(query) ||
      itinerary.itineraryCode.toLowerCase().includes(query)
    );
  });

  const handleView = (id: string) => {
    navigate(`/preview/${id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`/studio/${id}`);
  };

  const handleCopy = (id: string) => {
    const duplicate = duplicateItinerary(id);
    toast({
      title: 'Itinerary duplicated',
      description: `Created ${duplicate.itineraryCode}`,
    });
  };

  const handleDeleteClick = (id: string) => {
    setSelectedItineraryId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedItineraryId) {
      deleteItinerary(selectedItineraryId);
      toast({
        title: 'Itinerary deleted',
        description: 'The itinerary has been permanently removed.',
      });
    }
    setDeleteDialogOpen(false);
    setSelectedItineraryId(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border py-6">
        <div className="container flex justify-center">
          <Logo size="lg" />
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button
            onClick={() => navigate('/studio/new')}
            className="flex-1 sm:flex-none bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-6 text-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create itinerary
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/keywords')}
            className="flex-1 sm:flex-none border-border text-foreground hover:bg-secondary py-6"
          >
            <Bookmark className="w-5 h-5 mr-2" />
            Manage keywords
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search client name, destination, or duration..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 py-6 bg-card border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>

        {/* Itineraries Table */}
        {filteredItineraries.length === 0 ? (
          <div className="card-navy p-12 text-center animate-fade-in">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
              <MapPin className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="heading-md text-foreground mb-2">No itineraries yet</h3>
            <p className="text-muted-foreground mb-6">
              Create your first travel itinerary to get started
            </p>
            <Button
              onClick={() => navigate('/studio/new')}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create your first itinerary
            </Button>
          </div>
        ) : (
          <div className="card-navy overflow-hidden animate-fade-in">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground font-medium">Client</TableHead>
                  <TableHead className="text-muted-foreground font-medium">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Destination
                    </div>
                  </TableHead>
                  <TableHead className="text-muted-foreground font-medium">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Duration
                    </div>
                  </TableHead>
                  <TableHead className="text-muted-foreground font-medium">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Pax
                    </div>
                  </TableHead>
                  <TableHead className="text-muted-foreground font-medium text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItineraries.map((itinerary) => (
                  <TableRow
                    key={itinerary.id}
                    className="border-border hover:bg-secondary/50 transition-colors"
                  >
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{itinerary.clientName}</p>
                        <p className="text-sm text-muted-foreground">{itinerary.itineraryCode}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-foreground">{itinerary.destination}</TableCell>
                    <TableCell className="text-foreground">{itinerary.duration}</TableCell>
                    <TableCell className="text-foreground">{itinerary.groupSize}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleView(itinerary.id)}
                          className="text-muted-foreground hover:text-foreground hover:bg-secondary"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(itinerary.id)}
                          className="text-muted-foreground hover:text-foreground hover:bg-secondary"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleCopy(itinerary.id)}
                          className="text-muted-foreground hover:text-foreground hover:bg-secondary"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteClick(itinerary.id)}
                          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">Delete itinerary?</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              This action cannot be undone. This will permanently delete the itinerary
              and all its data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-border text-foreground hover:bg-secondary">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Dashboard;
