import React, { useState, useMemo } from 'react';
import { CreditCard, Lock, Check, ShieldCheck, AlertCircle, ChevronDown } from 'lucide-react';
import { BookingRequest, CardBrand } from '../types';
import { formatBRL } from '../utils/exportUtils';
import fpStudioLogo from '../assets/images/fpstudio_logo_1786495953533.jpg';
import { useCustomization } from '../context/CustomizationContext';

interface CreditCardModalProps {
  booking: BookingRequest;
  onClose: () => void;
  onConfirmPayment: (cardBrand: CardBrand, lastFour: string, installments: number, holderName: string) => void;
}

const CARD_BRANDS: { id: CardBrand; label: string; colors: string }[] = [
  { id: 'visa', label: 'Visa', colors: 'bg-blue-600 text-white' },
  { id: 'mastercard', label: 'Mastercard', colors: 'bg-orange-500 text-white' },
  { id: 'elo', label: 'Elo', colors: 'bg-yellow-500 text-black' },
  { id: 'amex', label: 'Amex', colors: 'bg-blue-400 text-white' },
  { id: 'discover', label: 'Discover', colors: 'bg-orange-600 text-white' },
  { id: 'diners', label: 'Diners', colors: 'bg-teal-600 text-white' },
  { id: 'jcb', label: 'JCB', colors: 'bg-green-600 text-white' },
  { id: 'hiper', label: 'Hiper', colors: 'bg-red-500 text-white' },
];

const CARD_BRAND_ICONS: Record<CardBrand, string> = {
  visa: '💳',
  mastercard: '💳',
  elo: '💳',
  amex: '💳',
  discover: '💳',
  diners: '💳',
  jcb: '💳',
  hiper: '💳',
};

export const CreditCardModal: React.FC<CreditCardModalProps> = ({ booking, onClose, onConfirmPayment }) => {
  const { t } = useCustomization();
  const [selectedBrand, setSelectedBrand] = useState<CardBrand | null>(null);
  const [cardNumber, setCardNumber] = useState('');
  const [holderName, setHolderName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [installments, setInstallments] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const totalAmount = booking.finalAmount || booking.totalAmount || 0;

  const installmentValue = useMemo(() => {
    if (installments <= 0) return totalAmount;
    return totalAmount / installments;
  }, [totalAmount, installments]);

  const maxInstallments = useMemo(() => {
    if (totalAmount <= 0) return 1;
    const max = Math.min(12, Math.floor(totalAmount / 50));
    return Math.max(1, max);
  }, [totalAmount]);

  const installmentOptions = useMemo(() => {
    const options = [];
    for (let i = 1; i <= maxInstallments; i++) {
      options.push(i);
    }
    return options;
  }, [maxInstallments]);

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) {
      return digits.slice(0, 2) + '/' + digits.slice(2);
    }
    return digits;
  };

  const detectBrand = (number: string): CardBrand | null => {
    const clean = number.replace(/\s/g, '');
    if (clean.startsWith('4')) return 'visa';
    if (/^5[1-5]/.test(clean) || /^2[2-7]/.test(clean)) return 'mastercard';
    if (/^6(?:36|59)/.test(clean)) return 'elo';
    if (/^3[47]/.test(clean)) return 'amex';
    if (/^6(?:011|5)/.test(clean)) return 'discover';
    if (/^3(?:0[0-5]|[68])/.test(clean)) return 'diners';
    if (/^35(?:2[89]|[3-8])/.test(clean)) return 'jcb';
    if (/^6(?:069|37)/.test(clean)) return 'hiper';
    return null;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
    const detected = detectBrand(formatted);
    if (detected && !selectedBrand) {
      setSelectedBrand(detected);
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpiry(formatExpiry(e.target.value));
  };

  const isValid = selectedBrand && cardNumber.replace(/\s/g, '').length >= 13 && holderName.trim().length >= 3 && expiry.length === 5 && cvv.length >= 3;

  const handleConfirm = () => {
    if (!isValid || !selectedBrand) return;
    setIsProcessing(true);
    setTimeout(() => {
      const lastFour = cardNumber.replace(/\s/g, '').slice(-4);
      onConfirmPayment(selectedBrand, lastFour, installments, holderName.trim());
      setIsProcessing(false);
      setShowSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#0F172A] text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <img
              src={fpStudioLogo}
              alt="FPStudio Logo"
              referrerPolicy="no-referrer"
              className="w-14 h-14 rounded-2xl object-cover border-2 border-indigo-400/60 shadow-lg ring-2 ring-indigo-500/20 shrink-0"
            />
            <div>
              <h3 className="font-bold text-lg leading-tight flex items-center gap-2">
                {t('payment_method_credit_card')} <CreditCard className="w-4 h-4 text-emerald-400" />
              </h3>
              <p className="text-xs text-slate-400">Reserva de Horário - FPStudio</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xl font-bold p-1 rounded-lg hover:bg-slate-800 transition"
          >
            ✕
          </button>
        </div>

        {/* Success State */}
        {showSuccess && (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="text-xl font-black text-white">{t('credit_card_success_title')}</h3>
            <p className="text-sm text-slate-400">{t('credit_card_success_message')}</p>
          </div>
        )}

        {/* Error State */}
        {showError && (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-xl font-black text-white">{t('credit_card_error_title')}</h3>
            <p className="text-sm text-slate-400">{t('credit_card_error_message')}</p>
            <button
              onClick={() => setShowError(false)}
              className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition"
            >
              {t('btn_fechar')}
            </button>
          </div>
        )}

        {/* Payment Form */}
        {!showSuccess && !showError && (
          <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
            
            {/* Summary Box */}
            <div className="bg-indigo-50/60 border border-indigo-200 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-indigo-900 uppercase tracking-wider">
                  {t('credit_card_total_value')}
                </p>
                <h2 className="text-2xl font-black text-indigo-600">
                  {formatBRL(totalAmount)}
                </h2>
                <p className="text-xs text-slate-600 mt-0.5">
                  {booking.serviceName} • {booking.roomName}
                </p>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5" /> {t('credit_card_secure_notice')}
                </span>
              </div>
            </div>

            {/* Card Brand Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {t('credit_card_select_brand')}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {CARD_BRANDS.map((brand) => (
                  <button
                    key={brand.id}
                    type="button"
                    onClick={() => setSelectedBrand(brand.id)}
                    className={`p-2.5 rounded-xl border-2 transition flex flex-col items-center gap-1 ${
                      selectedBrand === brand.id
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 shadow-sm'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500'
                    }`}
                  >
                    <span className="text-lg">{CARD_BRAND_ICONS[brand.id]}</span>
                    <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">{brand.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Card Number */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {t('credit_card_number')}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder={t('credit_card_number_placeholder')}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-12"
                />
                {selectedBrand && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300">
                    {CARD_BRANDS.find(b => b.id === selectedBrand)?.label}
                  </span>
                )}
              </div>
            </div>

            {/* Holder Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {t('credit_card_holder_name')}
              </label>
              <input
                type="text"
                value={holderName}
                onChange={(e) => setHolderName(e.target.value)}
                placeholder={t('credit_card_holder_placeholder')}
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 uppercase"
              />
            </div>

            {/* Expiry & CVV */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {t('credit_card_expiry')}
                </label>
                <input
                  type="text"
                  value={expiry}
                  onChange={handleExpiryChange}
                  placeholder={t('credit_card_expiry_placeholder')}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {t('credit_card_cvv')}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    placeholder={t('credit_card_cvv_placeholder')}
                    className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-8"
                  />
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>
            </div>

            {/* Installments */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {t('credit_card_installments')}
              </label>
              <div className="relative">
                <select
                  value={installments}
                  onChange={(e) => setInstallments(Number(e.target.value))}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                >
                  {installmentOptions.map((n) => (
                    <option key={n} value={n}>
                      {n}x {n === 1 ? t('credit_card_installment_singular') : t('credit_card_installment_plural')} de {formatBRL(installmentValue)}
                      {n === 1 ? ' (à vista)' : ''}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
              {installments > 1 && (
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  {t('credit_card_installment_value')}: {formatBRL(installmentValue)} × {installments}x = {formatBRL(totalAmount)}
                </p>
              )}
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleConfirm}
              disabled={!isValid || isProcessing}
              className={`w-full py-3.5 rounded-xl font-bold text-sm shadow-lg transition flex items-center justify-center gap-2 ${
                isValid && !isProcessing
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30 hover:shadow-indigo-600/40'
                  : 'bg-slate-300 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed'
              }`}
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {t('credit_card_processing')}
                </span>
              ) : (
                <>
                  <Lock className="w-4 h-4" /> {t('credit_card_confirm_payment')} {formatBRL(totalAmount)}
                </>
              )}
            </button>

            {/* Security Notice */}
            <div className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl flex items-start gap-2.5 text-[11px] text-slate-500 dark:text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <p>{t('credit_card_secure_notice')} — {t('credit_card_supported_brands')}: Visa, Mastercard, Elo, Amex, Discover, Diners, JCB, Hiper</p>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
