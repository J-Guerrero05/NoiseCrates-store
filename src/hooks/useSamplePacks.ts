
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SamplePack } from "@/types/types";

export const useSamplePacks = () => {
  return useQuery({
    queryKey: ['samplePacks'],
    queryFn: async (): Promise<SamplePack[]> => {
      const { data, error } = await supabase
        .from('sample_packs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching sample packs:', error);
        throw error;
      }

      // Transform database data to match our SamplePack interface
      return data.map(pack => ({
        id: pack.id,
        title: pack.title,
        description: pack.description || '',
        genre: pack.genre,
        bpm: pack.bpm,
        price: Number(pack.price),
        imageUrl: pack.image_url || '',
        previewUrl: pack.preview_url || '',
        createdAt: pack.created_at
      }));
    },
  });
};
