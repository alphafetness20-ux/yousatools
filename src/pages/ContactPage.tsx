import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { AdSlot } from '../components/AdSlot';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ErrorsState {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<ErrorsState>({});
  const [submittedStatus, setSubmittedStatus] = useState<
    'idle' | 'validated_notice'
  >('idle');

  const validate = (): boolean => {
    const newErrors: ErrorsState = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g., name@example.com).';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Please enter a subject.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // In this static, serverless deployment, direct email delivery is not yet configured.
      // We honestly explain this to the user while acknowledging valid input.
      setSubmittedStatus('validated_notice');
    }
  };

  return (
    <div className="flex-1 pb-20">
      {/* Header Banner */}
      <section className="bg-white border-b border-slate-200/80 pt-12 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-full px-3.5 py-1 mb-4 shadow-xs">
            <Mail className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Contact YousaTools
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Have questions, found a bug, or want to suggest a new browser utility? We welcome your thoughts and feedback.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Honest Disclosure Notice */}
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-900 text-xs sm:text-sm">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <h3 className="font-bold text-amber-950">Notice Regarding Direct Message Delivery:</h3>
              <p className="text-amber-800 leading-relaxed">
                YousaTools operates as a static, privacy-first web application. Because this version runs without an active backend mail relay service, automated form dispatch is not yet enabled.
              </p>
              <p className="text-amber-800 leading-relaxed">
                <strong>Site Owner Setup Note:</strong> Before public launch, the site administrator can connect this form to a static form webhook (such as Formspree, Resend, or Cloudflare Worker) or publish their verified direct email: <code className="bg-amber-100 px-1.5 py-0.5 rounded text-amber-900 font-mono text-xs">[Insert Your Contact Email in Config]</code>.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs">
          {submittedStatus === 'validated_notice' ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Message Validated</h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. Your message details were verified. As stated in our setup notice, automated email routing is currently in setup on this static build.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setSubmittedStatus('idle');
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
                >
                  Write Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="block text-xs font-bold text-slate-900">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className={`w-full px-4 py-2.5 text-sm bg-white border rounded-xl outline-none transition-colors ${
                      errors.name
                        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                        : 'border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="block text-xs font-bold text-slate-900">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@example.com"
                    className={`w-full px-4 py-2.5 text-sm bg-white border rounded-xl outline-none transition-colors ${
                      errors.email
                        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                        : 'border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label htmlFor="contact-subject" className="block text-xs font-bold text-slate-900">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Feedback, tool idea, or inquiry"
                  className={`w-full px-4 py-2.5 text-sm bg-white border rounded-xl outline-none transition-colors ${
                    errors.subject
                      ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                      : 'border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                  }`}
                />
                {errors.subject && (
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="block text-xs font-bold text-slate-900">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we help or what utility would you like to see next?"
                  className={`w-full px-4 py-2.5 text-sm bg-white border rounded-xl outline-none transition-colors resize-y ${
                    errors.message
                      ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                      : 'border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                  }`}
                />
                {errors.message && (
                  <p className="text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-sm rounded-xl shadow-sm transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Message</span>
                </button>
              </div>
            </form>
          )}
        </div>

        <AdSlot slotId="contact-bottom-01" />
      </main>
    </div>
  );
};
