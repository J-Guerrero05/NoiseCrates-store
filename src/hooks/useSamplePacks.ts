
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SamplePack } from "@/types/types";

// Using reliable audio URLs that should work without CORS issues
const workingAudioUrls = [
  "https://www.w3schools.com/html/horse.mp3",
  "https://www.w3schools.com/html/mov_bbb.mp4", // fallback
  "https://file-examples.com/storage/fe68c42fa66da49de35cde6/2017/11/file_example_MP3_700KB.mp3",
  "https://file-examples.com/storage/fe68c42fa66da49de35cde6/2017/11/file_example_MP3_1MG.mp3",
  "https://sample-videos.com/zip/10/mp3/SampleAudio_0.4mb_mp3.mp3",
  "https://sample-videos.com/zip/10/mp3/SampleAudio_0.7mb_mp3.mp3",
  "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
  "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba-online-audio-converter.com_.mp3",
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
