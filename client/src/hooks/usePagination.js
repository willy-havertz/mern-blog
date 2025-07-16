import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function usePagination(defaultLimit = 5) {
  const navigate = useNavigate();
  const { search } = useLocation();
  const qp = new URLSearchParams(search);

  const [page, setPage] = useState(() => parseInt(qp.get("page")) || 1);
  const [searchTerm, setSearchTerm] = useState(qp.get("search") || "");

  const goToPage = (p) => {
    setPage(p);
    qp.set("page", p);
    navigate(`?${qp.toString()}`);
  };

  const doSearch = (term) => {
    setSearchTerm(term);
    qp.set("search", term);
    navigate(`?${qp.toString()}`);
  };

  return { page, searchTerm, goToPage, doSearch, limit: defaultLimit };
}
