import React from 'react';
import { useNavigate } from 'react-router-dom';
import BuilderHeader from './BuilderHeader';

const VRSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#0B1220] text-slate-200 px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create New VR Survey</h1>
        <BuilderHeader />

        <div className="mt-6 rounded-xl border border-white/10 bg-[#0E1630] p-6">
          <div className="text-slate-300 font-semibold mb-1">VR Configuration</div>
          <div className="text-xs text-slate-500 mb-6">Configure VR-specific requirements and settings</div>

          <div className="grid gap-6">
            <div>
              <div className="text-sm text-slate-400 mb-2">Headset Requirement</div>
              <select className="px-3 py-2 rounded-md bg-[#0B1220] border border-white/10">
                <option>Select headset requirement</option>
                <option>Any VR Headset</option>
                <option>6DOF Tracking Required</option>
                <option>Standalone Headset</option>
                <option>PC-Tethered Required</option>
              </select>
            </div>

            <div>
              <div className="text-sm text-slate-400 mb-2">Play Area Size</div>
              <div className="space-y-2 text-sm">
                <label className="flex items-center gap-2"><input type="radio" name="area"/> Seated Experience</label>
                <label className="flex items-center gap-2"><input type="radio" name="area"/> Standing (1m x 1m)</label>
                <label className="flex items-center gap-2"><input type="radio" name="area"/> Room Scale (2m x 2m minimum)</label>
                <label className="flex items-center gap-2"><input type="radio" name="area"/> Large Space (4m x 4m+)</label>
              </div>
            </div>

            <div>
              <div className="text-sm text-slate-400 mb-2">Interaction Methods</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <label className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-[#0B1220] border border-white/10">
                  <input type="checkbox" className="accent-indigo-500"/> <span className="opacity-80">Hand Controllers</span>
                </label>
                <label className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-[#0B1220] border border-white/10">
                  <input type="checkbox" className="accent-indigo-500"/> <span className="opacity-80">Hand Tracking</span>
                </label>
                <label className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-[#0B1220] border border-white/10">
                  <input type="checkbox" className="accent-indigo-500"/> <span className="opacity-80">Eye Tracking</span>
                </label>
                <label className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-[#0B1220] border border-white/10">
                  <input type="checkbox" className="accent-indigo-500"/> <span className="opacity-80">Voice Commands</span>
                </label>
              </div>
            </div>

            <label className="inline-flex items-center gap-2 text-sm">
              <input type="checkbox"/> Audio output required (headphones/speakers)
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 rounded-xl border border-white/10 bg-[#0E1630] p-4 flex items-center justify-between">
          <button className="px-3 py-2 rounded-md bg-white/5 border border-white/10" onClick={()=>navigate('/admin/surveys/new/question-builder')}>← Previous</button>
          <div className="flex items-center gap-3">
            <button className="px-3 py-2 rounded-md bg-white/5 border border-white/10">💾 Save Draft</button>
            <button className="px-3 py-2 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600" onClick={()=>navigate('/admin/surveys/new/targeting')}>Next →</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VRSettingsPage;
