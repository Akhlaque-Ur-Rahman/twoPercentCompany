"use client";

import React, { useMemo, useState } from "react";
import { parsePriceDigits } from "@/lib/formatPrice";

type EmiCalculatorProps = {
  price: string;
  className?: string;
};

function formatInr(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return "—";
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

function calcEmi(principal: number, annualRate: number, years: number): number {
  if (principal <= 0 || years <= 0) return 0;
  const r = annualRate / 12 / 100;
  const n = years * 12;
  if (r === 0) return principal / n;
  const factor = Math.pow(1 + r, n);
  return (principal * r * factor) / (factor - 1);
}

export default function EmiCalculator({
  price,
  className = "",
}: EmiCalculatorProps) {
  const listingPrice = parsePriceDigits(price);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [rate, setRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);

  const { loanAmount, emi, totalPayable, totalInterest } = useMemo(() => {
    const down = (listingPrice * downPaymentPct) / 100;
    const principal = Math.max(0, listingPrice - down);
    const monthly = calcEmi(principal, rate, tenureYears);
    const total = monthly * tenureYears * 12;
    return {
      loanAmount: principal,
      emi: monthly,
      totalPayable: total,
      totalInterest: Math.max(0, total - principal),
    };
  }, [listingPrice, downPaymentPct, rate, tenureYears]);

  if (listingPrice <= 0) return null;

  return (
    <section
      aria-labelledby="emi-heading"
      className={`border border-header-stroke rounded-card bg-2nd-bg/60 p-5 sm:p-6 space-y-5 ${className}`}
    >
      <div>
        <h2 id="emi-heading" className="type-subhead text-body">
          EMI calculator
        </h2>
        <p className="type-caption text-secondary-text mt-1">
          Estimate monthly payments — indicative only, not a bank quote.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <label className="space-y-1.5">
          <span className="type-caption text-secondary-text">
            Down payment ({downPaymentPct}%)
          </span>
          <input
            type="range"
            min={10}
            max={50}
            step={5}
            value={downPaymentPct}
            onChange={(e) => setDownPaymentPct(Number(e.target.value))}
            className="w-full accent-primary"
          />
        </label>
        <label className="space-y-1.5">
          <span className="type-caption text-secondary-text">
            Interest ({rate}% p.a.)
          </span>
          <input
            type="range"
            min={6}
            max={14}
            step={0.25}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full accent-primary"
          />
        </label>
        <label className="space-y-1.5">
          <span className="type-caption text-secondary-text">
            Tenure ({tenureYears} yrs)
          </span>
          <input
            type="range"
            min={5}
            max={30}
            step={1}
            value={tenureYears}
            onChange={(e) => setTenureYears(Number(e.target.value))}
            className="w-full accent-primary"
          />
        </label>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-header-stroke pt-4">
        <div>
          <p className="type-caption text-secondary-text">Loan amount</p>
          <p className="type-body font-semibold text-body mt-0.5">
            {formatInr(loanAmount)}
          </p>
        </div>
        <div>
          <p className="type-caption text-secondary-text">Monthly EMI</p>
          <p className="type-price text-primary mt-0.5">{formatInr(emi)}</p>
        </div>
        <div>
          <p className="type-caption text-secondary-text">Total interest</p>
          <p className="type-body font-semibold text-body mt-0.5">
            {formatInr(totalInterest)}
          </p>
        </div>
        <div>
          <p className="type-caption text-secondary-text">Total payable</p>
          <p className="type-body font-semibold text-body mt-0.5">
            {formatInr(totalPayable)}
          </p>
        </div>
      </div>
    </section>
  );
}
