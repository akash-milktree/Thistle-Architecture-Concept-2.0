import React from 'react';
import { PageHero } from '../components/ui/PageHero';
import { Reveal } from '../components/animations/Reveal';

const sections = [
  {
    heading: "Acceptance of Terms",
    body: "By accessing and using this website, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.",
  },
  {
    heading: "Services",
    body: "Thistle Architecture provides commercial-to-residential feasibility studies, desk studies, planning analysis, and related architectural consultancy services. Our services are provided subject to a separate engagement letter and fee proposal for each project.",
  },
  {
    heading: "Feasibility Reports",
    body: "Feasibility reports are prepared based on the information available at the time of assessment and are intended as guidance for development decisions. They do not constitute a guarantee of planning approval, structural adequacy, or commercial viability. All reports are subject to our standard terms of engagement.",
  },
  {
    heading: "Intellectual Property",
    body: "All content on this website, including text, images, logos, and design elements, is the property of Thistle Architecture Ltd and is protected by copyright law. You may not reproduce, distribute, or create derivative works without our written permission.",
  },
  {
    heading: "Limitation of Liability",
    body: "Thistle Architecture Ltd shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our website or services. Our total liability is limited to the fees paid for the specific service in question.",
  },
  {
    heading: "Professional Indemnity",
    body: "Thistle Architecture Ltd maintains professional indemnity insurance in accordance with ARB and RIBA requirements. Details of our insurance coverage are available on request.",
  },
  {
    heading: "Governing Law",
    body: "These Terms of Service are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.",
  },
];

export const TermsPage: React.FC = () => (
  <>
    <PageHero label="Legal" heading="Terms of Service." description="Last updated: February 2026" />
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
