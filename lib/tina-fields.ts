'use client';

import { tinaField } from 'tinacms/dist/react';

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Read the CMS field id for `key` on a query result object.
 *
 * Returns undefined rather than an empty string when there is no id, because
 * React omits an attribute whose value is undefined but renders `data-tina-
 * field=""` for an empty string. An empty marker is worse than none: Tina's
 * click handler resolves via `closest('[data-tina-field]')`, so an empty one
 * still matches and swallows the click, and on a link it also cancels the
 * navigation.
 *
 * It throws when the object carries no Tina metadata — which is the normal
 * case on any page still rendering from the old data modules — so this is
 * deliberately forgiving.
 */
export const f = (obj: any, key: string): string | undefined => {
  try {
    return tinaField(obj, key) || undefined;
  } catch {
    return undefined;
  }
};

/** The shape a server page hands to its client wrapper. */
export type TinaQuery<T = any> = {
  query: string;
  variables: object;
  data: T;
};

/**
 * Stand-in for a missing query.
 *
 * useTina cannot be called conditionally, so a view whose CMS prop is optional
 * still has to call it with something. This must be a MODULE-level constant,
 * not an object literal built in the component body: useTina memoises on the
 * identity of `data` and calls setData from an effect keyed on it, so a fresh
 * `{}` each render makes that effect fire every render, which re-renders, which
 * builds another fresh `{}`. Anything else triggering a render — a fetch
 * resolving, say — turns that into an unbounded loop.
 *
 * Frozen so an accidental write cannot make one caller's stub affect another's.
 */
export const EMPTY_QUERY: TinaQuery = Object.freeze({
  query: '',
  variables: Object.freeze({}),
  data: Object.freeze({}),
}) as TinaQuery;
