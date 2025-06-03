import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useAdmin } from "@/hooks/useAdmin";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useSamplePacks } from "@/hooks/useSamplePacks";
import { useQueryClient } from "@tanstack/react-query";
import { convertYouTubeToAudioUrl, isYouTubeUrl } from "@/utils/youtubeProcessor";
import EditSamplePackModal from "@/components/admin/EditSamplePackModal";
import { SamplePack } from "@/types/types";

const Admin = () => {
  const { user } = useAuth();
  const { data: isAdmin, isLoading: adminLoading } = useAdmin();
  const { data: samplePacks = [], isLoading: packsLoading } = useSamplePacks();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    bpm: '',
    price: '',
    image_url: '',
    preview_url: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingPack, setEditingPack] = useState<SamplePack | null>(null);

  if (!user) {
    navigate("/login");
    return null;
  }

  if (adminLoading) {
    return (
      <div className="container py-5">
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Access Denied</h4>
          <p>You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

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
        .insert({
          title: formData.title,
          description: formData.description,
          genre: formData.genre,
          bpm: parseInt(formData.bpm),
          price: parseFloat(formData.price),
          image_url: formData.image_url,
          preview_url: processedPreviewUrl
        });

      if (error) {
        console.error('Error creating sample pack:', error);
        toast.error('Failed to create sample pack');
        return;
      }

      toast.success('Sample pack created successfully!');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        genre: '',
        bpm: '',
        price: '',
        image_url: '',
        preview_url: ''
      });

      // Refresh the sample packs data
      queryClient.invalidateQueries({ queryKey: ['samplePacks'] });
      queryClient.invalidateQueries({ queryKey: ['genres'] });

    } catch (error) {
      console.error('Error creating sample pack:', error);
      toast.error('Failed to create sample pack');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (packId: string) => {
    if (!confirm('Are you sure you want to delete this sample pack?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('sample_packs')
        .delete()
        .eq('id', packId);

      if (error) {
        console.error('Error deleting sample pack:', error);
        toast.error('Failed to delete sample pack');
        return;
      }

      toast.success('Sample pack deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['samplePacks'] });
      queryClient.invalidateQueries({ queryKey: ['genres'] });

    } catch (error) {
      console.error('Error deleting sample pack:', error);
      toast.error('Failed to delete sample pack');
    }
  };

  const handleEditSave = () => {
    queryClient.invalidateQueries({ queryKey: ['samplePacks'] });
    queryClient.invalidateQueries({ queryKey: ['genres'] });
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">Admin Panel</h1>

      {/* Create Sample Pack Form */}
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="mb-0">Create New Sample Pack</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="genre" className="form-label">Genre *</label>
                      <select
                        className="form-select"
                        id="genre"
                        name="genre"
                        value={formData.genre}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Genre</option>
                        <option value="House">House</option>
                        <option value="Techno">Techno</option>
                        <option value="Hip Hop">Hip Hop</option>
                        <option value="Trap">Trap</option>
                        <option value="Ambient">Ambient</option>
                        <option value="Pop">Pop</option>
                        <option value="Drum & Bass">Drum & Bass</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="bpm" className="form-label">BPM *</label>
                      <input
                        type="number"
                        className="form-control"
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
                </div>

                <div className="mb-3">
                  <label htmlFor="price" className="form-label">Price (USD) *</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    id="price"
                    name="price"
                    min="0"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="image_url" className="form-label">Image URL</label>
                  <input
                    type="url"
                    className="form-control"
                    id="image_url"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="preview_url" className="form-label">Preview Audio URL (supports YouTube)</label>
                  <input
                    type="url"
                    className="form-control"
                    id="preview_url"
                    name="preview_url"
                    value={formData.preview_url}
                    onChange={handlePreviewUrlChange}
                    placeholder="https://youtube.com/watch?v=... or direct audio URL"
                  />
                  {isYouTubeUrl(formData.preview_url) && (
                    <div className="form-text text-primary">
                      YouTube URL detected - will be processed for audio playback
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating...' : 'Create Sample Pack'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Existing Sample Packs */}
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-header">
              <h3 className="mb-0">Manage Sample Packs</h3>
            </div>
            <div className="card-body p-0" style={{ height: 'calc(100vh - 200px)', maxHeight: '600px' }}>
              {packsLoading ? (
                <div className="text-center p-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <div className="overflow-auto h-100">
                  <div className="list-group list-group-flush">
                    {samplePacks.map((pack) => (
                      <div key={pack.id} className="list-group-item p-3">
                        <div className="d-flex justify-content-between align-items-start">
                          <div className="flex-grow-1 me-2">
                            <h6 className="mb-1 text-truncate">{pack.title}</h6>
                            <small className="text-muted d-block">{pack.genre} • {pack.bpm} BPM • ${pack.price}</small>
                            <small className="text-muted d-block text-truncate" style={{ maxWidth: '250px' }}>
                              Preview: {pack.previewUrl}
                            </small>
                          </div>
                          <div className="btn-group btn-group-sm flex-shrink-0">
                            <button
                              className="btn btn-outline-primary btn-sm"
                              onClick={() => setEditingPack(pack)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => handleDelete(pack.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingPack && (
        <EditSamplePackModal
          pack={editingPack}
          isOpen={!!editingPack}
          onClose={() => setEditingPack(null)}
          onSave={handleEditSave}
        />
      )}
    </div>
  );
};

export default Admin;
