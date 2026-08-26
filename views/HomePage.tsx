"use client";

import React from 'react';
import { useTina } from 'tinacms/dist/react';
import { Hero, type HeroMetric } from '../sections/Hero';
import { DeveloperLogos, type DeveloperLogoCopy } from '../sections/DeveloperLogos';
import { ExampleProjects, type StageLine } from '../sections/ExampleProjects';
import { Process, type ProcessStep } from '../sections/Process';
import { f, type TinaQuery, EMPTY_QUERY } from '../lib/tina-fields';
import { str, arr } from '../lib/tina';

/* eslint-disable @typescript-eslint/no-explicit-any */

// Ed's video feedback 2026-07-08: "really simplify this home page, I just think
// it's a bit too long at the moment... example projects underneath trusted by
// developers, then the five step feasibility process, and that's it. Then it
// basically just asks you to go to the other pages."
//
// This cut the page from thirteen sections to four. The sections it dropped
// (IntroBlock, FinishedProjects, TeamStrip, DataSources, ArchitectReview,
// Benefits, Difference, CaseStudies, Testimonials, FAQ) still exist; the ones
// that also appear on other pages are untouched there. Process closes with an
// InlineCTA, and the footer carries the final CTA band.
//
// This file is now the useTina wrapper as well: it turns the raw home query
// into props for the four sections, and into the per-field ids that make each
// bit of copy clickable in the editor. Every section keeps its own copy as a
// fallback, so <HomePage /> with no props still renders the page as it was.

interface HomePageProps {
  /**
   * Raw CMS query, passed straight through from the server page so that
   * useTina can re-run it live inside the editor. Optional so the page still
   * renders if it is mounted without it.
   */
  page?: TinaQuery;
}

export const HomePage: React.FC<HomePageProps> = ({ page }) => {
  // useTina returns the server data verbatim on the public site and swaps in
  // the live form values inside the editor. Passing a null-ish query is not
  // allowed, and a hook cannot be called conditionally, so it runs against a
  // stub when the prop is absent and the result is discarded below.
  const { data: live } = useTina(page ?? EMPTY_QUERY);
  const h = page ? (live as any)?.home : undefined;

  const hero = h?.hero;
  const logos = h?.logos;
  const projects = h?.projects;
  const proc = h?.process;

  // List items carry their own metadata, so each marker points at that one
  // metric / line / step rather than at the list. A marker taken from the list
  // itself opens an empty form, which is the failure this shape avoids.
  const metrics: HeroMetric[] | undefined = hero
    ? arr<any>(hero.metrics).map((m) => ({
        value: str(m.value),
        label: str(m.label),
        detail: str(m.detail),
        tina: { value: f(m, 'value'), label: f(m, 'label'), detail: f(m, 'detail') },
      }))
    : undefined;

  // No field ids here on purpose: nothing in a logo row is rendered as text, so
  // there is nothing on the page to click. It is edited from the form.
  const logoCopy: DeveloperLogoCopy[] | undefined = logos
    ? arr<any>(logos.items).map((l) => ({ key: str(l.key), name: str(l.name), alt: str(l.alt) }))
    : undefined;

  const stageLines: StageLine[] | undefined = projects
    ? arr<any>(projects.stageLines).map((s) => ({
        slug: str(s.slug),
        line: str(s.line),
        tina: { line: f(s, 'line') },
      }))
    : undefined;

  const steps: ProcessStep[] | undefined = proc
    ? arr<any>(proc.steps).map((s) => ({
        num: str(s.num),
        title: str(s.title),
        desc: str(s.desc),
        tina: { num: f(s, 'num'), title: f(s, 'title'), desc: f(s, 'desc') },
      }))
    : undefined;

  return (
    <>
      <Hero
        copy={
          hero
            ? {
                badge: str(hero.badge),
                heading: str(hero.heading),
                lede: str(hero.lede),
                primaryCtaLabel: str(hero.primaryCtaLabel),
                secondaryCtaLabel: str(hero.secondaryCtaLabel),
                reassurance: str(hero.reassurance),
                posterAlt: str(hero.posterAlt),
                posterImage: str(hero.posterImage),
              }
            : undefined
        }
        metrics={metrics}
        tina={{
          badge: f(hero, 'badge'),
          heading: f(hero, 'heading'),
          lede: f(hero, 'lede'),
          primaryCtaLabel: f(hero, 'primaryCtaLabel'),
          secondaryCtaLabel: f(hero, 'secondaryCtaLabel'),
          reassurance: f(hero, 'reassurance'),
          posterImage: f(hero, 'posterImage'),
        }}
      />
      <DeveloperLogos
        label={logos ? str(logos.label) || undefined : undefined}
        logos={logoCopy}
        tina={{ label: f(logos, 'label') }}
      />
      <ExampleProjects
        copy={
          projects
            ? {
                eyebrow: str(projects.eyebrow),
                heading: str(projects.heading),
                buttonLabel: str(projects.buttonLabel),
              }
            : undefined
        }
        stageLines={stageLines}
        tina={{
          eyebrow: f(projects, 'eyebrow'),
          heading: f(projects, 'heading'),
          buttonLabel: f(projects, 'buttonLabel'),
        }}
      />
      <Process
        copy={
          proc
            ? {
                eyebrow: str(proc.eyebrow),
                heading: str(proc.heading),
                headingAccent: str(proc.headingAccent),
                bridge: str(proc.bridge),
                ctaLabel: str(proc.ctaLabel),
              }
            : undefined
        }
        steps={steps}
        tina={{
          eyebrow: f(proc, 'eyebrow'),
          heading: f(proc, 'heading'),
          headingAccent: f(proc, 'headingAccent'),
          bridge: f(proc, 'bridge'),
          ctaLabel: f(proc, 'ctaLabel'),
        }}
      />
    </>
  );
};
