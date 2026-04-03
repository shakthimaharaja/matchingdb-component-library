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

type CssSize = number | string;

const toCss = (v: CssSize | undefined): string | undefined => {
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
    typeof raw === "object"
      ? JSON.stringify(raw)
      : String(raw as string | number | boolean);

  switch (col.type) {
    case "number":
      return typeof raw === "number" ? raw.toLocaleString() : str;
    case "currency":
      return typeof raw === "number"
        ? `$${raw.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`
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
      return <span className="matchdb-type-pill">{str}</span>;
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

function buildColumnStyle(
  column: DataTableColumn<any>,
  defaultColumnWidth: CssSize | undefined,
  defaultColumnMinWidth: number,
  defaultColumnMaxWidth: number | undefined,
  extra?: React.CSSProperties,
): React.CSSProperties | undefined {
  const style: React.CSSProperties = {};
  let hasAny = false;

  const width = column.width ?? defaultColumnWidth;
  if (width !== undefined) {
    style.width = typeof width === "number" ? `${width}px` : width;
    hasAny = true;
  }

  const minWidth = column.minWidth ?? defaultColumnMinWidth;
  if (minWidth) {
    style.minWidth = `${minWidth}px`;
    hasAny = true;
  }

  const maxWidth = column.maxWidth ?? defaultColumnMaxWidth;
  if (maxWidth !== undefined) {
    style.maxWidth = `${maxWidth}px`;
    hasAny = true;
  }

  const align = resolveAlign(column);
  if (align) {
    style.textAlign = align;
    hasAny = true;
  }

  if (column.fontSize) {
    style.fontSize = toCss(column.fontSize);
    hasAny = true;
  }

  if (extra) {
    Object.assign(style, extra);
    hasAny = true;
  }

  return hasAny ? style : undefined;
}

function mergeStyles(
  base: React.CSSProperties | undefined,
  extension: React.CSSProperties | undefined,
): React.CSSProperties | undefined {
  if (!base && !extension) return undefined;
  return { ...base, ...extension };
}

function getColumnHeader(column: DataTableColumn<any>): React.ReactNode {
  return column.headerRender
    ? column.headerRender()
    : column.header ?? column.label ?? column.key;
}

function renderDataCell(
  column: DataTableColumn<any>,
  item: any,
  pageIdx: number,
  globalIdx: number,
): React.ReactNode {
  if (column.render) {
    return column.render(item, pageIdx, globalIdx);
  }
  return defaultCellRenderer(column, item);
}

function buildRowClassName(
  item: any,
  itemKey: string,
  pageIdx: number,
  flashIds: Set<string> | undefined,
  deleteFlashIds: Set<string> | undefined,
  selectedKeys: Set<string>,
  rowClassName: string | ((row: any, index: number) => string) | undefined,
): string | undefined {
  const rowClsParts: string[] = [];
  if (deleteFlashIds?.has(itemKey)) {
    rowClsParts.push("pub-row-delete-flash");
  } else if (flashIds?.has(itemKey)) {
    rowClsParts.push("pub-row-flash");
  }

  if (selectedKeys.has(itemKey)) {
    rowClsParts.push("matchdb-row-selected");
  }

  if (rowClassName) {
    rowClsParts.push(
      typeof rowClassName === "string" ? rowClassName : rowClassName(item, pageIdx),
    );
  }

  return rowClsParts.length > 0 ? rowClsParts.join(" ") : undefined;
}

function buildCellStyle(
  effectiveCellPadding: string | undefined,
  effectiveCellFontSize: string | undefined,
  effectiveRowHeight: string | undefined,
  cellVerticalAlign: "top" | "middle" | "bottom" | undefined,
  cellTextOverflow: "ellipsis" | "wrap" | "clip" | undefined,
): React.CSSProperties | undefined {
  const style: React.CSSProperties = {};
  let hasAny = false;

  if (effectiveCellPadding) {
    style.padding = effectiveCellPadding;
    hasAny = true;
  }
  if (effectiveCellFontSize) {
    style.fontSize = effectiveCellFontSize;
    hasAny = true;
  }
  if (effectiveRowHeight) {
    style.height = effectiveRowHeight;
    style.minHeight = effectiveRowHeight;
    style.maxHeight = effectiveRowHeight;
    hasAny = true;
  }
  if (cellVerticalAlign) {
    style.verticalAlign = cellVerticalAlign;
    hasAny = true;
  }
  if (cellTextOverflow === "wrap") {
    style.whiteSpace = "normal";
    style.textOverflow = "unset";
    hasAny = true;
  } else if (cellTextOverflow === "clip") {
    style.textOverflow = "clip";
    hasAny = true;
  }

  return hasAny ? style : undefined;
}

function buildHeaderCellStyle(
  effectiveHeaderRowHeight: string | undefined,
  effectiveCellFontSize: string | undefined,
  effectiveCellPadding: string | undefined,
): React.CSSProperties | undefined {
  const style: React.CSSProperties = {};
  let hasAny = false;

  if (effectiveHeaderRowHeight) {
    style.height = effectiveHeaderRowHeight;
    style.minHeight = effectiveHeaderRowHeight;
    style.maxHeight = effectiveHeaderRowHeight;
    hasAny = true;
  }
  if (effectiveCellFontSize) {
    style.fontSize = effectiveCellFontSize;
    hasAny = true;
  }
  if (effectiveCellPadding) {
    style.padding = effectiveCellPadding;
    hasAny = true;
  }

  return hasAny ? style : undefined;
}

function buildWrapStyle(
  maxTableHeight: CssSize | undefined,
  scrollableColumns: boolean,
  maxTableWidth: CssSize | undefined,
  scrollableRows: boolean,
): React.CSSProperties | undefined {
  const style: React.CSSProperties = {};
  let hasAny = false;

  if (maxTableHeight) {
    style.maxHeight = toCss(maxTableHeight);
    hasAny = true;
  }
  if (scrollableColumns) {
    style.overflowX = "auto";
    hasAny = true;
    if (maxTableWidth) {
      style.maxWidth = toCss(maxTableWidth);
    }
  }
  if (!scrollableRows) {
    style.overflowY = "visible";
    style.height = "auto";
    style.flex = "none";
    hasAny = true;
  }

  return hasAny ? style : undefined;
}

function buildTableMinWidth(
  scrollableColumns: boolean,
  columns: DataTableColumn<unknown>[],
  showRn: boolean,
  selectable: boolean,
  defaultColumnMinWidth: number,
): string | undefined {
  if (!scrollableColumns) return undefined;

  let total = showRn ? 50 : 0;
  if (selectable) total += 36;
  for (const column of columns) {
    if (typeof column.width === "number") total += column.width;
    else if (column.minWidth) total += column.minWidth;
    else total += defaultColumnMinWidth;
  }

  return `${total}px`;
}

function filterDataByQuery<T>(
  data: T[],
  searchQuery: string,
  onSearch: ((query: string) => void) | undefined,
  columns: DataTableColumn<T>[],
): T[] {
  if (!searchQuery || onSearch) return data;

  const query = searchQuery.toLowerCase();
  return data.filter((item) => {
    const record = item as Record<string, unknown>;
    return columns.some((column) => {
      if (column.searchable === false) return false;
      const value = record[column.key];
      if (value === null || value === undefined) return false;
      const searchValue =
        typeof value === "object"
          ? JSON.stringify(value)
          : String(value as string | number | boolean);
      return searchValue.toLowerCase().includes(query);
    });
  });
}

function getPageRows<T>(
  filteredData: T[],
  isPaginated: boolean,
  isServerSide: boolean,
  safePage: number,
  currentPageSize: number,
): T[] {
  if (isPaginated && !isServerSide) {
    return filteredData.slice(
      safePage * currentPageSize,
      (safePage + 1) * currentPageSize,
    );
  }
  return filteredData;
}

function toggleAllSelection<T>(
  selectedKeys: Set<string>,
  data: T[],
  keyExtractor: (item: T) => string,
): { selectedKeys: Set<string>; selectedRows: T[] } {
  if (selectedKeys.size === data.length) {
    return { selectedKeys: new Set(), selectedRows: [] };
  }

  return {
    selectedKeys: new Set(data.map((item) => keyExtractor(item))),
    selectedRows: [...data],
  };
}

function toggleSingleSelection<T>(
  previous: Set<string>,
  item: T,
  data: T[],
  keyExtractor: (item: T) => string,
): { selectedKeys: Set<string>; selectedRows: T[] } {
  const next = new Set(previous);
  const key = keyExtractor(item);
  if (next.has(key)) next.delete(key);
  else next.add(key);

  return {
    selectedKeys: next,
    selectedRows: data.filter((row) => next.has(keyExtractor(row))),
  };
}

function clampPage(page: number, totalPages: number): number {
  return Math.max(0, Math.min(totalPages - 1, page));
}

function useSyncServerPage(
  isServerSide: boolean,
  serverPage: number | undefined,
  setPage: React.Dispatch<React.SetStateAction<number>>,
) {
  useEffect(() => {
    if (isServerSide && serverPage !== undefined) {
      setPage(serverPage - 1);
    }
  }, [serverPage, isServerSide, setPage]);
}

function useSyncControlledPage(
  controlledPage: number | undefined,
  setPage: React.Dispatch<React.SetStateAction<number>>,
) {
  useEffect(() => {
    if (controlledPage !== undefined) {
      setPage(controlledPage - 1);
    }
  }, [controlledPage, setPage]);
}

function useSyncServerPageSize(
  isServerSide: boolean,
  serverPageSize: number | undefined,
  setCurrentPageSize: React.Dispatch<React.SetStateAction<number>>,
) {
  useEffect(() => {
    if (isServerSide && serverPageSize !== undefined) {
      setCurrentPageSize(serverPageSize);
    }
  }, [serverPageSize, isServerSide, setCurrentPageSize]);
}

function useResetPageOnDataChange(
  isServerSide: boolean,
  filteredDataLength: number,
  setPage: React.Dispatch<React.SetStateAction<number>>,
) {
  useEffect(() => {
    if (!isServerSide) {
      setPage(0);
    }
  }, [filteredDataLength, isServerSide, setPage]);
}

function useResetPageOnKey(
  pageResetKey: string | number | undefined,
  setPage: React.Dispatch<React.SetStateAction<number>>,
) {
  useEffect(() => {
    if (pageResetKey !== undefined) {
      setPage(0);
    }
  }, [pageResetKey, setPage]);
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

// eslint-disable-next-line sonarjs/cognitive-complexity
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
  serialNumberColumnWidth = 24,
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
  const showRn = showSerialNumber ?? showRowNumbers ?? true;
  const rnWidth =
    toCss(rnColWidth ? undefined : serialNumberColumnWidth) ??
    rnColWidth ??
    "24px";
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
    const nextSelection = toggleAllSelection(selectedKeys, data, keyExtractor);
    setSelectedKeys(nextSelection.selectedKeys);
    onSelectionChange?.(nextSelection.selectedRows);
  }, [data, keyExtractor, selectedKeys.size, onSelectionChange]);

  const toggleRow = useCallback(
    (item: T) => {
      setSelectedKeys((prev) => {
        const nextSelection = toggleSingleSelection(
          prev,
          item,
          data,
          keyExtractor,
        );
        onSelectionChange?.(nextSelection.selectedRows);
        return nextSelection.selectedKeys;
      });
    },
    [keyExtractor, data, onSelectionChange],
  );

  // Clear selection when data changes
  useEffect(() => {
    setSelectedKeys(new Set());
  }, [data]);

  // ── Client-side search filtering ──
  const filteredData = useMemo(
    () => filterDataByQuery(data, searchQuery, onSearch, columns),
    [data, searchQuery, onSearch, columns],
  );

  // ── Pagination state ──
  const isServerSide =
    effectiveServerTotal !== undefined && onPageChange !== undefined;
  const isPaginated = isPaginatedProp || isServerSide;

  const effectivePageSize = serverPageSize ?? propPageSize ?? DEFAULT_PAGE_SIZE;
  const [page, setPage] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(effectivePageSize);

  useSyncServerPage(isServerSide, serverPage, setPage);
  useSyncControlledPage(controlledPage, setPage);
  useSyncServerPageSize(isServerSide, serverPageSize, setCurrentPageSize);
  useResetPageOnDataChange(isServerSide, filteredData.length, setPage);
  useResetPageOnKey(pageResetKey, setPage);

  const totalRecords = isServerSide
    ? effectiveServerTotal ?? 0
    : filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / currentPageSize));
  const safePage = Math.min(page, totalPages - 1);
  const pageRows = getPageRows(
    filteredData,
    isPaginated,
    isServerSide,
    safePage,
    currentPageSize,
  );

  const startRow = safePage * currentPageSize + 1;
  const endRow = Math.min((safePage + 1) * currentPageSize, totalRecords);

  const goToPage = useCallback(
    (p: number) => {
      const clamped = clampPage(p, totalPages);
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
  const totalCols = columns.length + (showRn ? 1 : 0) + (selectable ? 1 : 0);

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

  const cellStyle = useMemo(
    () =>
      buildCellStyle(
        effectiveCellPadding,
        effectiveCellFontSize,
        effectiveRowHeight,
        cellVerticalAlign,
        cellTextOverflow,
      ),
    [
      effectiveCellPadding,
      effectiveCellFontSize,
      effectiveRowHeight,
      cellVerticalAlign,
      cellTextOverflow,
    ],
  );

  const headerCellStyle = useMemo(
    () =>
      buildHeaderCellStyle(
        effectiveHeaderRowHeight,
        effectiveCellFontSize,
        effectiveCellPadding,
      ),
    [effectiveHeaderRowHeight, effectiveCellFontSize, effectiveCellPadding],
  );

  // ── Scroll container style ──
  const wrapRef = useRef<HTMLDivElement>(null);

  const wrapStyle = useMemo(
    () =>
      buildWrapStyle(
        maxTableHeight,
        scrollableColumns,
        maxTableWidth,
        scrollableRows,
      ),
    [maxTableHeight, scrollableColumns, maxTableWidth, scrollableRows],
  );

  // ── Compute table min-width for horizontal scroll ──
  const tableMinWidth = useMemo(
    () =>
      buildTableMinWidth(
        scrollableColumns,
        columns as DataTableColumn<unknown>[],
        showRn,
        selectable,
        defaultColumnMinWidth,
      ),
    [scrollableColumns, columns, showRn, selectable, defaultColumnMinWidth],
  );

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

  // ── Sticky column z-indexes ──
  const stickyFirstStyle: React.CSSProperties | undefined = stickyFirstColumn
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
      <div className="matchdb-table-wrap" ref={wrapRef} style={wrapStyle}>
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
              {showRn && <col style={{ width: rnWidth }} />}
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
                  <th className="matchdb-th-checkbox" style={headerCellStyle}>
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
                    className={
                      [c.className, c.headerClassName]
                        .filter(Boolean)
                        .join(" ") || undefined
                    }
                    style={mergeStyles(
                      headerCellStyle,
                      buildColumnStyle(
                        c as DataTableColumn<unknown>,
                        defaultColumnWidth,
                        defaultColumnMinWidth,
                        defaultColumnMaxWidth,
                      ),
                    )}
                    {...c.thProps}
                  >
                    {getColumnHeader(c)}
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
                  ? safePage * currentPageSize + pageIdx + serialNumberStartFrom
                  : pageIdx + serialNumberStartFrom;
                const itemKey = keyExtractor(item);
                const isSelected = selectedKeys.has(itemKey);
                const rowCls = buildRowClassName(
                  item,
                  itemKey,
                  pageIdx,
                  flashIds,
                  deleteFlashIds,
                  selectedKeys,
                  rowClassName,
                );

                return (
                  <tr
                    key={itemKey}
                    className={rowCls}
                    onClick={
                      onRowClick ? () => onRowClick(item, pageIdx) : undefined
                    }
                    onDoubleClick={
                      onRowDoubleClick
                        ? () => onRowDoubleClick(item)
                        : undefined
                    }
                    style={onRowClick ? { cursor: "pointer" } : undefined}
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
                        style={mergeStyles(
                          cellStyle,
                          buildColumnStyle(
                            c as DataTableColumn<unknown>,
                            defaultColumnWidth,
                            defaultColumnMinWidth,
                            defaultColumnMaxWidth,
                          ),
                        )}
                      >
                        {renderDataCell(
                          c as DataTableColumn<unknown>,
                          item,
                          pageIdx,
                          globalIdx,
                        )}
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
                      <td className="pub-td-rn" style={stickyFirstStyle}>
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
