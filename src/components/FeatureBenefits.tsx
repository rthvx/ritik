import React from 'react';
import { Truck, ShieldCheck, RotateCcw, Headphones } from 'lucide-react';

export const FeatureBenefits: React.FC = () => {
  const benefits = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'On orders over $50'
    },
    {
      icon: ShieldCheck,
      title: 'Secure Payments',
      description: '100% secure checkout'
    },
    {
      icon: RotateCcw,
      title: 'Easy Returns',
      description: '30-day return policy'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Always here to help'
    }
  ];

  return (
    <section className="py-8 bg-white border-y border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3.5 group p-2 rounded-xl transition-all"
              >
                <div className="w-11 h-11 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center text-neutral-900 group-hover:bg-orange-50 group-hover:text-[#FF5500] group-hover:border-orange-200/60 transition-all shrink-0">
                  <Icon className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900 leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-xs text-neutral-500 font-medium mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
