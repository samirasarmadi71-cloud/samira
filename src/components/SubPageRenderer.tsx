import { useState } from 'react';
import { Save, Download, Printer, Info, AlertTriangle } from 'lucide-react';
import DataTable from './DataTable';

interface SubPageRendererProps {
  module: string;
  subPage: string;
}

export default function SubPageRenderer({ module, subPage }: SubPageRendererProps) {
  // ============ اطلاعات پایه ============
  if (module === 'base-data') {
    if (subPage === 'company') {
      return <CompanyInfo />;
    }
    if (subPage === 'fiscal-years') {
      return (
        <DataTable
          title="سال مالی و دوره‌ها"
          subtitle="مدیریت سال‌های مالی"
          searchFields={['year', 'start', 'end']}
          columns={[
            { key: 'year', label: 'سال' },
            { key: 'start', label: 'تاریخ شروع' },
            { key: 'end', label: 'تاریخ پایان' },
            { key: 'status', label: 'وضعیت', render: (i: any) => (
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${i.status === 'فعال' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>{i.status}</span>
            )}
          ]}
          initialData={[
            { id: 1, year: '۱۴۰۵', start: '۱۴۰۵/۰۱/۰۱', end: '۱۴۰۵/۱۲/۲۹', status: 'فعال' },
            { id: 2, year: '۱۴۰۴', start: '۱۴۰۴/۰۱/۰۱', end: '۱۴۰۴/۱۲/۲۹', status: 'بسته' },
          ]}
        />
      );
    }
    if (subPage === 'item-groups') {
      return (
        <DataTable
          title="گروه کالا و خدمات"
          subtitle="دسته‌بندی محصولات"
          searchFields={['code', 'name']}
          columns={[
            { key: 'code', label: 'کد' },
            { key: 'name', label: 'نام گروه' },
            { key: 'items', label: 'تعداد کالا' }
          ]}
          initialData={[
            { id: 1, code: 'G-01', name: 'کالای دیجیتال', items: '۲۵' },
            { id: 2, code: 'G-02', name: 'لوازم جانبی', items: '۴۸' },
            { id: 3, code: 'G-03', name: 'ذخیره‌سازی', items: '۱۵' },
          ]}
        />
      );
    }
    if (subPage === 'units') {
      return (
        <DataTable
          title="واحدهای اندازه‌گیری"
          subtitle="تعریف واحدها"
          searchFields={['name', 'short']}
          columns={[
            { key: 'name', label: 'نام واحد' },
            { key: 'short', label: 'مخفف' }
          ]}
          initialData={[
            { id: 1, name: 'عدد', short: 'عد' },
            { id: 2, name: 'کیلوگرم', short: 'کگ' },
            { id: 3, name: 'متر', short: 'م' },
            { id: 4, name: 'لیتر', short: 'ل' },
          ]}
        />
      );
    }
    if (subPage === 'warehouses') {
      return (
        <DataTable
          title="انبارها"
          subtitle="مدیریت انبارها"
          searchFields={['code', 'name', 'address']}
          columns={[
            { key: 'code', label: 'کد' },
            { key: 'name', label: 'نام انبار' },
            { key: 'address', label: 'نشانی' },
            { key: 'status', label: 'وضعیت', render: (i: any) => (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-50 text-green-600">{i.status}</span>
            )}
          ]}
          initialData={[
            { id: 1, code: 'WH-001', name: 'انبار مرکزی', address: 'تهران، خیابان صنعتی', status: 'فعال' },
            { id: 2, code: 'WH-002', name: 'انبار شرق', address: 'تهران، خیابان دماوند', status: 'فعال' },
            { id: 3, code: 'WH-003', name: 'انبار غرب', address: 'تهران، خیابان آزادی', status: 'فعال' },
          ]}
        />
      );
    }
    if (subPage === 'cash-bank') {
      return (
        <DataTable
          title="صندوق و بانک"
          subtitle="حساب‌های مالی"
          searchFields={['code', 'name', 'type']}
          columns={[
            { key: 'code', label: 'کد' },
            { key: 'name', label: 'نام حساب' },
            { key: 'type', label: 'نوع', render: (i: any) => (
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${i.type === 'صندوق' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'}`}>{i.type}</span>
            )},
            { key: 'balance', label: 'موجودی (ریال)', render: (i: any) => <span className="font-bold">{Number(i.balance).toLocaleString()}</span> }
          ]}
          initialData={[
            { id: 1, code: 'CA-001', name: 'صندوق نقدی', type: 'صندوق', balance: 15200000 },
            { id: 2, code: 'CA-002', name: 'بانک ملت', type: 'بانک', balance: 85000000 },
            { id: 3, code: 'CA-003', name: 'بانک ملی', type: 'بانک', balance: 120000000 },
          ]}
        />
      );
    }
    if (subPage === 'payment-methods') {
      return (
        <DataTable
          title="روش‌های پرداخت"
          subtitle="تعریف روش‌های پرداخت"
          searchFields={['name', 'type']}
          columns={[
            { key: 'name', label: 'نام روش' },
            { key: 'type', label: 'نوع' }
          ]}
          initialData={[
            { id: 1, name: 'نقدی', type: 'نقد' },
            { id: 2, name: 'کارت بانکی', type: 'کارت' },
            { id: 3, name: 'چک', type: 'چک' },
          ]}
        />
      );
    }
    if (subPage === 'numbering') {
      return (
        <DataTable
          title="شماره‌گذاری اسناد"
          subtitle="تنظیم پیش‌شماره‌ها"
          searchFields={['type', 'prefix']}
          columns={[
            { key: 'type', label: 'نوع سند' },
            { key: 'prefix', label: 'پیش‌شماره' },
            { key: 'current', label: 'شماره جاری' }
          ]}
          initialData={[
            { id: 1, type: 'فاکتور فروش', prefix: 'فروش', current: '۲۰۰۵' },
            { id: 2, type: 'فاکتور خرید', prefix: 'خرید', current: '۱۰۰۵' },
            { id: 3, type: 'سند حسابداری', prefix: 'سند', current: '۱۰۰۶' },
          ]}
        />
      );
    }
  }

  // ============ معرفی اشخاص ============
  if (module === 'contacts') {
    if (subPage === 'list' || subPage === 'customers' || subPage === 'suppliers') {
      const filterType = subPage === 'customers' ? 'مشتری' : subPage === 'suppliers' ? 'تأمین‌کننده' : '';
      return (
        <DataTable
          title={filterType ? `${filterType}ان` : 'فهرست اشخاص'}
          subtitle="مدیریت اشخاص"
          searchFields={['code', 'name', 'phone', 'city']}
          columns={[
            { key: 'code', label: 'کد' },
            { key: 'name', label: 'نام' },
            { key: 'type', label: 'نوع', render: (i: any) => (
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${i.type === 'مشتری' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}`}>{i.type}</span>
            )},
            { key: 'phone', label: 'تلفن' },
            { key: 'city', label: 'شهر' },
            { key: 'balance', label: 'مانده (ریال)', render: (i: any) => <span className="font-bold">{Number(i.balance).toLocaleString()}</span> }
          ]}
          initialData={[
            { id: 1, code: 'SH-001', name: 'شرکت آلفا', type: 'مشتری', phone: '۰۲۱-۸۸۷۷۶۶۵۵', city: 'تهران', balance: 12500000 },
            { id: 2, code: 'SH-002', name: 'تأمین‌کننده بتا', type: 'تأمین‌کننده', phone: '۰۳۱-۳۳۴۴۵۵۶۶', city: 'اصفهان', balance: 8200000 },
            { id: 3, code: 'SH-003', name: 'شرکت گاما', type: 'مشتری', phone: '۰۴۱-۴۴۵۵۶۶۷۷', city: 'تبریز', balance: 5000000 },
          ]}
        />
      );
    }
    if (subPage === 'new') {
      return (
        <DataTable
          title="شخص جدید"
          subtitle="ثبت شخص جدید"
          searchFields={['name']}
          addButtonLabel="ثبت شخص"
          addColor="from-violet-500 to-purple-600"
          columns={[
            { key: 'code', label: 'کد' },
            { key: 'name', label: 'نام' },
            { key: 'type', label: 'نوع', type: 'select', options: [{ value: 'مشتری', label: 'مشتری' }, { value: 'تأمین‌کننده', label: 'تأمین‌کننده' }] },
            { key: 'phone', label: 'تلفن' },
            { key: 'city', label: 'شهر' }
          ]}
          initialData={[]}
        />
      );
    }
  }

  // ============ خرید ============
  if (module === 'purchases') {
    if (subPage === 'new' || subPage === 'list') {
      return (
        <DataTable
          title="فاکتورهای خرید"
          subtitle="مدیریت فاکتورهای خرید"
          searchFields={['number', 'supplier', 'date']}
          addButtonLabel="فاکتور جدید"
          addColor="from-amber-500 to-orange-600"
          columns={[
            { key: 'number', label: 'شماره' },
            { key: 'date', label: 'تاریخ' },
            { key: 'supplier', label: 'تأمین‌کننده' },
            { key: 'amount', label: 'مبلغ (ریال)', render: (i: any) => <span className="font-bold">{i.amount}</span> },
            { key: 'status', label: 'وضعیت', render: (i: any) => (
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${i.status === 'قطعی' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>{i.status}</span>
            )}
          ]}
          initialData={[
            { id: 1, number: 'خرید-۱۰۰۱', date: '۱۴۰۵/۰۸/۰۱', supplier: 'تأمین‌کننده بتا', amount: '۸,۲۰۰,۰۰۰', status: 'قطعی' },
            { id: 2, number: 'خرید-۱۰۰۲', date: '۱۴۰۵/۰۷/۲۸', supplier: 'بازرگانی زتا', amount: '۱۵,۰۰۰,۰۰۰', status: 'قطعی' },
          ]}
        />
      );
    }
    if (subPage === 'proforma') {
      return (
        <DataTable
          title="پیش‌فاکتور و سفارش خرید"
          subtitle="مدیریت پیش‌فاکتورها"
          searchFields={['number', 'supplier']}
          columns={[
            { key: 'number', label: 'شماره' },
            { key: 'date', label: 'تاریخ' },
            { key: 'supplier', label: 'تأمین‌کننده' },
            { key: 'amount', label: 'مبلغ (ریال)' },
            { key: 'status', label: 'وضعیت' }
          ]}
          initialData={[
            { id: 1, number: 'پیش-۵۰۱', date: '۱۴۰۵/۰۸/۰۲', supplier: 'تأمین‌کننده بتا', amount: '۲۵,۰۰۰,۰۰۰', status: 'در انتظار' },
          ]}
        />
      );
    }
    if (subPage === 'returns') {
      return (
        <DataTable
          title="برگشت از خرید"
          subtitle="مدیریت برگشتی‌ها"
          searchFields={['number', 'supplier']}
          columns={[
            { key: 'number', label: 'شماره' },
            { key: 'date', label: 'تاریخ' },
            { key: 'supplier', label: 'تأمین‌کننده' },
            { key: 'amount', label: 'مبلغ (ریال)' }
          ]}
          initialData={[]}
        />
      );
    }
    if (subPage === 'expenses') {
      return (
        <DataTable
          title="هزینه‌های خرید"
          subtitle="ثبت هزینه‌های جانبی"
          searchFields={['description', 'type']}
          columns={[
            { key: 'date', label: 'تاریخ' },
            { key: 'description', label: 'شرح' },
            { key: 'amount', label: 'مبلغ (ریال)' },
            { key: 'type', label: 'نوع' }
          ]}
          initialData={[
            { id: 1, date: '۱۴۰۵/۰۸/۰۱', description: 'هزینه حمل', amount: '۵۰۰,۰۰۰', type: 'حمل' },
          ]}
        />
      );
    }
  }

  // ============ فروش ============
  if (module === 'sales') {
    if (subPage === 'new' || subPage === 'list') {
      return (
        <DataTable
          title="فاکتورهای فروش"
          subtitle="مدیریت فاکتورهای فروش"
          searchFields={['number', 'customer', 'date']}
          addButtonLabel="فاکتور جدید"
          addColor="from-rose-500 to-pink-600"
          columns={[
            { key: 'number', label: 'شماره' },
            { key: 'date', label: 'تاریخ' },
            { key: 'customer', label: 'مشتری' },
            { key: 'amount', label: 'مبلغ (ریال)', render: (i: any) => <span className="font-bold">{i.amount}</span> },
            { key: 'profit', label: 'سود (ریال)', render: (i: any) => <span className="font-bold text-green-600">{i.profit}</span> },
            { key: 'status', label: 'وضعیت', render: (i: any) => (
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${i.status === 'قطعی' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>{i.status}</span>
            )}
          ]}
          initialData={[
            { id: 1, number: 'فروش-۲۰۰۱', date: '۱۴۰۵/۰۸/۰۲', customer: 'شرکت آلفا', amount: '۱۲,۵۰۰,۰۰۰', profit: '۳,۲۰۰,۰۰۰', status: 'قطعی' },
            { id: 2, number: 'فروش-۲۰۰۲', date: '۱۴۰۵/۰۸/۰۱', customer: 'فروشگاه دلتا', amount: '۸,۷۰۰,۰۰۰', profit: '۲,۱۰۰,۰۰۰', status: 'قطعی' },
          ]}
        />
      );
    }
    if (subPage === 'proforma') {
      return (
        <DataTable
          title="پیش‌فاکتور و سفارش فروش"
          subtitle="مدیریت پیش‌فاکتورها"
          searchFields={['number', 'customer']}
          columns={[
            { key: 'number', label: 'شماره' },
            { key: 'date', label: 'تاریخ' },
            { key: 'customer', label: 'مشتری' },
            { key: 'amount', label: 'مبلغ (ریال)' },
            { key: 'status', label: 'وضعیت' }
          ]}
          initialData={[]}
        />
      );
    }
    if (subPage === 'returns') {
      return (
        <DataTable
          title="برگشت از فروش"
          subtitle="مدیریت برگشتی‌ها"
          searchFields={['number', 'customer']}
          columns={[
            { key: 'number', label: 'شماره' },
            { key: 'date', label: 'تاریخ' },
            { key: 'customer', label: 'مشتری' },
            { key: 'amount', label: 'مبلغ (ریال)' }
          ]}
          initialData={[]}
        />
      );
    }
    if (subPage === 'receivables') {
      return (
        <DataTable
          title="دریافت‌های مرتبط"
          subtitle="دریافت‌های مرتبط با فروش"
          searchFields={['customer', 'method']}
          columns={[
            { key: 'date', label: 'تاریخ' },
            { key: 'customer', label: 'مشتری' },
            { key: 'amount', label: 'مبلغ (ریال)' },
            { key: 'method', label: 'روش' }
          ]}
          initialData={[
            { id: 1, date: '۱۴۰۵/۰۸/۰۲', customer: 'شرکت آلفا', amount: '۱۰,۰۰۰,۰۰۰', method: 'نقدی' },
          ]}
        />
      );
    }
  }

  // ============ انبار و کالا ============
  if (module === 'inventory') {
    if (subPage === 'list') {
      return (
        <DataTable
          title="فهرست کالا و خدمات"
          subtitle="مدیریت کالاها"
          searchFields={['code', 'name', 'group']}
          addButtonLabel="کالای جدید"
          addColor="from-cyan-500 to-teal-600"
          columns={[
            { key: 'code', label: 'کد' },
            { key: 'name', label: 'نام کالا' },
            { key: 'group', label: 'گروه' },
            { key: 'stock', label: 'موجودی', render: (i: any) => <span className="font-bold">{i.stock}</span> },
            { key: 'unit', label: 'واحد' },
            { key: 'price', label: 'قیمت فروش', render: (i: any) => <span className="font-bold">{Number(i.price).toLocaleString()}</span> }
          ]}
          initialData={[
            { id: 1, code: 'K-001', name: 'لپ‌تاپ ایسوس', group: 'کالای دیجیتال', stock: '۱۲', unit: 'عدد', price: 35000000 },
            { id: 2, code: 'K-002', name: 'ماوس بی‌سیم', group: 'لوازم جانبی', stock: '۳', unit: 'عدد', price: 850000 },
            { id: 3, code: 'K-003', name: 'کیبورد مکانیکی', group: 'لوازم جانبی', stock: '۲۸', unit: 'عدد', price: 2500000 },
          ]}
        />
      );
    }
    if (subPage === 'receipt') {
      return (
        <DataTable
          title="رسید ورود کالا"
          subtitle="ثبت ورود کالا به انبار"
          searchFields={['number', 'item']}
          addButtonLabel="رسید جدید"
          addColor="from-green-500 to-emerald-600"
          columns={[
            { key: 'number', label: 'شماره' },
            { key: 'date', label: 'تاریخ' },
            { key: 'item', label: 'کالا' },
            { key: 'qty', label: 'تعداد' },
            { key: 'warehouse', label: 'انبار مقصد' }
          ]}
          initialData={[
            { id: 1, number: 'رسید-۵۰۱', date: '۱۴۰۵/۰۸/۰۲', item: 'لپ‌تاپ ایسوس', qty: '۱۰', warehouse: 'انبار مرکزی' },
          ]}
        />
      );
    }
    if (subPage === 'issue') {
      return (
        <DataTable
          title="حواله خروج کالا"
          subtitle="ثبت خروج کالا از انبار"
          searchFields={['number', 'item']}
          addButtonLabel="حواله جدید"
          addColor="from-red-500 to-rose-600"
          columns={[
            { key: 'number', label: 'شماره' },
            { key: 'date', label: 'تاریخ' },
            { key: 'item', label: 'کالا' },
            { key: 'qty', label: 'تعداد' },
            { key: 'warehouse', label: 'انبار مبدأ' }
          ]}
          initialData={[
            { id: 1, number: 'حواله-۳۲۱', date: '۱۴۰۵/۰۸/۰۲', item: 'لپ‌تاپ ایسوس', qty: '۲', warehouse: 'انبار مرکزی' },
          ]}
        />
      );
    }
    if (subPage === 'transfer') {
      return (
        <DataTable
          title="انتقال بین انبارها"
          subtitle="جابجایی کالا بین انبارها"
          searchFields={['number', 'item']}
          addButtonLabel="انتقال جدید"
          addColor="from-blue-500 to-indigo-600"
          columns={[
            { key: 'number', label: 'شماره' },
            { key: 'date', label: 'تاریخ' },
            { key: 'item', label: 'کالا' },
            { key: 'qty', label: 'تعداد' },
            { key: 'from', label: 'از انبار' },
            { key: 'to', label: 'به انبار' }
          ]}
          initialData={[
            { id: 1, number: 'انتقال-۱۰۱', date: '۱۴۰۵/۰۸/۰۱', item: 'کیبورد مکانیکی', qty: '۵', from: 'انبار مرکزی', to: 'انبار غرب' },
          ]}
        />
      );
    }
    if (subPage === 'stocktake') {
      return (
        <DataTable
          title="انبارگردانی"
          subtitle="شمارش موجودی"
          searchFields={['number', 'warehouse']}
          addButtonLabel="انبارگردانی جدید"
          columns={[
            { key: 'number', label: 'شماره' },
            { key: 'date', label: 'تاریخ' },
            { key: 'warehouse', label: 'انبار' },
            { key: 'items', label: 'تعداد اقلام' },
            { key: 'status', label: 'وضعیت' }
          ]}
          initialData={[
            { id: 1, number: 'انبار-۰۰۱', date: '۱۴۰۵/۰۷/۳۰', warehouse: 'انبار مرکزی', items: '۱۲۵', status: 'تکمیل شده' },
          ]}
        />
      );
    }
    if (subPage === 'cardex') {
      return (
        <DataTable
          title="کارتکس کالا"
          subtitle="گردش کالا"
          searchFields={['docNumber', 'type']}
          columns={[
            { key: 'date', label: 'تاریخ' },
            { key: 'docNumber', label: 'شماره سند' },
            { key: 'type', label: 'نوع عملیات', render: (i: any) => (
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${i.type === 'ورود' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>{i.type}</span>
            )},
            { key: 'qty', label: 'تعداد' },
            { key: 'balance', label: 'مانده' }
          ]}
          initialData={[
            { id: 1, date: '۱۴۰۵/۰۸/۰۲', docNumber: 'رسید-۵۰۱', type: 'ورود', qty: '+۱۰', balance: '۲۲' },
            { id: 2, date: '۱۴۰۵/۰۸/۰۱', docNumber: 'حواله-۳۲۱', type: 'خروج', qty: '-۲', balance: '۱۲' },
          ]}
        />
      );
    }
    if (subPage === 'low-stock') {
      return (
        <DataTable
          title="کالاهای کم‌موجود"
          subtitle="کالاهای زیر حداقل موجودی"
          searchFields={['code', 'name']}
          columns={[
            { key: 'code', label: 'کد' },
            { key: 'name', label: 'نام کالا' },
            { key: 'current', label: 'موجودی فعلی', render: (i: any) => <span className="font-bold text-red-600">{i.current}</span> },
            { key: 'min', label: 'حداقل' },
            { key: 'diff', label: 'اختلاف', render: (i: any) => <span className="text-red-600 font-bold">{i.diff}</span> }
          ]}
          initialData={[
            { id: 1, code: 'K-002', name: 'ماوس بی‌سیم', current: '۳', min: '۱۰', diff: '-۷' },
            { id: 2, code: 'K-003', name: 'کابل HDMI', current: '۵', min: '۲۰', diff: '-۱۵' },
          ]}
        />
      );
    }
  }

  // ============ چک و خزانه ============
  if (module === 'treasury') {
    if (subPage === 'receive') {
      return (
        <DataTable
          title="دریافت وجه"
          subtitle="ثبت دریافت‌ها"
          searchFields={['party', 'method']}
          addButtonLabel="دریافت جدید"
          addColor="from-green-500 to-emerald-600"
          columns={[
            { key: 'date', label: 'تاریخ' },
            { key: 'party', label: 'از طرف' },
            { key: 'amount', label: 'مبلغ (ریال)', render: (i: any) => <span className="font-bold text-green-600">{i.amount}</span> },
            { key: 'method', label: 'روش' },
            { key: 'account', label: 'حساب' }
          ]}
          initialData={[
            { id: 1, date: '۱۴۰۵/۰۸/۰۲', party: 'شرکت آلفا', amount: '۱۰,۰۰۰,۰۰۰', method: 'نقدی', account: 'صندوق' },
          ]}
        />
      );
    }
    if (subPage === 'pay') {
      return (
        <DataTable
          title="پرداخت وجه"
          subtitle="ثبت پرداخت‌ها"
          searchFields={['party', 'method']}
          addButtonLabel="پرداخت جدید"
          addColor="from-red-500 to-rose-600"
          columns={[
            { key: 'date', label: 'تاریخ' },
            { key: 'party', label: 'به طرف' },
            { key: 'amount', label: 'مبلغ (ریال)', render: (i: any) => <span className="font-bold text-red-600">{i.amount}</span> },
            { key: 'method', label: 'روش' },
            { key: 'account', label: 'حساب' }
          ]}
          initialData={[
            { id: 1, date: '۱۴۰۵/۰۸/۰۲', party: 'تأمین‌کننده بتا', amount: '۵,۰۰۰,۰۰۰', method: 'چک', account: 'بانک ملت' },
          ]}
        />
      );
    }
    if (subPage === 'transfer') {
      return (
        <DataTable
          title="انتقال وجه"
          subtitle="جابجایی بین حساب‌ها"
          searchFields={['from', 'to']}
          addButtonLabel="انتقال جدید"
          addColor="from-blue-500 to-indigo-600"
          columns={[
            { key: 'date', label: 'تاریخ' },
            { key: 'amount', label: 'مبلغ (ریال)' },
            { key: 'from', label: 'از حساب' },
            { key: 'to', label: 'به حساب' }
          ]}
          initialData={[
            { id: 1, date: '۱۴۰۵/۰۸/۰۱', amount: '۲۰,۰۰۰,۰۰۰', from: 'بانک ملت', to: 'بانک ملی' },
          ]}
        />
      );
    }
    if (subPage === 'received-checks') {
      return (
        <DataTable
          title="چک‌های دریافتی"
          subtitle="مدیریت چک‌های دریافتی"
          searchFields={['number', 'party', 'bank']}
          addButtonLabel="چک جدید"
          addColor="from-green-500 to-emerald-600"
          columns={[
            { key: 'number', label: 'شماره چک' },
            { key: 'party', label: 'از طرف' },
            { key: 'amount', label: 'مبلغ (ریال)' },
            { key: 'bank', label: 'بانک' },
            { key: 'dueDate', label: 'سررسید' },
            { key: 'status', label: 'وضعیت', render: (i: any) => (
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${i.status === 'وصول شده' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>{i.status}</span>
            )}
          ]}
          initialData={[
            { id: 1, number: '۱۲۳۴۵۶', party: 'شرکت آلفا', amount: '۵,۰۰۰,۰۰۰', bank: 'بانک ملت', dueDate: '۱۴۰۵/۰۸/۱۰', status: 'در انتظار' },
          ]}
        />
      );
    }
    if (subPage === 'paid-checks') {
      return (
        <DataTable
          title="چک‌های پرداختی"
          subtitle="مدیریت چک‌های پرداختی"
          searchFields={['number', 'party', 'bank']}
          addButtonLabel="چک جدید"
          addColor="from-red-500 to-rose-600"
          columns={[
            { key: 'number', label: 'شماره چک' },
            { key: 'party', label: 'در وجه' },
            { key: 'amount', label: 'مبلغ (ریال)' },
            { key: 'bank', label: 'بانک' },
            { key: 'dueDate', label: 'سررسید' },
            { key: 'status', label: 'وضعیت' }
          ]}
          initialData={[
            { id: 1, number: '۳۴۵۶۷۸', party: 'تأمین‌کننده بتا', amount: '۳,۲۰۰,۰۰۰', bank: 'بانک ملی', dueDate: '۱۴۰۵/۰۸/۱۷', status: 'در انتظار' },
          ]}
        />
      );
    }
    if (subPage === 'due-dates') {
      return (
        <DataTable
          title="سررسید چک‌ها"
          subtitle="چک‌های نزدیک به سررسید"
          searchFields={['number', 'party']}
          columns={[
            { key: 'number', label: 'شماره چک' },
            { key: 'type', label: 'نوع', render: (i: any) => (
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${i.type === 'دریافتی' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>{i.type}</span>
            )},
            { key: 'party', label: 'طرف حساب' },
            { key: 'amount', label: 'مبلغ (ریال)' },
            { key: 'dueDate', label: 'سررسید' },
            { key: 'daysLeft', label: 'روز مانده', render: (i: any) => <span className={`font-bold ${i.daysLeft <= 3 ? 'text-red-600' : 'text-amber-600'}`}>{i.daysLeft} روز</span> }
          ]}
          initialData={[
            { id: 1, number: '۱۲۳۴۵۶', type: 'دریافتی', party: 'شرکت آلفا', amount: '۵,۰۰۰,۰۰۰', dueDate: '۱۴۰۵/۰۸/۰۵', daysLeft: 2 },
          ]}
        />
      );
    }
    if (subPage === 'reconciliation') {
      return (
        <DataTable
          title="مغایرت بانکی"
          subtitle="تطبیق با صورت‌حساب بانک"
          searchFields={['bank']}
          columns={[
            { key: 'date', label: 'تاریخ' },
            { key: 'bank', label: 'بانک' },
            { key: 'bookBalance', label: 'مانده دفتری' },
            { key: 'bankBalance', label: 'مانده بانک' },
            { key: 'difference', label: 'مغایرت', render: (i: any) => <span className="font-bold text-red-600">{i.difference}</span> }
          ]}
          initialData={[
            { id: 1, date: '۱۴۰۵/۰۷/۳۰', bank: 'بانک ملت', bookBalance: '۸۵,۰۰۰,۰۰۰', bankBalance: '۸۴,۵۰۰,۰۰۰', difference: '۵۰۰,۰۰۰' },
          ]}
        />
      );
    }
  }

  // ============ اسناد حسابداری ============
  if (module === 'accounting') {
    if (subPage === 'new') {
      return (
        <DataTable
          title="ثبت سند حسابداری"
          subtitle="ثبت سند دستی"
          searchFields={['description']}
          addButtonLabel="ثبت سند"
          addColor="from-fuchsia-500 to-purple-600"
          columns={[
            { key: 'date', label: 'تاریخ' },
            { key: 'account', label: 'حساب' },
            { key: 'description', label: 'شرح' },
            { key: 'debit', label: 'بدهکار' },
            { key: 'credit', label: 'بستانکار' }
          ]}
          initialData={[]}
        />
      );
    }
    if (subPage === 'list' || subPage === 'finalized') {
      return (
        <DataTable
          title="فهرست اسناد حسابداری"
          subtitle="اسناد ثبت شده"
          searchFields={['number', 'description']}
          columns={[
            { key: 'number', label: 'شماره' },
            { key: 'date', label: 'تاریخ' },
            { key: 'description', label: 'شرح' },
            { key: 'debit', label: 'بدهکار' },
            { key: 'credit', label: 'بستانکار' },
            { key: 'status', label: 'وضعیت', render: (i: any) => (
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${i.status === 'قطعی' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>{i.status}</span>
            )}
          ]}
          initialData={[
            { id: 1, number: 'سند-۱۰۰۱', date: '۱۴۰۵/۰۸/۰۲', description: 'ثبت فاکتور فروش', debit: '۱۲,۵۰۰,۰۰۰', credit: '۱۲,۵۰۰,۰۰۰', status: 'قطعی' },
          ]}
        />
      );
    }
    if (subPage === 'drafts') {
      return (
        <DataTable
          title="اسناد پیش‌نویس"
          subtitle="اسناد تأیید نشده"
          searchFields={['number', 'description']}
          columns={[
            { key: 'number', label: 'شماره' },
            { key: 'date', label: 'تاریخ' },
            { key: 'description', label: 'شرح' },
            { key: 'debit', label: 'بدهکار' },
            { key: 'credit', label: 'بستانکار' }
          ]}
          initialData={[
            { id: 1, number: 'سند-۱۰۰۴', date: '۱۴۰۵/۰۸/۰۱', description: 'هزینه اجاره', debit: '۵,۰۰۰,۰۰۰', credit: '۵,۰۰۰,۰۰۰' },
          ]}
        />
      );
    }
    if (subPage === 'corrections') {
      return (
        <DataTable
          title="اسناد اصلاحی و برگشتی"
          subtitle="اصلاحات اسناد"
          searchFields={['number', 'description']}
          columns={[
            { key: 'number', label: 'شماره' },
            { key: 'date', label: 'تاریخ' },
            { key: 'refDoc', label: 'سند مرجع' },
            { key: 'description', label: 'شرح' }
          ]}
          initialData={[]}
        />
      );
    }
    if (subPage === 'close-period') {
      return <ClosePeriod />;
    }
  }

  // ============ تنظیمات ============
  if (module === 'settings') {
    if (subPage === 'users') {
      return (
        <DataTable
          title="کاربران و مجوزها"
          subtitle="مدیریت کاربران سیستم"
          searchFields={['username', 'fullName', 'role']}
          addButtonLabel="کاربر جدید"
          addColor="from-slate-500 to-gray-700"
          columns={[
            { key: 'username', label: 'نام کاربری' },
            { key: 'fullName', label: 'نام کامل' },
            { key: 'role', label: 'نقش', render: (i: any) => (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">{i.role}</span>
            )},
            { key: 'status', label: 'وضعیت', render: (i: any) => (
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${i.status === 'فعال' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>{i.status}</span>
            )}
          ]}
          initialData={[
            { id: 1, username: 'admin', fullName: 'مدیر سیستم', role: 'مدیر', status: 'فعال' },
            { id: 2, username: 'ali', fullName: 'علی احمدی', role: 'مدیر مالی', status: 'فعال' },
          ]}
        />
      );
    }
    if (subPage === 'appearance') {
      return <SettingsForm title="تنظیمات ظاهر" fields={[
        { key: 'theme', label: 'تم رنگی', type: 'select', options: [{ value: 'light', label: 'روشن' }, { value: 'dark', label: 'تاریک' }] },
        { key: 'fontSize', label: 'اندازه فونت', type: 'select', options: [{ value: 'small', label: 'کوچک' }, { value: 'medium', label: 'متوسط' }, { value: 'large', label: 'بزرگ' }] }
      ]} />;
    }
    if (subPage === 'datetime') {
      return <SettingsForm title="تاریخ، ارقام و واحد پول" fields={[
        { key: 'calendar', label: 'نوع تقویم', type: 'select', options: [{ value: 'jalali', label: 'شمسی' }, { value: 'gregorian', label: 'میلادی' }] },
        { key: 'currency', label: 'واحد پول', type: 'select', options: [{ value: 'rial', label: 'ریال' }, { value: 'toman', label: 'تومان' }] },
        { key: 'decimals', label: 'تعداد اعشار', type: 'number' }
      ]} />;
    }
    if (subPage === 'print') {
      return <SettingsForm title="قالب چاپ" fields={[
        { key: 'template', label: 'قالب پیش‌فرض', type: 'select', options: [{ value: 'standard', label: 'استاندارد' }, { value: 'compact', label: 'فشرده' }] }
      ]} />;
    }
    if (subPage === 'excel') {
      return <SettingsForm title="ورود و خروج Excel" fields={[
        { key: 'separator', label: 'جداکننده', type: 'select', options: [{ value: ',', label: 'کاما' }, { value: ';', label: 'سمی‌کالن' }] }
      ]} />;
    }
    if (subPage === 'backup') {
      return <BackupRestore />;
    }
    if (subPage === 'audit') {
      return (
        <DataTable
          title="سوابق عملیات"
          subtitle="ردپای حسابرسی"
          searchFields={['user', 'action', 'table']}
          columns={[
            { key: 'date', label: 'تاریخ' },
            { key: 'user', label: 'کاربر' },
            { key: 'action', label: 'عملیات' },
            { key: 'table', label: 'جدول' },
            { key: 'record', label: 'رکورد' }
          ]}
          initialData={[
            { id: 1, date: '۱۴۰۵/۰۸/۰۳ ۱۰:۳۰', user: 'admin', action: 'login', table: 'users', record: '1' },
          ]}
        />
      );
    }
    if (subPage === 'version') {
      return <VersionInfo />;
    }
  }

  // ============ گزارشات ============
  if (module === 'reports') {
    return <ReportsPage subPage={subPage} />;
  }

  // Default
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black text-gray-800">صفحه مورد نظر یافت نشد</h1>
      <p className="text-sm text-gray-500">این بخش در حال توسعه است یا وجود ندارد.</p>
    </div>
  );
}

// ============ Helper Components ============

function CompanyInfo() {
  const [formData, setFormData] = useState({
    companyName: 'شرکت نمونه سرمد',
    brandName: 'سَرمد',
    phone: '۰۲۱-۸۸۷۷۶۶۵۵',
    economicCode: '۱۲۳۴۵۶۷۸۹',
    address: 'تهران، خیابان ولیعصر، پلاک ۱۲۳',
    nationalId: '۱۰۱۰۰۱۲۳۴۵۶'
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black text-gray-800">اطلاعات شرکت</h1>
      {saved && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg animate-fade-in">
          اطلاعات با موفقیت ذخیره شد
        </div>
      )}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">نام شرکت</label>
            <input type="text" value={formData.companyName} onChange={(e) => setFormData({...formData, companyName: e.target.value})} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">نام تجاری</label>
            <input type="text" value={formData.brandName} onChange={(e) => setFormData({...formData, brandName: e.target.value})} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">تلفن</label>
            <input type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">کد اقتصادی</label>
            <input type="text" value={formData.economicCode} onChange={(e) => setFormData({...formData, economicCode: e.target.value})} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">شناسه ملی</label>
            <input type="text" value={formData.nationalId} onChange={(e) => setFormData({...formData, nationalId: e.target.value})} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">نشانی</label>
          <textarea value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 resize-none h-20" />
        </div>
        <div className="flex justify-end">
          <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95">
            <Save size={14} /> ذخیره
          </button>
        </div>
      </div>
    </div>
  );
}

function SettingsForm({ title, fields }: { title: string; fields: any[] }) {
  const [formData, setFormData] = useState<any>({});
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black text-gray-800">{title}</h1>
      {saved && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg animate-fade-in">
          تنظیمات با موفقیت ذخیره شد
        </div>
      )}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 p-6 space-y-4">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">{field.label}</label>
            {field.type === 'select' ? (
              <select value={formData[field.key] || ''} onChange={(e) => setFormData({...formData, [field.key]: e.target.value})} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400">
                <option value="">انتخاب...</option>
                {field.options?.map((opt: any) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            ) : (
              <input type={field.type || 'text'} value={formData[field.key] || ''} onChange={(e) => setFormData({...formData, [field.key]: e.target.value})} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400" />
            )}
          </div>
        ))}
        <div className="flex justify-end">
          <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95">
            <Save size={14} /> ذخیره
          </button>
        </div>
      </div>
    </div>
  );
}

function BackupRestore() {
  const [status, setStatus] = useState('');

  const handleBackup = () => {
    const data = localStorage.getItem('sarmad_sqlite_db') || '{}';
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sarmad_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setStatus('پشتیبان‌گیری با موفقیت انجام شد');
    setTimeout(() => setStatus(''), 3000);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black text-gray-800">پشتیبان‌گیری و بازیابی</h1>
      {status && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg animate-fade-in">
          {status}
        </div>
      )}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 p-6 space-y-4">
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
          <h3 className="text-sm font-bold text-blue-800 mb-2">پشتیبان‌گیری</h3>
          <p className="text-xs text-blue-700 mb-3">دانلود فایل پشتیبان از تمام داده‌های سیستم</p>
          <button onClick={handleBackup} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-bold">
            <Download size={14} /> دانلود پشتیبان
          </button>
        </div>
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
          <h3 className="text-sm font-bold text-amber-800 mb-2">بازیابی</h3>
          <p className="text-xs text-amber-700 mb-3">بازیابی داده‌ها از فایل پشتیبان</p>
          <input type="file" accept=".json" className="text-xs" />
        </div>
      </div>
    </div>
  );
}

function ClosePeriod() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black text-gray-800">بستن دوره مالی</h1>
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 p-6">
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
            <h3 className="text-sm font-bold text-blue-800 mb-2">دوره مالی فعلی</h3>
            <p className="text-xs text-blue-700">سال مالی ۱۴۰۵ - از ۱۴۰۵/۰۱/۰۱ تا ۱۴۰۵/۱۲/۲۹</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-center">
              <p className="text-[10px] text-gray-500">اسناد ثبت شده</p>
              <p className="text-2xl font-black text-gray-800">۲۶۵</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-center">
              <p className="text-[10px] text-gray-500">اسناد قطعی</p>
              <p className="text-2xl font-black text-green-600">۲۴۵</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-center">
              <p className="text-[10px] text-gray-500">اسناد پیش‌نویس</p>
              <p className="text-2xl font-black text-amber-600">۲۰</p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 flex items-start gap-2">
            <AlertTriangle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800">قبل از بستن دوره، تمام اسناد پیش‌نویس باید تعیین تکلیف شوند.</p>
          </div>
          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white text-sm font-bold hover:shadow-lg transition-all active:scale-95">
            بستن دوره مالی
          </button>
        </div>
      </div>
    </div>
  );
}

function VersionInfo() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black text-gray-800">اطلاعات نسخه</h1>
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
            <Info size={28} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">سیستم حسابداری سرمد</h3>
            <p className="text-sm text-gray-500">نسخه 1.0.0</p>
            <p className="text-xs text-gray-400 mt-1">پایگاه داده: SQLite | Node.js</p>
            <p className="text-xs text-gray-400">حالت اجرا: آفلاین محلی</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportsPage({ subPage }: { subPage: string }) {
  if (subPage === 'journal') {
    return (
      <DataTable
        title="دفتر روزنامه"
        subtitle="ثبت روزانه عملیات حسابداری"
        searchFields={['docNumber', 'description', 'account']}
        columns={[
          { key: 'date', label: 'تاریخ' },
          { key: 'docNumber', label: 'شماره سند' },
          { key: 'description', label: 'شرح' },
          { key: 'accountCode', label: 'کد حساب' },
          { key: 'accountName', label: 'نام حساب' },
          { key: 'debit', label: 'بدهکار', render: (i: any) => i.debit ? <span className="font-bold text-blue-600">{i.debit}</span> : '-' },
          { key: 'credit', label: 'بستانکار', render: (i: any) => i.credit ? <span className="font-bold text-green-600">{i.credit}</span> : '-' }
        ]}
        initialData={[
          { id: 1, date: '۱۴۰۵/۰۸/۰۱', docNumber: '۱۰۰۱', description: 'فروش کالا به شرکت آلفا', accountCode: '۱۲۰۰', accountName: 'حساب‌های دریافتنی', debit: '۱۲,۵۰۰,۰۰۰', credit: '' },
          { id: 2, date: '۱۴۰۵/۰۸/۰۱', docNumber: '۱۰۰۱', description: 'فروش کالا به شرکت آلفا', accountCode: '۴۱۰۰', accountName: 'فروش', debit: '', credit: '۱۲,۵۰۰,۰۰۰' },
          { id: 3, date: '۱۴۰۵/۰۸/۰۲', docNumber: '۱۰۰۲', description: 'خرید کالا از تأمین‌کننده', accountCode: '۱۳۰۰', accountName: 'موجودی کالا', debit: '۸,۲۰۰,۰۰۰', credit: '' },
          { id: 4, date: '۱۴۰۵/۰۸/۰۲', docNumber: '۱۰۰۲', description: 'خرید کالا از تأمین‌کننده', accountCode: '۲۱۰۰', accountName: 'حساب‌های پرداختنی', debit: '', credit: '۸,۲۰۰,۰۰۰' },
        ]}
      />
    );
  }

  if (subPage === 'profit-loss') {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-black text-gray-800">صورت سود و زیان</h1>
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 p-6">
          <h3 className="text-base font-bold text-gray-800 mb-6">صورت سود و زیان - سال مالی ۱۴۰۵</h3>
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <h4 className="text-sm font-bold text-gray-700 mb-3">درآمدها</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-xs"><span className="text-gray-600">فروش کالا</span><span className="font-bold">۳۲۸,۰۰۰,۰۰۰ ریال</span></div>
                <div className="flex justify-between text-xs"><span className="text-gray-600">درآمد خدمات</span><span className="font-bold">۴۵,۰۰۰,۰۰۰ ریال</span></div>
                <div className="flex justify-between text-sm font-bold border-t border-gray-200 pt-2 mt-2"><span>جمع درآمدها</span><span className="text-green-600">۳۷۳,۰۰۰,۰۰۰ ریال</span></div>
              </div>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h4 className="text-sm font-bold text-gray-700 mb-3">بهای تمام‌شده</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-xs"><span className="text-gray-600">بهای تمام‌شده کالای فروش رفته</span><span className="font-bold">۲۳۲,۰۰۰,۰۰۰ ریال</span></div>
                <div className="flex justify-between text-sm font-bold border-t border-gray-200 pt-2 mt-2"><span>سود ناخالص</span><span className="text-blue-600">۱۴۱,۰۰۰,۰۰۰ ریال</span></div>
              </div>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h4 className="text-sm font-bold text-gray-700 mb-3">هزینه‌های عملیاتی</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-xs"><span className="text-gray-600">هزینه حقوق و دستمزد</span><span className="font-bold">۳۵,۰۰۰,۰۰۰ ریال</span></div>
                <div className="flex justify-between text-xs"><span className="text-gray-600">هزینه اجاره</span><span className="font-bold">۱۲,۰۰۰,۰۰۰ ریال</span></div>
                <div className="flex justify-between text-sm font-bold border-t border-gray-200 pt-2 mt-2"><span>جمع هزینه‌ها</span><span className="text-red-600">۵۲,۰۰۰,۰۰۰ ریال</span></div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
              <div className="flex justify-between items-center">
                <span className="text-base font-bold text-gray-800">سود خالص</span>
                <span className="text-2xl font-black text-green-600">۸۹,۰۰۰,۰۰۰ ریال</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default reports page
  return (
    <DataTable
      title="گزارشات"
      subtitle={`گزارش ${subPage}`}
      searchFields={['description']}
      columns={[
        { key: 'date', label: 'تاریخ' },
        { key: 'description', label: 'شرح' },
        { key: 'amount', label: 'مبلغ' }
      ]}
      initialData={[
        { id: 1, date: '۱۴۰۵/۰۸/۰۲', description: 'گزارش نمونه', amount: '۱۰,۰۰۰,۰۰۰' },
      ]}
    />
  );
}
