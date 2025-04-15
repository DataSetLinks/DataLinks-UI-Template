"use client";

import { queryAPI } from "@/api/query";

import { generateColumnsBasedOnData } from "@/app/utils";
import { Footer } from "@/components/footer";
import { SearchForm } from "@/components/search-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useMemo, useState } from "react";

export default function SearchPage() {
  const [searchedFor, setSearchedFor] = useState("");
  const [results, setResults] = useState<Record<string, string>[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (searchQuery: string) => {
    setLoading(true);
    setError("");
    setSearchedFor(searchQuery);

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
            <SearchForm handleSearch={handleSearch} loading={loading} />
            {error && <div className="text-red-500 text-center mb-4">{error}</div>}

            {results && results.length > 0 ? (
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
              searchedFor && (
                <div className="text-center text-muted-foreground">No results found. Try a different search term.</div>
              )
            )}

            {!searchedFor && !loading && results.length == 0 && (
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
