import React from 'react';
import { useNavigate } from 'react-router-dom';
import BuilderHeader from './BuilderHeader';

const Badge: React.FC<{children: React.ReactNode}> = ({children}) => (
  <span className="ml-2 inline-flex items-center justify-center min-w-[1.5rem] px-2 h-6 rounded-md bg-[#0B1220] border border-white/10 text-xs">{children}</span>
);

const PublishPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#0B1220] text-slate-200 px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create New VR Survey</h1>
        <BuilderHeader />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-xl border border-white/10 bg-[#0E1630] p-6">
            <div className="text-slate-300 font-semibold mb-4">Survey Overview</div>
            <div className="text-slate-200">Untitled Survey</div>
            <div className="text-slate-500 text-sm mb-4">No description provided</div>
            <div className="text-sm text-slate-400 divide-y divide-white/10">
              <div className="flex justify-between py-3"><span>Questions</span><Badge>1</Badge></div>
              <div className="flex justify-between py-3"><span>VR Platforms</span><Badge>0</Badge></div>
              <div className="flex justify-between py-3"><span>Target Participants</span><Badge>100</Badge></div>
              <div className="flex justify-between py-3"><span>Estimated Duration</span><Badge>2 min</Badge></div>
            </div>
            <div className="mt-4">
              <div className="text-sm text-slate-400 mb-2">VR Requirements</div>
              <div className="flex gap-2 text-xs">
                <span className="px-2 py-1 rounded-md bg-[#0B1220] border border-white/10">Not specified</span>
                <span className="px-2 py-1 rounded-md bg-[#0B1220] border border-white/10">Not specified</span>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#0E1630] p-6">
            <div className="text-slate-300 font-semibold mb-4">Publish Options</div>
            <div className="space-y-3 text-sm">
              <div className="font-semibold mb-2">Survey Status</div>
              <label className="flex items-center gap-2"><input type="radio" name="mode" defaultChecked/> Save as Draft</label>
              <label className="flex items-center gap-2"><input type="radio" name="mode"/> Preview Mode (internal testing)</label>
              <label className="flex items-center gap-2"><input type="radio" name="mode"/> Publish Live</label>
              <hr className="border-white/10 my-3" />
              <label className="flex items-center gap-2"><input type="checkbox"/> Email notifications for responses</label>
              <label className="flex items-center gap-2"><input type="checkbox"/> Enable data export</label>
              <label className="flex items-center gap-2"><input type="checkbox"/> Real-time analytics dashboard</label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 rounded-xl border border-white/10 bg-[#0E1630] p-4 flex items-center justify-between">
          <button className="px-3 py-2 rounded-md bg-white/5 border border-white/10" onClick={()=>navigate('/admin/surveys/new/targeting')}>← Previous</button>
          <div className="flex items-center gap-3">
            <button className="px-3 py-2 rounded-md bg-white/5 border border-white/10">💾 Save Draft</button>
            <button className="px-3 py-2 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600">Publish Survey</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishPage;
