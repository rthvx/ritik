import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Mail, 
  Phone, 
  MapPin, 
  ShoppingBag, 
  Trash2, 
  X, 
  Check, 
  ExternalLink 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { User } from '../types';

export const AdminCustomers: React.FC = () => {
  const { customers, addCustomer, deleteCustomer, formatPrice } = useShop();

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [deletingCustomerId, setDeletingCustomerId] = useState<string | null>(null);

  // New customer form state
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('+91 ');
  const [newCity, setNewCity] = useState('');
  const [newAddress, setNewAddress] = useState('');

  const filteredCustomers = useMemo(() => {
    return customers.filter((cust) => {
      return (
        cust.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cust.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (cust.city && cust.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (cust.phone && cust.phone.includes(searchQuery))
      );
    });
  }, [customers, searchQuery]);

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    addCustomer({
      name: newName.trim(),
      email: newEmail.trim(),
      phone: newPhone.trim(),
      city: newCity.trim() || 'New Delhi',
      address: newAddress.trim() || 'Main Boulevard',
      avatar: `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 5000)}?auto=format&fit=crop&w=200&q=80`,
      totalSpent: 0,
      ordersCount: 0
    });

    setNewName('');
    setNewEmail('');
    setNewPhone('+91 ');
    setNewCity('');
    setNewAddress('');
    setIsAddCustomerOpen(false);
  };

  const confirmDelete = () => {
    if (deletingCustomerId) {
      deleteCustomer(deletingCustomerId);
      setDeletingCustomerId(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-neutral-950 font-sans">
            Customer Directory
          </h1>
          <p className="text-xs text-neutral-500">
            View shopper profiles, order frequencies, lifetime value, and regional demographics.
          </p>
        </div>

        <button
          onClick={() => setIsAddCustomerOpen(true)}
          className="px-4 py-2.5 bg-[#FF5500] hover:bg-[#e04b00] text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add Customer
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-xs flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search customers by name, email, phone, city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#FF5500]/20 focus:border-[#FF5500] bg-neutral-50/50"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-neutral-400 hover:text-neutral-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="text-xs text-neutral-500 font-medium">
          Total Registered: <strong className="text-neutral-900">{customers.length}</strong>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 text-neutral-600 font-semibold border-b border-neutral-100">
              <tr>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Contact Info</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Orders Placed</th>
                <th className="py-3.5 px-4">Lifetime Spend</th>
                <th className="py-3.5 px-4">Joined Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-400">
                    <Users className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="font-semibold">No customers found.</p>
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((cust) => (
                  <tr key={cust.id} className="hover:bg-neutral-50/50 transition-colors">
                    
                    {/* Name & Avatar */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={cust.avatar}
                          alt={cust.name}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-neutral-100 shrink-0"
                        />
                        <div>
                          <div className="font-bold text-neutral-900">
                            {cust.name}
                          </div>
                          <div className="text-[11px] text-neutral-400 font-mono">
                            {cust.id}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 text-neutral-800">
                        <Mail className="w-3.5 h-3.5 text-neutral-400" />
                        <span>{cust.email}</span>
                      </div>
                      {cust.phone && (
                        <div className="flex items-center gap-1.5 text-neutral-500 text-[11px] mt-0.5">
                          <Phone className="w-3 h-3 text-neutral-400" />
                          <span>{cust.phone}</span>
                        </div>
                      )}
                    </td>

                    {/* Location */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1 text-neutral-700">
                        <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                        <span>{cust.city || 'Delhi'}</span>
                      </div>
                    </td>

                    {/* Orders Count */}
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-800 font-bold text-[11px]">
                        {cust.ordersCount || 1} Orders
                      </span>
                    </td>

                    {/* Lifetime Spend */}
                    <td className="py-3.5 px-4 font-bold text-neutral-950">
                      {formatPrice(cust.totalSpent || 14999)}
                    </td>

                    {/* Joined Date */}
                    <td className="py-3.5 px-4 text-neutral-500 text-[11px]">
                      {cust.joinedDate}
                    </td>

                    {/* Delete Action */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setDeletingCustomerId(cust.id)}
                        className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete Customer Profile"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Customer Modal */}
      {isAddCustomerOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-5 border border-neutral-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="text-base font-bold text-neutral-900">Add New Customer</h3>
              <button
                onClick={() => setIsAddCustomerOpen(false)}
                className="p-1 text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomer} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-neutral-700">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Neha Gupta"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#FF5500]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-neutral-700">Email Address *</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="neha.gupta@example.com"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#FF5500]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-neutral-700">Phone Number</label>
                <input
                  type="tel"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#FF5500]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-neutral-700">City</label>
                  <input
                    type="text"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    placeholder="Mumbai"
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#FF5500]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-neutral-700">Street Address</label>
                  <input
                    type="text"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    placeholder="42, Main Road"
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#FF5500]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddCustomerOpen(false)}
                  className="px-4 py-2 rounded-xl border border-neutral-200 text-neutral-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#FF5500] hover:bg-[#e04b00] text-white font-semibold flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" /> Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deletingCustomerId && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center space-y-4 border border-neutral-100">
            <h3 className="text-base font-bold text-neutral-900">Delete Customer Record?</h3>
            <p className="text-xs text-neutral-500">
              Are you sure you want to remove this user from the customer database?
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeletingCustomerId(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl border border-neutral-200 text-neutral-700 hover:bg-neutral-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
