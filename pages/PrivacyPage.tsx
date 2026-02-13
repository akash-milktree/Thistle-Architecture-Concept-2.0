import React from 'react';
import { PageHero } from '../components/ui/PageHero';
import { Reveal } from '../components/animations/Reveal';

const sections = [
  {
    heading: "Information We Collect",
    body: "We collect information you provide directly to us, such as when you submit a feasibility enquiry, contact us, or sign up for our newsletter. This includes your name, email address, phone number, company name, and property details you submit through our feasibility portal.",
  },
  {
    heading: "How We Use Your Information",
    body: "We use the information we collect to provide and improve our services, process your feasibility enquiries, communicate with you about your projects, and send you relevant updates about our services. We do not sell your personal information to third parties.",
  },
  {
    heading: "Data Storage & Security",
    body: "Your data is stored securely on encrypted servers within the UK. We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction.",
  },
  {
    heading: "Your Rights",
    body: "Under the UK GDPR, you have the right to access, rectify, or delete your personal data. You can also object to processing, request data portability, and withdraw consent at any time. To exercise these rights, contact us at privacy@thistlearchitecture.co.uk.",
  },
  {
    heading: "Data Retention",
    body: "We retain your personal data for as long as necessary to provide our services and fulfil the purposes described in this policy. Feasibility report data is retained for 7 years in line with professional indemnity insurance requirements.",
  },
  {
    heading: "Third-Party Services",
    body: "We use third-party services for analytics, email communication, and data processing. These providers are contractually bound to process your data only on our instructions and in compliance with UK GDPR.",
  },
  {
    heading: "Contact Us",
    body: "If you have questions about this Privacy Policy or our data practices, contact us at privacy@thistlearchitecture.co.uk or write to Thistle Architecture Ltd, registered in England and Wales.",
  },
];

export const PrivacyPage: React.FC = () => (
  <>
    <PageHero label="Legal" heading="Privacy Policy." description="Last updated: February 2026" />
    <section className="py-fl-section px-fl-margin bg-thistle-white">
      <div className="max-w-[800px] mx-auto">
        {sections.map((s, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div className="mb-fl-7">
              <h3 className="text-fluid-h6 font-medium tracking-tight text-thistle-black mb-fl-3">{s.heading}</h3>
              <p className="text-fluid-sm text-thistle-black/50 leading-relaxed">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  </>
);
