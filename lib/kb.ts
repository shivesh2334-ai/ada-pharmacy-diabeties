// Knowledge base: structured paraphrase of ADA Standards of Care in Diabetes 2026, Section 9 (Diabetes Care 2026;49(Suppl.1):S183–S215).
export type Mod = { id: string; title: string; points: string[] };

export const medModules: Mod[] = [
  { id: 'metformin', title: 'Metformin', points: ['Historic first-line for T2D: effective, cheap, weight neutral, no hypoglycemia.', 'GI effects: titrate slowly, use extended release, take with food.', 'Start only if eGFR ≥45; reduce dose below 45; stop below 30.', 'Check vitamin B12 periodically. No direct kidney benefit.'] },
  { id: 'sglt2', title: 'SGLT2 inhibitors', points: ['Benefit for heart failure, CKD progression, and MACE (agent-specific); weight loss; no hypoglycemia alone.', 'Glucose lowering is minimal at eGFR <45; may start at eGFR ≥20 for organ protection.', 'Risks: euglycemic DKA, genital mycotic infection, UTI/urosepsis, Fournier gangrene, volume depletion.', 'Stop 3–4 days before surgery; sick-day plan; avoid in type 1 and after DKA.'] },
  { id: 'glp1', title: 'GLP-1 RAs and tirzepatide', points: ['Highest glucose and weight efficacy: semaglutide and tirzepatide (very high), dulaglutide, liraglutide (high).', 'CV benefit: dulaglutide, liraglutide, semaglutide. Semaglutide: kidney (FLOW), HFpEF, and MASH benefit. Tirzepatide: HFpEF benefit.', 'Counsel on GI effects (smaller meals, stop when full); not for gastroparesis; stop before procedures (aspiration risk).', 'Caution: pancreatitis history, gallbladder disease, retinopathy/NAION monitoring. Tirzepatide can reduce oral contraceptive effect.', 'Never combine with a DPP-4 inhibitor.'] },
  { id: 'dpp4', title: 'DPP-4 inhibitors', points: ['Intermediate efficacy, weight neutral, CV neutral (saxagliptin: possible HF risk).', 'Linagliptin needs no renal dose adjustment.', 'Watch for joint pain and bullous pemphigoid. Not with GLP-1-based therapy.'] },
  { id: 'pio', title: 'Pioglitazone', points: ['High efficacy, low hypoglycemia; potential MASH benefit; low doses may be as effective and better tolerated.', 'Weight gain, edema, bone fracture; do not use in heart failure or active bladder cancer.'] },
  { id: 'su', title: 'Sulfonylureas', points: ['High efficacy and low cost, but hypoglycemia and weight gain.', 'Glyburide generally avoided in CKD; start glipizide/glimepiride conservatively.', 'Limit or stop when intensifying with insulin.'] },
  { id: 'cost', title: 'Cost and availability', points: ['Lowest-cost options: metformin, sulfonylureas, pioglitazone, human insulin.', 'Compounded GLP-1/GIP products are not recommended; switch to another FDA-approved drug during shortages.', 'Screen routinely for financial barriers (9.29).'] }
];

export const insulinModules: Mod[] = [
  { id: 'types', title: 'Insulin types', points: ['Basal: NPH, glargine (U-100/U-300), degludec, or pump rapid-acting insulin.', 'Prandial: rapid-acting analogs, ultra-rapid analogs, inhaled insulin, regular human insulin (give ≥30 min before meals).', 'Longer-acting analogs (degludec, U-300 glargine) lower nocturnal hypoglycemia risk.', 'Concentrated: U-500 regular (pair with U-500 syringes), U-300 glargine, U-200 degludec/lispro.'] },
  { id: 't1', title: 'Type 1 regimens', points: ['AID systems are preferred where safe; then CSII; then MDI with analogs.', 'Basal about 30–50% of total daily dose; total 0.4–1 unit/kg/day (0.5 typical start).', 'Match mealtime dose to carbohydrate (and fat/protein), correct for glucose, trends, illness, activity.', 'Less flexible plans (fixed-dose NPH/regular, split-mixed) are cheaper but carry more hypoglycemia.'] },
  { id: 't2', title: 'Type 2 insulin ladder', points: ['Prefer GLP-1 RA or tirzepatide before insulin unless severe hyperglycemia (A1C >10%, glucose ≥300, symptoms, catabolism).', 'Basal: start 10 units/day or 0.1–0.2 units/kg; raise 2 units every 3 days to the fasting goal; if hypoglycemia without cause, cut 10–20%.', 'Then add GLP-1 RA; then prandial: 4 units or 10% of basal at the largest meal, stepwise to basal-bolus; or twice-daily premix.', 'Keep metformin, SGLT2i, GLP-1 RA; limit sulfonylureas, meglitinides, DPP-4i.'] },
  { id: 'over', title: 'Overbasalization', points: ['Signals: bedtime-to-morning glucose differential ≥50 mg/dL, hypoglycemia (aware or unaware), high variability.', 'Response: reassess and address postprandial glucose (add GLP-1 RA or prandial insulin) rather than raising basal further.'] },
  { id: 'tech', title: 'Technique and safety', points: ['Inject into subcutaneous tissue (abdomen, thigh, buttock, upper arm); use 4 mm pen needles to avoid intramuscular injection.', 'Rotate sites; inspect for lipohypertrophy, which causes erratic absorption.', 'Prescribe glucagon (non-reconstituted preferred) to everyone on insulin; teach family.', 'Inhaled insulin: spirometry before and after starting; contraindicated in asthma/COPD and smokers.', 'Converting basal insulins: often unit-for-unit; reduce 10–20% when switching from NPH or U-300 glargine, or in tight control.'] },
  { id: 'special', title: 'Special situations', points: ['Steroids: dose insulin to match steroid timing; monitor afternoon/evening.', 'Checkpoint inhibitors: urgent insulin evaluation, DKA risk.', 'Post-transplant: insulin early; GLP-1 RA or others later.', 'Pancreatic diabetes and CF-related diabetes: early insulin.'] }
];

export const recs: { id: string; text: string }[] = [
  { id: '9.1', text: 'Most adults with T1D: CSII or MDI with prandial and basal insulin. (A)' },
  { id: '9.2', text: 'T1D: insulin analogs (or inhaled insulin) preferred over human insulin. (A)' },
  { id: '9.3', text: 'T1D education: carbohydrate/fat/protein matching and correction dosing. (B)' },
  { id: '9.4', text: 'Reevaluate insulin plan every 3–6 months. (E)' },
  { id: '9.5', text: 'Person-centered shared decision-making for T2D drug choice. (E)' },
  { id: '9.6', text: 'Consider initial combination therapy to shorten time to goal. (A)' },
  { id: '9.7', text: 'ASCVD or high risk: GLP-1 RA and/or SGLT2i with proven benefit, irrespective of A1C. (A)' },
  { id: '9.8', text: 'Heart failure: SGLT2 inhibitor irrespective of A1C. (A)' },
  { id: '9.9', text: 'Obesity with symptomatic HFpEF: tirzepatide (A) or a GLP-1 RA with benefit (A/B).' },
  { id: '9.10', text: 'CKD (eGFR 20–60 and/or albuminuria): SGLT2i or GLP-1 RA with proven benefit. (A)' },
  { id: '9.11', text: 'eGFR <30: GLP-1 RA preferred; may continue on dialysis. (B/C)' },
  { id: '9.12', text: 'MASLD with overweight/obesity: GLP-1 RA with MASH benefit (A) or tirzepatide (B).' },
  { id: '9.13', text: 'MASH/high fibrosis risk: GLP-1 RA preferred (A); pioglitazone, tirzepatide, or pioglitazone plus GLP-1 RA can be considered (B).' },
  { id: '9.14', text: 'Reevaluate medications every 3–6 months. (E)' },
  { id: '9.15', text: 'Do not delay treatment modification (therapeutic inertia). (A)' },
  { id: '9.16', text: 'Modify therapy by glycemic and weight goals, comorbidities, hypoglycemia risk. (A)' },
  { id: '9.17', text: 'On starting a new drug, reassess sulfonylurea, meglitinide, insulin need. (A)' },
  { id: '9.18', text: 'No DPP-4i with GLP-1 RA or tirzepatide. (B)' },
  { id: '9.19', text: 'If weight goals unmet, add weight-management interventions. (A)' },
  { id: '9.20', text: 'Consider insulin with symptoms, A1C >10%, or glucose ≥300 mg/dL. (E)' },
  { id: '9.21', text: 'Without severe hyperglycemia, GLP-1-based therapy preferred to insulin. (A)' },
  { id: '9.22', text: 'If insulin is used, combine with a GLP-1 RA or tirzepatide. (A)' },
  { id: '9.23', text: 'Continue other glucose-lowering agents when starting insulin. (A)' },
  { id: '9.24', text: 'Healthy behaviors, DSMES, avoid inertia, address social determinants. (A)' },
  { id: '9.25', text: 'CGM at onset and thereafter for adults on insulin (A), hypoglycemia-prone drugs (B), or when helpful (B).' },
  { id: '9.26', text: 'Monitor for overbasalization and reevaluate promptly. (E)' },
  { id: '9.27', text: 'Offer AID systems to adults with T1D and T2D on insulin. (A)' },
  { id: '9.28', text: 'Prescribe glucagon to all on insulin or at high hypoglycemia risk. (A)' },
  { id: '9.29', text: 'Assess for financial obstacles routinely. (E)' },
  { id: '9.30', text: 'With cost barriers, consider metformin, sulfonylureas, TZDs, human insulin. (E)' },
  { id: '9.31', text: 'Avoid compounded products; switch to an FDA-approved alternative in a shortage; reassess after. (C/E)' },
  { id: '9.32', text: 'Counsel on contraception and preconception planning. (A/C)' },
  { id: '9.33', text: 'Hyperglycemia on checkpoint inhibitors: assess for insulin urgently. (C)' },
  { id: '9.34–9.35', text: 'mTOR and PI3Kα inhibitors: metformin first-line; insulin only for severe hyperglycemia with PI3Kα. (E)' },
  { id: '9.36', text: 'Glucocorticoids: match therapy to steroid plan; reassess often. (C)' },
  { id: '9.37–9.38', text: 'Post-transplant: insulin early; noninsulin options and GLP-1 RA later. (A/C)' },
  { id: '9.39', text: 'SGLT inhibitor users at DKA risk: educate, provide serum β-hydroxybutyrate ketone tools, discourage keto diets. (E)' }
];

export const drugTable = [
  { n: 'Metformin', eff: 'High', hypo: 'No', wt: 'Neutral', cv: 'Potential benefit', hf: 'Neutral', ckd: 'Neutral' },
  { n: 'SGLT2i', eff: 'Intermediate–high', hypo: 'No', wt: 'Loss', cv: 'Benefit (agent-specific)', hf: 'Benefit', ckd: 'Benefit' },
  { n: 'GLP-1 RA', eff: 'High–very high', hypo: 'No', wt: 'Loss', cv: 'Benefit (dula, lira, sema)', hf: 'Neutral (sema: HFpEF benefit)', ckd: 'Benefit (sema)' },
  { n: 'Tirzepatide', eff: 'Very high', hypo: 'No', wt: 'Loss (very high)', cv: 'Under investigation', hf: 'Benefit (HFpEF)', ckd: 'Potential benefit' },
  { n: 'DPP-4i', eff: 'Intermediate', hypo: 'No', wt: 'Neutral', cv: 'Neutral', hf: 'Neutral', ckd: 'Neutral' },
  { n: 'Pioglitazone', eff: 'High', hypo: 'No', wt: 'Gain', cv: 'Potential benefit', hf: 'Increased risk', ckd: 'Neutral' },
  { n: 'Sulfonylureas', eff: 'High', hypo: 'Yes', wt: 'Gain', cv: 'Neutral', hf: 'Neutral', ckd: 'Neutral' },
  { n: 'Insulin', eff: 'High–very high', hypo: 'Yes', wt: 'Gain', cv: 'Neutral', hf: 'Neutral', ckd: 'Neutral' }
];
