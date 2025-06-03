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

      // Map DB fields to SamplePack interface, using the real preview_url from DB
      return data.map((pack: Record<string, unknown>) => ({
        id: pack.id as string,
        title: pack.title as string,
        description: (pack.description as string) || '',
        genre: pack.genre as string,
        bpm: pack.bpm as number,
        price: Number(pack.price),
        imageUrl: (pack.image_url as string) || '',
        previewUrl: (pack.preview_url as string) || '',
        createdAt: pack.created_at as string
      }));
    },
  });
};
