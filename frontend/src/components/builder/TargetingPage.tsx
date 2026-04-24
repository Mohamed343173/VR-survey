import React from 'react';
import { useNavigate } from 'react-router-dom';
import BuilderHeader from './BuilderHeader';

const TargetingPage: React.FC = () => {
  const navigate = useNavigate();
  const left = ['Gaming','Training','Productivity','Art & Design'];
  const mid = ['Education','Social VR','Fitness','Business'];
  const right = ['Healthcare','Entertainment','Travel','Research'];

  return (
    <div className="min-h-screen bg-[#0B1220] text-slate-200 px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create New VR Survey</h1>
        <BuilderHeader />

        <div className="mt-6 rounded-xl border border-white/10 bg-[#0E1630] p-6">
          <div className="text-slate-300 font-semibold mb-1">Participant Targeting</div>
          <div className="text-xs text-slate-500 mb-6">Define your target audience and recruitment criteria</div>

          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-slate-400 mb-2">Age Range</div>
                <select className="px-3 py-2 rounded-md bg-[#0B1220] border border-white/10">
                  <option>Select age range</option>
                  <option>18–24 years</option>
                  <option>25–34 years</option>
                  <option>35–44 years</option>
                  <option>45–54 years</option>
                  <option>55+ years</option>
                  <option>All ages (18+)</option>
                </select>
              </div>
              <div>
                <div className="text-sm text-slate-400 mb-2">VR Experience Level</div>
                <select className="px-3 py-2 rounded-md bg-[#0B1220] border border-white/10">
                  <option>Select experience level</option>
                  <option>Beginner (0–6 months)</option>
                  <option>Intermediate (6 months – 2 years)</option>
                  <option>Advanced (2+ years)</option>
                  <option>Expert/Professional</option>
                  <option>Any experience level</option>
                </select>
              </div>
            </div>

            <div>
              <div className="text-sm text-slate-400 mb-2">Areas of Interest</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="space-y-2">
                  {left.map(v => (
                    <label key={v} className="flex items-center gap-2"><input type="checkbox"/> {v}</label>
                  ))}
                </div>
                <div className="space-y-2">
                  {mid.map(v => (
                    <label key={v} className="flex items-center gap-2"><input type="checkbox"/> {v}</label>
                  ))}
                </div>
                <div className="space-y-2">
                  {right.map(v => (
                    <label key={v} className="flex items-center gap-2"><input type="checkbox"/> {v}</label>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="text-sm text-slate-400 mb-2">Target Sample Size</div>
              <input defaultValue={100} className="w-full px-3 py-2 rounded-md bg-[#0B1220] border border-white/10" />
              <div className="text-xs text-slate-500 mt-2">Estimated completion time: 2 - 4 days</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 rounded-xl border border-white/10 bg-[#0E1630] p-4 flex items-center justify-between">
          <button className="px-3 py-2 rounded-md bg-white/5 border border-white/10" onClick={()=>navigate('/admin/surveys/new/vr-settings')}>← Previous</button>
          <div className="flex items-center gap-3">
            <button className="px-3 py-2 rounded-md bg-white/5 border border-white/10">💾 Save Draft</button>
            <button className="px-3 py-2 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600" onClick={()=>navigate('/admin/surveys/new/publish')}>Next →</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TargetingPage;
