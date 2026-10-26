import { useState } from 'react';
import SimpleTable from './SimpleTable';

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
        <SimpleTable
          title="سال مالی و دوره‌ها"
          columns={[
            { key: 'year', label: 'سال' },
            { key: 'start', label: 'تاریخ شروع' },
            { key: 'end', label: 'تاریخ پایان' },
            { key: 'status', label: 'وضعیت' }
          ]}
          data={[
            { id: 1, year: '۱۴۰۵', start: '۱۴۰۵/۰۱/۰۱', end: '۱۴۰۵/۱۲/۲۹', status: 'فعال' },
            { id: 2, year: '۱۴۰۴', start: '۱۴۰۴/۰۱/۰۱', end: '۱۴۰۴/۱۲/۲۹', status: 'بسته' },
          ]}
          onAdd={() => alert('فرم افزودن باز شد')}
          onEdit={(item) => alert(`ویرایش: ${item.year}`)}
          onDelete={(item) => alert(`حذف: ${item.year}`)}
          onView={(item) => alert(`مشاهده: ${item.year}`)}
        />
      );
    }
    if (subPage === 'item-groups') {
      return (
        <SimpleTable
          title="گروه کالا و خدمات"
          columns={[
            { key: 'code', label: 'کد' },
            { key: 'name', label: 'نام گروه' },
            { key: 'items', label: 'تعداد کالا' }
          ]}
          data={[
            { id: 1, code: 'G-01', name: 'کالای دیجیتال', items: '۲۵' },
            { id: 2, code: 'G-02', name: 'لوازم جانبی', items: '۴۸' },
            { id: 3, code: 'G-03', name: 'ذخیره‌سازی', items: '۱۵' },
          ]}
          onAdd={() => alert('فرم افزودن باز شد')}
          onEdit={(item) => alert(`ویرایش: ${item.name}`)}
          onDelete={(item) => alert(`حذف: ${item.name}`)}
          onView={(item) => alert(`مشاهده: ${item.name}`)}
        />
      );
    }
    if (subPage === 'units') {
      return (
        <SimpleTable
          title="واحدهای اندازه‌گیری"
          columns={[
            { key: 'name', label: 'نام واحد' },
            { key: 'short', label: 'مخفف' }
          ]}
          data={[
            { id: 1, name: 'عدد', short: 'عد' },
            { id: 2, name: 'کیلوگرم', short: 'کگ' },
            { id: 3, name: 'متر', short: 'م' },
            { id: 4, name: 'لیتر', short: 'ل' },
          ]}
          onAdd={() => alert('فرم افزودن باز شد')}
          onEdit={(item) => alert(`ویرایش: ${item.name}`)}
          onDelete={(item) => alert(`حذف: ${item.name}`)}
          onView={(item) => alert(`مشاهده: ${item.name}`)}
        />
      );
    }
    if (subPage === 'warehouses') {
      return (
        <SimpleTable
          title="انبارها"
          columns={[
            { key: 'code', label: 'کد' },
            { key: 'name', label: 'نام انبار' },
            { key: 'address', label: 'نشانی' },
            { key: 'status', label: 'وضعیت' }
          ]}
          data={[
            { id: 1, code: 'WH-001', name: 'انبار مرکزی', address: 'تهران، خیابان صنعتی', status: 'فعال' },
            { id: 2, code: 'WH-002', name: 'انبار شرق', address: 'تهران، خیابان دماوند', status: 'فعال' },
            { id: 3, code: 'WH-003', name: 'انبار غرب', address: 'تهران، خیابان آزادی', status: 'فعال' },
          ]}
          onAdd={() => alert('فرم افزودن باز شد')}
          onEdit={(item) => alert(`ویرایش: ${item.name}`)}
          onDelete={(item) => alert(`حذف: ${item.name}`)}
          onView={(item) => alert(`مشاهده: ${item.name}`)}
        />
      );
    }
    if (subPage === 'cash-bank') {
      return (
        <SimpleTable
          title="صندوق و بانک"
          columns={[
            { key: 'code', label: 'کد' },
            { key: 'name', label: 'نام حساب' },
            { key: 'type', label: 'نوع' },
            { key: 'balance', label: 'موجودی (ریال)' }
          ]}
          data={[
            { id: 1, code: 'CA-001', name: 'صندوق نقدی', type: 'صندوق', balance: '۱۵,۲۰۰,۰۰۰' },
            { id: 2, code: 'CA-002', name: 'بانک ملت', type: 'بانک', balance: '۸۵,۰۰۰,۰۰۰' },
            { id: 3, code: 'CA-003', name: 'بانک ملی', type: 'بانک', balance: '۱۲۰,۰۰۰,۰۰۰' },
          ]}
          onAdd={() => alert('فرم افزودن باز شد')}
          onEdit={(item) => alert(`ویرایش: ${item.name}`)}
          onDelete={(item) => alert(`حذف: ${item.name}`)}
          onView={(item) => alert(`مشاهده: ${item.name}`)}
        />
      );
    }
    if (subPage === 'payment-methods') {
      return (
        <SimpleTable
          title="روش‌های پرداخت"
          columns={[
            { key: 'name', label: 'نام روش' },
            { key: 'type', label: 'نوع' }
          ]}
          data={[
            { id: 1, name: 'نقدی', type: 'نقد' },
            { id: 2, name: 'کارت بانکی', type: 'کارت' },
            { id: 3, name: 'چک', type: 'چک' },
          ]}
          onAdd={() => alert('فرم افزودن باز شد')}
          onEdit={(item) => alert(`ویرایش: ${item.name}`)}
          onDelete={(item) => alert(`حذف: ${item.name}`)}
          onView={(item) => alert(`مشاهده: ${item.name}`)}
        />
      );
    }
    if (subPage === 'numbering') {
      return (
        <SimpleTable
          title="شماره‌گذاری اسناد"
          columns={[
            { key: 'type', label: 'نوع سند' },
            { key: 'prefix', label: 'پیش‌شماره' },
            { key: 'current', label: 'شماره جاری' }
          ]}
          data={[
            { id: 1, type: 'فاکتور فروش', prefix: 'فروش', current: '۲۰۰۵' },
            { id: 2, type: 'فاکتور خرید', prefix: 'خرید', current: '۱۰۰۵' },
            { id: 3, type: 'سند حسابداری', prefix: 'سند', current: '۱۰۰۶' },
          ]}
          onAdd={() => alert('فرم افزودن باز شد')}
          onEdit={(item) => alert(`ویرایش: ${item.type}`)}
          onDelete={(item) => alert(`حذف: ${item.type}`)}
          onView={(item) => alert(`مشاهده: ${item.type}`)}
        />
      );
    }
  }

  // ============ معرفی اشخاص ============
  if (module === 'contacts') {
    if (subPage === 'list' || subPage === 'customers' || subPage === 'suppliers') {
      return (
        <SimpleTable
          title="فهرست اشخاص"
          columns={[
            { key: 'code', label: 'کد' },
            { key: 'name', label: 'نام' },
            { key: 'type', label: 'نوع' },
            { key: 'phone', label: 'تلفن' },
            { key: 'city', label: 'شهر' },
            { key: 'balance', label: 'مانده (ریال)' }
          ]}
          data={[
            { id: 1, code: 'SH-001', name: 'شرکت آلفا', type: 'مشتری', phone: '۰۲۱-۸۸۷۷۶۶۵۵', city: 'تهران', balance: '۱۲,۵۰۰,۰۰۰' },
            { id: 2, code: 'SH-002', name: 'تأمین‌کننده بتا', type: 'تأمین‌کننده', phone: '۰۳۱-۳۳۴۴۵۵۶۶', city: 'اصفهان', balance: '۸,۲۰۰,۰۰۰' },
            { id: 3, code: 'SH-003', name: 'شرکت گاما', type: 'مشتری', phone: '۰۴۱-۴۴۵۵۶۶۷۷', city: 'تبریز', balance: '۵,۰۰۰,۰۰۰' },
          ]}
          onAdd={() => alert('فرم افزودن باز شد')}
          onEdit={(item) => alert(`ویرایش: ${item.name}`)}
          onDelete={(item) => alert(`حذف: ${item.name}`)}
          onView={(item) => alert(`مشاهده: ${item.name}`)}
        />
      );
    }
  }

  // ============ خرید ============
  if (module === 'purchases') {
    if (subPage === 'new' || subPage === 'list') {
      return (
        <SimpleTable
          title="فاکتورهای خرید"
          columns={[
            { key: 'number', label: 'شماره' },
            { key: 'date', label: 'تاریخ' },
            { key: 'supplier', label: 'تأمین‌کننده' },
            { key: 'amount', label: 'مبلغ (ریال)' },
            { key: 'status', label: 'وضعیت' }
          ]}
          data={[
            { id: 1, number: 'خرید-۱۰۰۱', date: '۱۴۰۵/۰۸/۰۱', supplier: 'تأمین‌کننده بتا', amount: '۸,۲۰۰,۰۰۰', status: 'قطعی' },
            { id: 2, number: 'خرید-۱۰۰۲', date: '۱۴۰۵/۰۷/۲۸', supplier: 'بازرگانی زتا', amount: '۱۵,۰۰۰,۰۰۰', status: 'قطعی' },
          ]}
          onAdd={() => alert('فرم افزودن باز شد')}
          onEdit={(item) => alert(`ویرایش: ${item.number}`)}
          onDelete={(item) => alert(`حذف: ${item.number}`)}
          onView={(item) => alert(`مشاهده: ${item.number}`)}
        />
      );
    }
  }

  // ============ فروش ============
  if (module === 'sales') {
    if (subPage === 'new' || subPage === 'list') {
      return (
        <SimpleTable
          title="فاکتورهای فروش"
          columns={[
            { key: 'number', label: 'شماره' },
            { key: 'date', label: 'تاریخ' },
            { key: 'customer', label: 'مشتری' },
            { key: 'amount', label: 'مبلغ (ریال)' },
            { key: 'profit', label: 'سود (ریال)' },
            { key: 'status', label: 'وضعیت' }
          ]}
          data={[
            { id: 1, number: 'فروش-۲۰۰۱', date: '۱۴۰۵/۰۸/۰۲', customer: 'شرکت آلفا', amount: '۱۲,۵۰۰,۰۰۰', profit: '۳,۲۰۰,۰۰۰', status: 'قطعی' },
            { id: 2, number: 'فروش-۲۰۰۲', date: '۱۴۰۵/۰۸/۰۱', customer: 'فروشگاه دلتا', amount: '۸,۷۰۰,۰۰۰', profit: '۲,۱۰۰,۰۰۰', status: 'قطعی' },
          ]}
          onAdd={() => alert('فرم افزودن باز شد')}
          onEdit={(item) => alert(`ویرایش: ${item.number}`)}
          onDelete={(item) => alert(`حذف: ${item.number}`)}
          onView={(item) => alert(`مشاهده: ${item.number}`)}
        />
      );
    }
  }

  // ============ انبار و کالا ============
  if (module === 'inventory') {
    if (subPage === 'list') {
      return (
        <SimpleTable
          title="فهرست کالا و خدمات"
          columns={[
            { key: 'code', label: 'کد' },
            { key: 'name', label: 'نام کالا' },
            { key: 'group', label: 'گروه' },
            { key: 'stock', label: 'موجودی' },
            { key: 'unit', label: 'واحد' },
            { key: 'price', label: 'قیمت فروش' }
          ]}
          data={[
            { id: 1, code: 'K-001', name: 'لپ‌تاپ ایسوس', group: 'کالای دیجیتال', stock: '۱۲', unit: 'عدد', price: '۳۵,۰۰۰,۰۰۰' },
            { id: 2, code: 'K-002', name: 'ماوس بی‌سیم', group: 'لوازم جانبی', stock: '۳', unit: 'عدد', price: '۸۵۰,۰۰۰' },
            { id: 3, code: 'K-003', name: 'کیبورد مکانیکی', group: 'لوازم جانبی', stock: '۲۸', unit: 'عدد', price: '۲,۵۰۰,۰۰۰' },
          ]}
          onAdd={() => alert('فرم افزودن باز شد')}
          onEdit={(item) => alert(`ویرایش: ${item.name}`)}
          onDelete={(item) => alert(`حذف: ${item.name}`)}
          onView={(item) => alert(`مشاهده: ${item.name}`)}
        />
      );
    }
  }

  // ============ چک و خزانه ============
  if (module === 'treasury') {
    if (subPage === 'receive') {
      return (
        <SimpleTable
          title="دریافت وجه"
          columns={[
            { key: 'date', label: 'تاریخ' },
            { key: 'party', label: 'از طرف' },
            { key: 'amount', label: 'مبلغ (ریال)' },
            { key: 'method', label: 'روش' },
            { key: 'account', label: 'حساب' }
          ]}
          data={[
            { id: 1, date: '۱۴۰۵/۰۸/۰۲', party: 'شرکت آلفا', amount: '۱۰,۰۰۰,۰۰۰', method: 'نقدی', account: 'صندوق' },
          ]}
          onAdd={() => alert('فرم افزودن باز شد')}
          onEdit={(item) => alert(`ویرایش: ${item.party}`)}
          onDelete={(item) => alert(`حذف: ${item.party}`)}
          onView={(item) => alert(`مشاهده: ${item.party}`)}
        />
      );
    }
  }

  // ============ اسناد حسابداری ============
  if (module === 'accounting') {
    if (subPage === 'list' || subPage === 'finalized') {
      return (
        <SimpleTable
          title="فهرست اسناد حسابداری"
          columns={[
            { key: 'number', label: 'شماره' },
            { key: 'date', label: 'تاریخ' },
            { key: 'description', label: 'شرح' },
            { key: 'debit', label: 'بدهکار' },
            { key: 'credit', label: 'بستانکار' },
            { key: 'status', label: 'وضعیت' }
          ]}
          data={[
            { id: 1, number: 'سند-۱۰۰۱', date: '۱۴۰۵/۰۸/۰۲', description: 'ثبت فاکتور فروش', debit: '۱۲,۵۰۰,۰۰۰', credit: '۱۲,۵۰۰,۰۰۰', status: 'قطعی' },
          ]}
          onAdd={() => alert('فرم افزودن باز شد')}
          onEdit={(item) => alert(`ویرایش: ${item.number}`)}
          onDelete={(item) => alert(`حذف: ${item.number}`)}
          onView={(item) => alert(`مشاهده: ${item.number}`)}
        />
      );
    }
  }

  // ============ گزارشات ============
  if (module === 'reports') {
    if (subPage === 'journal') {
      return (
        <SimpleTable
          title="دفتر روزنامه"
          columns={[
            { key: 'date', label: 'تاریخ' },
            { key: 'docNumber', label: 'شماره سند' },
            { key: 'description', label: 'شرح' },
            { key: 'accountCode', label: 'کد حساب' },
            { key: 'accountName', label: 'نام حساب' },
            { key: 'debit', label: 'بدهکار' },
            { key: 'credit', label: 'بستانکار' }
          ]}
          data={[
            { id: 1, date: '۱۴۰۵/۰۸/۰۱', docNumber: '۱۰۰۱', description: 'فروش کالا به شرکت آلفا', accountCode: '۱۲۰۰', accountName: 'حساب‌های دریافتنی', debit: '۱۲,۵۰۰,۰۰۰', credit: '' },
            { id: 2, date: '۱۴۰۵/۰۸/۰۱', docNumber: '۱۰۰۱', description: 'فروش کالا به شرکت آلفا', accountCode: '۴۱۰۰', accountName: 'فروش', debit: '', credit: '۱۲,۵۰۰,۰۰۰' },
          ]}
          onAdd={() => alert('فرم افزودن باز شد')}
          onEdit={(item) => alert(`ویرایش: ${item.docNumber}`)}
          onDelete={(item) => alert(`حذف: ${item.docNumber}`)}
          onView={(item) => alert(`مشاهده: ${item.docNumber}`)}
        />
      );
    }
  }

  // Default
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>صفحه مورد نظر</h1>
      <p style={{ color: '#6b7280' }}>ماژول: {module} | زیرصفحه: {subPage}</p>
    </div>
  );
}

// ============ Helper Components ============

function CompanyInfo() {
  const [formData, setFormData] = useState({
    companyName: 'شرکت نمونه سرمد',
    brandName: 'سَرمد',
    phone: '۰۲۱-۸۸۷۷۶۶۵۵',
    address: 'تهران، خیابان ولیعصر، پلاک ۱۲۳'
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={{ padding: '20px' }}>
      {saved && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#10b981',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 9999
        }}>
          اطلاعات با موفقیت ذخیره شد
        </div>
      )}
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>اطلاعات شرکت</h1>
      <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '6px' }}>نام شرکت</label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => setFormData({...formData, companyName: e.target.value})}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                fontSize: '14px'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '6px' }}>نام تجاری</label>
            <input
              type="text"
              value={formData.brandName}
              onChange={(e) => setFormData({...formData, brandName: e.target.value})}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                fontSize: '14px'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '6px' }}>تلفن</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                fontSize: '14px'
              }}
            />
          </div>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '6px' }}>نشانی</label>
          <textarea
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              fontSize: '14px',
              minHeight: '80px',
              resize: 'vertical'
            }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={handleSave}
            style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white',
              border: 'none',
              padding: '10px 24px',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            ذخیره
          </button>
        </div>
      </div>
    </div>
  );
}
