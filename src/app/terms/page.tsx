import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — Galaxy & Space Explorer',
  description: 'Read the Terms of Service governing the use of the Galaxy & Space Explorer astronomical registry platform.',
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 pb-16 space-y-10">
      <div className="space-y-4 pt-8">
        <h1 className="font-display font-extrabold text-4xl text-white tracking-wide">Terms of Service</h1>
        <p className="text-sm text-slate-400">Last updated: July 10, 2025</p>
      </div>

      <div className="bg-[#111430]/40 border border-slate-800 rounded-3xl p-8 space-y-8 text-sm text-[#94A3B8] leading-relaxed">
        {[
          {
            title: '1. Acceptance of Terms',
            body: 'By registering for or using Galaxy & Space Explorer, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must discontinue use of the platform immediately.',
          },
          {
            title: '2. User Accounts',
            body: 'You are responsible for maintaining the confidentiality of your account credentials. You must notify us immediately at contact@galaxyexplorer.com if you suspect unauthorized use of your account. Accounts are for individual use only and may not be shared or transferred.',
          },
          {
            title: '3. User-Submitted Content',
            body: 'By submitting space entries, reviews, or messages through our platform, you grant Galaxy Explorer a non-exclusive, worldwide, royalty-free license to display and distribute that content within the platform. You must ensure all content you submit is accurate, legal, and does not infringe the intellectual property rights of others.',
          },
          {
            title: '4. Prohibited Activities',
            body: 'You may not: (a) submit false or deliberately misleading space data; (b) harass, abuse, or threaten other users; (c) attempt to bypass authentication or access administrative functions without authorization; (d) use automated scripts to scrape or mass-submit content; or (e) upload malicious code or links.',
          },
          {
            title: '5. Content Moderation',
            body: 'Administrators of Galaxy Explorer reserve the right to remove any submitted content that violates these Terms of Service, contains inaccurate scientific data, or is deemed inappropriate by the moderation team. Repeated violations may result in account suspension.',
          },
          {
            title: '6. Intellectual Property',
            body: 'The Galaxy Explorer platform design, codebase, logo, and brand identity are owned by Galaxy Explorer and protected by applicable intellectual property laws. Space data sourced from NASA, ESA, and other agencies remains the property of those respective organizations and is used under their open-access policies.',
          },
          {
            title: '7. Disclaimer of Warranties',
            body: 'Galaxy Explorer is provided "as is" without warranties of any kind. We make no guarantees regarding the accuracy, completeness, or reliability of the astronomical data provided on the platform. Users should verify critical scientific data against primary sources before use in academic or professional work.',
          },
          {
            title: '8. Limitation of Liability',
            body: 'To the maximum extent permitted by law, Galaxy Explorer and its team shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform or reliance on information displayed within the registry.',
          },
          {
            title: '9. Modifications',
            body: 'These Terms of Service may be updated periodically. We will notify registered users of significant changes via email or platform notification. Continued use of the service after the effective date of changes constitutes your acceptance of the revised terms.',
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
