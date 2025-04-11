"use client";

import { queryAPI } from "@/api/query";

import { generateColumnsBasedOnData } from "@/app/utils";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<Record<string, string>[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response: Record<string, string>[] = await queryAPI(searchQuery);

      setResults(response);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("An error occurred while fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const columns = useMemo(() => generateColumnsBasedOnData(results), [results]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="container mx-auto py-10 px-4 max-w-7xl flex-grow">
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">DataLinks Search API</CardTitle>
            <CardDescription>Enter your search query to fetch data from the DataLinks</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex w-full max-w-lg mx-auto gap-2 mb-8">
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

            {error && <div className="text-red-500 text-center mb-4">{error}</div>}

            {results.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {columns.map((column, index) => (
                        <TableHead className="max-w-[200px]" key={`${index}_${column}`}>
                          {column}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((item, index) => (
                      <TableRow key={index}>
                        {columns.map((column, index) => (
                          <TableCell className="max-w-[200px]" key={`${index}_${column}`}>
                            {item[column]}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              !loading &&
              searchQuery && (
                <div className="text-center text-muted-foreground">No results found. Try a different search term.</div>
              )
            )}

            {!searchQuery && !loading && results.length == 0 && (
              <div className="text-center text-muted-foreground">
                Enter a search term and click Search to see results.
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
