import React, { useState } from 'react';
import { PageHeader, FormInput, FormSelect, Modal } from '../../../components/common';
import { DollarSign, Search, Printer, CheckCircle2, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

export interface FeeItem {
  id: string;
  headName: string;
  amount: number;
  selected: boolean;
}

export const FeeCollectionCounterPage: React.FC = () => {
  const [studentCode, setStudentCode] = useState('STU-100234');
  const [studentName, setStudentName] = useState('Rahul Islam');
  const [className, setClassName] = useState('Class 1 - Section A');
  const [discount, setDiscount] = useState(0);

  const [feeItems, setFeeItems] = useState<FeeItem[]>([
    { id: '1', headName: 'Monthly Tuition Fee (April 2025)', amount: 1500, selected: true },
    { id: '2', headName: 'Exam Fee (Mid-Term 2025)', amount: 500, selected: true },
    { id: '3', headName: 'Library & Sports Fee', amount: 300, selected: false },
    { id: '4', headName: 'Laboratory Fee', amount: 200, selected: false },
  ]);

  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  const toggleFee = (id: string) => {
    setFeeItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  const totalAmount = feeItems.filter((i) => i.selected).reduce((acc, i) => acc + i.amount, 0);
  const netPayable = Math.max(0, totalAmount - discount);

  const handleProcessPayment = () => {
    if (netPayable <= 0) {
      toast.error('Select at least one fee head');
      return;
    }
    setIsReceiptOpen(true);
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <PageHeader
        title="Student Fee Collection Counter"
        subtitle="POS-style fee payment processing, head selection, discount waivers, and receipt generation"
        breadcrumbs={[{ label: 'Accounts' }, { label: 'Fee Collection Counter' }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Student Lookup & Fee Selection */}
        <div className="lg:col-span-2 space-y-6">
          {/* Student Search Card */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">1. Student Identification</h3>
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={studentCode}
                  onChange={(e) => setStudentCode(e.target.value)}
                  placeholder="Enter Student Code or Roll..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-semibold"
                />
              </div>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg shadow-sm">
                Lookup Student
              </button>
            </div>

            {/* Found Student Summary */}
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200/80 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-900 text-sm">{studentName}</p>
                <p className="text-slate-500">{className} (Roll #1)</p>
              </div>
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold">
                No Pending Dues
              </span>
            </div>
          </div>

          {/* Fee Heads Selection */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">2. Payable Fee Heads</h3>
            <div className="space-y-2">
              {feeItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleFee(item.id)}
                  className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                    item.selected
                      ? 'border-blue-500 bg-blue-50/40 ring-1 ring-blue-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input type="checkbox" checked={item.selected} readOnly className="w-4 h-4 text-blue-600 rounded" />
                    <span className="text-xs font-semibold text-slate-800">{item.headName}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-900">৳{item.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Checkout Counter Box */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-6 sticky top-20">
            <div className="flex items-center gap-2 text-slate-800 font-bold border-b border-slate-100 pb-3">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <h2>Payment Calculator</h2>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Subtotal Amount</span>
                <span className="font-mono font-bold text-slate-800">৳{totalAmount.toLocaleString()}</span>
              </div>

              <div className="space-y-1 py-1">
                <label className="block text-[11px] font-semibold text-slate-500">Special Discount / Waiver (৳)</label>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs font-mono font-bold text-right"
                />
              </div>

              <div className="pt-3 border-t-2 border-slate-200 flex justify-between items-center">
                <span className="text-sm font-bold text-slate-800">Net Payable</span>
                <span className="text-xl font-extrabold text-blue-600 font-mono">৳{netPayable.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleProcessPayment}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
            >
              <DollarSign className="w-4 h-4" />
              <span>Collect Fee & Print Receipt</span>
            </button>
          </div>
        </div>
      </div>

      {/* Printable Receipt Modal */}
      <Modal
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
        title="Payment Receipt Issued"
        subtitle="Receipt #REC-2025-0892"
        maxWidth="md"
        footer={
          <button onClick={() => window.print()} className="w-full py-2.5 bg-blue-600 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-2">
            <Printer className="w-4 h-4" />
            <span>Print Official Receipt</span>
          </button>
        }
      >
        <div className="space-y-4 p-4 bg-white border border-slate-200 rounded-xl text-xs">
          <div className="text-center border-b border-slate-200 pb-3">
            <h3 className="font-bold text-sm text-slate-900">Bornomala International School</h3>
            <p className="text-[11px] text-slate-500">Official Money Receipt</p>
          </div>

          <div className="flex justify-between py-1 text-slate-600">
            <span>Student: <strong>{studentName}</strong></span>
            <span>Date: <strong>{new Date().toLocaleDateString()}</strong></span>
          </div>

          <table className="w-full text-left border-t border-b border-slate-100 py-2">
            <thead>
              <tr className="text-slate-400 font-semibold uppercase text-[10px]">
                <th className="py-1">Head</th>
                <th className="py-1 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {feeItems.filter((i) => i.selected).map((item) => (
                <tr key={item.id}>
                  <td className="py-1 font-medium">{item.headName}</td>
                  <td className="py-1 text-right font-mono font-bold">৳{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center font-bold text-sm text-slate-900 pt-2">
            <span>Total Paid</span>
            <span className="text-emerald-600 font-mono">৳{netPayable}</span>
          </div>
        </div>
      </Modal>
    </div>
  );
};
