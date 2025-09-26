// app/lib/data.ts
export type Invoice = {
  id: number;
  name: string;
  amount: number;
};

const allInvoices: Invoice[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Customer ${i + 1}`,
  amount: Math.floor(Math.random() * 1000),
}));

// Fake fetch function with filter + pagination
export async function fetchInvoices(query: string, page: number, perPage: number = 5) {
  let filtered = allInvoices;

  if (query) {
    filtered = filtered.filter((invoice) =>
      invoice.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  const start = (page - 1) * perPage;
  const end = start + perPage;

  return filtered.slice(start, end);
}

export async function fetchInvoicesPages(query: string, perPage: number = 5) {
  let filtered = allInvoices;

  if (query) {
    filtered = filtered.filter((invoice) =>
      invoice.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  return Math.ceil(filtered.length / perPage);
}

