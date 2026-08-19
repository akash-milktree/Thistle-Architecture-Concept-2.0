// Asserts the pricing engine against Ed's brief: the area ladder, the worked
// examples on page 6, and the safety rules.
//
// The numbers here are commercial decisions, not implementation detail, so they
// are checked against the document rather than against whatever the code
// currently does. Run with: node scripts/pricing-check.mjs

// Loaded through Node's built-in type stripping, so the engine is tested as
// shipped rather than through a separate build.
const { getFeasibilityRoute } = await import('../data/pricingData.ts');

let failures = 0;
const check = (name, actual, expected) => {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (!ok) failures++;
  console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${name}`);
  if (!ok) console.log(`         expected ${JSON.stringify(expected)}\n         got      ${JSON.stringify(actual)}`);
};

// A standard, priceable project with no complexity.
const base = {
  gia: 100,
  projectType: 'conversion',
  numberOfBuildings: 1,
  isMasterplan: false,
  heritageGrade: 'none',
  numberOfDevelopmentStrategies: 1,
  sufficientExistingInformation: true,
  proposedUseKnown: true,
  mixedUse: false,
  significantExtension: false,
  additionalDesignOption: false,
  specialPlanningConstraint: false,
};
const p = (o) => getFeasibilityRoute({ ...base, ...o });
const price = (o) => p(o).price;
const route = (o) => p(o).route;

console.log('\nArea ladder, both edges of every band (brief page 2)');
const ladder = [
  [1, 298], [150, 298],
  [151, 348], [250, 348],
  [251, 398], [350, 398],
  [351, 448], [450, 448],
  [451, 498], [550, 498],
  [551, 548], [600, 548],
];
for (const [gia, expected] of ladder) check(`${gia}m² -> £${expected}`, price({ gia }), expected);
check('601m² -> Expert Session', route({ gia: 601 }), 'expert_session');

console.log('\nWorked examples (brief page 6)');
check('140m² house to HMO -> £298', price({ gia: 140 }), 298);
check('320m² office to apartments -> £398', price({ gia: 320 }), 398);
check('430m² commercial to mixed-use -> £548', price({ gia: 430, mixedUse: true }), 548);
check('400m² Grade II conversion -> £598', price({ gia: 400, heritageGrade: 'Grade II' }), 598);
check(
  '580m² Grade II + mixed-use + two buildings -> Expert Session',
  route({ gia: 580, heritageGrade: 'Grade II', mixedUse: true, numberOfBuildings: 2 }),
  'expert_session',
);
check('800m² office conversion -> Expert Session', route({ gia: 800 }), 'expert_session');
check('Vacant development land -> Expert Session', route({ projectType: 'vacant_land' }), 'expert_session');

console.log('\nHard stops (brief page 3)');
check('no floor area', route({ gia: null }), 'expert_session');
check('zero floor area', route({ gia: 0 }), 'expert_session');
check('new build development', route({ projectType: 'new_build_development' }), 'expert_session');
check('three or more buildings', route({ numberOfBuildings: 3 }), 'expert_session');
check('masterplan', route({ isMasterplan: true }), 'expert_session');
check('Grade I listed', route({ heritageGrade: 'Grade I' }), 'expert_session');
check('Grade II* listed', route({ heritageGrade: 'Grade II*' }), 'expert_session');
check('several strategies', route({ numberOfDevelopmentStrategies: 3 }), 'expert_session');
check('insufficient information', route({ sufficientExistingInformation: false }), 'expert_session');
check('proposed use unknown', route({ proposedUseKnown: false }), 'expert_session');

console.log('\nComplexity uplifts (brief page 2)');
check('mixed use +£100', price({ mixedUse: true }), 398);
check('conservation area +£50', price({ heritageGrade: 'conservation_area' }), 348);
check('Grade II +£150', price({ heritageGrade: 'Grade II' }), 448);
check('two buildings +£75', price({ numberOfBuildings: 2 }), 373);
check('significant extension +£75', price({ significantExtension: true }), 373);
check('additional design option +£75', price({ additionalDesignOption: true }), 373);
check('special planning constraint +£50', price({ specialPlanningConstraint: true }), 348);

console.log('\nHeritage rule: Grade II absorbs the Conservation Area uplift, never stacks');
check('Grade II costs £150 not £200', p({ heritageGrade: 'Grade II' }).uplift, 150);
check('Grade II counts as one factor', p({ heritageGrade: 'Grade II' }).factors, 1);

console.log('\nSafety stops (brief page 2)');
check(
  'three factors routes to expert even when cheap',
  route({ numberOfBuildings: 2, significantExtension: true, additionalDesignOption: true }),
  'expert_session',
);
// "would exceed £250" means strictly greater than, so £250 itself still prices.
check(
  'exactly £250 of uplift still prices',
  route({ heritageGrade: 'Grade II', mixedUse: true }),
  'instant_payment',
);
check('that pair is £250 exactly', p({ heritageGrade: 'Grade II', mixedUse: true }).uplift, 250);

// Worth recording rather than just passing: with the current uplift values the
// ">£250" rule can never fire by itself. The two largest uplifts are Grade II
// at £150 and mixed use at £100, which sum to exactly £250, and adding any
// third factor already trips the 3-factor rule. So the money threshold is
// currently redundant. It is harmless, and it becomes load-bearing again the
// moment any uplift value rises, but Ed should know it is not doing work today.
check(
  'largest possible two-factor uplift is £250, so >£250 needs 3 factors',
  p({ heritageGrade: 'Grade II', mixedUse: true }).uplift,
  250,
);

console.log(`\n${failures === 0 ? 'All checks passed.' : failures + ' CHECK(S) FAILED.'}\n`);
process.exit(failures === 0 ? 0 : 1);
