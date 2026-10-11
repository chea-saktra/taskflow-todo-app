export const getSuggestionLabel = (item) =>
  typeof item === "string" ? item : item?.title || "";

export const getResultCountText = (count) =>
  `${count} ${count === 1 ? "result" : "results"} found`;

export const getSearchViewState = ({ query, results, suggestions }) => {
  const hasQuery = Boolean(query && query.trim().length > 0);
  const hasResults = results.length > 0;
  const hasSuggestions = suggestions.length > 0;

  if (!hasQuery && hasSuggestions) return "SUGGESTIONS";
  if (!hasQuery) return "INITIAL";
  if (!hasResults) return "EMPTY_RESULTS";
  return "RESULTS";
};
