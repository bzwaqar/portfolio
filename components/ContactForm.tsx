'use client';

/**
 * ============================================================================
 * CONTACT FORM COMPONENT (components/ContactForm.tsx)
 * ============================================================================
 * Clean light-theme contact form with red accent submit button.
 */

import { useState, FormEvent } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    // Simulate dummy API request delay
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
      <h3 className="text-xl font-bold text-gray-900 mb-2">Send Me a Message</h3>
      <p className="text-sm text-gray-500 mb-6">
        Have a project idea, question, or research collaboration opportunity? Fill out the form below.
      </p>

      {status === 'success' && (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
          ✓ Thank you! Your message placeholder has been received. I will reply shortly.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Name Field */}
          <div>
            <label htmlFor="contact-name" className="block text-xs font-semibold text-gray-700 uppercase mb-1">
              Your Name <span className="text-red-600">*</span>
            </label>
            <input
              id="contact-name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Alex Mercer"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="contact-email" className="block text-xs font-semibold text-gray-700 uppercase mb-1">
              Your Email <span className="text-red-600">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="e.g. alex@example.com"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>
        </div>

        {/* Subject Field */}
        <div>
          <label htmlFor="contact-subject" className="block text-xs font-semibold text-gray-700 uppercase mb-1">
            Subject
          </label>
          <input
            id="contact-subject"
            type="text"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="e.g. Web Development Inquiry or ML Project"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
          />
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="contact-message" className="block text-xs font-semibold text-gray-700 uppercase mb-1">
            Message <span className="text-red-600">*</span>
          </label>
          <textarea
            id="contact-message"
            rows={5}
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Tell me about your project or inquiry..."
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-700 transition-colors disabled:opacity-50"
        >
          {status === 'submitting' ? 'Sending Message...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
