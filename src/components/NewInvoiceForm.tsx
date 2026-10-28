import { useState, useEffect } from 'react';
import { Plus, Trash2, Save, Printer, CheckCircle, X, Search, Receipt, Calculator } from 'lucide-react';
import { execQuery, runQuery, getNextNumber, saveDatabase, getDatabase } from '../database/db';

interface InvoiceLine {
  id: number;
  itemId: number;
  itemName: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  total: number;
}

interface NewInvoiceFormProps {
  type: 'sales' | 'purchase';
  onClose: () => void;
  onSuccess: () => void;
}

export default function NewInvoiceForm({ type, onClose, onSuccess }: NewInvoiceFormProps) {
  const [docNumber, setDocNumber] = useState('');
  const [docDate, setDocDate] = useState('۱۴۰۴/۰۴/۱۵');
  const [contacts, setContacts] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [warehouses, setWarehouses] = useState<any[]>([]);
  const [selectedContact, setSelectedContact] = useState<number>(0);
  const [selectedWarehouse, setSelectedWarehouse] = useState<number>(1);
  const [lines, setLines] = useState<InvoiceLine[]>([]);
  const [description, setDescription] = useState('');
  const [searchItem, setSearchItem] = useState('');
  const [showItemSearch, setShowItemSearch] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Load data from SQLite
    const data = execQuery(`SELECT * FROM contacts WHERE status = 'active' ORDER BY name`);
    setContacts(data);
    
    const itemsData = execQuery(`SELECT * FROM items WHERE is_active = 1 ORDER BY name`);
    setItems(itemsData);
    
    const whData = execQuery(`SELECT * FROM warehouses WHERE is_active = 1`);
    setWarehouses(whData);
    
    // Generate document number
    const seqName = type === 'sales' ? 'sales' : 'purchase';
    const num = getNextNumber(seqName);
    setDocNumber(num);
  }, [type]);

  const addItem = (item: any) => {
    const existing = lines.find(l => l.itemId === item.id);
    if (existing) {
      setLines(lines.map(l => 
        l.itemId === item.id 
          ? { ...l, quantity: l.quantity + 1, total: (l.quantity + 1) * l.unitPrice - l.discount }
          : l
      ));
    } else {
      const price = type === 'sales' ? item.sell_price : item.buy_price;
      setLines([...lines, {
        id: Date.now(),
        itemId: item.id,
        itemName: item.name,
        quantity: 1,
        unitPrice: price,
        discount: 0,
        total: price
      }]);
    }
    setShowItemSearch(false);
    setSearchItem('');
  };

  const updateLine = (id: number, field: string, value: number) => {
    setLines(lines.map(l => {
      if (l.id === id) {
        const updated = { ...l, [field]: value };
        updated.total = updated.quantity * updated.unitPrice - updated.discount;
        return updated;
      }
      return l;
    }));
  };

  const removeLine = (id: number) => {
    setLines(lines.filter(l => l.id !== id));
  };

  const subtotal = lines.reduce((sum, l) => sum + (l.quantity * l.unitPrice), 0);
  const totalDiscount = lines.reduce((sum, l) => sum + l.discount, 0);
  const total = subtotal - totalDiscount;

  const handleSave = (status: string) => {
    if (lines.length === 0) return;
    if (!selectedContact) return;

    setSaving(true);

    try {
      const db = getDatabase();
      if (!db) throw new Error('Database not available');

      const tableName = type === 'sales' ? 'sales_documents' : 'purchase_documents';
      const linesTableName = type === 'sales' ? 'sales_lines' : 'purchase_lines';

      // Server-side final amount calculation (BR-001)
      const taxRate = 9;
      const taxAmount = Math.max(0, Math.round((subtotal - totalDiscount) * taxRate / 100));
      const grandTotal = Math.max(0, subtotal - totalDiscount + taxAmount);

      // Insert document (atomic transaction)
      db.run(`INSERT INTO ${tableName} (number, doc_number, date, doc_date, invoice_date, contact_id, warehouse_id, lines_total, subtotal, discount, tax, final_total, total, grand_total, paid_amount, balance, status, kind, description)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?, 'invoice', ?)`,
        [docNumber, docNumber, docDate, docDate, docDate, selectedContact, selectedWarehouse, subtotal, subtotal, totalDiscount, taxAmount, grandTotal, grandTotal, grandTotal, grandTotal, status, description]
      );

      // Get last inserted ID
      const result = db.exec(`SELECT last_insert_rowid()`);
      const docId = result[0].values[0][0];

      // Insert lines
      lines.forEach(line => {
        if (type === 'sales') {
          const item = items.find(i => i.id === line.itemId);
          const costPrice = item ? item.buy_price : 0;
          db.run(`INSERT INTO sales_lines (doc_id, item_id, item_name, qty, quantity, unit, unit_price, cost_price, discount, line_total, total)
                  VALUES (?, ?, (SELECT name FROM items WHERE id=?), ?, ?, 'عد', ?, ?, ?, ?, ?)`,
            [docId, line.itemId, line.itemId, line.quantity, line.quantity, line.unitPrice, costPrice, line.discount, line.total, line.total]
          );
          if (status === 'finalized' || status === 'final') {
            db.run(`INSERT INTO inventory_movements (date, item_id, warehouse_id, direction, qty, unit_price, source, ref_number)
                    VALUES (?, ?, ?, 'out', ?, ?, 'فاکتور فروش', ?)`,
              [docDate, line.itemId, selectedWarehouse, line.quantity, line.unitPrice, docNumber]);
          }
        } else {
          db.run(`INSERT INTO purchase_lines (doc_id, item_id, item_name, qty, quantity, unit, unit_price, discount, line_total, total)
                  VALUES (?, ?, (SELECT name FROM items WHERE id=?), ?, ?, 'عد', ?, ?, ?, ?)`,
            [docId, line.itemId, line.itemId, line.quantity, line.quantity, line.unitPrice, line.discount, line.total, line.total]
          );
          if (status === 'finalized' || status === 'final') {
            db.run(`INSERT INTO inventory_movements (date, item_id, warehouse_id, direction, qty, unit_price, source, ref_number)
                    VALUES (?, ?, ?, 'in', ?, ?, 'فاکتور خرید', ?)`,
              [docDate, line.itemId, selectedWarehouse, line.quantity, line.unitPrice, docNumber]);
          }
        }
      });

      // Auto accounting document (SR-ACC-010) — balanced debit/credit
      const accNum = getNextNumber('accounting');
      const debitAcc = type === 'sales' ? '1121' : '1131';
      const creditAcc = type === 'sales' ? '4110' : '2111';
      const accDesc = (type === 'sales' ? 'فروش' : 'خرید') + ' - ' + docNumber;

      db.run(`INSERT INTO accounting_documents (number, doc_number, date, doc_date, fiscal_year, description, narrative, kind, source_ref, source_type, source_id, status, total_debit, debit_total, total_credit, credit_total)
              VALUES (?, ?, ?, ?, '۱۴۰۵', ?, ?, 'auto', ?, ?, ?, 'final', ?, ?, ?, ?)`,
        [accNum, accNum, docDate, docDate, accDesc, accDesc, docNumber, type, String(docId), grandTotal, grandTotal, grandTotal, grandTotal]);
      const accDocRes = db.exec(`SELECT last_insert_rowid()`);
      const accDocId = accDocRes[0].values[0][0];
      db.run(`INSERT INTO accounting_document_lines (doc_id, account_code, account_title, debit, credit)
              VALUES (?, ?, (SELECT title FROM accounts WHERE code=?), ?, 0)`,
        [accDocId, debitAcc, debitAcc, grandTotal]);
      db.run(`INSERT INTO accounting_document_lines (doc_id, account_code, account_title, debit, credit)
              VALUES (?, ?, (SELECT title FROM accounts WHERE code=?), 0, ?)`,
        [accDocId, creditAcc, creditAcc, grandTotal]);

      saveDatabase();

      setSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } catch (e) {
      console.error('Save error:', e);
      alert('خطا در ذخیره فاکتور');
    } finally {
      setSaving(false);
    }
  };

  const filteredItems = items.filter(i => 
    i.name.includes(searchItem) || i.code.includes(searchItem)
  );

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
        <div className="bg-white rounded-3xl p-8 text-center animate-bounce-in max-w-sm mx-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">فاکتور با موفقیت ثبت شد</h3>
          <p className="text-sm text-gray-500">شماره: {docNumber}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className={`flex items-center justify-between p-5 border-b border-gray-100 ${type === 'sales' ? 'bg-gradient-to-r from-rose-50 to-pink-50' : 'bg-gradient-to-r from-amber-50 to-orange-50'}`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${type === 'sales' ? 'bg-gradient-to-br from-rose-400 to-rose-600' : 'bg-gradient-to-br from-amber-400 to-amber-600'} flex items-center justify-center text-white shadow-md`}>
              <Receipt size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-800">
                {type === 'sales' ? 'فاکتور فروش جدید' : 'فاکتور خرید جدید'}
              </h2>
              <p className="text-[11px] text-gray-500">شماره: {docNumber}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
            <X size={16} className="text-gray-500" />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Document Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">تاریخ</label>
              <input 
                type="text" 
                value={docDate}
                onChange={(e) => setDocDate(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                {type === 'sales' ? 'مشتری' : 'تأمین‌کننده'}
              </label>
              <select
                value={selectedContact}
                onChange={(e) => setSelectedContact(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 transition-colors"
              >
                <option value={0}>انتخاب کنید...</option>
                {contacts.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">انبار</label>
              <select
                value={selectedWarehouse}
                onChange={(e) => setSelectedWarehouse(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 transition-colors"
              >
                {warehouses.map(w => (
                  <option key={w.id} value={w.id}>{w.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Add Item */}
          <div className="relative">
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="جست‌وجوی کالا برای افزودن..."
                  value={searchItem}
                  onChange={(e) => { setSearchItem(e.target.value); setShowItemSearch(true); }}
                  onFocus={() => setShowItemSearch(true)}
                  className="w-full pr-9 pl-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 transition-colors"
                />
              </div>
              {showItemSearch && searchItem && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border border-gray-200 shadow-lg max-h-48 overflow-y-auto z-10">
                  {filteredItems.slice(0, 8).map(item => (
                    <button
                      key={item.id}
                      onClick={() => addItem(item)}
                      className="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-50 text-right transition-colors border-b border-gray-50 last:border-0"
                    >
                      <span className="text-xs font-medium text-gray-800">{item.name}</span>
                      <span className="text-[10px] text-gray-400">{item.code} | {(type === 'sales' ? item.sell_price : item.buy_price).toLocaleString()} ریال</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Lines Table */}
          {lines.length > 0 && (
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-right py-2.5 px-3 text-[11px] font-bold text-gray-500">کالا</th>
                    <th className="text-right py-2.5 px-3 text-[11px] font-bold text-gray-500 w-20">تعداد</th>
                    <th className="text-right py-2.5 px-3 text-[11px] font-bold text-gray-500 w-28">قیمت واحد</th>
                    <th className="text-right py-2.5 px-3 text-[11px] font-bold text-gray-500 w-24">تخفیف</th>
                    <th className="text-right py-2.5 px-3 text-[11px] font-bold text-gray-500 w-28">مبلغ</th>
                    <th className="py-2.5 px-3 w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {lines.map(line => (
                    <tr key={line.id} className="border-b border-gray-100 last:border-0">
                      <td className="py-2 px-3 text-xs text-gray-800">{line.itemName}</td>
                      <td className="py-2 px-3">
                        <input
                          type="number"
                          value={line.quantity}
                          onChange={(e) => updateLine(line.id, 'quantity', Number(e.target.value))}
                          className="w-full px-2 py-1 rounded-lg border border-gray-200 text-xs text-center outline-none focus:border-blue-400"
                          min="1"
                        />
                      </td>
                      <td className="py-2 px-3">
                        <input
                          type="number"
                          value={line.unitPrice}
                          onChange={(e) => updateLine(line.id, 'unitPrice', Number(e.target.value))}
                          className="w-full px-2 py-1 rounded-lg border border-gray-200 text-xs text-center outline-none focus:border-blue-400"
                        />
                      </td>
                      <td className="py-2 px-3">
                        <input
                          type="number"
                          value={line.discount}
                          onChange={(e) => updateLine(line.id, 'discount', Number(e.target.value))}
                          className="w-full px-2 py-1 rounded-lg border border-gray-200 text-xs text-center outline-none focus:border-blue-400"
                        />
                      </td>
                      <td className="py-2 px-3 text-xs font-bold text-gray-700">{line.total.toLocaleString()}</td>
                      <td className="py-2 px-3">
                        <button onClick={() => removeLine(line.id)} className="p-1 rounded-lg hover:bg-red-50 text-red-400 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">توضیحات</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 transition-colors resize-none h-20"
              placeholder="توضیحات فاکتور..."
            />
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-64 space-y-2 p-4 rounded-xl bg-gray-50 border border-gray-200">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">جمع کل:</span>
                <span className="font-bold text-gray-700">{subtotal.toLocaleString()} ریال</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">تخفیف:</span>
                <span className="font-bold text-red-500">{totalDiscount.toLocaleString()} ریال</span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex items-center justify-between">
                <span className="text-sm font-bold text-gray-700">مبلغ نهایی:</span>
                <span className="text-sm font-black text-blue-600">{total.toLocaleString()} ریال</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-5 border-t border-gray-100 bg-gray-50/50">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-100 transition-colors"
          >
            انصراف
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSave('draft')}
              disabled={saving || lines.length === 0 || !selectedContact}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-700 hover:bg-amber-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={14} />
              پیش‌نویس
            </button>
            <button
              onClick={() => handleSave('confirmed')}
              disabled={saving || lines.length === 0 || !selectedContact}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm text-white shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                type === 'sales' 
                  ? 'bg-gradient-to-r from-rose-500 to-pink-600 hover:shadow-lg hover:shadow-rose-500/30'
                  : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:shadow-lg hover:shadow-amber-500/30'
              }`}
            >
              {saving ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <CheckCircle size={14} />
              )}
              ثبت قطعی
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
