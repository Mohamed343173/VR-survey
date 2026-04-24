import React, { useState } from 'react';
import BuilderHeader from './BuilderHeader';

const SurveyBasics: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const platformsLeft = ['Meta Quest','Pico'];
  const platformsRight = ['HTC Vive','PlayStation VR','Valve Index','Windows Mixed Reality'];

  return (
    <div className="min-h-screen bg-[#0B1220] text-slate-200 px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create New VR Survey</h1>
        <BuilderHeader />

        {/* Survey Information Card */}
        <div className="mt-6 rounded-xl border border-white/10 bg-[#0E1630] p-6">
          <div className="text-slate-300 font-semibold">Survey Information</div>
          <div className="text-xs text-slate-500 mb-6">Set up the basic details for your VR survey</div>

          <div className="grid gap-6">
            <div>
              <label className="text-sm text-slate-400">Survey Title</label>
              <input
                value={title}
                onChange={e=>setTitle(e.target.value)}
                placeholder="Enter your survey title"
                className="mt-2 w-full px-3 py-2 rounded-lg bg-[#0B1220] border border-white/10 placeholder:text-slate-500"
              />
            </div>

            <div>
              <label className="text-sm text-slate-400">Description</label>
              <textarea
                value={description}
                onChange={e=>setDescription(e.target.value)}
                placeholder="Describe the purpose and goals of your survey"
                className="mt-2 w-full h-36 px-3 py-2 rounded-lg bg-[#0B1220] border border-white/10 placeholder:text-slate-500"
              />
            </div>

            <div>
              <div className="text-sm text-slate-400 mb-2">VR Platform Compatibility</div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 text-sm">
                <div className="space-y-3">
                  {platformsLeft.map(p => (
                    <label key={p} className="inline-flex items-center gap-2"><input type="checkbox" className="accent-indigo-500"/> {p}</label>
                  ))}
                </div>
                <div className="col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {platformsRight.map(p => (
                    <label key={p} className="inline-flex items-center gap-2"><input type="checkbox" className="accent-indigo-500"/> {p}</label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-6 rounded-xl border border-white/10 bg-[#0E1630] p-4 flex items-center justify-between">
          <button className="px-3 py-2 rounded-md bg-white/5 border border-white/10">← Previous</button>
          <div className="flex items-center gap-3">
            <button className="px-3 py-2 rounded-md bg-white/5 border border-white/10">💾 Save Draft</button>
            <button className="px-3 py-2 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600">Next →</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyBasics;
