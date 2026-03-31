/**
 * DataTable<T> — Fully prop-driven Win97-styled data table.
 *
 * Every visual aspect — column widths, row heights, cell styling, scroll
 * behaviour, pagination, and the serial-number (#) column — is configurable
 * via props with sensible defaults so existing consumers work unchanged.
 */
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";

// ── Column definition ─────────────────────────────────────────────────────────

export interface DataTableColumn<T = unknown> {
  /** Unique key for React reconciliation */
  key: string;
  /** Column header content (string or JSX). Alias: `label` */
  header?: React.ReactNode;
  /** Alias for `header` — plain-text column label */
  label?: string;

  // ── Sizing ──
  /** CSS width for <col> element, e.g. "24%" or "120px" */
  width?: string | number;
  /** Minimum width in px */
  minWidth?: number;
  /** Maximum width in px */
  maxWidth?: number;
  /** Flex grow factor (like CSS flex-grow) */
  flex?: number;

  // ── Content ──
  /** Column type — drives default alignment and built-in formatting */
  type?:
    | "text"
    | "number"
    | "date"
    | "currency"
    | "badge"
    | "avatar"
    | "action"
    | "custom";
  /** Override cell font size for this column only */
  fontSize?: number | string;
  /** Text alignment (default: 'left'; numbers/currency default 'right') */
  align?: "left" | "center" | "right";

  // ── Behaviour ──
  /** Override table-level sortable for this column */
  sortable?: boolean;
  /** Include this column in search filtering */
  searchable?: boolean;
  /** Hide this column */
  hidden?: boolean;
  /** Stick this column on horizontal scroll */
  sticky?: boolean;
  /** Override table-level resizable for this column */
  resizable?: boolean;

  // ── Rendering ──
  /** Cell renderer — receives the row item, page index, and 1-based global index */
  render?: (item: T, pageIndex: number, globalIndex: number) => React.ReactNode;
  /** Custom header renderer */
  headerRender?: () => React.ReactNode;

  // ── Styling ──
  /** Extra CSS class on <col> / <th> / <td> cells */
  className?: string;
  /** Extra CSS class on the <th> header cell */
  headerClassName?: string;

  /** Optional tooltip generator for <td title="…"> */
  tooltip?: (item: T) => string;
  /** Width of the shimmer bar shown while loading (default 60) */
  skeletonWidth?: number;
  /** Extra props spread onto the <th> element (e.g. onClick, aria-sort) */
  thProps?: React.ThHTMLAttributes<HTMLTableCellElement>;
}

// ── Props ─────────────────────────────────────────────────────────────────────

export interface DataTableProps<T = unknown> {
  /** Column definitions */
  columns: DataTableColumn<T>[];
  /** Array of row data */
  data: T[];
  /** Returns a unique string key for each row item */
  keyExtractor: (item: T) => string;
  /** Whether data is currently loading */
  loading?: boolean;

  // ── Title bar ──
  title?: string;
  titleIcon?: string;
  titleExtra?: React.ReactNode;

  // ── Serial number (#) column ──
  /** Show the # column. Alias: `showSerialNumber`. Default true. */
  showRowNumbers?: boolean;
  /** Alias for showRowNumbers */
  showSerialNumber?: boolean;
  /** Width of the # column (px or CSS string). Default 50. Alias: `rnColWidth` */
  serialNumberColumnWidth?: number | string;
  /** Legacy alias for serialNumberColumnWidth */
  rnColWidth?: string;
  /** Header label for the # column. Default '#' */
  serialNumberLabel?: string;
  /** Starting number for the # column. Default 1 */
  serialNumberStartFrom?: number;

  // ── Column configuration ──
  /** Fallback width for columns without explicit width. Default 'auto' */
  defaultColumnWidth?: number | string;
  /** Min width for all columns unless overridden. Default 80 */
  defaultColumnMinWidth?: number;
  /** Max width for all columns unless overridden */
  defaultColumnMaxWidth?: number;
  /** Allow drag-to-resize columns. Default false */
  resizableColumns?: boolean;

  // ── Row configuration ──
  /** Fixed row height in px or CSS string. Default 28 (matches existing) */
  rowHeight?: number | string;
  /** Header row height in px or CSS string. Default 28 (matches existing) */
  headerRowHeight?: number | string;
  /** Compact rows — reduces padding. Default false */
  denseMode?: boolean;

  // ── Cell configuration ──
  /** Font size inside cells. Default inherits from CSS (12.5px) */
  cellFontSize?: number | string;
  /** Cell padding. Default '4px 6px' (matches existing) */
  cellPadding?: string;
  /** Vertical alignment. Default 'middle' */
  cellVerticalAlign?: "top" | "middle" | "bottom";
  /** Text overflow behaviour. Default 'ellipsis' */
  cellTextOverflow?: "ellipsis" | "wrap" | "clip";

  // ── Scrolling ──
  /** Enable vertical scroll on table body. Default true */
  scrollableRows?: boolean;
  /** Max height before vertical scroll kicks in */
  maxTableHeight?: number | string;
  /** Enable horizontal scroll. Default false */
  scrollableColumns?: boolean;
  /** Max width before horizontal scroll kicks in. Default '100%' */
  maxTableWidth?: number | string;
  /** Keep header visible on vertical scroll. Default true */
  stickyHeader?: boolean;
  /** Keep first column visible on horizontal scroll. Default false */
  stickyFirstColumn?: boolean;

  // ── Pagination ──
  /** Enable pagination. Alias: `paginate`. Default false */
  paginated?: boolean;
  /** Legacy alias for `paginated` */
  paginate?: boolean;
  /** Rows per page. Default 25 */
  pageSize?: number;
  /** Dropdown options for page size. Default [10, 25, 50, 100] */
  pageSizeOptions?: number[];
  /** Show "per page" selector. Default true */
  showPageSizeSelector?: boolean;
  /** Current controlled page (1-based) for external pagination control */
  currentPage?: number;

  // ── Server-side pagination ──
  serverTotal?: number;
  serverPage?: number;
  serverPageSize?: number;
  onPageChange?: (page: number, pageSize: number) => void;
  onPageSizeChange?: (size: number) => void;
  /** Alias for serverTotal — for server-side pagination */
  totalRows?: number;

  // ── Selection ──
  /** Show checkboxes. Default false */
  selectable?: boolean;
  onSelectionChange?: (selectedRows: T[]) => void;

  // ── Sorting ──
  /** Enable column sorting. Default true */
  sortable?: boolean;
  defaultSortColumn?: string;
  defaultSortDirection?: "asc" | "desc";

  // ── Search / Filter ──
  /** Show search bar. Default false */
  searchable?: boolean;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  filterColumns?: string[];

  // ── Styling overrides ──
  /** Wrapper class */
  className?: string;
  /** Header row class */
  headerClassName?: string;
  /** Row class — static string or dynamic function */
  rowClassName?: string | ((row: T, index: number) => string);
  /** Inline style on the <table> element */
  tableStyle?: React.CSSProperties;
  /** Inline style on wrapper div */
  containerStyle?: React.CSSProperties;

  // ── Callbacks ──
  onRowClick?: (row: T, index: number) => void;
  onRowDoubleClick?: (item: T) => void;

  // ── Flash animation ──
  flashIds?: Set<string>;
  deleteFlashIds?: Set<string>;

  // ── Row padding (non-paginated mode) ──
  rowCount?: number;

  // ── Alerts ──
  alertSuccess?: string | null;
  alertError?: string | null;
  alertErrors?: (string | null | undefined)[];

  // ── Download ──
  onDownload?: () => void;
  downloadLabel?: string;

  // ── Empty state ──
  emptyMessage?: string;

  /** Changing this value resets pagination to page 1 */
  pageResetKey?: string | number;

  /** Extra content on the right side of the pagination bar */
  paginationExtra?: React.ReactNode;

  /** Optional footer row(s) rendered inside <tfoot> */
  footerRow?: React.ReactNode;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const toCss = (v: number | string | undefined): string | undefined => {
  if (v === undefined) return undefined;
  return typeof v === "number" ? `${v}px` : v;
};

/** Default cell renderer for typed columns (when no custom render provided) */
function defaultCellRenderer<T>(
  col: DataTableColumn<T>,
  item: T,
): React.ReactNode {
  const raw = (item as Record<string, unknown>)[col.key];
  if (raw === null || raw === undefined) return "—";

  const str =
    typeof raw === "object" ? JSON.stringify(raw) : String(raw as string | number | boolean);

  switch (col.type) {
    case "number":
      return typeof raw === "number" ? raw.toLocaleString() : str;
    case "currency":
      return typeof raw === "number"
        ? `$${raw.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        : str;
    case "date": {
      const d = new Date(raw as string | number);
      return Number.isNaN(d.getTime())
        ? str
        : d.toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
    }
    case "badge":
      return (
        <span className="matchdb-type-pill">{str}</span>
      );
    default:
      return str;
  }
}

/** Resolve effective alignment for a column */
function resolveAlign(
  col: DataTableColumn<unknown>,
): "left" | "center" | "right" | undefined {
  if (col.align) return col.align;
  if (col.type === "number" || col.type === "currency") return "right";
  if (col.type === "action" || col.type === "badge") return "center";
  return undefined;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const DEFAULT_PAGE_SIZE = 25;
const DEFAULT_PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

// ── Pagination bar (extracted) ────────────────────────────────────────────────

interface PaginationBarProps {
  page: number;
  totalPages: number;
  pageSize: number;
  totalRecords: number;
  startRow: number;
  endRow: number;
  goToPage: (p: number) => void;
  changePageSize: (size: number) => void;
  pageSizeOptions: number[];
  showPageSizeSelector: boolean;
  extra?: React.ReactNode;
}

const PaginationBar: React.FC<PaginationBarProps> = ({
  page,
  totalPages,
  pageSize,
  totalRecords,
  startRow,
  endRow,
  goToPage,
  changePageSize,
  pageSizeOptions,
  showPageSizeSelector,
  extra,
}) => {
  const maxVisible = 5;
  const start = Math.max(
    0,
    Math.min(
      page - 2,
      Math.max(
        0,
        Math.min(totalPages - 1, Math.max(0, page - 2) + maxVisible - 1) -
          maxVisible +
          1,
      ),
    ),
  );
  const end = Math.min(totalPages - 1, start + maxVisible - 1);

  const pageButtons: React.ReactNode[] = [];
  for (let i = start; i <= end; i++) {
    pageButtons.push(
      <button
        key={i}
        type="button"
        className={`matchdb-page-btn${
          page === i ? " matchdb-page-btn-active" : ""
        }`}
        onClick={() => goToPage(i)}
      >
        {i + 1}
      </button>,
    );
  }

  return (
    <div className="matchdb-pagination">
      <button
        type="button"
        className="matchdb-page-btn"
        onClick={() => goToPage(0)}
        disabled={page === 0}
        title="First page"
      >
        «
      </button>
      <button
        type="button"
        className="matchdb-page-btn"
        onClick={() => goToPage(page - 1)}
        disabled={page === 0}
        title="Previous page"
      >
        ‹
      </button>
      {pageButtons}
      <button
        type="button"
        className="matchdb-page-btn"
        onClick={() => goToPage(page + 1)}
        disabled={page >= totalPages - 1}
        title="Next page"
      >
        ›
      </button>
      <button
        type="button"
        className="matchdb-page-btn"
        onClick={() => goToPage(totalPages - 1)}
        disabled={page >= totalPages - 1}
        title="Last page"
      >
        »
      </button>
      <span className="matchdb-page-label" style={{ marginLeft: 4 }}>
        Rows {startRow}–{endRow} of {totalRecords}
      </span>
      {showPageSizeSelector && (
        <>
          <span className="matchdb-footnote-sep">|</span>
          <span className="matchdb-page-label">Per page:</span>
          <select
            className="matchdb-select"
            style={{ height: 20, fontSize: 10, maxWidth: 60 }}
            value={pageSize}
            onChange={(e) => changePageSize(Number(e.target.value))}
          >
            {pageSizeOptions.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </>
      )}
      {extra && (
        <span style={{ marginLeft: "auto", display: "inline-flex", gap: 4 }}>
          {extra}
        </span>
      )}
    </div>
  );
};

// ── Padding rows (non-paginated) ──────────────────────────────────────────────

const PadRows: React.FC<{
  dataLen: number;
  colKeys: string[];
  rowCount: number;
  showRowNumbers: boolean;
  selectable: boolean;
}> = ({ dataLen, colKeys, rowCount, showRowNumbers, selectable }) => {
  const remaining = rowCount - dataLen;
  if (remaining <= 0) return null;
  const padIndices = Array.from({ length: remaining }, (_, k) => dataLen + k);
  return (
    <>
      {padIndices.map((rowNum) => (
        <tr key={`pad-${rowNum}`} className="pub-empty-row">
          {showRowNumbers && <td className="pub-td-rn">{rowNum + 1}</td>}
          {selectable && <td>&nbsp;</td>}
          {colKeys.map((ck) => (
            <td key={ck}>&nbsp;</td>
          ))}
        </tr>
      ))}
    </>
  );
};

// ── DataTable component ───────────────────────────────────────────────────────

function DataTable<T>({
  columns: rawColumns,
  data,
  keyExtractor,
  loading = false,
  title,
  titleIcon,
  titleExtra,

  // Serial number (#) column — support both old and new prop names
  showRowNumbers,
  showSerialNumber,
  serialNumberColumnWidth = 50,
  rnColWidth,
  serialNumberLabel = "#",
  serialNumberStartFrom = 1,

  // Column configuration
  defaultColumnWidth,
  defaultColumnMinWidth = 80,
  defaultColumnMaxWidth,
  resizableColumns: _resizableColumns = false,

  // Row configuration
  rowHeight,
  headerRowHeight,
  denseMode = false,

  // Cell configuration
  cellFontSize,
  cellPadding,
  cellVerticalAlign,
  cellTextOverflow,

  // Scrolling
  scrollableRows = true,
  maxTableHeight,
  scrollableColumns = false,
  maxTableWidth = "100%",
  stickyHeader = true,
  stickyFirstColumn = false,

  // Pagination
  paginated,
  paginate = false,
  pageSize: propPageSize,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  showPageSizeSelector = true,
  currentPage: controlledPage,

  // Server-side pagination
  serverTotal,
  serverPage,
  serverPageSize,
  onPageChange,
  onPageSizeChange,
  totalRows,

  // Selection
  selectable = false,
  onSelectionChange,

  // Sorting (props accepted; built-in sorting handled per-column via thProps)
  sortable: _sortable = true,
  defaultSortColumn: _defaultSortColumn,
  defaultSortDirection: _defaultSortDirection,

  // Search
  searchable = false,
  searchPlaceholder = "Search…",
  onSearch,
  filterColumns: _filterColumns,

  // Style overrides
  className,
  headerClassName,
  rowClassName,
  tableStyle,
  containerStyle,

  // Callbacks
  onRowClick,
  onRowDoubleClick,

  // Flash
  flashIds,
  deleteFlashIds,

  // Row padding
  rowCount,

  // Alerts
  alertSuccess,
  alertError,
  alertErrors,

  // Download
  onDownload,
  downloadLabel = "Download CSV",

  // Empty
  emptyMessage = "MySQL returned an empty result set (i.e. zero rows).",

  pageResetKey,
  paginationExtra,
  footerRow,
}: Readonly<DataTableProps<T>>): React.ReactElement {
  // ── Resolve aliased props ──
  const showRn =
    showSerialNumber ?? showRowNumbers ?? true;
  const rnWidth = toCss(rnColWidth ? undefined : serialNumberColumnWidth) ?? rnColWidth ?? "50px";
  const effectiveServerTotal = serverTotal ?? totalRows;
  const isPaginatedProp = paginated ?? paginate;

  // ── Filter hidden columns ──
  const columns = useMemo(
    () => rawColumns.filter((c) => !c.hidden),
    [rawColumns],
  );

  // ── Search state ──
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = useCallback(
    (q: string) => {
      setSearchQuery(q);
      onSearch?.(q);
    },
    [onSearch],
  );

  // ── Selection state ──
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const toggleAll = useCallback(() => {
    if (selectedKeys.size === data.length) {
      setSelectedKeys(new Set());
      onSelectionChange?.([]);
    } else {
      const all = new Set(data.map((d) => keyExtractor(d)));
      setSelectedKeys(all);
      onSelectionChange?.([...data]);
    }
  }, [data, keyExtractor, selectedKeys.size, onSelectionChange]);

  const toggleRow = useCallback(
    (item: T) => {
      const k = keyExtractor(item);
      setSelectedKeys((prev) => {
        const next = new Set(prev);
        if (next.has(k)) next.delete(k);
        else next.add(k);
        onSelectionChange?.(data.filter((d) => next.has(keyExtractor(d))));
        return next;
      });
    },
    [keyExtractor, data, onSelectionChange],
  );

  // Clear selection when data changes
  useEffect(() => {
    setSelectedKeys(new Set());
  }, [data]);

  // ── Client-side search filtering ──
  const filteredData = useMemo(() => {
    if (!searchQuery || onSearch) return data; // server-handled or empty
    const q = searchQuery.toLowerCase();
    return data.filter((item) => {
      const rec = item as Record<string, unknown>;
      return columns.some((c) => {
        if (c.searchable === false) return false;
        const v = rec[c.key];
        return v !== null && v !== undefined && (typeof v === "object" ? JSON.stringify(v) : String(v as string | number | boolean)).toLowerCase().includes(q);
      });
    });
  }, [data, searchQuery, onSearch, columns]);

  // ── Pagination state ──
  const isServerSide =
    effectiveServerTotal !== undefined && onPageChange !== undefined;
  const isPaginated = isPaginatedProp || isServerSide;

  const effectivePageSize = serverPageSize ?? propPageSize ?? DEFAULT_PAGE_SIZE;
  const [page, setPage] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(effectivePageSize);

  // Sync server page/size
  useEffect(() => {
    if (isServerSide && serverPage !== undefined) setPage(serverPage - 1);
  }, [serverPage, isServerSide]);
  useEffect(() => {
    if (controlledPage !== undefined) setPage(controlledPage - 1);
  }, [controlledPage]);
  useEffect(() => {
    if (isServerSide && serverPageSize !== undefined)
      setCurrentPageSize(serverPageSize);
  }, [serverPageSize, isServerSide]);

  // Reset page on data change (client) or explicit reset key
  useEffect(() => {
    if (!isServerSide) setPage(0);
  }, [filteredData.length, isServerSide]);
  useEffect(() => {
    if (pageResetKey !== undefined) setPage(0);
  }, [pageResetKey]);

  const totalRecords = isServerSide
    ? effectiveServerTotal ?? 0
    : filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / currentPageSize));
  const safePage = Math.min(page, totalPages - 1);
  let pageRows: T[];
  if (isPaginated && !isServerSide) {
    pageRows = filteredData.slice(
      safePage * currentPageSize,
      (safePage + 1) * currentPageSize,
    );
  } else {
    pageRows = filteredData;
  }

  const startRow = safePage * currentPageSize + 1;
  const endRow = Math.min((safePage + 1) * currentPageSize, totalRecords);

  const goToPage = useCallback(
    (p: number) => {
      const clamped = Math.max(0, Math.min(totalPages - 1, p));
      setPage(clamped);
      if (isServerSide) onPageChange(clamped + 1, currentPageSize);
    },
    [totalPages, isServerSide, onPageChange, currentPageSize],
  );

  const changePageSize = useCallback(
    (size: number) => {
      setCurrentPageSize(size);
      setPage(0);
      if (isServerSide) onPageChange(1, size);
      onPageSizeChange?.(size);
    },
    [isServerSide, onPageChange, onPageSizeChange],
  );

  // ── Filler rows for paginated mode ──
  const fillerCount =
    isPaginated && !loading && pageRows.length > 0
      ? Math.max(0, currentPageSize - pageRows.length)
      : 0;

  // ── Target visible row count (for skeleton + filler consistency) ──
  const targetRowCount = rowCount ?? currentPageSize;

  // ── Total columns (including optional row-number col + checkbox col) ──
  const totalCols =
    columns.length + (showRn ? 1 : 0) + (selectable ? 1 : 0);

  // ── Alerts ──
  const allErrors = [alertError, ...(alertErrors ?? [])].filter(
    (e): e is string => !!e,
  );
  const showAlerts = !!(alertSuccess || allErrors.length);

  // ── Dynamic styles ──
  const densePadding = denseMode ? "2px 4px" : undefined;
  const effectiveCellPadding = cellPadding ?? densePadding;
  const effectiveCellFontSize = toCss(cellFontSize);
  const effectiveRowHeight = toCss(rowHeight);
  const effectiveHeaderRowHeight = toCss(headerRowHeight);

  const cellStyle = useMemo((): React.CSSProperties | undefined => {
    const s: React.CSSProperties = {};
    let hasAny = false;
    if (effectiveCellPadding) {
      s.padding = effectiveCellPadding;
      hasAny = true;
    }
    if (effectiveCellFontSize) {
      s.fontSize = effectiveCellFontSize;
      hasAny = true;
    }
    if (effectiveRowHeight) {
      s.height = effectiveRowHeight;
      s.minHeight = effectiveRowHeight;
      s.maxHeight = effectiveRowHeight;
      hasAny = true;
    }
    if (cellVerticalAlign) {
      s.verticalAlign = cellVerticalAlign;
      hasAny = true;
    }
    if (cellTextOverflow === "wrap") {
      s.whiteSpace = "normal";
      s.textOverflow = "unset";
      hasAny = true;
    } else if (cellTextOverflow === "clip") {
      s.textOverflow = "clip";
      hasAny = true;
    }
    return hasAny ? s : undefined;
  }, [
    effectiveCellPadding,
    effectiveCellFontSize,
    effectiveRowHeight,
    cellVerticalAlign,
    cellTextOverflow,
  ]);

  const headerCellStyle = useMemo((): React.CSSProperties | undefined => {
    const s: React.CSSProperties = {};
    let hasAny = false;
    if (effectiveHeaderRowHeight) {
      s.height = effectiveHeaderRowHeight;
      s.minHeight = effectiveHeaderRowHeight;
      s.maxHeight = effectiveHeaderRowHeight;
      hasAny = true;
    }
    if (effectiveCellFontSize) {
      s.fontSize = effectiveCellFontSize;
      hasAny = true;
    }
    if (effectiveCellPadding) {
      s.padding = effectiveCellPadding;
      hasAny = true;
    }
    return hasAny ? s : undefined;
  }, [effectiveHeaderRowHeight, effectiveCellFontSize, effectiveCellPadding]);

  // ── Scroll container style ──
  const wrapRef = useRef<HTMLDivElement>(null);

  const wrapStyle = useMemo((): React.CSSProperties | undefined => {
    const s: React.CSSProperties = {};
    let hasAny = false;
    if (maxTableHeight) {
      s.maxHeight = toCss(maxTableHeight);
      hasAny = true;
    }
    if (scrollableColumns) {
      s.overflowX = "auto";
      hasAny = true;
      if (maxTableWidth) {
        s.maxWidth = toCss(maxTableWidth);
      }
    }
    if (!scrollableRows) {
      s.overflowY = "visible";
      s.height = "auto";
      s.flex = "none";
      hasAny = true;
    }
    return hasAny ? s : undefined;
  }, [maxTableHeight, scrollableColumns, maxTableWidth, scrollableRows]);

  // ── Compute table min-width for horizontal scroll ──
  const tableMinWidth = useMemo(() => {
    if (!scrollableColumns) return undefined;
    let total = showRn ? 50 : 0;
    if (selectable) total += 36;
    for (const c of columns) {
      if (typeof c.width === "number") total += c.width;
      else if (c.minWidth) total += c.minWidth;
      else total += defaultColumnMinWidth;
    }
    return `${total}px`;
  }, [scrollableColumns, columns, showRn, selectable, defaultColumnMinWidth]);

  // ── Render ──
  const wrapCls = [
    "matchdb-panel",
    denseMode && "matchdb-dense",
    scrollableColumns && "matchdb-hscroll",
    stickyFirstColumn && "matchdb-sticky-first",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const rowLabel = `${totalRecords} row${totalRecords === 1 ? "" : "s"}`;

  /** Build inline style for a single column's <col> and cells */
  const colCellStyle = (
    c: DataTableColumn<T>,
    extra?: React.CSSProperties,
  ): React.CSSProperties | undefined => {
    const s: React.CSSProperties = {};
    let hasAny = false;

    const w = c.width ?? defaultColumnWidth;
    if (w !== undefined) {
      s.width = typeof w === "number" ? `${w}px` : w;
      hasAny = true;
    }
    const mn = c.minWidth ?? defaultColumnMinWidth;
    if (mn) {
      s.minWidth = `${mn}px`;
      hasAny = true;
    }
    const mx = c.maxWidth ?? defaultColumnMaxWidth;
    if (mx !== undefined) {
      s.maxWidth = `${mx}px`;
      hasAny = true;
    }

    const align = resolveAlign(c as DataTableColumn<unknown>);
    if (align) {
      s.textAlign = align;
      hasAny = true;
    }
    if (c.fontSize) {
      s.fontSize = toCss(c.fontSize);
      hasAny = true;
    }

    if (extra) {
      Object.assign(s, extra);
      hasAny = true;
    }
    return hasAny ? s : undefined;
  };

  /** Merge cell style with column cell style */
  const mergedCellStyle = (c: DataTableColumn<T>): React.CSSProperties | undefined => {
    const col = colCellStyle(c);
    if (!cellStyle && !col) return undefined;
    return { ...cellStyle, ...col };
  };

  /** Merge header cell style with column-specific header style */
  const mergedHeaderStyle = (c: DataTableColumn<T>): React.CSSProperties | undefined => {
    const col = colCellStyle(c);
    if (!headerCellStyle && !col) return undefined;
    return { ...headerCellStyle, ...col };
  };

  /** Resolve the effective column header content */
  const colHeader = (c: DataTableColumn<T>): React.ReactNode =>
    c.headerRender ? c.headerRender() : (c.header ?? c.label ?? c.key);

  /** Render a single data cell */
  const renderCell = (
    c: DataTableColumn<T>,
    item: T,
    pageIdx: number,
    globalIdx: number,
  ): React.ReactNode => {
    if (c.render) return c.render(item, pageIdx, globalIdx);
    return defaultCellRenderer(c, item);
  };

  // ── Sticky column z-indexes ──
  const stickyFirstStyle: React.CSSProperties | undefined =
    stickyFirstColumn
      ? { position: "sticky", left: 0, zIndex: 5 }
      : undefined;
  const stickyCornerStyle: React.CSSProperties | undefined =
    stickyFirstColumn && stickyHeader
      ? { position: "sticky", left: 0, top: 0, zIndex: 15 }
      : stickyFirstStyle;

  return (
    <div className={wrapCls} style={containerStyle}>
      {/* Title bar */}
      {(title || titleIcon || titleExtra || onDownload) && (
        <div className="matchdb-panel-title">
          <div className="matchdb-panel-title-left">
            {titleIcon && (
              <span className="matchdb-panel-title-icon">{titleIcon}</span>
            )}
            {title && <span className="matchdb-panel-title-text">{title}</span>}
            <span className="matchdb-panel-title-meta">
              {loading ? "Loading..." : rowLabel}
            </span>
            {titleExtra}
          </div>
          {onDownload && (
            <div className="matchdb-panel-title-right">
              <button
                type="button"
                className="matchdb-btn matchdb-btn-download matchdb-title-btn"
                onClick={onDownload}
                title={downloadLabel}
              >
                ⬇ {downloadLabel}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Search bar */}
      {searchable && (
        <div className="matchdb-search-bar">
          <input
            type="text"
            className="matchdb-search-input"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="matchdb-search-clear"
              onClick={() => handleSearch("")}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      )}

      {/* Alerts */}
      {showAlerts && (
        <div className="matchdb-alerts" role="alert" aria-live="polite">
          {alertSuccess && (
            <div className="matchdb-alert matchdb-alert-success">
              <span>✓</span> {alertSuccess}
            </div>
          )}
          {allErrors.map((e) => (
            <div key={e} className="matchdb-alert matchdb-alert-error">
              <span>✕</span> {e}
            </div>
          ))}
        </div>
      )}

      {/* Table */}
      <div
        className="matchdb-table-wrap"
        ref={wrapRef}
        style={wrapStyle}
      >
        {loading ? (
          <table
            className="matchdb-table"
            aria-busy="true"
            style={{
              ...tableStyle,
              minWidth: tableMinWidth,
            }}
          >
            <tbody>
              {Array.from({ length: targetRowCount }, (_, k) => `sk-${k}`).map(
                (skKey) => (
                  <tr key={skKey} className="matchdb-skeleton-row">
                    {showRn && (
                      <td style={stickyFirstStyle}>
                        <span className="w97-shimmer" style={{ width: 22 }} />
                      </td>
                    )}
                    {selectable && (
                      <td>
                        <span className="w97-shimmer" style={{ width: 14 }} />
                      </td>
                    )}
                    {columns.map((c) => (
                      <td key={c.key}>
                        <span
                          className="w97-shimmer"
                          style={{ width: c.skeletonWidth ?? 60 }}
                        />
                      </td>
                    ))}
                  </tr>
                ),
              )}
            </tbody>
          </table>
        ) : (
          <table
            className="matchdb-table"
            style={{
              ...tableStyle,
              minWidth: tableMinWidth,
            }}
          >
            <colgroup>
              {showRn && (
                <col style={{ width: rnWidth }} />
              )}
              {selectable && <col style={{ width: 36 }} />}
              {columns.map((c) => {
                const w = c.width ?? defaultColumnWidth;
                return (
                  <col
                    key={c.key}
                    className={c.className}
                    style={
                      w === undefined
                        ? undefined
                        : { width: typeof w === "number" ? `${w}px` : w }
                    }
                  />
                );
              })}
            </colgroup>
            <thead className={headerClassName}>
              <tr>
                {showRn && (
                  <th
                    className="pub-th-rn"
                    title="Row number"
                    style={{
                      ...headerCellStyle,
                      ...stickyCornerStyle,
                      width: rnWidth,
                      minWidth: rnWidth,
                      maxWidth: rnWidth,
                    }}
                  >
                    {serialNumberLabel}
                  </th>
                )}
                {selectable && (
                  <th
                    className="matchdb-th-checkbox"
                    style={headerCellStyle}
                  >
                    <input
                      type="checkbox"
                      checked={
                        data.length > 0 && selectedKeys.size === data.length
                      }
                      onChange={toggleAll}
                      aria-label="Select all rows"
                    />
                  </th>
                )}
                {columns.map((c) => (
                  <th
                    key={c.key}
                    className={[c.className, c.headerClassName]
                      .filter(Boolean)
                      .join(" ") || undefined}
                    style={mergedHeaderStyle(c)}
                    {...c.thProps}
                  >
                    {colHeader(c)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Empty state */}
              {pageRows.length === 0 && (
                <tr>
                  <td colSpan={totalCols} className="matchdb-empty">
                    {emptyMessage}
                  </td>
                </tr>
              )}

              {/* Data rows */}
              {pageRows.map((item, pageIdx) => {
                const globalIdx = isPaginated
                  ? safePage * currentPageSize +
                    pageIdx +
                    serialNumberStartFrom
                  : pageIdx + serialNumberStartFrom;
                const itemKey = keyExtractor(item);
                const isFlashing = flashIds?.has(itemKey) ?? false;
                const isDeleteFlashing =
                  deleteFlashIds?.has(itemKey) ?? false;
                const isSelected = selectedKeys.has(itemKey);

                const rowClsParts: string[] = [];
                if (isDeleteFlashing) rowClsParts.push("pub-row-delete-flash");
                else if (isFlashing) rowClsParts.push("pub-row-flash");
                if (isSelected) rowClsParts.push("matchdb-row-selected");

                // Dynamic rowClassName
                if (rowClassName) {
                  if (typeof rowClassName === "string")
                    rowClsParts.push(rowClassName);
                  else rowClsParts.push(rowClassName(item, pageIdx));
                }

                const rowCls =
                  rowClsParts.length > 0
                    ? rowClsParts.join(" ")
                    : undefined;

                return (
                  <tr
                    key={itemKey}
                    className={rowCls}
                    onClick={
                      onRowClick
                        ? () => onRowClick(item, pageIdx)
                        : undefined
                    }
                    onDoubleClick={
                      onRowDoubleClick
                        ? () => onRowDoubleClick(item)
                        : undefined
                    }
                    style={
                      onRowClick ? { cursor: "pointer" } : undefined
                    }
                  >
                    {showRn && (
                      <td
                        className="pub-td-rn"
                        style={{
                          ...stickyFirstStyle,
                          width: rnWidth,
                          minWidth: rnWidth,
                          maxWidth: rnWidth,
                        }}
                      >
                        {globalIdx}
                      </td>
                    )}
                    {selectable && (
                      <td className="matchdb-td-checkbox">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleRow(item)}
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Select row ${globalIdx}`}
                        />
                      </td>
                    )}
                    {columns.map((c) => (
                      <td
                        key={c.key}
                        className={c.className}
                        title={c.tooltip ? c.tooltip(item) : undefined}
                        style={mergedCellStyle(c)}
                      >
                        {renderCell(c, item, pageIdx, globalIdx)}
                      </td>
                    ))}
                  </tr>
                );
              })}

              {/* Padding rows (non-paginated, fixed row count) */}
              {!isPaginated && !!rowCount && (
                <PadRows
                  dataLen={pageRows.length}
                  colKeys={columns.map((c) => c.key)}
                  rowCount={rowCount}
                  showRowNumbers={showRn}
                  selectable={selectable}
                />
              )}

              {/* Filler rows (paginated, keeps height consistent) */}
              {isPaginated &&
                Array.from({ length: fillerCount }, (_, k) => ({
                  key: `filler-${safePage}-${k}`,
                  rowNum:
                    safePage * currentPageSize +
                    pageRows.length +
                    k +
                    serialNumberStartFrom,
                })).map((filler) => (
                  <tr key={filler.key} className="matchdb-filler-row">
                    {showRn && (
                      <td
                        className="pub-td-rn"
                        style={stickyFirstStyle}
                      >
                        {filler.rowNum}
                      </td>
                    )}
                    {selectable && <td>&nbsp;</td>}
                    {columns.map((col) => (
                      <td key={col.key} className={col.className}>
                        &nbsp;
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
            {footerRow && <tfoot>{footerRow}</tfoot>}
          </table>
        )}
      </div>

      {/* Pagination */}
      {isPaginated && !loading && totalRecords > 0 && (
        <PaginationBar
          page={safePage}
          totalPages={totalPages}
          pageSize={currentPageSize}
          totalRecords={totalRecords}
          startRow={startRow}
          endRow={endRow}
          goToPage={goToPage}
          changePageSize={changePageSize}
          pageSizeOptions={pageSizeOptions}
          showPageSizeSelector={showPageSizeSelector}
          extra={paginationExtra}
        />
      )}
    </div>
  );
}

export default DataTable;
