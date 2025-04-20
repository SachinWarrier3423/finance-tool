import Link from 'next/link';

const Sidebar = ({ isSidebarCollapsed, handleSidebarToggle }) => {
  return (
    <div
      className={`bg-gray-800 text-white p-6 transition-all duration-300 fixed top-0 left-0 bottom-0 z-50 ${isSidebarCollapsed ? 'w-16' : 'w-64'} h-full overflow-hidden`}
    >
      <h1 className={`text-xl font-bold mt-8 ${isSidebarCollapsed ? 'hidden' : ''}`}>
        Freelancer Planner
      </h1>
      <ul className={`mt-8 space-y-4 ${isSidebarCollapsed ? 'hidden' : ''}`}>
        <li><Link href="/income-tracker">Income Tracker</Link></li>
        <li><Link href="/expense-tracker">Expense Tracker</Link></li>
        <li><Link href="/budgeting">Budgeting Assistant</Link></li>
        <li><Link href="/tax-estimator">Tax Estimator</Link></li>
        <li><Link href="/savings-planner">Savings Planner</Link></li>
        <li><Link href="/retirement-planner">Retirement Planner</Link></li>
        {/* <li><Link href="/legal-templates">Legal Templates</Link></li> */}
        {/* <li><Link href="/financial-literacy">Financial Literacy</Link></li> */}
        {/* <li><Link href="/help-support">Help & Support</Link></li> */}
      </ul>
    </div>
  );
};

export default Sidebar;
