# Sarmad Accounting System - Quick Guide

## Installation & Running

### First Time Setup
1. Double-click `install.bat`
2. Wait for installation to complete
3. When prompted, press `Y` to run the application

### Running the Application
1. Double-click `start.bat`
2. Browser will open automatically at `http://localhost:3000`
3. Login with:
   - Username: `admin`
   - Password: `admin123`

## Available BAT Files

| File | Purpose | Port |
|------|---------|------|
| `install.bat` | Initial setup | - |
| `start.bat` | Run application | 3000 |
| `dev.bat` | Development mode | 5173 |
| `build.bat` | Build production | - |
| `quick-start.bat` | Quick start | 4173 |
| `clean.bat` | Cleanup files | - |

## Troubleshooting

### Error: "'xxx' is not recognized"
This happens when BAT files contain non-ASCII characters.
**Solution**: All BAT files have been converted to English.

### Error: 404 Not Found
This means the `dist` folder is missing or incomplete.
**Solution**: 
1. Run `build.bat` first
2. Then run `start.bat`

### Port Already in Use
**Solution**: 
1. Close other applications using the port
2. Or edit the port number in the BAT file

### Database Connection Error
**Solution**:
1. Check browser console (F12)
2. Clear browser localStorage
3. Restore from backup

## Important Notes

✅ **Backup Regularly**: Go to Settings > Backup & Restore
✅ **Don't Clear Browser Data**: Database is stored in localStorage
✅ **Use Modern Browser**: Chrome, Edge, or Firefox recommended
✅ **Keep Files Together**: Don't move BAT files separately

## Login Credentials

- **Username**: `admin`
- **Password**: `admin123`

⚠️ **Security**: Change password after first login!

## Support

For technical support, check:
1. Browser console (F12) for errors
2. README.md for detailed documentation
3. Database status badge in sidebar

---

**Version**: 1.0.0
