
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function usePagination(defaultLimit = 5) {
  const navigate = useNavigate();
  const { search } = useLocation();
  const qp = new URLSearchParams(search);

  // Initialize from URL
  const [page, setPage] = useState(() => parseInt(qp.get("page")) || 1);
  const [searchTerm, setSearchTerm] = useState(qp.get("search") || "");
  const limit = defaultLimit;

  const updateURL = (newPage, newSearch) => {
    const params = new URLSearchParams();
    if (newSearch) params.set("search", newSearch);
    if (newPage > 1) params.set("page", newPage);
    navigate(`?${params.toString()}`, { replace: true });
  };

  const goToPage = (p) => {
    setPage(p);
    updateURL(p, searchTerm);
  };

  const doSearch = (term) => {
    setSearchTerm(term);
    // reset to first page on new search
    setPage(1);
    updateURL(1, term.trim() || "");
  };

  return { page, searchTerm, goToPage, doSearch, limit };
}
