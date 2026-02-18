import { Menu, Package, Settings } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-elite-surface elite-border-r h-screen flex flex-col">
      {/* Sidebar Header */}
      <div className="p-6 elite-border-b">
        <div className="flex items-center gap-3">
          <Package className="w-6 h-6 text-elite-text-primary" />
          <h1 className="text-xl font-semibold text-elite-text-primary">PakFactory</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-elite-text-secondary hover:text-elite-text-primary hover:bg-elite-bg transition-colors"
            >
              <Menu className="w-5 h-5" />
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-elite-text-secondary hover:text-elite-text-primary hover:bg-elite-bg transition-colors"
            >
              <Package className="w-5 h-5" />
              <span>Products</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-elite-text-secondary hover:text-elite-text-primary hover:bg-elite-bg transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </a>
          </li>
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 elite-border-t">
        <p className="text-xs text-elite-text-muted">Elite Design System</p>
      </div>
    </aside>
  );
};

export default Sidebar;

