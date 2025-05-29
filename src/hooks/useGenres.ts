
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useGenres = () => {
  return useQuery({
    queryKey: ['genres'],
    queryFn: async (): Promise<string[]> => {
      const { data, error } = await supabase
        .from('sample_packs')
        .select('genre')
        .order('genre');

      if (error) {
        console.error('Error fetching genres:', error);
        throw error;
      }

      // Get unique genres and add "All" at the beginning
      const uniqueGenres = [...new Set(data.map(item => item.genre))];
      return ['All', ...uniqueGenres];
    },
  });
};
