# Sarmad Accounting System

A complete offline accounting, financial management, and inventory system built with React, TypeScript, and SQLite.

## Features

- **Offline First**: Works completely offline with SQLite database
- **Persian Language**: Full RTL support with Persian interface
- **Multi-Module**: Dashboard, Contacts, Sales, Purchases, Inventory, Treasury, Reports, Accounting, Settings
- **Real-time Search**: Search and filter across all pages
- **Export/Import**: Excel export and CSV import support
- **Print Support**: Print invoices and reports
- **Dark Mode**: Toggle between light and dark themes
- **User Authentication**: Secure login system with role-based access
- **Backup & Restore**: Database backup and restore functionality

## Quick Start

### Installation

1. Double-click `install.bat` to install dependencies
2. Double-click `start.bat` to run the application
3. Open your browser to `http://localhost:3000`

### Login Credentials

- **Username**: `admin`
- **Password**: `admin123`

## Available Scripts

### `install.bat`
Initial setup and dependency installation

### `start.bat`
Run the application in production mode (port 3000)

### `dev.bat`
Run in development mode with hot reload (port 5173)

### `build.bat`
Build the production version

### `quick-start.bat`
Quick start using Vite preview (port 4173)

### `clean.bat`
Clean up node_modules and dist folders

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Database**: SQLite (via sql.js)
- **Build Tool**: Vite
- **Charts**: Recharts
- **Icons**: Lucide React

## Project Structure

```
sarmad-accounting/
├── src/
│   ├── components/     # React components
│   ├── pages/          # Page components
│   ├── database/       # Database layer
│   ├── hooks/          # Custom hooks
│   ├── utils/          # Utility functions
│   └── App.tsx         # Main app component
├── public/             # Static assets
├── dist/               # Production build
├── install.bat         # Installation script
├── start.bat           # Start script
├── dev.bat             # Development script
├── build.bat           # Build script
└── README.md           # This file
```

## Database

The system uses SQLite via sql.js for complete SQL support. Data is stored in browser localStorage and can be backed up/restored.

### Database Features
- Full SQL support
- Transaction support
- Backup and restore
- Export to CSV/Excel
- Import from CSV

## Modules

### 1. Dashboard
- Financial overview
- Sales and purchase charts
- Alerts and notifications
- Recent activities

### 2. Base Information
- Company settings
- Fiscal years
- Item groups
- Units
- Warehouses
- Cash and bank accounts
- Chart of accounts
- Payment methods

### 3. Contacts
- Customer and supplier management
- Contact details
- Credit limits
- Account statements

### 4. Purchases
- Purchase invoices
- Purchase orders
- Purchase returns
- Purchase reports

### 5. Sales
- Sales invoices
- Sales orders
- Sales returns
- Profit analysis

### 6. Inventory
- Product management
- Stock receipts
- Stock issues
- Stock transfers
- Stocktaking
- Low stock alerts

### 7. Treasury
- Cash management
- Bank accounts
- Check management
- Fund transfers
- Bank reconciliation

### 8. Reports
- Sales and purchase reports
- Inventory reports
- Contact reports
- Cash and bank reports
- General ledger
- Trial balance
- Profit & Loss
- Balance sheet

### 9. Accounting Documents
- Manual journal entries
- Auto-generated entries
- Document approval workflow
- Period closing

### 10. Settings
- User management
- Appearance settings
- Date and number formats
- Print templates
- Import/Export settings
- Backup and restore
- Audit logs

### 11. Chart of Accounts
- Hierarchical account structure
- General, subsidiary, and detail accounts
- Account management

## Backup and Restore

### Creating a Backup
1. Go to Settings
2. Click "Backup & Restore"
3. Click "Backup SQLite" button
4. Save the backup file

### Restoring from Backup
1. Go to Settings
2. Click "Backup & Restore"
3. Select the backup file
4. Confirm restoration

**Important**: Always backup your data regularly!

## Security

- Password hashing
- Role-based access control
- Audit logging
- Session management
- Input validation

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## Development

### Prerequisites
- Node.js 16+
- npm 8+

### Setup
```bash
npm install
npm run dev
```

### Build
```bash
npm run build
```

## Troubleshooting

### Application won't start
1. Run `clean.bat`
2. Run `install.bat`
3. Run `start.bat`

### Database errors
1. Check browser console for errors
2. Try clearing browser localStorage
3. Restore from backup

### Port already in use
1. Close other applications using port 3000
2. Or modify the port in `start.bat`

## License

Proprietary software developed for Sarmad Accounting System.

## Support

For support and inquiries, please contact the development team.

---

**Version**: 1.0.0  
**Last Updated**: 2026
