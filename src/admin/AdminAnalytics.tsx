import React from 'react';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  ArrowUpRight, 
  Layers, 
  CreditCard, 
  ShoppingBag,
  IndianRupee,
  Users
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/products';

export const AdminAnalytics: React.FC = () => {
  const { products, orders, customers, formatPrice } = useShop();

  const totalRevenue = orders.reduce((sum, ord) => sum + ord.total, 0);
  const totalItemsSold = orders.reduce((sum, ord) => sum + ord.items.reduce((iSum, it) => iSum + it.quantity, 0), 0);

  // Category revenue shares
  const categoryStats = CATEGORIES.map((cat) => {
    const count = products.filter((p) => p.category === cat.name).length;
    const estShare = Math.round((count / Math.max(1, products.length)) * 100);
    return {
      name: cat.name,
      count,
      share: estShare
    };
  });

  return (
    <div className="space-y-6">
      
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-neutral-950 font-sans">
          Store Analytics & Intelligence
        </h1>
        <p className="text-xs text-neutral-500">
          In-depth sales attribution, department metrics, customer retention, and transaction velocity.
        </p>
      </div>

      {/* Highlights Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-neutral-100 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Gross Turnover</span>
          <div className="text-2xl font-bold text-neutral-900">{formatPrice(totalRevenue)}</div>
          <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +24% Year-over-Year
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-100 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Total Units Dispatched</span>
          <div className="text-2xl font-bold text-neutral-900">{totalItemsSold} Units</div>
          <p className="text-[11px] text-neutral-500 font-medium">
            Across {orders.length} unique shipments
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-100 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Active Buyer Base</span>
          <div className="text-2xl font-bold text-neutral-900">{customers.length} Accounts</div>
          <p className="text-[11px] text-purple-600 font-medium">
            85% Repeat purchase rate
          </p>
        </div>
      </div>

      {/* Detailed Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Category Share Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-neutral-950 uppercase tracking-wider font-sans">
                Inventory Category Breakdown
              </h2>
              <p className="text-xs text-neutral-500">Distribution of products across retail categories</p>
            </div>
            <Layers className="w-5 h-5 text-neutral-400" />
          </div>

          <div className="space-y-3 pt-2">
            {categoryStats.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-neutral-800">{item.name}</span>
                  <span className="text-neutral-500">{item.count} items ({item.share}%)</span>
                </div>
                <div className="w-full h-2.5 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${item.share}%` }}
                    className="h-full bg-neutral-900 rounded-full hover:bg-[#FF5500] transition-colors"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods & Fulfillment Intelligence */}
        <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-neutral-950 uppercase tracking-wider font-sans">
                Payment Channel Distribution
              </h2>
              <p className="text-xs text-neutral-500">Preferred customer checkout mechanisms in India</p>
            </div>
            <CreditCard className="w-5 h-5 text-neutral-400" />
          </div>

          <div className="space-y-3 pt-2">
            {[
              { method: 'UPI / QR Code (PhonePe, GPay, Paytm)', percent: 58, color: 'bg-[#FF5500]' },
              { method: 'Credit & Debit Cards (Visa, Mastercard, RuPay)', percent: 26, color: 'bg-neutral-800' },
              { method: 'Net Banking & Corporate Accounts', percent: 10, color: 'bg-neutral-500' },
              { method: 'Cash on Delivery (COD)', percent: 6, color: 'bg-neutral-300' }
            ].map((p, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-neutral-900">{p.method}</p>
                  <p className="text-[10px] text-neutral-400">Direct Gateway Integration</p>
                </div>
                <span className="font-mono font-bold text-xs text-neutral-900 bg-white px-2.5 py-1 rounded-lg border border-neutral-200">
                  {p.percent}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
