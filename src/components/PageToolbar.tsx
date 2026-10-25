import { useState, useRef } from 'react';
import { Search, Filter, Printer, Download, Upload, X, ChevronDown, Calendar, RefreshCw } from 'lucide-react';

interface PageToolbarProps {
  title: string;
  subtitle?: string;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  filters?: FilterOption[];
  activeFilters?: Record<string, string>;
  onFilterChange?: (key: string, value: string) => void;
  onClearFilters?: () => void;
  onPrint?: () => void;
  onExportExcel?: () => void;
  onImportExcel?: (file: File) => void;
  onAdd?: () => void;
  addLabel?: string;
  addColor?: string;
  showDateRange?: boolean;
  dateFrom?: string;
  dateTo?: string;
  onDateFromChange?: (value: string) => void;
  onDateToChange?: (value: string) => void;
  resultCount?: number;
  totalCount?: number;
}

interface FilterOption {
  key: string;
  label: string;
  options: { value: string; label: string }[];
}

export default function PageToolbar({
  title,
  subtitle,
  searchPlaceholder = 'جست‌وجو...',
  searchValue = '',
  onSearchChange,
  filters = [],
  activeFilters = {},
  onFilterChange,
  onClearFilters,
  onPrint,
  onExportExcel,
  onImportExcel,
  onAdd,
  addLabel = 'افزودن',
  addColor = 'from-blue-500 to-indigo-600',
  showDateRange = false,
  dateFrom = '',
  dateTo = '',
  onDateFromChange,
  onDateToChange,
  resultCount,
  totalCount
}: PageToolbarProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImportExcel) {
      onImportExcel(file);
      setShowImport(false);
    }
  };

  const hasActiveFilters = Object.values(activeFilters).some(v => v !== '');

  return (
    <div className="space-y-4">
      {/* Title Row */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-800">{title}</h1>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        {onAdd && (
          <button
            onClick={onAdd}
            className={`flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r ${addColor} text-white text-sm rounded-2xl hover:shadow-lg transition-all`}
          >
            <span className="text-lg leading-none">+</span>
            {addLabel}
          </button>
        )}
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 p-3">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Search */}
          {onSearchChange && (
            <div className="flex-1 min-w-[200px] flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 border border-gray-200/50 focus-within:border-blue-300 focus-within:bg-white transition-all">
              <Search size={15} className="text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                className="bg-transparent text-xs outline-none w-full placeholder:text-gray-400"
              />
              {searchValue && (
                <button onClick={() => onSearchChange('')} className="text-gray-400 hover:text-gray-600">
                  <X size={14} />
                </button>
              )}
            </div>
          )}

          {/* Date Range */}
          {showDateRange && (
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-50 border border-gray-200/50">
              <Calendar size={14} className="text-gray-400" />
              <input
                type="text"
                placeholder="از تاریخ"
                value={dateFrom}
                onChange={(e) => onDateFromChange?.(e.target.value)}
                className="bg-transparent text-xs outline-none w-20 placeholder:text-gray-400"
              />
              <span className="text-gray-300">|</span>
              <input
                type="text"
                placeholder="تا تاریخ"
                value={dateTo}
                onChange={(e) => onDateToChange?.(e.target.value)}
                className="bg-transparent text-xs outline-none w-20 placeholder:text-gray-400"
              />
            </div>
          )}

          {/* Filter Button */}
          {filters.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs transition-colors ${
                  hasActiveFilters 
                    ? 'bg-blue-50 border-blue-200 text-blue-600' 
                    : 'bg-gray-50 border-gray-200/50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Filter size={14} />
                فیلتر
                {hasActiveFilters && (
                  <span className="w-4 h-4 rounded-full bg-blue-500 text-white text-[9px] flex items-center justify-center">
                    {Object.values(activeFilters).filter(v => v).length}
                  </span>
                )}
                <ChevronDown size={12} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              {showFilters && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-50 animate-scale-in">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold text-gray-800">فیلترها</h4>
                    {hasActiveFilters && (
                      <button onClick={onClearFilters} className="text-[10px] text-red-500 hover:text-red-700">
                        پاک کردن همه
                      </button>
                    )}
                  </div>
                  <div className="space-y-3">
                    {filters.map(filter => (
                      <div key={filter.key}>
                        <label className="block text-[10px] text-gray-500 mb-1">{filter.label}</label>
                        <select
                          value={activeFilters[filter.key] || ''}
                          onChange={(e) => onFilterChange?.(filter.key, e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs outline-none focus:border-blue-400"
                        >
                          <option value="">همه</option>
                          {filter.options.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="w-full mt-3 py-2 text-xs text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors font-medium"
                  >
                    اعمال فیلتر
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Separator */}
          <div className="w-px h-6 bg-gray-200 mx-1 hidden md:block"></div>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            {onPrint && (
              <button
                onClick={onPrint}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-50 border border-gray-200/50 text-xs text-gray-600 hover:bg-gray-100 transition-colors"
                title="چاپ"
              >
                <Printer size={14} />
                <span className="hidden md:inline">چاپ</span>
              </button>
            )}
            {onExportExcel && (
              <button
                onClick={onExportExcel}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-green-50 border border-green-200/50 text-xs text-green-600 hover:bg-green-100 transition-colors"
                title="خروجی Excel"
              >
                <Download size={14} />
                <span className="hidden md:inline">Excel</span>
              </button>
            )}
            {onImportExcel && (
              <button
                onClick={() => {
                  if (fileInputRef.current) fileInputRef.current.click();
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-50 border border-amber-200/50 text-xs text-amber-600 hover:bg-amber-100 transition-colors"
                title="ورودی Excel"
              >
                <Upload size={14} />
                <span className="hidden md:inline">ورودی</span>
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* Results Count */}
          {resultCount !== undefined && (
            <div className="mr-auto text-[10px] text-gray-400">
              {resultCount} مورد
              {totalCount !== undefined && totalCount !== resultCount && ` از ${totalCount}`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
