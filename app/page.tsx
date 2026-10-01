'use client';
import { useMemo, useState } from 'react';
import { suggest, defaultProfile, Profile, Tier } from '@/lib/engine';
import { medModules, insulinModules, recs, drugTable, Mod } from '@/lib/kb';

const tierStyle: Record<Tier, { label: string; cls: string }> = {
  first: { label: 'Recommended', cls: 'border-leaf bg-leaf-soft' },
  consider: { label: 'Consider', cls: 'border-teal bg-teal-soft' },
  avoid: { label: 'Avoid / caution', cls: 'border-rose bg-rose-soft' },
  monitor: { label: 'Monitor / educate', cls: 'border-amber bg-amber-soft' }
};

function Check({ p, k, set, label }: { p: Profile; k: keyof Profile; set: (v: Partial<Profile>) => void; label: string }) {
  return (
    <label className="flex items-center gap-2 text-sm py-1">
      <input type="checkbox" checked={p[k] as boolean} onChange={(e) => set({ [k]: e.target.checked } as Partial<Profile>)} className="h-4 w-4 accent-teal" />
      {label}
    </label>
  );
}

function Advisor() {
  const [p, setP] = useState<Profile>(defaultProfile);
  const set = (v: Partial<Profile>) => setP((x) => ({ ...x, ...v }));
  const res = useMemo(() => suggest(p), [p]);
  const t2 = p.type === 't2';
  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <section className="rounded-lg border border-slate-200 bg-white p-4 space-y-3 h-fit">
        <h2 className="font-serif text-xl">Patient profile</h2>
        <div><span className="lbl">Diabetes type</span>
          <select className="field" value={p.type} onChange={(e) => set({ type: e.target.value as Profile['type'] })}>
            <option value="t2">Type 2 diabetes</option><option value="t1">Type 1 diabetes</option>
          </select></div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="lbl">A1C (%)</label><input className="field" type="number" step="0.1" value={p.a1c} onChange={(e) => set({ a1c: +e.target.value })} /></div>
          <div><label className="lbl">A1C goal (%)</label><input className="field" type="number" step="0.1" value={p.goal} onChange={(e) => set({ goal: +e.target.value })} /></div>
        </div>
        <Check p={p} k="bg300" set={set} label="Glucose ≥300 mg/dL" />
        <Check p={p} k="symptoms" set={set} label="Hyperglycemia symptoms or weight loss" />
        {t2 && (<>
          <div><label className="lbl">eGFR (mL/min/1.73 m², optional)</label>
            <input className="field" type="number" value={p.egfr ?? ''} onChange={(e) => set({ egfr: e.target.value === '' ? null : +e.target.value })} /></div>
          <div><span className="lbl">Heart failure</span>
            <select className="field" value={p.hf} onChange={(e) => set({ hf: e.target.value as Profile['hf'] })}>
              <option value="none">None</option><option value="hfref">HFrEF</option><option value="hfpef">HFpEF</option>
            </select></div>
          <div className="border-t pt-2">
            <Check p={p} k="ascvd" set={set} label="Established ASCVD" />
            <Check p={p} k="highRisk" set={set} label="High CV risk (age ≥55 with 2+ risk factors)" />
            <Check p={p} k="ckd" set={set} label="CKD (eGFR <60 and/or albuminuria)" />
            <Check p={p} k="obesity" set={set} label="Obesity / weight goal" />
            <Check p={p} k="masld" set={set} label="MASLD / MASH or high fibrosis risk" />
            <Check p={p} k="onInsulin" set={set} label="Already on insulin" />
            <Check p={p} k="hypoRisk" set={set} label="High hypoglycemia risk" />
            <Check p={p} k="cost" set={set} label="Cost or access barrier" />
            <Check p={p} k="pancreatitis" set={set} label="History of pancreatitis" />
            <Check p={p} k="dka" set={set} label="Prior DKA / insulin deficient" />
            <Check p={p} k="childbearing" set={set} label="Childbearing potential" />
          </div>
        </>)}
        <div><span className="lbl">Special circumstance</span>
          <select className="field" value={p.special} onChange={(e) => set({ special: e.target.value as Profile['special'] })}>
            <option value="none">None</option><option value="steroid">Glucocorticoid therapy</option><option value="ici">Immune checkpoint inhibitor</option>
            <option value="pi3k">PI3Kα inhibitor</option><option value="mtor">mTOR inhibitor</option><option value="ptdm">Post-transplant diabetes</option>
            <option value="cfrd">Cystic fibrosis–related</option><option value="maturity">MODY / neonatal</option>
          </select></div>
      </section>
      <section className="space-y-3">
        <div className="rounded-lg bg-ink text-white p-4">
          <p className="text-xs opacity-70">Disease profile category</p>
          <h2 className="font-serif text-2xl">{res.category}</h2>
        </div>
        {(['first', 'consider', 'avoid', 'monitor'] as Tier[]).map((t) => {
          const list = res.items.filter((i) => i.tier === t);
          if (!list.length) return null;
          return (
            <div key={t} className={`rounded-lg border-l-4 p-4 ${tierStyle[t].cls}`}>
              <h3 className="font-semibold mb-2">{tierStyle[t].label}</h3>
              <ul className="space-y-2">
                {list.map((i, k) => (
                  <li key={k} className="text-sm">{i.text} <span className="text-slate-600">(ADA {i.ref})</span></li>
                ))}
              </ul>
            </div>
          );
        })}
        <p className="text-xs text-slate-600">Decision support only. It summarizes ADA Standards of Care 2026, Section 9 and does not replace clinical judgment, drug labels, or local formularies.</p>
      </section>
    </div>
  );
}

function Calc() {
  const [kg, setKg] = useState(70); const [t, setT] = useState<'t1' | 't2'>('t2');
  const start = t === 't1' ? [0.4 * kg, 0.5 * kg] : [0.1 * kg, 0.2 * kg];
  const basal = t === 't1' ? 'about 30–50% of total daily dose' : 'basal start; or 10 units/day';
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <h3 className="font-serif text-lg mb-2">Starting-dose estimator (educational)</h3>
      <div className="flex flex-wrap gap-3 mb-2">
        <input className="field !w-28" type="number" value={kg} onChange={(e) => setKg(+e.target.value)} aria-label="Weight kg" />
        <select className="field !w-40" value={t} onChange={(e) => setT(e.target.value as 't1' | 't2')}><option value="t2">Type 2</option><option value="t1">Type 1</option></select>
      </div>
      <p className="text-sm">{t === 't1' ? 'Total daily dose' : 'Basal insulin'}: <b>{start[0].toFixed(0)}–{start[1].toFixed(0)} units/day</b> ({basal}).</p>
      {t === 't2' && <p className="text-sm">Prandial start: <b>4 units</b> or <b>10% of basal</b> at the largest meal.</p>}
      <p className="text-xs text-slate-600 mt-1">Ranges from Section 9 text and Figs 9.2, 9.5. Individualize and titrate to glucose data.</p>
    </div>
  );
}

function Modules({ mods }: { mods: Mod[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {mods.map((m) => (
        <details key={m.id} className="rounded-lg border border-slate-200 bg-white p-4" open={m === mods[0]}>
          <summary className="cursor-pointer font-serif text-lg">{m.title}</summary>
          <ul className="mt-2 list-disc pl-5 space-y-1 text-sm">{m.points.map((x, i) => <li key={i}>{x}</li>)}</ul>
        </details>
      ))}
    </div>
  );
}

function Learn() {
  const [sub, setSub] = useState<'med' | 'ins'>('med');
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(['med', 'ins'] as const).map((s) => (
          <button key={s} onClick={() => setSub(s)} className={`rounded-full px-4 py-1.5 text-sm border ${sub === s ? 'bg-teal text-white border-teal' : 'bg-white border-slate-300'}`}>
            {s === 'med' ? 'Medication module' : 'Insulin module'}
          </button>
        ))}
      </div>
      {sub === 'med' ? (<>
        <Modules mods={medModules} />
        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <table className="min-w-[640px] w-full text-sm">
            <thead className="bg-teal-soft text-left"><tr>{['Class', 'Glucose efficacy', 'Hypoglycemia', 'Weight', 'MACE', 'Heart failure', 'CKD progression'].map((h) => <th key={h} className="p-2 font-semibold">{h}</th>)}</tr></thead>
            <tbody>{drugTable.map((r) => (<tr key={r.n} className="border-t"><td className="p-2 font-medium">{r.n}</td><td className="p-2">{r.eff}</td><td className="p-2">{r.hypo}</td><td className="p-2">{r.wt}</td><td className="p-2">{r.cv}</td><td className="p-2">{r.hf}</td><td className="p-2">{r.ckd}</td></tr>))}</tbody>
          </table>
        </div>
      </>) : (<><Modules mods={insulinModules} /><Calc /></>)}
    </div>
  );
}

function Knowledge() {
  const [q, setQ] = useState('');
  const list = recs.filter((r) => (r.id + ' ' + r.text).toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="space-y-3">
      <input className="field" placeholder="Search recommendations (e.g., CKD, insulin, 9.25)" value={q} onChange={(e) => setQ(e.target.value)} />
      <ul className="space-y-2">{list.map((r) => (<li key={r.id} className="rounded-md border border-slate-200 bg-white p-3 text-sm"><b className="text-teal">{r.id}</b> {r.text}</li>))}</ul>
      <p className="text-xs text-slate-600">Paraphrased from Diabetes Care 2026;49(Suppl. 1):S183–S215. Letters are ADA evidence grades. Consult the original document for full wording.</p>
    </div>
  );
}

export default function Home() {
  const [tab, setTab] = useState<'adv' | 'learn' | 'kb'>('adv');
  const tabs = [['adv', 'Treatment advisor'], ['learn', 'Learn'], ['kb', 'Knowledge base']] as const;
  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <header className="mb-5">
        <h1 className="font-serif text-3xl">Glycemic Treatment Navigator</h1>
        <p className="text-sm text-slate-600">ADA Standards of Care in Diabetes 2026, Section 9: Pharmacologic Approaches to Glycemic Treatment</p>
      </header>
      <nav className="mb-5 flex gap-1 border-b border-slate-300" role="tablist">
        {tabs.map(([k, l]) => (
          <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)} className={`px-4 py-2 text-sm font-medium -mb-px border-b-2 ${tab === k ? 'border-teal text-teal' : 'border-transparent text-slate-600'}`}>{l}</button>
        ))}
      </nav>
      {tab === 'adv' && <Advisor />}
      {tab === 'learn' && <Learn />}
      {tab === 'kb' && <Knowledge />}
    </main>
  );
}
