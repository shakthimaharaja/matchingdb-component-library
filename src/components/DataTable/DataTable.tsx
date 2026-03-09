/**
 * DataTable<T> — Unified Win97-styled data table.
 *
 * Merges the best of both shell-ui's DataTable (column-based render,
 * row numbers, flash animation, padding rows) and jobs-ui's SharedTable
 * (client + server pagination, alerts, download button, filler rows).
 *
 * Usage (simple — no pagination, like shell-ui):
 *   <DataTable
 *     title="Job Openings"
 *     titleIcon="💼"
 *     columns={columns}
 *     data={jobs}
 *     rowCount={25}
 *     loading={loading}
 *     keyExtractor={(j) => j.id}
 *     flashIds={flashJobIds}
 *   />
 *
 * Usage (paginated — like jobs-ui):
 *   <DataTable
 *     title="All Matches"
 *     titleIcon="📊"
 *     columns={columns}
 *     data={matches}
 *     loading={loading}
 *     keyExtractor={(m) => m.id}
 *     paginate
 *     serverTotal={total}
 *     serverPage={page}
 *     serverPageSize={25}
 *     onPageChange={(p, sz) => fetchPage(p, sz)}
 *   />
 */
import React, { useEffect, useState, useCallback } from "react";

// ── Column definition ─────────────────────────────────────────────────────────

export interface DataTableColumn<T = unknown> {
  /** Unique key for React reconciliation */
  key: string;
  /** Column header content (string or JSX) */
  header: React.ReactNode;
  /** CSS width for <col> element, e.g. "24%" or "120px" */
  width?: string | number;
  /** Extra CSS class on <col> / <th> / <td> cells */
  className?: string;
  /** Text alignment for this column */
  align?: "left" | "center" | "right";
  /** Cell renderer — receives the row item, page index, and 1-based global index */
  render: (item: T, pageIndex: number, globalIndex: number) => React.ReactNode;
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
  /** Panel title bar text */
  title?: string;
  /** Emoji / icon before title */
  titleIcon?: string;
  /** Extra JSX between title text and row-count meta */
  titleExtra?: React.ReactNode;

  // ── Row numbers ──
  /** Show automatic row-number (#) column. Default true. */
  showRowNumbers?: boolean;
  /** CSS width for the row-number column. Default "3%" */
  rnColWidth?: string;

  // ── Flash animation ──
  /** Set of item keys whose rows should flash yellow (update animation) */
  flashIds?: Set<string>;
  /** Set of item keys whose rows should flash red (deletion animation) */
  deleteFlashIds?: Set<string>;

  // ── Row padding (non-paginated mode) ──
  /** Total visible rows — fills empty padding rows to maintain consistent height */
  rowCount?: number;

  // ── Pagination ──
  /** Enable pagination. Default false (flat list like shell-ui DataTable). */
  paginate?: boolean;
  /** Client-side page size when paginate=true. Default 25. */
  pageSize?: number;

  // ── Server-side pagination ──
  serverTotal?: number;
  serverPage?: number;
  serverPageSize?: number;
  onPageChange?: (page: number, pageSize: number) => void;

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

  /** Callback fired when a data row is double-clicked */
  onRowDoubleClick?: (item: T) => void;

  /** Extra className on wrapper div */
  className?: string;

  /** Extra content rendered on the right side of the pagination bar (e.g. download buttons) */
  paginationExtra?: React.ReactNode;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const DEFAULT_PAGE_SIZE = 25;
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

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
      <span className="matchdb-footnote-sep">|</span>
      <span className="matchdb-page-label">Per page:</span>
      <select
        className="matchdb-select"
        style={{ height: 20, fontSize: 10, maxWidth: 60 }}
        value={pageSize}
        onChange={(e) => changePageSize(Number(e.target.value))}
      >
        {PAGE_SIZE_OPTIONS.map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
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
  totalCols: number;
  rowCount: number;
  showRowNumbers: boolean;
}> = ({ dataLen, totalCols, rowCount, showRowNumbers }) => {
  const remaining = rowCount - dataLen;
  if (remaining <= 0) return null;
  return (
    <>
      {Array.from({ length: remaining }).map((_, i) => (
        <tr key={`pad-${i}`} className="pub-empty-row" aria-hidden="true">
          {showRowNumbers && <td className="pub-td-rn">{dataLen + i + 1}</td>}
          {Array.from({ length: totalCols - (showRowNumbers ? 1 : 0) }).map(
            (__, ci) => (
              <td key={ci}>&nbsp;</td>
            ),
          )}
        </tr>
      ))}
    </>
  );
};

// ── DataTable component ───────────────────────────────────────────────────────

function DataTable<T>({
  columns,
  data,
  keyExtractor,
  loading = false,
  title,
  titleIcon,
  titleExtra,
  showRowNumbers = true,
  rnColWidth = "28px",
  flashIds,
  deleteFlashIds,
  rowCount,
  paginate = false,
  pageSize: propPageSize,
  serverTotal,
  serverPage,
  serverPageSize,
  onPageChange,
  alertSuccess,
  alertError,
  alertErrors,
  onDownload,
  downloadLabel = "Download CSV",
  emptyMessage = "MySQL returned an empty result set (i.e. zero rows).",
  pageResetKey,
  onRowDoubleClick,
  className,
  paginationExtra,
}: DataTableProps<T>): React.ReactElement {
  // ── Pagination state ──
  const isServerSide = serverTotal !== undefined && onPageChange !== undefined;
  const isPaginated = paginate || isServerSide;

  const effectivePageSize = serverPageSize ?? propPageSize ?? DEFAULT_PAGE_SIZE;
  const [page, setPage] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(effectivePageSize);

  // Sync server page/size
  useEffect(() => {
    if (isServerSide && serverPage !== undefined) setPage(serverPage - 1);
  }, [serverPage, isServerSide]);
  useEffect(() => {
    if (isServerSide && serverPageSize !== undefined)
      setCurrentPageSize(serverPageSize);
  }, [serverPageSize, isServerSide]);

  // Reset page on data change (client) or explicit reset key
  useEffect(() => {
    if (!isServerSide) setPage(0);
  }, [data.length, isServerSide]);
  useEffect(() => {
    if (pageResetKey !== undefined) setPage(0);
  }, [pageResetKey]);

  const totalRecords = isServerSide ? serverTotal! : data.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / currentPageSize));
  const safePage = Math.min(page, totalPages - 1);
  const pageRows = isPaginated
    ? isServerSide
      ? data
      : data.slice(safePage * currentPageSize, (safePage + 1) * currentPageSize)
    : data;

  const startRow = safePage * currentPageSize + 1;
  const endRow = Math.min((safePage + 1) * currentPageSize, totalRecords);

  const goToPage = useCallback(
    (p: number) => {
      const clamped = Math.max(0, Math.min(totalPages - 1, p));
      setPage(clamped);
      if (isServerSide) onPageChange!(clamped + 1, currentPageSize);
    },
    [totalPages, isServerSide, onPageChange, currentPageSize],
  );

  const changePageSize = useCallback(
    (size: number) => {
      setCurrentPageSize(size);
      setPage(0);
      if (isServerSide) onPageChange!(1, size);
    },
    [isServerSide, onPageChange],
  );

  // ── Filler rows for paginated mode ──
  const fillerCount =
    isPaginated && !loading && pageRows.length > 0
      ? Math.max(0, currentPageSize - pageRows.length)
      : 0;

  // ── Target visible row count (for skeleton + filler consistency) ──
  const targetRowCount = rowCount ?? currentPageSize;

  // ── Total columns (including optional row-number col) ──
  const totalCols = columns.length + (showRowNumbers ? 1 : 0);

  // ── Alerts ──
  const allErrors = [alertError, ...(alertErrors ?? [])].filter(
    (e): e is string => !!e,
  );
  const showAlerts = !!(alertSuccess || allErrors.length);

  // ── Render ──
  const wrapCls = ["matchdb-panel", className].filter(Boolean).join(" ");

  return (
    <div className={wrapCls}>
      {/* Title bar */}
      {(title || titleIcon || titleExtra || onDownload) && (
        <div className="matchdb-panel-title">
          <div className="matchdb-panel-title-left">
            {titleIcon && (
              <span className="matchdb-panel-title-icon">{titleIcon}</span>
            )}
            {title && <span className="matchdb-panel-title-text">{title}</span>}
            <span className="matchdb-panel-title-meta">
              {loading
                ? "Loading..."
                : `${totalRecords} row${totalRecords !== 1 ? "s" : ""}`}
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

      {/* Alerts */}
      {showAlerts && (
        <div className="matchdb-alerts" role="alert" aria-live="polite">
          {alertSuccess && (
            <div className="matchdb-alert matchdb-alert-success">
              <span>✓</span> {alertSuccess}
            </div>
          )}
          {allErrors.map((e, i) => (
            <div key={i} className="matchdb-alert matchdb-alert-error">
              <span>✕</span> {e}
            </div>
          ))}
        </div>
      )}

      {/* Table */}
      <div className="matchdb-table-wrap">
        {loading ? (
          <table className="matchdb-table" aria-busy="true">
            <tbody>
              {Array.from({ length: targetRowCount }).map((_, ri) => (
                <tr
                  key={`sk-${ri}`}
                  className="matchdb-skeleton-row"
                  aria-hidden="true"
                >
                  {showRowNumbers && (
                    <td>
                      <span className="w97-shimmer" style={{ width: 22 }} />
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
              ))}
            </tbody>
          </table>
        ) : (
          <table className="matchdb-table">
            <colgroup>
              {showRowNumbers && <col style={{ width: rnColWidth }} />}
              {columns.map((c) => (
                <col
                  key={c.key}
                  className={c.className}
                  style={c.width !== undefined ? { width: c.width } : undefined}
                />
              ))}
            </colgroup>
            <thead>
              <tr>
                {showRowNumbers && (
                  <th className="pub-th-rn" title="Row number">
                    #
                  </th>
                )}
                {columns.map((c) => (
                  <th
                    key={c.key}
                    className={c.className}
                    style={c.align ? { textAlign: c.align } : undefined}
                    {...c.thProps}
                  >
                    {c.header}
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
                  ? safePage * currentPageSize + pageIdx + 1
                  : pageIdx + 1;
                const itemKey = keyExtractor(item);
                const isFlashing = flashIds?.has(itemKey) ?? false;
                const isDeleteFlashing = deleteFlashIds?.has(itemKey) ?? false;

                return (
                  <tr
                    key={itemKey}
                    className={
                      isDeleteFlashing
                        ? "pub-row-delete-flash"
                        : isFlashing
                        ? "pub-row-flash"
                        : undefined
                    }
                    onDoubleClick={
                      onRowDoubleClick
                        ? () => onRowDoubleClick(item)
                        : undefined
                    }
                  >
                    {showRowNumbers && (
                      <td className="pub-td-rn">{globalIdx}</td>
                    )}
                    {columns.map((c) => (
                      <td
                        key={c.key}
                        className={c.className}
                        title={c.tooltip ? c.tooltip(item) : undefined}
                        style={c.align ? { textAlign: c.align } : undefined}
                      >
                        {c.render(item, pageIdx, globalIdx)}
                      </td>
                    ))}
                  </tr>
                );
              })}

              {/* Padding rows (non-paginated, fixed row count) */}
              {!isPaginated && rowCount && (
                <PadRows
                  dataLen={pageRows.length}
                  totalCols={totalCols}
                  rowCount={rowCount}
                  showRowNumbers={showRowNumbers}
                />
              )}

              {/* Filler rows (paginated, keeps height consistent) */}
              {isPaginated &&
                Array.from({ length: fillerCount }).map((_, i) => (
                  <tr
                    key={`filler-${i}`}
                    aria-hidden="true"
                    className="matchdb-filler-row"
                  >
                    {showRowNumbers && (
                      <td className="pub-td-rn">
                        {safePage * currentPageSize + pageRows.length + i + 1}
                      </td>
                    )}
                    {columns.map((col) => (
                      <td key={col.key} className={col.className}>
                        &nbsp;
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
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
          extra={paginationExtra}
        />
      )}
    </div>
  );
}

export default DataTable;
