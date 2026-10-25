import { useState } from 'react';
import { ShoppingCart, Plus, Search, Filter, Eye, Edit, Printer, FileText, Receipt, TrendingDown, DollarSign, BarChart3 } from 'lucide-react';
import NewInvoiceForm from '../components/NewInvoiceForm';

const purchaseInvoices = [
  { id: 1, number: 'خرید-۱۰۰۱', date: '۱۴۰۴/۰۴/۱۲', supplier: 'تأمین‌کننده بتا', amount: '۸,۲۰۰,۰۰۰', status: 'قطعی', warehouse: 'انبار مرکزی', payment: '۶۰٪' },
  { id: 2, number: 'خرید-۱۰۰۲', date: '۱۴۰۴/۰۴/۱۰', supplier: 'بازرگانی زتا', amount: '۱۵,۰۰۰,۰۰۰', status: 'قطعی', warehouse: 'انبار شرق', payment: '۱۰۰٪' },
  { id: 3, number: 'خرید-۱۰۰۳', date: '۱۴۰۴/۰۴/۰۸', supplier: 'شرکت پارس', amount: '۴,۵۰۰,۰۰۰', status: 'پیش‌نویس', warehouse: 'انبار مرکزی', payment: '۰٪' },
  { id: 4, number: 'خرید-۱۰۰۴', date: '۱۴۰۴/۰۴/۰۵', supplier: 'تأمین‌کننده بتا', amount: '۱۲,۸۰۰,۰۰۰', status: 'قطعی', warehouse: 'انبار غرب', payment: '۴۰٪' },
  { id: 5, number: 'خرید-۱۰۰۵', date: '۱۴۰۴/۰۴/۰۳', supplier: 'فروشگاه دلتا', amount: '۶,۳۰۰,۰۰۰', status: 'برگشتی', warehouse: 'انبار مرکزی', payment: 'برگشت' },
];

const quickActions = [
  { title: 'فاکتور خرید جدید', icon: <Receipt size={18} />, color: 'from-blue-400 to-blue-600', desc: 'ثبت فاکتور جدید' },
  { title: 'پیش‌فاکتور', icon: <FileText size={18} />, color: 'from-amber-400 to-amber-600', desc: 'ایجاد پیش‌فاکتور' },
  { title: 'برگشت از خرید', icon: <TrendingDown size={18} />, color: 'from-red-400 to-red-600', desc: 'ثبت برگشت' },
  { title: 'هزینه‌های خرید', icon: <DollarSign size={18} />, color: 'from-emerald-400 to-emerald-600', desc: 'ثبت هزینه' },
];

export default function Purchases() {
  const [showNewInvoice, setShowNewInvoice] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-800">خرید</h1>
          <p className="text-sm text-gray-500 mt-1">مدیریت فاکتورها، سفارشات و گزارش‌های خرید</p>
        </div>
        <button 
          onClick={() => setShowNewInvoice(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm rounded-2xl hover:shadow-lg hover:shadow-amber-500/30 transition-all">
          <Plus size={16} />
          فاکتور خرید جدید
        </button>
      </div>

      {/* New Invoice Modal */}
      {showNewInvoice && (
        <NewInvoiceForm 
          type="purchase" 
          onClose={() => setShowNewInvoice(false)} 
          onSuccess={() => setShowNewInvoice(false)} 
        />
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {quickActions.map((action, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100/80 p-4 card-hover cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                {action.icon}
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-800">{action.title}</h3>
                <p className="text-[10px] text-gray-400 mt-0.5">{action.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 p-4 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <ShoppingCart size={18} className="text-blue-600" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400">خرید این ماه</p>
              <p className="text-lg font-black text-gray-800">۴۵,۰۰۰,۰۰۰ <span className="text-[10px] text-gray-400">ریال</span></p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 p-4 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
              <BarChart3 size={18} className="text-green-600" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400">تعداد فاکتورها</p>
              <p className="text-lg font-black text-gray-800">۲۴ <span className="text-[10px] text-gray-400">فاکتور</span></p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 p-4 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <DollarSign size={18} className="text-amber-600" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400">مانده پرداخت</p>
              <p className="text-lg font-black text-gray-800">۱۸,۵۰۰,۰۰۰ <span className="text-[10px] text-gray-400">ریال</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div>
            <h3 className="text-sm font-bold text-gray-800">فهرست فاکتورهای خرید</h3>
            <p className="text-[10px] text-gray-400 mt-0.5">لیست تمام فاکتورهای ثبت شده</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 border border-gray-200/50">
              <Search size={14} className="text-gray-400" />
              <input type="text" placeholder="جست‌وجو..." className="bg-transparent text-xs outline-none w-32" />
            </div>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-50 border border-gray-200/50 text-xs text-gray-600 hover:bg-gray-100 transition-colors">
              <Filter size={14} />
              فیلتر
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">شماره</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">تاریخ</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">تأمین‌کننده</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">انبار</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">مبلغ (ریال)</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">پرداخت</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">وضعیت</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {purchaseInvoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-3.5 px-5 text-xs font-mono font-bold text-gray-700">{invoice.number}</td>
                  <td className="py-3.5 px-5 text-xs text-gray-600">{invoice.date}</td>
                  <td className="py-3.5 px-5 text-xs font-medium text-gray-800">{invoice.supplier}</td>
                  <td className="py-3.5 px-5 text-xs text-gray-500">{invoice.warehouse}</td>
                  <td className="py-3.5 px-5 text-xs font-bold text-gray-700">{invoice.amount}</td>
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600" style={{ width: invoice.payment === '۱۰۰٪' ? '100%' : invoice.payment === '۶۰٪' ? '60%' : invoice.payment === '۴۰٪' ? '40%' : invoice.payment === 'برگشت' ? '0%' : '0%' }}></div>
                      </div>
                      <span className="text-[10px] text-gray-500">{invoice.payment}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-5">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      invoice.status === 'قطعی' ? 'bg-green-50 text-green-600' :
                      invoice.status === 'پیش‌نویس' ? 'bg-amber-50 text-amber-600' :
                      'bg-red-50 text-red-600'
                    }`}>{invoice.status}</span>
                  </td>
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"><Eye size={13} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-500 transition-colors"><Edit size={13} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"><Printer size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
