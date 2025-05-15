import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EmailFormData {
  to: string;
  subject: string;
  body: string;
  cc: string;
  bcc: string;
  priority: 'normal' | 'high' | 'low';
  attachments: File[];
}

export default function ProgressiveDisclosureEmail() {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [formData, setFormData] = useState<EmailFormData>({
    to: '',
    subject: '',
    body: '',
    cc: '',
    bcc: '',
    priority: 'normal',
    attachments: []
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      priority: e.target.value as 'normal' | 'high' | 'low'
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        attachments: Array.from(e.target.files || [])
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Fields */}
        <div className="space-y-4">
          <div>
            <label htmlFor="to" className="block text-sm font-medium text-gray-700">
              To
            </label>
            <input
              type="email"
              id="to"
              name="to"
              value={formData.to}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="body" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="body"
              name="body"
              value={formData.body}
              onChange={handleInputChange}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Advanced Options Toggle */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none"
          >
            {showAdvanced ? 'Hide Advanced Options' : 'Show Advanced Options'}
          </button>
        </div>

        {/* Advanced Fields */}
        <AnimatePresence>
          {showAdvanced && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 overflow-hidden"
            >
              <div>
                <label htmlFor="cc" className="block text-sm font-medium text-gray-700">
                  CC
                </label>
                <input
                  type="email"
                  id="cc"
                  name="cc"
                  value={formData.cc}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="bcc" className="block text-sm font-medium text-gray-700">
                  BCC
                </label>
                <input
                  type="email"
                  id="bcc"
                  name="bcc"
                  value={formData.bcc}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handlePriorityChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="low">Low</option>
                </select>
              </div>

              <div>
                <label htmlFor="attachments" className="block text-sm font-medium text-gray-700">
                  Attachments
                </label>
                <input
                  type="file"
                  id="attachments"
                  name="attachments"
                  onChange={handleFileChange}
                  multiple
                  className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Send Email
          </button>
        </div>
      </form>
    </div>
  );
} 