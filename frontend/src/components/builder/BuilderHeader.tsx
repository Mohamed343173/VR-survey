import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const steps = [
  { path: '/admin/surveys/new/basics', label: 'Survey Basics', icon: '💾' },
  { path: '/admin/surveys/new/question-builder', label: 'Question Builder', icon: '⚙️' },
  { path: '/admin/surveys/new/vr-settings', label: 'VR Settings', icon: '🎧' },
  { path: '/admin/surveys/new/targeting', label: 'Participant Targeting', icon: '👥' },
  { path: '/admin/surveys/new/publish', label: 'Preview & Publish', icon: '👁️' },
];

const BuilderHeader: React.FC = () => {
  const nav = useNavigate();
  const loc = useLocation();
  return (
    <div className="rounded-xl border border-white/10 bg-[#0E1630]">
      <div className="px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex flex-wrap gap-6">
          {steps.map((s, idx) => {
            const active = loc.pathname.startsWith(s.path);
            return (
              <button key={s.path} onClick={()=>nav(s.path)} className={`flex items-center gap-2 text-sm ${active?'text-blue-300':'text-slate-400'}`}>
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10">{s.icon}</span>
                <span className="font-medium">{s.label}</span>
                {idx<steps.length-1 && <span className="mx-3 text-white/20">—</span>}
              </button>
            );
          })}
        </div>
        <button onClick={()=>nav('/admin')} className="px-3 py-2 rounded-md bg-white/5 border border-white/10 text-sm hover:bg-white/10">← Back to Admin</button>
      </div>
    </div>
  );
};

export default BuilderHeader;
