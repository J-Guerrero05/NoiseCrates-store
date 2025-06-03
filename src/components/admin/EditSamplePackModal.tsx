import { useState } from "react";
import { SamplePack } from "@/types/types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { convertYouTubeToAudioUrl, isYouTubeUrl } from "@/utils/youtubeProcessor";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EditSamplePackModalProps {
  pack: SamplePack;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const EditSamplePackModal = ({ pack, isOpen, onClose, onSave }: EditSamplePackModalProps) => {
  const [formData, setFormData] = useState({
    title: pack.title,
    description: pack.description,
    genre: pack.genre,
    bpm: pack.bpm.toString(),
    price: pack.price.toString(),
    image_url: pack.imageUrl,
    preview_url: pack.previewUrl
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePreviewUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setFormData(prev => ({
      ...prev,
      preview_url: url
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let processedPreviewUrl = formData.preview_url;
      
      // Process YouTube URL if detected
      if (isYouTubeUrl(formData.preview_url)) {
        try {
          processedPreviewUrl = convertYouTubeToAudioUrl(formData.preview_url);
          toast.info("YouTube URL detected - processing for audio playback");
        } catch (error) {
          toast.error("Invalid YouTube URL format");
          setIsSubmitting(false);
          return;
        }
      }

      const { error } = await supabase
        .from('sample_packs')
        .update({
          title: formData.title,
          description: formData.description,
          genre: formData.genre,
          bpm: parseInt(formData.bpm),
          price: parseFloat(formData.price),
          image_url: formData.image_url,
          preview_url: processedPreviewUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', pack.id);

      if (error) {
        console.error('Error updating sample pack:', error);
        toast.error('Failed to update sample pack');
        return;
      }

      toast.success('Sample pack updated successfully!');
      onSave();
      onClose();

    } catch (error) {
      console.error('Error updating sample pack:', error);
      toast.error('Failed to update sample pack');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Edit Sample Pack</DialogTitle>
        </DialogHeader>
        
        <div className="overflow-y-auto max-h-[calc(90vh-120px)] pr-2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none"
                id="description"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="genre">Genre *</Label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  id="genre"
                  name="genre"
                  value={formData.genre}
                  onChange={handleInputChange}
                  required
                >
                  <option value="House">House</option>
                  <option value="Techno">Techno</option>
                  <option value="Hip Hop">Hip Hop</option>
                  <option value="Trap">Trap</option>
                  <option value="Ambient">Ambient</option>
                  <option value="Pop">Pop</option>
                  <option value="Drum & Bass">Drum & Bass</option>
                </select>
              </div>
              <div>
                <Label htmlFor="bpm">BPM *</Label>
                <Input
                  type="number"
                  id="bpm"
                  name="bpm"
                  min="60"
                  max="200"
                  value={formData.bpm}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="price">Price (USD) *</Label>
              <Input
                type="number"
                step="0.01"
                id="price"
                name="price"
                min="0"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                type="url"
                id="image_url"
                name="image_url"
                value={formData.image_url}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label htmlFor="preview_url">Preview Audio URL (supports YouTube)</Label>
              <Input
                type="url"
                id="preview_url"
                name="preview_url"
                value={formData.preview_url}
                onChange={handlePreviewUrlChange}
                placeholder="https://youtube.com/watch?v=... or direct audio URL"
              />
              {isYouTubeUrl(formData.preview_url) && (
                <p className="text-sm text-blue-600 mt-1">
                  YouTube URL detected - will be processed for audio playback
                </p>
              )}
            </div>

            <div className="flex gap-2 pt-4 sticky bottom-0 bg-white border-t mt-6 -mx-2 px-2 py-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isSubmitting ? 'Updating...' : 'Update Pack'}
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditSamplePackModal;
