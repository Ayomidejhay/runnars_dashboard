


// "use client";

// import React, { useRef, useState } from "react";
// import Image from "next/image";
// import { Search } from "lucide-react";
// import PaginationControls from "./PaginationControls";
// import DropdownMenu, { DropdownItem } from "./DropdownMenu";

// // ─────────────────────────────────────────────
// // Types
// // ─────────────────────────────────────────────

// export interface ColumnDef<T> {
//   /** Text shown in <thead> */
//   header: string;
//   /** th/td alignment. Defaults to "left" */
//   align?: "left" | "center" | "right";
//   /** Render function for each cell */
//   cell: (row: T) => React.ReactNode;
// }

// export interface FilterOption {
//   value: string;
//   label: string;
// }

// export interface SelectFilter {
//   /** Unique key used as the select's value state key */
//   key: string;
//   placeholder: string;
//   options: FilterOption[];
// }

// export interface DataTableProps<T> {
//   // ── Data ──────────────────────────────────
//   data: T[];
//   columns: ColumnDef<T>[];
//   rowKey: (row: T) => string;
//   isLoading?: boolean;
//   emptyMessage?: string;
//   loadingMessage?: string;

//   // ── Header / title bar ────────────────────
//   title?: string;
//   /** Slot for extra header content (e.g. "New Challenge" button) */
//   headerActions?: React.ReactNode;

//   // ── Search ────────────────────────────────
//   searchPlaceholder?: string;
//   searchValue: string;
//   onSearchChange: (value: string) => void;

//   // ── Select filters ────────────────────────
//   /** Declarative list of <select> filters rendered in the toolbar */
//   filters?: SelectFilter[];
//   /** Current values for each filter key  e.g. { status: "active", type: "walk" } */
//   filterValues?: Record<string, string>;
//   onFilterChange?: (key: string, value: string) => void;

//   // ── Date range ────────────────────────────
//   dateRange?: string;
//   onDateRangeChange?: (value: string) => void;
//   customStartDate?: string;
//   customEndDate?: string;
//   onCustomStartDateChange?: (value: string) => void;
//   onCustomEndDateChange?: (value: string) => void;
//   dateError?: string;

//   // ── Pagination ────────────────────────────
//   currentPage: number;
//   totalPages: number;
//   rowsPerPage: number;
//   onPageChange: (page: number) => void;
//   onRowsPerPageChange: (rows: number) => void;

//   // ── Row actions dropdown ──────────────────
//   /** Return the items for a row's dropdown menu */
//   getRowActions?: (row: T) => DropdownItem[];
// }

// // ─────────────────────────────────────────────
// // Component
// // ─────────────────────────────────────────────

// export function DataTable<T>({
//   data,
//   columns,
//   rowKey,
//   isLoading = false,
//   emptyMessage = "No records found.",
//   loadingMessage = "Loading…",

//   title,
//   headerActions,

//   searchPlaceholder = "Search…",
//   searchValue,
//   onSearchChange,

//   filters = [],
//   filterValues = {},
//   onFilterChange,

//   dateRange,
//   onDateRangeChange,
//   customStartDate = "",
//   customEndDate = "",
//   onCustomStartDateChange,
//   onCustomEndDateChange,
//   dateError,

//   currentPage,
//   totalPages,
//   rowsPerPage,
//   onPageChange,
//   onRowsPerPageChange,

//   getRowActions,
// }: DataTableProps<T>) {
//   // ── Action-button dropdown state ──────────
//   const [openRowKey, setOpenRowKey] = useState<string | null>(null);
//   const [dropdownPos, setDropdownPos] = useState<{
//     top: number;
//     left: number;
//     buttonHeight: number;
//   } | null>(null);

//   // Derive the open row object directly from data — no stale state
//   const openRow = openRowKey ? data.find((r) => rowKey(r) === openRowKey) ?? null : null;
//   const dropdownItems = openRow && getRowActions ? getRowActions(openRow) : [];

//   const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

//   const handleActionClick = (e: React.MouseEvent, row: T) => {
//     const id = rowKey(row);

//     if (openRowKey === id) {
//       setOpenRowKey(null);
//       setDropdownPos(null);
//       return;
//     }

//     const btn = buttonRefs.current[id];
//     if (btn) {
//       const rect = btn.getBoundingClientRect();
//       setDropdownPos({
//         top: rect.bottom + window.scrollY,
//         left: rect.left + window.scrollX - 120,
//         buttonHeight: rect.height,
//       });
//     }

//     setOpenRowKey(id);
//   };

//   // ── Alignment helper ──────────────────────
//   const alignClass = (align?: "left" | "center" | "right") => {
//     if (align === "center") return "text-center";
//     if (align === "right") return "text-right";
//     return "text-left";
//   };

//   const colSpanCount = columns.length + (getRowActions ? 1 : 0);

//   return (
//     <div className="bg-white p-4 rounded mt-6">
//       {/* ── Toolbar ── */}
//       <div className="flex justify-between items-center flex-wrap gap-4">
//         {title && (
//           <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
//         )}

//         <div className="flex flex-wrap gap-4 items-center ml-auto">
//           {/* Search */}
//           <div className="relative w-60">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//             <input
//               value={searchValue}
//               onChange={(e) => onSearchChange(e.target.value)}
//               placeholder={searchPlaceholder}
//               className="pl-10 pr-4 h-10 w-full border rounded-full text-sm"
//             />
//           </div>

//           {/* Dynamic select filters */}
//           {filters.map((f) => (
//             <select
//               key={f.key}
//               value={filterValues[f.key] ?? "all"}
//               onChange={(e) => onFilterChange?.(f.key, e.target.value)}
//               className="h-10 px-4 border rounded-full text-sm"
//             >
//               <option value="all">{f.placeholder}</option>
//               {f.options.map((opt) => (
//                 <option key={opt.value} value={opt.value}>
//                   {opt.label}
//                 </option>
//               ))}
//             </select>
//           ))}

//           {/* Date range */}
//           {onDateRangeChange && (
//             <select
//               value={dateRange ?? "all"}
//               onChange={(e) => onDateRangeChange(e.target.value)}
//               className="h-10 px-4 border rounded-full text-sm"
//             >
//               <option value="all">Date Range</option>
//               <option value="today">Today</option>
//               <option value="last7">Last 7 Days</option>
//               <option value="last30">Last 30 Days</option>
//               <option value="custom">Custom</option>
//             </select>
//           )}

//           {dateRange === "custom" && (
//             <div className="flex gap-2">
//               <input
//                 type="date"
//                 value={customStartDate}
//                 onChange={(e) => onCustomStartDateChange?.(e.target.value)}
//                 className="h-10 px-3 border rounded"
//               />
//               <input
//                 type="date"
//                 value={customEndDate}
//                 onChange={(e) => onCustomEndDateChange?.(e.target.value)}
//                 className="h-10 px-3 border rounded"
//               />
//             </div>
//           )}

//           {/* Optional extra header actions (e.g. "New Challenge" button) */}
//           {headerActions}
//         </div>
//       </div>

//       {/* Date validation error */}
//       {dateError && (
//         <p className="text-red-500 text-sm mt-2">{dateError}</p>
//       )}

//       {/* ── Table ── */}
//       <div className="overflow-x-auto mt-4">
//         <table className="w-full text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               {columns.map((col) => (
//                 <th
//                   key={col.header}
//                   className={`px-4 py-3 ${alignClass(col.align)}`}
//                 >
//                   {col.header}
//                 </th>
//               ))}
//               {getRowActions && (
//                 <th className="px-4 py-3 text-center">Actions</th>
//               )}
//             </tr>
//           </thead>

//           <tbody>
//             {isLoading ? (
//               <tr>
//                 <td colSpan={colSpanCount} className="py-8 text-center text-gray-500">
//                   {loadingMessage}
//                 </td>
//               </tr>
//             ) : data.length === 0 ? (
//               <tr>
//                 <td colSpan={colSpanCount} className="py-8 text-center text-gray-500">
//                   {emptyMessage}
//                 </td>
//               </tr>
//             ) : (
//               data.map((row) => {
//                 const id = rowKey(row);
//                 return (
//                   <tr key={id} className="border-t hover:bg-gray-50">
//                     {columns.map((col) => (
//                       <td
//                         key={col.header}
//                         className={`px-4 py-3 ${alignClass(col.align)}`}
//                       >
//                         {col.cell(row)}
//                       </td>
//                     ))}

//                     {getRowActions && (
//                       <td className="px-4 py-3 text-center">
//                         <button
//                           ref={(el) => {
//                             buttonRefs.current[id] = el;
//                           }}
//                           onClick={(e) => handleActionClick(e, row)}
//                         >
//                           <Image
//                             src="/Button-table.svg"
//                             alt="Actions"
//                             width={20}
//                             height={20}
//                           />
//                         </button>
//                       </td>
//                     )}
//                   </tr>
//                 );
//               })
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* ── Pagination ── */}
//       <PaginationControls
//         currentPage={currentPage}
//         totalPages={totalPages}
//         rowsPerPage={rowsPerPage}
//         onPageChange={onPageChange}
//         onRowsPerPageChange={(rows) => {
//           onRowsPerPageChange(rows);
//           onPageChange(1);
//         }}
//       />

//       {/* ── Dropdown portal ── */}
//       {getRowActions && (
//         <DropdownMenu
//           isOpen={openRowKey !== null}
//           position={dropdownPos}
//           onClose={() => {
//             setOpenRowKey(null);
//             setDropdownPos(null);
//           }}
//           items={dropdownItems}
//         />
//       )}
//     </div>
//   );
// }

// export default DataTable;

"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import PaginationControls from "./PaginationControls";
import DropdownMenu, { DropdownItem } from "./DropdownMenu";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface ColumnDef<T> {
  /** Text shown in <thead> */
  header: string;
  /** th/td alignment. Defaults to "left" */
  align?: "left" | "center" | "right";
  /** Render function for each cell */
  cell: (row: T) => React.ReactNode;
}

export interface FilterOption {
  value: string;
  label: string;
}

export interface SelectFilter {
  /** Unique key used as the select's value state key */
  key: string;
  placeholder: string;
  options: FilterOption[];
}

export interface DataTableProps<T> {
  // ── Data ──────────────────────────────────
  data: T[];
  columns: ColumnDef<T>[];
  rowKey: (row: T) => string;
  isLoading?: boolean;
  emptyMessage?: string;
  loadingMessage?: string;

  // ── Header / title bar ────────────────────
  title?: string;
  /** Slot for extra header content (e.g. "New Challenge" button) */
  headerActions?: React.ReactNode;

  // ── Search ────────────────────────────────
  showSearch?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;

  // ── Select filters ────────────────────────
  /** Declarative list of <select> filters rendered in the toolbar */
  filters?: SelectFilter[];
  /** Current values for each filter key  e.g. { status: "active", type: "walk" } */
  filterValues?: Record<string, string>;
  onFilterChange?: (key: string, value: string) => void;

  // ── Date range ────────────────────────────
  dateRange?: string;
  onDateRangeChange?: (value: string) => void;
  customStartDate?: string;
  customEndDate?: string;
  onCustomStartDateChange?: (value: string) => void;
  onCustomEndDateChange?: (value: string) => void;
  dateError?: string;

  // ── Pagination ────────────────────────────
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;

  // ── Row actions dropdown ──────────────────
  /** Return the items for a row's dropdown menu */
  getRowActions?: (row: T) => DropdownItem[];
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export function DataTable<T>({
  data,
  columns,
  rowKey,
  isLoading = false,
  emptyMessage = "No records found.",
  loadingMessage = "Loading…",

  title,
  headerActions,

  showSearch = true,
  searchPlaceholder = "Search…",
  searchValue = "",
  onSearchChange,

  filters = [],
  filterValues = {},
  onFilterChange,

  dateRange,
  onDateRangeChange,
  customStartDate = "",
  customEndDate = "",
  onCustomStartDateChange,
  onCustomEndDateChange,
  dateError,

  currentPage,
  totalPages,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,

  getRowActions,
}: DataTableProps<T>) {
  // ── Action-button dropdown state ──────────
  const [openRowKey, setOpenRowKey] = useState<string | null>(null);
  const [dropdownPos, setDropdownPos] = useState<{
    top: number;
    left: number;
    buttonHeight: number;
  } | null>(null);

  // Derive the open row object directly from data — no stale state
  const openRow = openRowKey ? data.find((r) => rowKey(r) === openRowKey) ?? null : null;
  const dropdownItems = openRow && getRowActions ? getRowActions(openRow) : [];

  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const handleActionClick = (e: React.MouseEvent, row: T) => {
    const id = rowKey(row);

    if (openRowKey === id) {
      setOpenRowKey(null);
      setDropdownPos(null);
      return;
    }

    const btn = buttonRefs.current[id];
    if (btn) {
      const rect = btn.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX - 120,
        buttonHeight: rect.height,
      });
    }

    setOpenRowKey(id);
  };

  // ── Alignment helper ──────────────────────
  const alignClass = (align?: "left" | "center" | "right") => {
    if (align === "center") return "text-center";
    if (align === "right") return "text-right";
    return "text-left";
  };

  const colSpanCount = columns.length + (getRowActions ? 1 : 0);

  return (
    <div className="bg-white p-4 rounded mt-6">
      {/* ── Toolbar ── */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        {title && (
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        )}

        <div className="flex flex-wrap gap-4 items-center ml-auto">
          {/* Search */}
          {showSearch && (
            <div className="relative w-60">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                value={searchValue}
                onChange={(e) => onSearchChange?.(e.target.value)}
                placeholder={searchPlaceholder}
                className="pl-10 pr-4 h-10 w-full border rounded-full text-sm"
              />
            </div>
          )}

          {/* Dynamic select filters */}
          {filters.map((f) => (
            <select
              key={f.key}
              value={filterValues[f.key] ?? "all"}
              onChange={(e) => onFilterChange?.(f.key, e.target.value)}
              className="h-10 px-4 border rounded-full text-sm"
            >
              <option value="all">{f.placeholder}</option>
              {f.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ))}

          {/* Date range */}
          {onDateRangeChange && (
            <select
              value={dateRange ?? "all"}
              onChange={(e) => onDateRangeChange(e.target.value)}
              className="h-10 px-4 border rounded-full text-sm"
            >
              <option value="all">Date Range</option>
              <option value="today">Today</option>
              <option value="last7">Last 7 Days</option>
              <option value="last30">Last 30 Days</option>
              <option value="custom">Custom</option>
            </select>
          )}

          {dateRange === "custom" && (
            <div className="flex gap-2">
              <input
                type="date"
                value={customStartDate}
                onChange={(e) => onCustomStartDateChange?.(e.target.value)}
                className="h-10 px-3 border rounded"
              />
              <input
                type="date"
                value={customEndDate}
                onChange={(e) => onCustomEndDateChange?.(e.target.value)}
                className="h-10 px-3 border rounded"
              />
            </div>
          )}

          {/* Optional extra header actions (e.g. "New Challenge" button) */}
          {headerActions}
        </div>
      </div>

      {/* Date validation error */}
      {dateError && (
        <p className="text-red-500 text-sm mt-2">{dateError}</p>
      )}

      {/* ── Table ── */}
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.header}
                  className={`px-4 py-3 ${alignClass(col.align)}`}
                >
                  {col.header}
                </th>
              ))}
              {getRowActions && (
                <th className="px-4 py-3 text-center">Actions</th>
              )}
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={colSpanCount} className="py-8 text-center text-gray-500">
                  {loadingMessage}
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={colSpanCount} className="py-8 text-center text-gray-500">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row) => {
                const id = rowKey(row);
                return (
                  <tr key={id} className="border-t hover:bg-gray-50">
                    {columns.map((col) => (
                      <td
                        key={col.header}
                        className={`px-4 py-3 ${alignClass(col.align)}`}
                      >
                        {col.cell(row)}
                      </td>
                    ))}

                    {getRowActions && (
                      <td className="px-4 py-3 text-center">
                        <button
                          ref={(el) => {
                            buttonRefs.current[id] = el;
                          }}
                          onClick={(e) => handleActionClick(e, row)}
                        >
                          <Image
                            src="/Button-table.svg"
                            alt="Actions"
                            width={20}
                            height={20}
                          />
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ── */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={(rows) => {
          onRowsPerPageChange(rows);
          onPageChange(1);
        }}
      />

      {/* ── Dropdown portal ── */}
      {getRowActions && (
        <DropdownMenu
          isOpen={openRowKey !== null}
          position={dropdownPos}
          onClose={() => {
            setOpenRowKey(null);
            setDropdownPos(null);
          }}
          items={dropdownItems}
        />
      )}
    </div>
  );
}

export default DataTable;