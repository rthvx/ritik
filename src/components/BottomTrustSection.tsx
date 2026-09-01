import React from 'react';
import { Award, Zap, Lock, HeartHandshake } from 'lucide-react';

export const BottomTrustSection: React.FC = () => {
  const trustFeatures = [
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'Guaranteed best materials'
    },
    {
      icon: Zap,
      title: 'Fast Delivery',
      description: 'Quick and reliable shipping'
    },
    {
      icon: Lock,
      title: 'Secure Checkout',
      description: 'Your data is protected'
    },
    {
      icon: HeartHandshake,
      title: 'Customer Satisfaction',
      description: 'Top rated by our customers'
    }
  ];

  return (
    <section className="py-10 bg-[#FAFAFA] border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {trustFeatures.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3.5 p-3 rounded-2xl bg-white border border-neutral-100 shadow-2xs group hover:border-neutral-200 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#FF5500] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-neutral-900 leading-tight">
                    {feature.title}
                  </h4>
                  <p className="text-[11px] text-neutral-500 font-medium mt-0.5">
                    {feature.description}
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
