import { Bell, Search, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="h-16 bg-elite-surface elite-border-b flex items-center justify-between px-6">
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-elite-text-muted" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-elite-bg elite-border rounded-lg text-elite-text-primary placeholder-elite-text-muted focus:outline-none focus:ring-1 focus:ring-elite-border"
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-lg hover:bg-elite-bg transition-colors">
          <Bell className="w-5 h-5 text-elite-text-secondary" />
        </button>
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-elite-bg transition-colors">
          <User className="w-5 h-5 text-elite-text-secondary" />
          <span className="text-sm text-elite-text-secondary">Profile</span>
        </button>
      </div>
    </header>
  );
};

export default Header;

