import type { TinaField } from 'tinacms';

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * A join key: the string that matches a CMS list item back to the entry in
 * code it overrides.
 *
 * These are not content. If an editor changes one, nothing breaks loudly —
 * the lookup simply stops matching and that item silently falls back to the
 * copy in code, which reads as "my edit didn't save". So the field is rendered
 * read-only: still visible, because seeing which row you are editing is
 * useful, but not typeable.
 *
 * Use this for every field whose value is compared against a constant in the
 * source, rather than displayed.
 */
export const joinKeyField = (opts: { name?: string; label?: string; description?: string } = {}): TinaField => ({
  type: 'string',
  name: opts.name ?? 'key',
  label: opts.label ?? 'Identifier (fixed)',
  description:
    opts.description ??
    'Set in code — it links this row to the right item on the page. Read-only: changing it would stop your other edits on this row from showing.',
  ui: {
    // Tina has no first-class readonly flag, so the input is replaced with a
    // plain rendering of the value. `field.value` is not populated on custom
    // components, hence reading through `input.value`.
    // Typed loosely on purpose: Tina's own Component type is a union over
    // list and non-list fields whose `label` widens to string | boolean, which
    // no narrow prop type here can satisfy.
    component: (props: any) => {
      const value = String(props?.input?.value ?? '');
      return (
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#3D4552', marginBottom: 4 }}>
            {props?.field?.label ?? 'Identifier (fixed)'}
          </div>
          <div
            style={{
              padding: '8px 10px',
              borderRadius: 5,
              border: '1px solid #E1DDEC',
              background: '#F6F6F9',
              color: '#8C8C8C',
              fontFamily: 'monospace',
              fontSize: 13,
            }}
          >
            {value || '—'}
          </div>
        </div>
      );
    },
  },
});
