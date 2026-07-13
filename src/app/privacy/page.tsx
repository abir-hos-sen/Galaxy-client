import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Galaxy & Space Explorer',
  description: 'Our Privacy Policy explains how Galaxy & Space Explorer collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 pb-16 space-y-10">
      <div className="space-y-4 pt-8">
        <h1 className="font-display font-extrabold text-4xl text-white tracking-wide">Privacy Policy</h1>
        <p className="text-sm text-slate-400">Last updated: July 10, 2025</p>
      </div>

      <div className="bg-[#111430]/40 border border-slate-800 rounded-3xl p-8 space-y-8 text-sm text-[#94A3B8] leading-relaxed">
        {[
          {
            title: '1. Information We Collect',
            body: 'When you create an account on Galaxy & Space Explorer, we collect your full name, email address, and a securely hashed password. If you submit space entries, we store the text content and image URLs you provide. We do not collect payment information.',
          },
          {
            title: '2. How We Use Your Information',
            body: 'Your information is used solely to operate and improve the Galaxy Explorer platform. This includes displaying your name on submitted entries and reviews, sending you transactional notifications (e.g. newsletter confirmations), and allowing administrators to moderate content.',
          },
          {
            title: '3. Data Storage & Security',
            body: 'All passwords are stored as bcrypt hashes and never in plain text. Authentication is managed via HTTP-only JWT cookies, protecting your session from client-side script access. Data is stored in a MongoDB database with access restricted to authorized personnel only.',
          },
          {
            title: '4. Cookies',
            body: 'Galaxy Explorer uses two HTTP-only cookies: an access token (valid 15 minutes) and a refresh token (valid 7 days) to maintain your authenticated session. These cookies are never accessible to JavaScript and expire automatically.',
          },
          {
            title: '5. Third-Party Services',
            body: 'We use the DiceBear API to generate avatar images from your username and standard Google Fonts for typography. No personally identifiable information is shared with these third parties.',
          },
          {
            title: '6. Data Retention',
            body: 'Your account data is retained for as long as you maintain an active account. You may request account deletion by contacting our team at contact@galaxyexplorer.com, after which all personal data will be permanently removed within 30 days.',
          },
          {
            title: '7. Your Rights',
            body: 'You have the right to access, rectify, or delete the personal information we hold about you. To exercise these rights, please contact us at the email address listed in Section 6. We will respond to all requests within 14 business days.',
          },
          {
            title: '8. Changes to This Policy',
            body: 'We may update this Privacy Policy periodically. Significant changes will be communicated via a site notice. Continued use of the platform after changes constitutes acceptance of the updated policy.',
          },
        ].map((section) => (
          <div key={section.title} className="space-y-3">
            <h2 className="font-display font-bold text-base text-white">{section.title}</h2>
            <p>{section.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
