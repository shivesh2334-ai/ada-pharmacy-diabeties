// Rule engine. Every output carries the ADA 2026 Section 9 recommendation number (or section) it derives from.
export type Profile = {
  type: 't1' | 't2'; a1c: number; goal: number; bg300: boolean; symptoms: boolean;
  egfr: number | null; ascvd: boolean; highRisk: boolean; hf: 'none' | 'hfref' | 'hfpef';
  obesity: boolean; masld: boolean; ckd: boolean; onInsulin: boolean; hypoRisk: boolean;
  cost: boolean; pancreatitis: boolean; dka: boolean; childbearing: boolean;
  special: 'none' | 'steroid' | 'ici' | 'pi3k' | 'mtor' | 'ptdm' | 'cfrd' | 'maturity';
};
export type Tier = 'first' | 'consider' | 'avoid' | 'monitor';
export type Item = { tier: Tier; text: string; ref: string };

export const defaultProfile: Profile = {
  type: 't2', a1c: 8.5, goal: 7, bg300: false, symptoms: false, egfr: null, ascvd: false, highRisk: false,
  hf: 'none', obesity: false, masld: false, ckd: false, onInsulin: false, hypoRisk: false, cost: false,
  pancreatitis: false, dka: false, childbearing: false, special: 'none'
};

export function suggest(p: Profile): { category: string; items: Item[] } {
  const o: Item[] = [];
  const add = (tier: Tier, text: string, ref: string) => o.push({ tier, text, ref });
  const gap = +(p.a1c - p.goal).toFixed(1);

  if (p.type === 't1') {
    add('first', 'Automated insulin delivery (preferred if used safely), or CSII, or MDI with long-acting analog plus rapid/ultra-rapid analog (or inhaled) prandial insulin.', '9.1, 9.27');
    add('first', 'Analog insulins over human insulin to lower hypoglycemia risk. Typical start 0.4–0.5 units/kg/day (0.2–0.6 if new-onset or partial remission), roughly 30–50% basal.', '9.2, Fig 9.2');
    add('first', 'Teach carbohydrate (and fat/protein) matching, correction doses, sick-day and exercise adjustments. Prescribe glucagon (no-reconstitution preferred). Use CGM.', '9.3, 9.25, 9.28');
    add('avoid', 'SGLT2 inhibitors are not approved in type 1; sotagliflozin is contraindicated (about 8-fold DKA increase).', 'Noninsulin treatments for T1D');
    add('consider', 'Adjuncts (pramlintide; GLP-1 RA/tirzepatide for obesity) give modest benefit; DKA and GI effects limit use. Metformin does not sustainably lower A1C.', 'Noninsulin treatments for T1D');
    add('monitor', 'Pancreas/islet transplant only with kidney transplant, or recurrent DKA or severe hypoglycemia despite optimized care.', 'Surgical treatment of T1D');
    add('monitor', 'Reassess regimen and insulin-taking behavior every 3–6 months.', '9.4');
    return { category: 'Type 1 diabetes: insulin-based care', items: o };
  }

  const egfr = p.egfr;
  const severe = p.bg300 || p.a1c > 10 || p.symptoms;
  let cat = 'glycemic-goal focus';
  const cardiorenal = p.ascvd || p.highRisk || p.hf !== 'none' || p.ckd;
  if (cardiorenal) cat = 'cardiovascular / kidney risk reduction';
  else if (p.masld) cat = 'metabolic liver disease (MASLD/MASH)';
  else if (p.obesity) cat = 'weight management focus';
  cat = severe ? `Type 2: severe hyperglycemia, ${cat}` : `Type 2: ${cat}`;

  if (p.ascvd || p.highRisk) add('first', 'GLP-1 RA and/or SGLT2 inhibitor with proven CV benefit, independent of A1C and metformin use (strong for established ASCVD, weaker for high-risk indicators).', '9.7, Fig 9.4');
  if (p.hf !== 'none') add('first', 'SGLT2 inhibitor for heart failure (reduced or preserved EF) regardless of A1C.', '9.8');
  if (p.hf === 'hfpef' && p.obesity) add('first', 'Add tirzepatide (dual GIP/GLP-1 RA) or a GLP-1 RA with proven HFpEF benefit.', '9.9a, 9.9b');
  if (p.ckd) {
    if (egfr !== null && egfr < 30) add('first', 'GLP-1 RA preferred (low hypoglycemia, CV benefit); can be started or continued on dialysis. SGLT2i may start if eGFR ≥20 for kidney/CV benefit, with minimal glucose lowering.', '9.10, 9.11');
    else add('first', 'SGLT2 inhibitor or GLP-1 RA with proven kidney benefit (semaglutide is another first-line option). SGLT2i glucose lowering falls at eGFR <45.', '9.10');
  }
  if (p.masld) add(p.obesity || cardiorenal ? 'first' : 'consider', 'GLP-1 RA with MASH benefit (semaglutide has phase 3 data and FDA approval for MASH with fibrosis) or tirzepatide; pioglitazone, alone or with a GLP-1 RA, is an option. Use insulin if cirrhosis is decompensated.', '9.12, 9.13a, 9.13b');
  if (p.obesity) add('first', 'Prioritize very high weight-loss efficacy: semaglutide or tirzepatide, then dulaglutide or liraglutide. Use insulin, sulfonylureas and TZDs sparingly.', '9.19, Fig 9.4');

  if (severe && !p.dka) {
    add('first', 'Consider insulin first with symptoms, catabolism, A1C >10% or glucose ≥300 mg/dL (also if type 1 is possible). GLP-1 RA/tirzepatide or a sulfonylurea can also work; simplify once glucotoxicity resolves.', '9.20, 9.21');
  } else if (!cardiorenal && !p.obesity && !p.masld) {
    if (gap >= 1.5) add('first', 'Initial combination therapy (A1C ≥1.5% above goal): metformin plus a high-efficacy agent such as a GLP-1 RA or tirzepatide.', '9.6');
    else add('first', 'Metformin if no compelling indication: effective, inexpensive, weight neutral, no hypoglycemia.', 'Choice of therapy');
  }
  if (cardiorenal || p.obesity || p.masld) add('consider', 'Metformin remains a reasonable add-on if eGFR ≥45 (do not start below 45; reduce dose below 45; stop below 30).', 'Table 9.2');

  if (gap > 0 && !severe) add('monitor', `A1C is ${gap}% above goal: do not delay intensification (therapeutic inertia).`, '9.15');
  if (p.onInsulin) {
    add('consider', 'Add a GLP-1 RA or dual GIP/GLP-1 RA to insulin for efficacy, weight and hypoglycemia benefit; reassess insulin dose; keep other agents unless not tolerated.', '9.22, 9.23');
    add('monitor', 'Check for overbasalization (bedtime-to-morning differential ≥50 mg/dL, hypoglycemia, high variability). Prandial start: 4 units or 10% of basal at the largest meal.', '9.26, Fig 9.5');
  } else if (gap > 0 || severe) {
    add('consider', 'If injectable needed: GLP-1 RA/tirzepatide before basal insulin. Basal start 10 units/day or 0.1–0.2 units/kg/day, titrate about 2 units every 3 days to fasting goal.', '9.21, Fig 9.5');
  }
  if (p.hypoRisk) add('avoid', 'Minimize sulfonylureas, meglitinides and insulin; when adding a new drug, reassess their need or dose.', '9.17');
  if (p.hf !== 'none') add('avoid', 'Pioglitazone in heart failure (fluid retention).', 'Table 9.2');
  if (p.ckd && egfr !== null && egfr < 30) add('avoid', 'Metformin (contraindicated eGFR <30), glyburide, exenatide and lixisenatide (avoid at CrCl/eGFR ≤30).', 'Table 9.2');
  if (p.pancreatitis) add('avoid', 'GLP-1 RA, tirzepatide and DPP-4 inhibitors with a history of pancreatitis; early insulin may be needed.', 'Pancreatic diabetes');
  if (p.dka) add('avoid', 'SGLT inhibitors after prior DKA.', 'SGLT inhibition and ketosis');
  add('avoid', 'DPP-4 inhibitor together with a GLP-1 RA or tirzepatide (no added benefit).', '9.18');
  if (p.cost) add('consider', 'Lower-cost options: metformin, sulfonylureas, pioglitazone, human insulin (weigh hypoglycemia, weight, CV/kidney risk). Screen for financial barriers.', '9.29, 9.30');
  if (p.childbearing) add('monitor', 'Counsel on contraception and preconception planning. Tirzepatide can lower oral contraceptive levels: add a second method until 4 weeks at maintenance dose.', '9.32a, 9.32b');
  if (!p.dka) add('monitor', 'If on an SGLT2i: sick-day plan, stop 3–4 days before surgery, watch for euglycemic DKA, genital infection, volume depletion.', '9.39, Table 9.2');
  add('monitor', 'CGM if on insulin or hypoglycemia-prone agents; glucagon with insulin; DSMES and social determinants review; reassess every 3–6 months.', '9.14, 9.24, 9.25, 9.28');

  const sp: Record<string, [Tier, string, string]> = {
    steroid: ['first', 'Match therapy to steroid timing: insulin is most used (e.g., morning NPH with morning prednisone); check afternoon and evening glucose, not only fasting.', '9.36'],
    ici: ['first', 'Checkpoint-inhibitor hyperglycemia: assess for urgent insulin (DKA risk); consider basal insulin if glucose >250 mg/dL; do not stop the ICI; lifelong insulin is usually needed.', '9.33'],
    pi3k: ['first', 'PI3Kα-inhibitor hyperglycemia: metformin first-line; reserve insulin for severe hyperglycemia or crises. GLP-1 RA not advised.', '9.35a, 9.35b'],
    mtor: ['first', 'mTOR-inhibitor hyperglycemia: metformin first-line; pioglitazone second-line; insulin for refractory or severe cases.', '9.34'],
    ptdm: ['first', 'Early post-transplant: insulin preferred (DPP-4i for mild). Long term: noninsulin options; GLP-1 RA reasonable; SGLT2i with UTI caution; metformin only if eGFR ≥45 to start.', '9.37, 9.38a–c'],
    cfrd: ['first', 'Cystic fibrosis–related diabetes: insulin therapy; consider pump/AID.', 'Pancreatic diabetes and CFRD'],
    maturity: ['first', 'HNF1A/HNF4A MODY: low-dose sulfonylurea (may need insulin). Neonatal diabetes from potassium-channel (KATP) mutations: high-dose sulfonylurea.', 'MODY']
  };
  if (p.special !== 'none') { const [t, x, r] = sp[p.special]; o.unshift({ tier: t, text: x, ref: r }); }
  return { category: cat, items: o };
}
