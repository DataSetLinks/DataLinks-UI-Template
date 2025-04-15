"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

type SearchFormProps = {
  handleSearch: (searchQuery: string) => void;
  loading: boolean;
};

export function SearchForm({ handleSearch, loading }: SearchFormProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleSearch(searchQuery);
  };

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-lg mx-auto gap-2 mb-8">
      <Input
        type="text"
        placeholder="Enter search term..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-1"
      />
      <Button type="submit" disabled={loading}>
        {loading ? (
          <span className="flex items-center gap-1">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Searching
          </span>
        ) : (
          <span className="flex items-center gap-1">
            <Search className="h-4 w-4" />
            Search
          </span>
        )}
      </Button>
    </form>
  );
}
