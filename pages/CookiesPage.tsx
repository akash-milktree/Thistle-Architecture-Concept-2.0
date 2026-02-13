import React from 'react';
import { PageHero } from '../components/ui/PageHero';
import { Reveal } from '../components/animations/Reveal';

const sections = [
  {
    heading: "What Are Cookies",
    body: "Cookies are small text files stored on your device when you visit a website. They help us understand how you use our site, remember your preferences, and improve your experience.",
  },
  {
    heading: "Essential Cookies",
    body: "These cookies are necessary for the website to function properly. They enable basic features like page navigation and access to secure areas. The website cannot function without these cookies.",
  },
  {
    heading: "Analytics Cookies",
    body: "We use analytics cookies to understand how visitors interact with our website. This helps us improve our site's functionality and content. Analytics data is collected anonymously and cannot be used to identify you personally.",
  },
  {
    heading: "Marketing Cookies",
    body: "We do not currently use marketing or advertising cookies. If this changes in the future, we will update this policy and request your consent before setting any marketing cookies.",
  },
  {
    heading: "Managing Cookies",
    body: "You can control and manage cookies through your browser settings. Most browsers allow you to refuse cookies or delete existing ones. Please note that disabling cookies may affect the functionality of our website.",
  },
  {
    heading: "Updates to This Policy",
    body: "We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.",
  },
];

export const CookiesPage: React.FC = () => (
  <>
    <PageHero label="Legal" heading="Cookie Policy." description="Last updated: February 2026" />
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
