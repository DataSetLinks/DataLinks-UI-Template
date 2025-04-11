"use server";

export async function queryAPI(query: string = "") {
  const token = process.env.DATALINKS_TOKEN;
  const apiURL = process.env.DATALINKS_API_URL;
  const dataset = process.env.DATALINKS_DATASET;
  const useNaturalLanguageQuery = process.env.USE_NATURAL_LANGUAGE_QUERY === "1";

  if (!token) {
    throw new Error("DATALINKS_TOKEN is not set");
  }

  if (!apiURL) {
    throw new Error("DATALINKS_API_URL is not set");
  }

  if (!dataset) {
    throw new Error("DATALINKS_DATASET is not set");
  }

  const url = `${apiURL}/data/${dataset?.toLowerCase()}/query`;

  console.log("Querying for:", { url, query, useNaturalLanguageQuery });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/text",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query,
      useNaturalLanguageQuery,
    }),
  });

  const responseJson = await response.json();

  return responseJson;
}
