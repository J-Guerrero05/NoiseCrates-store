
import { useState, useEffect } from "react";
import { SamplePack } from "@/types/types";

interface UseStoreFiltersProps {
  samplePacks: SamplePack[];
}

export const useStoreFilters = ({ samplePacks }: UseStoreFiltersProps) => {
  const [filteredPacks, setFilteredPacks] = useState<SamplePack[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      const filtered = samplePacks.filter(pack => 
        pack.title.toLowerCase().includes(lowercaseQuery)
      );
      setFilteredPacks(filtered);
    } else {
      handleFilterChange("All", 80, 180);
    }
  };

  const handleFilterChange = (genre: string, minBpm: number, maxBpm: number) => {
    let filtered = samplePacks;

    if (genre !== "All") {
      filtered = filtered.filter((pack) => pack.genre === genre);
    }

    filtered = filtered.filter(
      (pack) => pack.bpm >= minBpm && pack.bpm <= maxBpm
    );

    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(pack => 
        pack.title.toLowerCase().includes(lowercaseQuery)
      );
    }

    setFilteredPacks(filtered);
  };

  useEffect(() => {
    if (samplePacks.length > 0) {
      handleFilterChange("All", 80, 180);
    }
  }, [samplePacks]);

  return {
    filteredPacks,
    searchQuery,
    handleSearch,
    handleFilterChange
  };
};
