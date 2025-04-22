"use client";

import { queryAPI } from "@/api/query";
import { useRef, useMemo, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

import { generateColumnsBasedOnData } from "@/app/utils";
import { Footer } from "@/components/footer";
import { SearchForm } from "@/components/search-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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

  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: results.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 72,
    overscan: 10,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();

  const renderVirtualRow = (virtualRow: any) => (
    <TableRow key={virtualRow.index}>
      {columns.map((column, colIdx) => (
        <TableCell key={`${colIdx}_${column}`}>
          {Array.isArray(results[virtualRow.index][column])
            ? (results[virtualRow.index][column] as unknown as string[]).join(", ")
            : results[virtualRow.index][column]}
        </TableCell>
      ))}
    </TableRow>
  );

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
              <div ref={parentRef} className="rounded-md border overflow-auto" style={{ maxHeight: 1014 }}>
                <Table className="table-auto w-full">
                  <TableHeader>
                    <TableRow className="sticky top-0 z-10 bg-gray-100 font-bold text-gray-800">
                      {columns.map((column, index) => (
                        <TableHead key={`${index}_${column}`} className=" bg-gray-100 font-bold text-gray-800">
                          {column}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {virtualRows.length > 0 && <tr key="top-spacer" style={{ height: `${virtualRows[0].start}px` }} />}

                    {virtualRows.map(renderVirtualRow)}

                    {virtualRows.length > 0 && (
                      <tr
                        key="bottom-spacer"
                        style={{
                          height: `${rowVirtualizer.getTotalSize() - virtualRows[virtualRows.length - 1].end}px`,
                        }}
                      />
                    )}
                  </TableBody>
                </Table>
              </div>
            ) : (
              !loading &&
              searchedFor && (
                <div className="text-center text-muted-foreground">No results found. Try a different search term.</div>
              )
            )}

            {!searchedFor && !loading && results.length === 0 && (
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
