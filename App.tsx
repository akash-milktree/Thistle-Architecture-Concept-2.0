import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FeasibilityProvider } from './components/feasibility/FeasibilityContext';
import { PageLayout } from './layouts/PageLayout';

import { HomePage } from './pages/HomePage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { FeasibilityPackagePage } from './pages/FeasibilityPackagePage';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { CaseStudyDetailPage } from './pages/CaseStudyDetailPage';
import { AboutPage } from './pages/AboutPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { CookiesPage } from './pages/CookiesPage';

function App() {
  return (
    <BrowserRouter>
      <FeasibilityProvider>
        <Routes>
          <Route element={<PageLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/feasibility-package" element={<FeasibilityPackagePage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/case-studies/:slug" element={<CaseStudyDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/cookies" element={<CookiesPage />} />
            {/* Redirect old service pages to visibility package */}
            <Route path="/commercial-conversions" element={<Navigate to="/feasibility-package" replace />} />
            <Route path="/hmos" element={<Navigate to="/feasibility-package" replace />} />
            <Route path="/high-end-residential" element={<Navigate to="/feasibility-package" replace />} />
          </Route>
        </Routes>
      </FeasibilityProvider>
    </BrowserRouter>
  );
}

export default App;
