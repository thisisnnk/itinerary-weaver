import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import { useItineraryStore } from '@/store/itineraryStore';
import { Keyword } from '@/types/itinerary';

const KeywordsManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { keywords, addKeyword, updateKeyword, deleteKeyword } = useItineraryStore();

  const [keyword, setKeyword] = useState('');
  const [activities, setActivities] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedKeywordId, setSelectedKeywordId] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!keyword.trim()) {
      toast({
        title: 'Keyword required',
        description: 'Please enter a unique keyword.',
        variant: 'destructive',
      });
      return;
    }

    const activitiesArray = activities.split('\n').filter((a) => a.trim());

    if (editingId) {
      updateKeyword(editingId, {
        keyword: keyword.trim(),
        activities: activitiesArray,
      });
      toast({
        title: 'Keyword updated',
        description: `"${keyword}" has been updated.`,
      });
      setEditingId(null);
    } else {
      // Check for duplicate
      const exists = keywords.some(
        (k) => k.keyword.toLowerCase() === keyword.trim().toLowerCase()
      );
      if (exists) {
        toast({
          title: 'Keyword exists',
          description: 'This keyword already exists. Please use a unique name.',
          variant: 'destructive',
        });
        return;
      }

      const newKeyword: Keyword = {
        id: crypto.randomUUID(),
        keyword: keyword.trim(),
        activities: activitiesArray,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      addKeyword(newKeyword);
      toast({
        title: 'Keyword added',
        description: `"${keyword}" has been saved.`,
      });
    }

    setKeyword('');
    setActivities('');
  };

  const handleEdit = (kw: Keyword) => {
    setEditingId(kw.id);
    setKeyword(kw.keyword);
    setActivities(kw.activities.join('\n'));
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setKeyword('');
    setActivities('');
  };

  const handleDeleteClick = (id: string) => {
    setSelectedKeywordId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedKeywordId) {
      deleteKeyword(selectedKeywordId);
      toast({
        title: 'Keyword deleted',
        description: 'The keyword has been removed.',
      });
    }
    setDeleteDialogOpen(false);
    setSelectedKeywordId(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border py-6 px-6">
        <div className="container">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="heading-lg text-foreground">Keyword templates</h1>
          <p className="text-muted-foreground">Manage reusable day plans</p>
        </div>
      </header>

      <main className="container py-8 space-y-8">
        {/* Add/Edit Form */}
        <div className="card-navy p-6">
          <h2 className="heading-md text-foreground mb-4">
            {editingId ? 'Edit template' : 'Add new template'}
          </h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="keyword" className="text-muted-foreground">
                Keyword (Unique identifier)
              </Label>
              <Input
                id="keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="e.g. Mysore1day"
                className="bg-input border-border text-foreground max-w-md"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="activities" className="text-muted-foreground">
                Day plan activities (One per line)
              </Label>
              <Textarea
                id="activities"
                value={activities}
                onChange={(e) => setActivities(e.target.value)}
                placeholder="Visit Mysore Palace&#10;Lunch at local hotel&#10;Chamundi Hills sunset..."
                className="bg-input border-border text-foreground min-h-[150px]"
              />
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleSubmit}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                {editingId ? 'Update template' : 'Add template'}
              </Button>
              {editingId && (
                <Button
                  variant="outline"
                  onClick={handleCancelEdit}
                  className="border-border text-foreground hover:bg-secondary"
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Keywords List */}
        <div className="card-navy overflow-hidden">
          <div className="p-4 border-b border-border">
            <h2 className="heading-md text-foreground">Saved templates</h2>
          </div>
          {keywords.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">No keywords saved yet. Add your first template above.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground font-medium">Keyword</TableHead>
                  <TableHead className="text-muted-foreground font-medium">Activities</TableHead>
                  <TableHead className="text-muted-foreground font-medium text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {keywords.map((kw) => (
                  <TableRow
                    key={kw.id}
                    className="border-border hover:bg-secondary/50 transition-colors"
                  >
                    <TableCell className="font-medium text-foreground">{kw.keyword}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {kw.activities.slice(0, 2).join(', ')}
                      {kw.activities.length > 2 && ` +${kw.activities.length - 2} more`}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(kw)}
                          className="text-muted-foreground hover:text-foreground hover:bg-secondary"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteClick(kw.id)}
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
          )}
        </div>
      </main>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">Delete keyword?</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              This action cannot be undone. This will permanently delete the keyword template.
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

export default KeywordsManagement;
