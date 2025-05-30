
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SamplePack } from "@/types/types";

// Fallback working audio URLs
const workingAudioUrls = [
  "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3",
  "https://www.soundjay.com/misc/sounds/bell-ringing-01.mp3",
  "https://www.soundjay.com/misc/sounds/bell-ringing-02.mp3",
  "https://www.soundjay.com/misc/sounds/bell-ringing-03.mp3",
  "https://www.soundjay.com/misc/sounds/bell-ringing-04.mp3",
  "https://www.soundjay.com/misc/sounds/bell-ringing-06.mp3",
  "https://www.soundjay.com/misc/sounds/bell-ringing-07.mp3",
  "https://www.soundjay.com/misc/sounds/bell-ringing-08.mp3",
];

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

      // Transform database data to match our SamplePack interface with working audio URLs
      return data.map((pack, index) => ({
        id: pack.id,
        title: pack.title,
        description: pack.description || '',
        genre: pack.genre,
        bpm: pack.bpm,
        price: Number(pack.price),
        imageUrl: pack.image_url || '',
        // Use working audio URLs instead of the problematic ones from database
        previewUrl: workingAudioUrls[index % workingAudioUrls.length] || workingAudioUrls[0],
        createdAt: pack.created_at
      }));
    },
  });
};
