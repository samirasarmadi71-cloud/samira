import { useState } from 'react';

interface SubPageRendererProps {
  module: string;
  subPage: string;
}

// Generic data for all subpages
const allData: Record<string, Record<string, any[]>> = {
  'base-data': {
    'company': [],
    'fiscal-years': [
      { id: 1, year: '۱۴۰۵', start: '۱۴۰۵/۰۱/۰۱', end: '۱۴۰۵/۱۲/۲۹', status: 'فعال' },
      { id: 2, year: '۱۴۰۴', start: '۱۴۰۴/۰۱/۰۱', end: '۱۴۰۴/۱۲/۲۹', status: 'بسته' },
    ],
    'item-groups': [
      { id: 1, code: 'G-01', name: 'کالای دیجیتال', items: '۲۵' },
      { id: 2, code: 'G-02', name: 'لوازم جانبی', items: '۴۸' },
      { id: 3, code: 'G-03', name: 'ذخیره‌سازی', items: '۱۵' },
    ],
    'units': [
      { id: 1, name: 'عدد', short: 'عد' },
      { id: 2, name: 'کیلوگرم', short: 'کگ' },
      { id: 3, name: 'متر', short: 'م' },
    ],
    'warehouses': [
      { id: 1, code: 'WH-001', name: 'انبار مرکزی', address: 'تهران', status: 'فعال' },
      { id: 2, code: 'WH-002', name: 'انبار شرق', address: 'تهران', status: 'فعال' },
    ],
    'cash-bank': [
      { id: 1, code: 'CA-001', name: 'صندوق نقدی', type: 'صندوق', balance: '۱۵,۲۰۰,۰۰۰' },
      { id: 2, code: 'CA-002', name: 'بانک ملت', type: 'بانک', balance: '۸۵,۰۰۰,۰۰۰' },
    ],
    'payment-methods': [
      { id: 1, name: 'نقدی', type: 'نقد' },
      { id: 2, name: 'کارت بانکی', type: 'کارت' },
      { id: 3, name: 'چک', type: 'چک' },
    ],
    'numbering': [
      { id: 1, type: 'فاکتور فروش', prefix: 'فروش', current: '۲۰۰۵' },
      { id: 2, type: 'فاکتور خرید', prefix: 'خرید', current: '۱۰۰۵' },
    ],
    'chart-of-accounts': [
      { id: 1, code: '۱۰۰۰', title: 'دارایی‌ها', type: 'کل' },
      { id: 2, code: '۲۰۰۰', title: 'بدهی‌ها', type: 'کل' },
    ],
  },
  'contacts': {
    'list': [
      { id: 1, code: 'SH-001', name: 'شرکت آلفا', type: 'مشتری', phone: '۰۲۱-۸۸۷۷۶۶۵۵', city: 'تهران', balance: '۱۲,۵۰۰,۰۰۰' },
      { id: 2, code: 'SH-002', name: 'تأمین‌کننده بتا', type: 'تأمین‌کننده', phone: '۰۳۱-۳۳۴۴۵۵۶۶', city: 'اصفهان', balance: '۸,۲۰۰,۰۰۰' },
    ],
    'customers': [
      { id: 1, code: 'SH-001', name: 'شرکت آلفا', phone: '۰۲۱-۸۸۷۷۶۶۵۵', city: 'تهران' },
    ],
    'suppliers': [
      { id: 1, code: 'SH-002', name: 'تأمین‌کننده بتا', phone: '۰۳۱-۳۳۴۴۵۵۶۶', city: 'اصفهان' },
    ],
    'new': [],
    'profile': [],
    'transactions': [],
    'balance': [],
  },
  'purchases': {
    'new': [],
    'list': [
      { id: 1, number: 'خرید-۱۰۰۱', date: '۱۴۰۵/۰۸/۰۱', supplier: 'بتا', amount: '۸,۲۰۰,۰۰۰', status: 'قطعی' },
    ],
    'proforma': [
      { id: 1, number: 'پیش-۵۰۱', date: '۱۴۰۵/۰۸/۰۲', supplier: 'بتا', amount: '۲۵,۰۰۰,۰۰۰', status: 'در انتظار' },
    ],
    'returns': [],
    'expenses': [
      { id: 1, date: '۱۴۰۵/۰۸/۰۱', description: 'حمل', amount: '۵۰۰,۰۰۰', type: 'حمل' },
    ],
    'report': [],
  },
  'sales': {
    'new': [],
    'list': [
      { id: 1, number: 'فروش-۲۰۰۱', date: '۱۴۰۵/۰۸/۰۲', customer: 'آلفا', amount: '۱۲,۵۰۰,۰۰۰', profit: '۳,۲۰۰,۰۰۰', status: 'قطعی' },
    ],
    'proforma': [],
    'returns': [],
    'receivables': [
      { id: 1, date: '۱۴۰۵/۰۸/۰۲', customer: 'آلفا', amount: '۱۰,۰۰۰,۰۰۰', method: 'نقدی' },
    ],
    'report': [],
  },
  'inventory': {
    'list': [
      { id: 1, code: 'K-001', name: 'لپ‌تاپ', group: 'دیجیتال', stock: '۱۲', unit: 'عدد', price: '۳۵,۰۰۰,۰۰۰' },
      { id: 2, code: 'K-002', name: 'ماوس', group: 'جانبی', stock: '۳', unit: 'عدد', price: '۸۵۰,۰۰۰' },
    ],
    'receipt': [
      { id: 1, number: 'رسید-۵۰۱', date: '۱۴۰۵/۰۸/۰۲', item: 'لپ‌تاپ', qty: '۱۰', warehouse: 'مرکزی' },
    ],
    'issue': [
      { id: 1, number: 'حواله-۳۲۱', date: '۱۴۰۵/۰۸/۰۲', item: 'لپ‌تاپ', qty: '۲', warehouse: 'مرکزی' },
    ],
    'transfer': [
      { id: 1, number: 'انتقال-۱۰۱', date: '۱۴۰۵/۰۸/۰۱', item: 'کیبورد', qty: '۵', from: 'مرکزی', to: 'غرب' },
    ],
    'stocktake': [
      { id: 1, number: 'انبار-۰۰۱', date: '۱۴۰۵/۰۷/۳۰', warehouse: 'مرکزی', items: '۱۲۵', status: 'تکمیل' },
    ],
    'cardex': [
      { id: 1, date: '۱۴۰۵/۰۸/۰۲', docNumber: 'رسید-۵۰۱', type: 'ورود', qty: '+۱۰', balance: '۲۲' },
    ],
    'report': [],
    'low-stock': [
      { id: 1, code: 'K-002', name: 'ماوس', current: '۳', min: '۱۰', diff: '-۷' },
    ],
  },
  'treasury': {
    'receive': [
      { id: 1, date: '۱۴۰۵/۰۸/۰۲', party: 'آلفا', amount: '۱۰,۰۰۰,۰۰۰', method: 'نقدی', account: 'صندوق' },
    ],
    'pay': [
      { id: 1, date: '۱۴۰۵/۰۸/۰۲', party: 'بتا', amount: '۵,۰۰۰,۰۰۰', method: 'چک', account: 'ملت' },
    ],
    'cash-bank': [],
    'transfer': [
      { id: 1, date: '۱۴۰۵/۰۸/۰۱', amount: '۲۰,۰۰۰,۰۰۰', from: 'ملت', to: 'ملی' },
    ],
    'received-checks': [
      { id: 1, number: '۱۲۳۴۵۶', party: 'آلفا', amount: '۵,۰۰۰,۰۰۰', bank: 'ملت', dueDate: '۱۴۰۵/۰۸/۱۰', status: 'در انتظار' },
    ],
    'paid-checks': [
      { id: 1, number: '۳۴۵۶۷۸', party: 'بتا', amount: '۳,۲۰۰,۰۰۰', bank: 'ملی', dueDate: '۱۴۰۵/۰۸/۱۷', status: 'در انتظار' },
    ],
    'due-dates': [
      { id: 1, number: '۱۲۳۴۵۶', type: 'دریافتی', party: 'آلفا', amount: '۵,۰۰۰,۰۰۰', dueDate: '۱۴۰۵/۰۸/۰۵', daysLeft: '۲' },
    ],
    'reconciliation': [
      { id: 1, date: '۱۴۰۵/۰۷/۳۰', bank: 'ملت', bookBalance: '۸۵,۰۰۰,۰۰۰', bankBalance: '۸۴,۵۰۰,۰۰۰', difference: '۵۰۰,۰۰۰' },
    ],
  },
  'reports': {
    'sales-purchase': [],
    'inventory': [],
    'contacts': [],
    'cash-bank': [],
    'journal': [
      { id: 1, date: '۱۴۰۵/۰۸/۰۱', docNumber: '۱۰۰۱', description: 'فروش به آلفا', accountCode: '۱۲۰۰', accountName: 'دریافتنی', debit: '۱۲,۵۰۰,۰۰۰', credit: '' },
      { id: 2, date: '۱۴۰۵/۰۸/۰۱', docNumber: '۱۰۰۱', description: 'فروش به آلفا', accountCode: '۴۱۰۰', accountName: 'فروش', debit: '', credit: '۱۲,۵۰۰,۰۰۰' },
    ],
    'ledger': [],
    'trial-balance': [],
    'profit-loss': [],
    'balance-sheet': [],
  },
  'accounting': {
    'new': [],
    'list': [
      { id: 1, number: 'سند-۱۰۰۱', date: '۱۴۰۵/۰۸/۰۲', description: 'فروش', debit: '۱۲,۵۰۰,۰۰۰', credit: '۱۲,۵۰۰,۰۰۰', status: 'قطعی' },
    ],
    'drafts': [
      { id: 1, number: 'سند-۱۰۰۴', date: '۱۴۰۵/۰۸/۰۱', description: 'اجاره', debit: '۵,۰۰۰,۰۰۰', credit: '۵,۰۰۰,۰۰۰' },
    ],
    'finalized': [],
    'corrections': [],
    'close-period': [],
  },
  'settings': {
    'users': [
      { id: 1, username: 'admin', fullName: 'مدیر سیستم', role: 'مدیر', status: 'فعال' },
    ],
    'appearance': [],
    'datetime': [],
    'print': [],
    'excel': [],
    'backup': [],
    'audit': [
      { id: 1, date: '۱۴۰۵/۰۸/۰۳', user: 'admin', action: 'login', table: 'users', record: '1' },
    ],
    'version': [],
  },
  'chart-of-accounts': {
    'total': [
      { id: 1, code: '۱۰۰۰', title: 'دارایی‌ها', nature: 'بدهکار' },
      { id: 2, code: '۲۰۰۰', title: 'بدهی‌ها', nature: 'بستانکار' },
    ],
    'subsidiary': [
      { id: 1, code: '۱۱۰۰', title: 'نقد و بانک', nature: 'بدهکار' },
    ],
    'detail': [
      { id: 1, code: '۱۱۰۱', title: 'صندوق', nature: 'بدهکار' },
    ],
  },
};

// Column definitions for each subpage
const columnDefs: Record<string, Record<string, any[]>> = {
  'base-data': {
    'fiscal-years': [
      { key: 'year', label: 'سال' },
      { key: 'start', label: 'شروع' },
      { key: 'end', label: 'پایان' },
      { key: 'status', label: 'وضعیت' },
    ],
    'item-groups': [
      { key: 'code', label: 'کد' },
      { key: 'name', label: 'نام' },
      { key: 'items', label: 'تعداد' },
    ],
    'units': [
      { key: 'name', label: 'نام' },
      { key: 'short', label: 'مخفف' },
    ],
    'warehouses': [
      { key: 'code', label: 'کد' },
      { key: 'name', label: 'نام' },
      { key: 'address', label: 'نشانی' },
      { key: 'status', label: 'وضعیت' },
    ],
    'cash-bank': [
      { key: 'code', label: 'کد' },
      { key: 'name', label: 'نام' },
      { key: 'type', label: 'نوع' },
      { key: 'balance', label: 'موجودی' },
    ],
    'payment-methods': [
      { key: 'name', label: 'نام' },
      { key: 'type', label: 'نوع' },
    ],
    'numbering': [
      { key: 'type', label: 'نوع' },
      { key: 'prefix', label: 'پیش‌شماره' },
      { key: 'current', label: 'جاری' },
    ],
    'chart-of-accounts': [
      { key: 'code', label: 'کد' },
      { key: 'title', label: 'عنوان' },
      { key: 'type', label: 'نوع' },
    ],
  },
  'contacts': {
    'list': [
      { key: 'code', label: 'کد' },
      { key: 'name', label: 'نام' },
      { key: 'type', label: 'نوع' },
      { key: 'phone', label: 'تلفن' },
      { key: 'city', label: 'شهر' },
      { key: 'balance', label: 'مانده' },
    ],
    'customers': [
      { key: 'code', label: 'کد' },
      { key: 'name', label: 'نام' },
      { key: 'phone', label: 'تلفن' },
      { key: 'city', label: 'شهر' },
    ],
    'suppliers': [
      { key: 'code', label: 'کد' },
      { key: 'name', label: 'نام' },
      { key: 'phone', label: 'تلفن' },
      { key: 'city', label: 'شهر' },
    ],
  },
  'purchases': {
    'list': [
      { key: 'number', label: 'شماره' },
      { key: 'date', label: 'تاریخ' },
      { key: 'supplier', label: 'تأمین‌کننده' },
      { key: 'amount', label: 'مبلغ' },
      { key: 'status', label: 'وضعیت' },
    ],
    'proforma': [
      { key: 'number', label: 'شماره' },
      { key: 'date', label: 'تاریخ' },
      { key: 'supplier', label: 'تأمین‌کننده' },
      { key: 'amount', label: 'مبلغ' },
      { key: 'status', label: 'وضعیت' },
    ],
    'expenses': [
      { key: 'date', label: 'تاریخ' },
      { key: 'description', label: 'شرح' },
      { key: 'amount', label: 'مبلغ' },
      { key: 'type', label: 'نوع' },
    ],
  },
  'sales': {
    'list': [
      { key: 'number', label: 'شماره' },
      { key: 'date', label: 'تاریخ' },
      { key: 'customer', label: 'مشتری' },
      { key: 'amount', label: 'مبلغ' },
      { key: 'profit', label: 'سود' },
      { key: 'status', label: 'وضعیت' },
    ],
    'receivables': [
      { key: 'date', label: 'تاریخ' },
      { key: 'customer', label: 'مشتری' },
      { key: 'amount', label: 'مبلغ' },
      { key: 'method', label: 'روش' },
    ],
  },
  'inventory': {
    'list': [
      { key: 'code', label: 'کد' },
      { key: 'name', label: 'نام' },
      { key: 'group', label: 'گروه' },
      { key: 'stock', label: 'موجودی' },
      { key: 'unit', label: 'واحد' },
      { key: 'price', label: 'قیمت' },
    ],
    'receipt': [
      { key: 'number', label: 'شماره' },
      { key: 'date', label: 'تاریخ' },
      { key: 'item', label: 'کالا' },
      { key: 'qty', label: 'تعداد' },
      { key: 'warehouse', label: 'انبار' },
    ],
    'issue': [
      { key: 'number', label: 'شماره' },
      { key: 'date', label: 'تاریخ' },
      { key: 'item', label: 'کالا' },
      { key: 'qty', label: 'تعداد' },
      { key: 'warehouse', label: 'انبار' },
    ],
    'transfer': [
      { key: 'number', label: 'شماره' },
      { key: 'date', label: 'تاریخ' },
      { key: 'item', label: 'کالا' },
      { key: 'qty', label: 'تعداد' },
      { key: 'from', label: 'از' },
      { key: 'to', label: 'به' },
    ],
    'stocktake': [
      { key: 'number', label: 'شماره' },
      { key: 'date', label: 'تاریخ' },
      { key: 'warehouse', label: 'انبار' },
      { key: 'items', label: 'اقلام' },
      { key: 'status', label: 'وضعیت' },
    ],
    'cardex': [
      { key: 'date', label: 'تاریخ' },
      { key: 'docNumber', label: 'سند' },
      { key: 'type', label: 'نوع' },
      { key: 'qty', label: 'تعداد' },
      { key: 'balance', label: 'مانده' },
    ],
    'low-stock': [
      { key: 'code', label: 'کد' },
      { key: 'name', label: 'نام' },
      { key: 'current', label: 'موجودی' },
      { key: 'min', label: 'حداقل' },
      { key: 'diff', label: 'اختلاف' },
    ],
  },
  'treasury': {
    'receive': [
      { key: 'date', label: 'تاریخ' },
      { key: 'party', label: 'از طرف' },
      { key: 'amount', label: 'مبلغ' },
      { key: 'method', label: 'روش' },
      { key: 'account', label: 'حساب' },
    ],
    'pay': [
      { key: 'date', label: 'تاریخ' },
      { key: 'party', label: 'به طرف' },
      { key: 'amount', label: 'مبلغ' },
      { key: 'method', label: 'روش' },
      { key: 'account', label: 'حساب' },
    ],
    'transfer': [
      { key: 'date', label: 'تاریخ' },
      { key: 'amount', label: 'مبلغ' },
      { key: 'from', label: 'از' },
      { key: 'to', label: 'به' },
    ],
    'received-checks': [
      { key: 'number', label: 'شماره' },
      { key: 'party', label: 'از طرف' },
      { key: 'amount', label: 'مبلغ' },
      { key: 'bank', label: 'بانک' },
      { key: 'dueDate', label: 'سررسید' },
      { key: 'status', label: 'وضعیت' },
    ],
    'paid-checks': [
      { key: 'number', label: 'شماره' },
      { key: 'party', label: 'در وجه' },
      { key: 'amount', label: 'مبلغ' },
      { key: 'bank', label: 'بانک' },
      { key: 'dueDate', label: 'سررسید' },
      { key: 'status', label: 'وضعیت' },
    ],
    'due-dates': [
      { key: 'number', label: 'شماره' },
      { key: 'type', label: 'نوع' },
      { key: 'party', label: 'طرف' },
      { key: 'amount', label: 'مبلغ' },
      { key: 'dueDate', label: 'سررسید' },
      { key: 'daysLeft', label: 'روز مانده' },
    ],
    'reconciliation': [
      { key: 'date', label: 'تاریخ' },
      { key: 'bank', label: 'بانک' },
      { key: 'bookBalance', label: 'دفتری' },
      { key: 'bankBalance', label: 'بانک' },
      { key: 'difference', label: 'مغایرت' },
    ],
  },
  'reports': {
    'journal': [
      { key: 'date', label: 'تاریخ' },
      { key: 'docNumber', label: 'سند' },
      { key: 'description', label: 'شرح' },
      { key: 'accountCode', label: 'کد' },
      { key: 'accountName', label: 'حساب' },
      { key: 'debit', label: 'بدهکار' },
      { key: 'credit', label: 'بستانکار' },
    ],
  },
  'accounting': {
    'list': [
      { key: 'number', label: 'شماره' },
      { key: 'date', label: 'تاریخ' },
      { key: 'description', label: 'شرح' },
      { key: 'debit', label: 'بدهکار' },
      { key: 'credit', label: 'بستانکار' },
      { key: 'status', label: 'وضعیت' },
    ],
    'drafts': [
      { key: 'number', label: 'شماره' },
      { key: 'date', label: 'تاریخ' },
      { key: 'description', label: 'شرح' },
      { key: 'debit', label: 'بدهکار' },
      { key: 'credit', label: 'بستانکار' },
    ],
  },
  'settings': {
    'users': [
      { key: 'username', label: 'کاربری' },
      { key: 'fullName', label: 'نام' },
      { key: 'role', label: 'نقش' },
      { key: 'status', label: 'وضعیت' },
    ],
    'audit': [
      { key: 'date', label: 'تاریخ' },
      { key: 'user', label: 'کاربر' },
      { key: 'action', label: 'عملیات' },
      { key: 'table', label: 'جدول' },
      { key: 'record', label: 'رکورد' },
    ],
  },
  'chart-of-accounts': {
    'total': [
      { key: 'code', label: 'کد' },
      { key: 'title', label: 'عنوان' },
      { key: 'nature', label: 'ماهیت' },
    ],
    'subsidiary': [
      { key: 'code', label: 'کد' },
      { key: 'title', label: 'عنوان' },
      { key: 'nature', label: 'ماهیت' },
    ],
    'detail': [
      { key: 'code', label: 'کد' },
      { key: 'title', label: 'عنوان' },
      { key: 'nature', label: 'ماهیت' },
    ],
  },
};

// Title definitions
const titleDefs: Record<string, Record<string, string>> = {
  'base-data': {
    'company': 'اطلاعات شرکت',
    'fiscal-years': 'سال مالی و دوره‌ها',
    'item-groups': 'گروه کالا و خدمات',
    'units': 'واحدهای اندازه‌گیری',
    'warehouses': 'انبارها',
    'cash-bank': 'صندوق و بانک',
    'payment-methods': 'روش‌های پرداخت',
    'numbering': 'شماره‌گذاری اسناد',
    'chart-of-accounts': 'کدینگ حساب‌ها',
  },
  'contacts': {
    'list': 'فهرست اشخاص',
    'new': 'شخص جدید',
    'customers': 'مشتریان',
    'suppliers': 'تأمین‌کنندگان',
    'profile': 'پرونده شخص',
    'transactions': 'گردش حساب',
    'balance': 'مانده حساب',
  },
  'purchases': {
    'new': 'فاکتور خرید جدید',
    'list': 'فهرست فاکتورهای خرید',
    'proforma': 'پیش‌فاکتور و سفارش',
    'returns': 'برگشت از خرید',
    'expenses': 'هزینه‌های خرید',
    'report': 'گزارش خرید',
  },
  'sales': {
    'new': 'فاکتور فروش جدید',
    'list': 'فهرست فاکتورهای فروش',
    'proforma': 'پیش‌فاکتور و سفارش',
    'returns': 'برگشت از فروش',
    'receivables': 'دریافت‌های مرتبط',
    'report': 'گزارش فروش و سود',
  },
  'inventory': {
    'list': 'فهرست کالا و خدمات',
    'receipt': 'رسید ورود',
    'issue': 'حواله خروج',
    'transfer': 'انتقال بین انبارها',
    'stocktake': 'انبارگردانی',
    'cardex': 'کارتکس',
    'report': 'گزارش موجودی',
    'low-stock': 'کالاهای کم‌موجود',
  },
  'treasury': {
    'receive': 'دریافت وجه',
    'pay': 'پرداخت وجه',
    'cash-bank': 'صندوق و بانک',
    'transfer': 'انتقال وجه',
    'received-checks': 'چک‌های دریافتی',
    'paid-checks': 'چک‌های پرداختی',
    'due-dates': 'سررسید چک‌ها',
    'reconciliation': 'مغایرت بانکی',
  },
  'reports': {
    'sales-purchase': 'گزارش فروش و خرید',
    'inventory': 'گزارش موجودی',
    'contacts': 'گزارش اشخاص',
    'cash-bank': 'گزارش صندوق و بانک',
    'journal': 'دفتر روزنامه',
    'ledger': 'دفتر کل و معین',
    'trial-balance': 'تراز آزمایشی',
    'profit-loss': 'سود و زیان',
    'balance-sheet': 'ترازنامه',
  },
  'accounting': {
    'new': 'ثبت سند',
    'list': 'فهرست اسناد',
    'drafts': 'اسناد پیش‌نویس',
    'finalized': 'اسناد قطعی',
    'corrections': 'اسناد اصلاحی',
    'close-period': 'بستن دوره مالی',
  },
  'settings': {
    'users': 'کاربران و مجوزها',
    'appearance': 'تنظیمات ظاهر',
    'datetime': 'تاریخ و واحد پول',
    'print': 'قالب چاپ',
    'excel': 'ورود و خروج Excel',
    'backup': 'پشتیبان‌گیری',
    'audit': 'سوابق عملیات',
    'version': 'اطلاعات نسخه',
  },
  'chart-of-accounts': {
    'total': 'حساب‌های کل',
    'subsidiary': 'حساب‌های معین',
    'detail': 'حساب‌های تفصیلی',
  },
};

export default function SubPageRenderer({ module, subPage }: SubPageRendererProps) {
  const [data, setData] = useState<any[]>(() => {
    const moduleData = allData[module];
    if (moduleData && moduleData[subPage]) {
      return [...moduleData[subPage]];
    }
    return [];
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [message, setMessage] = useState('');

  const columns = columnDefs[module]?.[subPage] || [];
  const title = titleDefs[module]?.[subPage] || `${module} - ${subPage}`;

  const filteredData = data.filter(item => {
    if (!searchQuery) return true;
    return Object.values(item).some(val =>
      String(val).toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleAdd = () => {
    setEditingItem(null);
    const initial: any = {};
    columns.forEach(col => {
      initial[col.key] = '';
    });
    setFormData(initial);
    setShowForm(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({ ...item });
    setShowForm(true);
  };

  const handleSave = () => {
    if (editingItem) {
      setData(data.map(item =>
        item.id === editingItem.id ? { ...formData, id: editingItem.id } : item
      ));
      showMessage('✓ رکورد با موفقیت ویرایش شد');
    } else {
      setData([...data, { ...formData, id: Date.now() }]);
      showMessage('✓ رکورد جدید با موفقیت اضافه شد');
    }
    setShowForm(false);
  };

  const handleDelete = (item: any) => {
    if (confirm('آیا از حذف مطمئن هستید؟')) {
      setData(data.filter(i => i.id !== item.id));
      showMessage('✓ رکورد با موفقیت حذف شد');
    }
  };

  // Special pages
  if (module === 'base-data' && subPage === 'company') {
    return <CompanyForm />;
  }

  if (module === 'settings' && subPage === 'appearance') {
    return <AppearanceSettings />;
  }

  if (module === 'settings' && subPage === 'datetime') {
    return <DateTimeSettings />;
  }

  if (module === 'settings' && subPage === 'backup') {
    return <BackupSettings />;
  }

  if (module === 'settings' && subPage === 'version') {
    return <VersionInfo />;
  }

  if (module === 'accounting' && subPage === 'close-period') {
    return <ClosePeriod />;
  }

  if (module === 'reports' && subPage === 'profit-loss') {
    return <ProfitLoss />;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Vazirmatn, sans-serif' }}>
      {/* Success Message */}
      {message && (
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
          zIndex: 9999,
          fontSize: '14px'
        }}>
          {message}
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: '800', margin: 0, color: '#111827' }}>{title}</h1>
          <p style={{ fontSize: '13px', color: '#6b7280', margin: '4px 0 0 0' }}>مدیریت و ویرایش اطلاعات</p>
        </div>
        <button
          onClick={handleAdd}
          style={{
            background: 'linear-gradient(135deg, #1e40af, #1e3a8a)',
            color: 'white',
            border: 'none',
            padding: '10px 24px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            boxShadow: '0 2px 8px rgba(30, 64, 175, 0.2)',
            transition: 'all 0.2s'
          }}
        >
          + افزودن
        </button>
      </div>

      {/* Search */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="جست‌وجو..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 16px',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            fontSize: '14px',
            outline: 'none',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* Table */}
      <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              {columns.map(col => (
                <th key={col.key} style={{ padding: '12px 16px', textAlign: 'right', fontSize: '12px', fontWeight: 'bold', color: '#6b7280' }}>
                  {col.label}
                </th>
              ))}
              <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '12px', fontWeight: 'bold', color: '#6b7280' }}>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, idx) => (
              <tr key={item.id || idx} style={{ borderBottom: '1px solid #f3f4f6' }}>
                {columns.map(col => (
                  <td key={col.key} style={{ padding: '12px 16px', fontSize: '14px', color: '#374151' }}>
                    {item[col.key] || '-'}
                  </td>
                ))}
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button
                      onClick={() => handleEdit(item)}
                      style={{
                        background: '#fef3c7',
                        border: 'none',
                        padding: '6px 10px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                      title="ویرایش"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      style={{
                        background: '#fee2e2',
                        border: 'none',
                        padding: '6px 10px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                      title="حذف"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredData.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', color: '#9ca3af' }}>
            {data.length === 0 ? (
              <div>
                <p style={{ marginBottom: '12px' }}>هنوز رکوردی ثبت نشده</p>
                <button
                  onClick={handleAdd}
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  + اولین رکورد را اضافه کنید
                </button>
              </div>
            ) : 'موردی یافت نشد'}
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ marginTop: '16px', fontSize: '12px', color: '#9ca3af' }}>
        {filteredData.length} مورد {data.length !== filteredData.length && `از ${data.length}`}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '500px',
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            <div style={{
              padding: '20px',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>
                {editingItem ? 'ویرایش رکورد' : 'افزودن رکورد جدید'}
              </h3>
              <button
                onClick={() => setShowForm(false)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: '#f3f4f6',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                ✕
              </button>
            </div>
            <div style={{ padding: '20px' }}>
              {columns.map(col => (
                <div key={col.key} style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '6px', color: '#4b5563' }}>
                    {col.label}
                  </label>
                  <input
                    type="text"
                    value={formData[col.key] || ''}
                    onChange={(e) => setFormData({ ...formData, [col.key]: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '12px',
                      border: '1px solid #e5e7eb',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              ))}
            </div>
            <div style={{
              padding: '20px',
              borderTop: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '8px'
            }}>
              <button
                onClick={() => setShowForm(false)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  background: 'white',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                انصراف
              </button>
              <button
                onClick={handleSave}
                style={{
                  padding: '10px 20px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                  color: 'white',
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
      )}
    </div>
  );
}

// Special Components
function CompanyForm() {
  const [formData, setFormData] = useState({
    companyName: 'شرکت نمونه سرمد',
    brandName: 'سَرمد',
    phone: '۰۲۱-۸۸۷۷۶۶۵۵',
    address: 'تهران، خیابان ولیعصر'
  });
  const [saved, setSaved] = useState(false);

  return (
    <div style={{ padding: '20px' }}>
      {saved && (
        <div style={{
          position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)',
          background: '#10b981', color: 'white', padding: '12px 24px', borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 9999
        }}>
          ✓ اطلاعات با موفقیت ذخیره شد
        </div>
      )}
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>اطلاعات شرکت</h1>
      <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '6px' }}>
              {key === 'companyName' ? 'نام شرکت' : key === 'brandName' ? 'نام تجاری' : key === 'phone' ? 'تلفن' : 'نشانی'}
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
              style={{
                width: '100%', padding: '10px 12px', borderRadius: '12px',
                border: '1px solid #e5e7eb', fontSize: '14px', boxSizing: 'border-box'
              }}
            />
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 3000); }}
            style={{
              padding: '10px 24px', borderRadius: '12px', border: 'none',
              background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white',
              cursor: 'pointer', fontSize: '14px', fontWeight: 'bold'
            }}
          >
            ذخیره
          </button>
        </div>
      </div>
    </div>
  );
}

function AppearanceSettings() {
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>تنظیمات ظاهر</h1>
      <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <p style={{ color: '#6b7280' }}>تنظیمات ظاهر سیستم در این بخش قرار دارد.</p>
      </div>
    </div>
  );
}

function DateTimeSettings() {
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>تاریخ و واحد پول</h1>
      <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <p style={{ color: '#6b7280' }}>تنظیمات تاریخ و واحد پول در این بخش قرار دارد.</p>
      </div>
    </div>
  );
}

function BackupSettings() {
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>پشتیبان‌گیری و بازیابی</h1>
      <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <button style={{
          padding: '10px 20px', borderRadius: '12px', border: 'none',
          background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white',
          cursor: 'pointer', fontSize: '14px', fontWeight: 'bold', marginBottom: '12px'
        }}>
          دانلود پشتیبان
        </button>
      </div>
    </div>
  );
}

function VersionInfo() {
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>اطلاعات نسخه</h1>
      <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <p><strong>نسخه:</strong> 1.0.0</p>
        <p><strong>پایگاه داده:</strong> LocalStorage</p>
        <p><strong>حالت اجرا:</strong> آفلاین محلی</p>
      </div>
    </div>
  );
}

function ClosePeriod() {
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>بستن دوره مالی</h1>
      <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <p style={{ color: '#6b7280' }}>بستن دوره مالی سال ۱۴۰۵</p>
        <button style={{
          padding: '10px 20px', borderRadius: '12px', border: 'none',
          background: 'linear-gradient(135deg, #ef4444, #dc2626)', color: 'white',
          cursor: 'pointer', fontSize: '14px', fontWeight: 'bold', marginTop: '16px'
        }}>
          بستن دوره مالی
        </button>
      </div>
    </div>
  );
}

function ProfitLoss() {
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>صورت سود و زیان</h1>
      <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>درآمدها</h3>
          <p>فروش کالا: ۳۲۸,۰۰۰,۰۰۰ ریال</p>
          <p>درآمد خدمات: ۴۵,۰۰۰,۰۰۰ ریال</p>
          <p style={{ fontWeight: 'bold' }}>جمع درآمدها: ۳۷۳,۰۰۰,۰۰۰ ریال</p>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>هزینه‌ها</h3>
          <p>بهای تمام‌شده: ۲۳۲,۰۰۰,۰۰۰ ریال</p>
          <p>هزینه‌های عملیاتی: ۵۲,۰۰۰,۰۰۰ ریال</p>
        </div>
        <div style={{ background: '#f0fdf4', padding: '16px', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
          <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#16a34a' }}>سود خالص: ۸۹,۰۰۰,۰۰۰ ریال</p>
        </div>
      </div>
    </div>
  );
}
