"use client";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  return (
    <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={createPageURL(page)}
          style={{
            padding: "0.5rem 1rem",
            border: "1px solid black",
            background: page === currentPage ? "black" : "white",
            color: page === currentPage ? "white" : "black",
            borderRadius: "4px",
          }}
        >
          {page}
        </Link>
      ))}
    </div>
  );
}
