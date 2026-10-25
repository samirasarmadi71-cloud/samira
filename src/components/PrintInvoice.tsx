import { useEffect } from 'react';
import { X, Printer, Download } from 'lucide-react';
import { execQuery } from '../database/db';

interface PrintInvoiceProps {
  invoiceId: number;
  type: 'sales' | 'purchase';
  onClose: () => void;
}

export default function PrintInvoice({ invoiceId, type, onClose }: PrintInvoiceProps) {
  const handlePrint = () => {
    window.print();
  };

  // Get invoice data from SQLite
  const getInvoiceData = () => {
    try {
      const tableName = type === 'sales' ? 'sales_documents' : 'purchase_documents';
      const linesTableName = type === 'sales' ? 'sales_lines' : 'purchase_lines';
      
      const invoices = execQuery(`SELECT * FROM ${tableName} WHERE id = ${invoiceId}`);
      if (invoices.length === 0) return null;
      
      const invoice = invoices[0];
      const lines = execQuery(`
        SELECT l.*, i.name as item_name, i.code as item_code 
        FROM ${linesTableName} l 
        JOIN items i ON l.item_id = i.id 
        WHERE l.doc_id = ${invoiceId}
      `);
      
      const contacts = execQuery(`SELECT * FROM contacts WHERE id = ${invoice.contact_id}`);
      const contact = contacts.length > 0 ? contacts[0] : null;
      
      const company = execQuery(`SELECT * FROM company_settings LIMIT 1`);
      
      return { invoice, lines, contact, company: company[0] };
    } catch (e) {
      console.error('Error loading invoice:', e);
      return null;
    }
  };

  const data = getInvoiceData();

  if (!data) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-3xl p-8 text-center max-w-sm">
          <p className="text-gray-600">فاکتور یافت نشد</p>
          <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-100 rounded-xl text-sm">بستن</button>
        </div>
      </div>
    );
  }

  const { invoice, lines, contact, company } = data;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Actions Bar - Hidden in print */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 print:hidden">
          <h3 className="text-sm font-bold text-gray-800">پیش‌نمایش فاکتور</h3>
          <div className="flex items-center gap-2">
            <button onClick={handlePrint} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 text-blue-600 text-xs hover:bg-blue-100 transition-colors">
              <Printer size={14} />
              چاپ
            </button>
            <button onClick={onClose} className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
              <X size={16} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* Invoice Content */}
        <div className="flex-1 overflow-y-auto p-8" id="printable-invoice">
          {/* Company Header */}
          <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
            <h1 className="text-2xl font-black text-gray-800">{company?.brand_name || 'سَرمد'}</h1>
            <p className="text-xs text-gray-600 mt-1">{company?.company_name || ''}</p>
            <p className="text-[10px] text-gray-500 mt-1">
              {company?.address || ''} | تلفن: {company?.phone || ''}
            </p>
          </div>

          {/* Invoice Title */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-800">
                {type === 'sales' ? 'فاکتور فروش' : 'فاکتور خرید'}
              </h2>
              <p className="text-xs text-gray-500">شماره: {invoice.doc_number}</p>
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-600">تاریخ: {invoice.doc_date}</p>
              <p className="text-xs text-gray-600">وضعیت: {invoice.status === 'confirmed' ? 'قطعی' : invoice.status === 'draft' ? 'پیش‌نویس' : invoice.status}</p>
            </div>
          </div>

          {/* Contact Info */}
          {contact && (
            <div className="mb-6 p-3 rounded-xl bg-gray-50 border border-gray-200">
              <p className="text-xs font-bold text-gray-700 mb-1">
                {type === 'sales' ? 'مشتری:' : 'تأمین‌کننده:'} {contact.name}
              </p>
              <p className="text-[10px] text-gray-500">کد: {contact.code} | تلفن: {contact.phone || '-'}</p>
            </div>
          )}

          {/* Items Table */}
          <table className="w-full mb-6 border border-gray-300">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300">
                <th className="text-right py-2 px-3 text-[11px] font-bold text-gray-700 border-l border-gray-300">ردیف</th>
                <th className="text-right py-2 px-3 text-[11px] font-bold text-gray-700 border-l border-gray-300">کد کالا</th>
                <th className="text-right py-2 px-3 text-[11px] font-bold text-gray-700 border-l border-gray-300">شرح کالا</th>
                <th className="text-right py-2 px-3 text-[11px] font-bold text-gray-700 border-l border-gray-300">تعداد</th>
                <th className="text-right py-2 px-3 text-[11px] font-bold text-gray-700 border-l border-gray-300">قیمت واحد</th>
                <th className="text-right py-2 px-3 text-[11px] font-bold text-gray-700 border-l border-gray-300">تخفیف</th>
                <th className="text-right py-2 px-3 text-[11px] font-bold text-gray-700">مبلغ</th>
              </tr>
            </thead>
            <tbody>
              {lines.map((line: any, idx: number) => (
                <tr key={line.id} className="border-b border-gray-200">
                  <td className="py-2 px-3 text-xs text-gray-700 border-l border-gray-200">{idx + 1}</td>
                  <td className="py-2 px-3 text-xs text-gray-600 border-l border-gray-200 font-mono">{line.item_code}</td>
                  <td className="py-2 px-3 text-xs text-gray-800 border-l border-gray-200">{line.item_name}</td>
                  <td className="py-2 px-3 text-xs text-gray-700 border-l border-gray-200 text-center">{line.quantity}</td>
                  <td className="py-2 px-3 text-xs text-gray-700 border-l border-gray-200 text-left">{Number(line.unit_price).toLocaleString()}</td>
                  <td className="py-2 px-3 text-xs text-gray-700 border-l border-gray-200 text-left">{Number(line.discount).toLocaleString()}</td>
                  <td className="py-2 px-3 text-xs font-bold text-gray-800 text-left">{Number(line.total).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end mb-6">
            <div className="w-64 space-y-2 border border-gray-300 rounded-lg p-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">جمع کل:</span>
                <span className="font-bold">{Number(invoice.subtotal).toLocaleString()} ریال</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">تخفیف:</span>
                <span className="font-bold text-red-600">{Number(invoice.discount).toLocaleString()} ریال</span>
              </div>
              <div className="border-t border-gray-300 pt-2 flex items-center justify-between">
                <span className="text-sm font-bold text-gray-800">مبلغ نهایی:</span>
                <span className="text-sm font-black text-blue-700">{Number(invoice.total).toLocaleString()} ریال</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">پرداخت شده:</span>
                <span className="font-bold text-green-600">{Number(invoice.paid_amount).toLocaleString()} ریال</span>
              </div>
              <div className="flex items-center justify-between text-xs border-t border-gray-200 pt-1">
                <span className="text-gray-600">مانده:</span>
                <span className="font-bold text-amber-600">{(Number(invoice.total) - Number(invoice.paid_amount)).toLocaleString()} ریال</span>
              </div>
            </div>
          </div>

          {/* Description */}
          {invoice.description && (
            <div className="mb-6 p-3 rounded-lg bg-gray-50 border border-gray-200">
              <p className="text-[10px] font-bold text-gray-600 mb-1">توضیحات:</p>
              <p className="text-xs text-gray-700">{invoice.description}</p>
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-gray-300 pt-4 mt-8">
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <p className="text-xs text-gray-600 mb-8">امضاء فروشنده</p>
                <div className="border-t border-gray-400 pt-1">
                  <p className="text-[10px] text-gray-500">{company?.brand_name || 'سَرمد'}</p>
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-600 mb-8">امضاء خریدار</p>
                <div className="border-t border-gray-400 pt-1">
                  <p className="text-[10px] text-gray-500">{contact?.name || ''}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Print Footer */}
          <div className="mt-6 text-center text-[9px] text-gray-400 print:block hidden">
            <p>این فاکتور توسط سیستم حسابداری سرمد تولید شده است</p>
            <p>تاریخ چاپ: {new Date().toLocaleDateString('fa-IR')}</p>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #printable-invoice, #printable-invoice * { visibility: visible; }
          #printable-invoice { position: absolute; top: 0; left: 0; right: 0; width: 100%; }
        }
      `}</style>
    </div>
  );
}
