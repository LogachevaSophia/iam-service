import { PolicyEngine } from '../src/core/policy-engine';
import type { Permission } from '@prisma/client';

function perm(
  overrides: Partial<Permission & { roleScope?: unknown }>
): Permission & { roleScope?: unknown } {
  return {
    id: 'p1',
    action: 'read',
    resource: 'guideline',
    conditions: {},
    description: null,
    createdAt: new Date(),
    ...overrides,
  } as Permission & { roleScope?: unknown };
}

describe('PolicyEngine', () => {
  const engine = new PolicyEngine();

  it('denies when permission list is empty', async () => {
    const r = await engine.evaluate([], {
      userId: 'u1',
      action: 'read',
      resource: 'guideline',
    });
    expect(r.allowed).toBe(false);
    expect(r.reason).toBeDefined();
  });

  it('allows when conditions are empty object', async () => {
    const r = await engine.evaluate(
      [perm({ conditions: {} })],
      { userId: 'u1', action: 'read', resource: 'guideline' }
    );
    expect(r.allowed).toBe(true);
  });

  it('enforces ownerOnly', async () => {
    const r = await engine.evaluate(
      [perm({ conditions: { ownerOnly: true } })],
      {
        userId: 'u1',
        action: 'read',
        resource: 'guideline',
        resourceId: 'x',
      },
      { ownerId: 'other' }
    );
    expect(r.allowed).toBe(false);

    const ok = await engine.evaluate(
      [perm({ conditions: { ownerOnly: true } })],
      {
        userId: 'u1',
        action: 'read',
        resource: 'guideline',
        resourceId: 'x',
      },
      { ownerId: 'u1' }
    );
    expect(ok.allowed).toBe(true);
  });

  it('enforces allowedStatuses', async () => {
    const denied = await engine.evaluate(
      [perm({ conditions: { allowedStatuses: ['PUBLISHED'] } })],
      { userId: 'u1', action: 'read', resource: 'guideline', resourceId: 'x' },
      { status: 'DRAFT' }
    );
    expect(denied.allowed).toBe(false);

    const allowed = await engine.evaluate(
      [perm({ conditions: { allowedStatuses: ['PUBLISHED'] } })],
      { userId: 'u1', action: 'read', resource: 'guideline', resourceId: 'x' },
      { status: 'PUBLISHED' }
    );
    expect(allowed.allowed).toBe(true);
  });

  it('enforces specialtyMatch via metadata', async () => {
    const denied = await engine.evaluate(
      [perm({ conditions: { specialtyMatch: true } })],
      {
        userId: 'u1',
        action: 'read',
        resource: 'guideline',
        metadata: { specialty: 'NEURO' },
      },
      { specialty: 'CARDIO' }
    );
    expect(denied.allowed).toBe(false);

    const allowed = await engine.evaluate(
      [perm({ conditions: { specialtyMatch: true } })],
      {
        userId: 'u1',
        action: 'read',
        resource: 'guideline',
        metadata: { specialty: 'CARDIO' },
      },
      { specialty: 'CARDIO' }
    );
    expect(allowed.allowed).toBe(true);
  });
});
