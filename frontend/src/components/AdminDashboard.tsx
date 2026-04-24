import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale, PointElement, LineElement, Filler } from 'chart.js';
import { Pie, Radar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, RadialLinearScale, PointElement, LineElement, Filler);

interface KPI { totalSurveys:number; activeParticipants:number; avgCompletionRate:number; dataPoints:number; }
interface SurveyRow { id:number; title:string; status:'draft'|'active'|'archived'; participants:number; completion_rate:number; created:string|null }
interface DashboardData {
  kpis: KPI;
  pieCharts: { q6: Record<string, number>; q7: Record<string, number>; q10: Record<string, number>; };
  radarChart: Array<{ question: string; average: number }>;
  surveys: SurveyRow[];
}

type Tab = 'manage' | 'analytics' | 'recent' | 'export';

const AdminDashboard: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all'|'draft'|'active'|'archived'>('all');
  const [q, setQ] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('manage');

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/admin/dashboard');
      setData(res.data);
    } catch (err:any) {
      setError(err.response?.data?.message || 'Failed to load dashboard data');
    } finally { setLoading(false); }
  };

  const createPie = (d:Record<string,number>) => ({
    labels: Object.keys(d),
    datasets: [{ data: Object.values(d), backgroundColor: ['#60A5FA','#34D399','#FBBF24','#F472B6','#A78BFA'], borderWidth: 0 }]
  });

  const createRadar = (rows: Array<{question:string; average:number}>) => ({
    labels: rows.map(r=>r.question),
    datasets: [{ label:'Average Rating', data: rows.map(r=>Number(r.average) || 0), backgroundColor:'rgba(99,102,241,.2)', borderColor:'#6366F1', pointBackgroundColor:'#6366F1', borderWidth: 3 }]
  });

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false as const,
    scales: { r: { beginAtZero: true, min: 0, max: 5, ticks: { stepSize: 1, color: '#94a3b8', backdropColor: 'transparent' }, grid: { color: 'rgba(148,163,184,0.2)' }, angleLines: { color: 'rgba(148,163,184,0.2)' }, pointLabels: { color: '#cbd5e1', font: { size: 11 } } } },
    plugins: { legend: { labels: { color: '#cbd5e1' } }, tooltip: { enabled: true } }
  };

  const filteredSurveys = (data?.surveys||[]).filter(s => (statusFilter==='all' || s.status===statusFilter) && s.title.toLowerCase().includes(q.toLowerCase()));

  const recentActivity = [
    { user:'Sarah Chen', action:'Completed', survey:'VR Workplace Training Effectiveness', time:'2 minutes ago' },
    { user:'Mike Rodriguez', action:'Started', survey:'Immersive Shopping Experience Study', time:'12 minutes ago' },
    { user:'Emily Johnson', action:'Completed', survey:'VR Gaming User Preferences', time:'28 minutes ago' },
    { user:'Admin', action:'Created', survey:'Educational VR Content Assessment', time:'1 hour ago' },
  ];

  const exportSurveysCSV = () => {
    const rows = data?.surveys || [];
    const header = ['"Survey Title"','"Status"','"Participants"','"Completion Rate"','"Created"'].join(',');
    const body = rows.map(r => [r.title, r.status, r.participants, `${r.completion_rate}%`, r.created || '']
      .map(v => '"' + String(v).replace(/"/g,'""') + '"').join(',')).join('\n');
    const csv = header + '\n' + body;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'surveys.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0B1220] text-slate-200 flex items-center justify-center">Loading…</div>
  );
  if (error) return (
    <div className="min-h-screen bg-[#0B1220] text-red-300 flex items-center justify-center">{error}</div>
  );

  return (
    <div className="min-h-screen bg-[#0B1220] text-slate-200">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-[#0E1630] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">User Dashboard</h1>
          <div className="flex items-center gap-6 text-sm">
            <Link to="/" className="text-blue-400 hover:text-blue-300">← Back to Home</Link>
            <button onClick={logout} className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10">Logout</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-12 gap-6">
        {/* KPI cards */}
        <div className="col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl p-5 bg-white/5 border border-white/10"><div className="text-sm text-slate-400">Total Surveys</div><div className="mt-1 text-3xl font-bold">{data?.kpis.totalSurveys ?? 0}</div></div>
          <div className="rounded-xl p-5 bg-white/5 border border-white/10"><div className="text-sm text-slate-400">Active Participants</div><div className="mt-1 text-3xl font-bold">{data?.kpis.activeParticipants ?? 0}</div></div>
          <div className="rounded-xl p-5 bg-white/5 border border-white/10"><div className="text-sm text-slate-400">Avg Completion Rate</div><div className="mt-1 text-3xl font-bold">{data?.kpis.avgCompletionRate ?? 0}%</div></div>
          <div className="rounded-xl p-5 bg-white/5 border border-white/10"><div className="text-sm text-slate-400">Data Points Collected</div><div className="mt-1 text-3xl font-bold">{Math.round((data?.kpis.dataPoints||0)/100)/10}K</div><div className="text-[10px] text-slate-500 mt-1">{data?.kpis.dataPoints} total</div></div>
        </div>

        {/* Tabs */}
        <div className="col-span-12 rounded-xl bg-white/5 border border-white/10">
          <div className="px-5 pt-4 flex items-center gap-3 text-sm flex-wrap">
            <button onClick={()=>setActiveTab('manage')} className={`px-3 py-1.5 rounded-lg border ${activeTab==='manage'?'bg-blue-500/10 text-blue-300 border-blue-400/20':'hover:bg-white/5 border-white/10 text-slate-400'}`}>Survey Management</button>
            <button onClick={()=>setActiveTab('analytics')} className={`px-3 py-1.5 rounded-lg border ${activeTab==='analytics'?'bg-blue-500/10 text-blue-300 border-blue-400/20':'hover:bg-white/5 border-white/10 text-slate-400'}`}>Analytics</button>
            <button onClick={()=>setActiveTab('recent')} className={`px-3 py-1.5 rounded-lg border ${activeTab==='recent'?'bg-blue-500/10 text-blue-300 border-blue-400/20':'hover:bg-white/5 border-white/10 text-slate-400'}`}>Recent Activity</button>
            <button onClick={()=>setActiveTab('export')} className={`px-3 py-1.5 rounded-lg border ${activeTab==='export'?'bg-blue-500/10 text-blue-300 border-blue-400/20':'hover:bg-white/5 border-white/10 text-slate-400'}`}>Data Export</button>
          </div>

          {/* CONTENT */}
          {activeTab==='manage' && (
            <div className="px-5 pb-5">
              {/* Controls */}
              <div className="mt-4 flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">
                <div className="flex-1">
                  <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search surveys…" className="w-full px-3 py-2 rounded-lg bg-[#0B1220] border border-white/10 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/30" />
                </div>
                <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value as any)} className="px-3 py-2 rounded-lg bg-[#0B1220] border border-white/10">
                  <option value="all">All Status</option>
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="archived">Archived</option>
                </select>
                <button className="px-3 py-2 rounded-lg bg-white/5 border border-white/10">Filter</button>
                <button className="ml-auto px-3 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600" onClick={()=>navigate('/admin/surveys/new')}>+ Create New Survey</button>
              </div>

              {/* Table */}
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-white/5 text-slate-400">
                    <tr>
                      <th className="text-left px-5 py-3 font-medium">Survey Title</th>
                      <th className="text-left px-5 py-3 font-medium">Status</th>
                      <th className="text-left px-5 py-3 font-medium">Participants</th>
                      <th className="text-left px-5 py-3 font-medium">Completion Rate</th>
                      <th className="text-left px-5 py-3 font-medium">Created</th>
                      <th className="text-left px-5 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSurveys.map(row => (
                      <tr key={row.id} className="border-t border-white/5 hover:bg-white/5">
                        <td className="px-5 py-3">{row.title}</td>
                        <td className="px-5 py-3"><span className={`px-2 py-1 rounded-md text-xs ${row.status==='active'?'bg-emerald-500/10 text-emerald-300':row.status==='draft'?'bg-amber-500/10 text-amber-300':'bg-slate-500/10 text-slate-300'}`}>{row.status}</span></td>
                        <td className="px-5 py-3">{row.participants}</td>
                        <td className="px-5 py-3 w-56"><div className="h-2 w-full bg-white/10 rounded-full"><div className="h-2 bg-blue-500 rounded-full" style={{width:`${row.completion_rate}%`}}/></div></td>
                        <td className="px-5 py-3">{row.created}</td>
                        <td className="px-5 py-3 flex items-center gap-3 text-slate-400"><button className="hover:text-slate-200">✏️</button><button className="hover:text-slate-200">📄</button><button className="hover:text-red-300">🗑️</button><button className="hover:text-slate-200">⋯</button></td>
                      </tr>
                    ))}
                    {filteredSurveys.length===0 && (<tr><td className="px-5 py-6 text-slate-400" colSpan={6}>No surveys found</td></tr>)}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab==='analytics' && (
            <div className="px-5 pb-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-lg border border-white/10 bg-[#0E1630] p-4">
                <div className="text-sm text-slate-300 font-semibold">Participation Trends</div>
                <div className="text-xs text-slate-500 mb-4">Survey participation over time</div>
                <div className="h-56 flex items-center justify-center text-slate-500">Chart visualization would be rendered here</div>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#0E1630] p-4">
                <div className="text-sm text-slate-300 font-semibold">Completion Rates</div>
                <div className="text-xs text-slate-500 mb-4">Survey completion rates by category</div>
                <div className="h-56 flex items-center justify-center text-slate-500">Chart visualization would be rendered here</div>
              </div>
              <div className="lg:col-span-2 rounded-lg border border-white/10 bg-[#0E1630] p-4">
                <div className="text-sm text-slate-300 font-semibold">Demographic Data</div>
                <div className="text-xs text-slate-500 mb-4">Participant demographics and insights</div>
                <div className="h-56 md:h-72 flex items-center justify-center text-slate-500">Demographic chart visualization would be rendered here</div>
              </div>
            </div>
          )}

          {activeTab==='recent' && (
            <div className="px-5 pb-5">
              <div className="rounded-lg border border-white/10 bg-[#0E1630] p-4">
                <div className="text-sm text-slate-300 font-semibold mb-2">Recent Activity</div>
                <div className="text-xs text-slate-500 mb-4">Latest participant actions and survey completions</div>
                <div className="space-y-3">
                  {recentActivity.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between rounded-lg bg-white/5 border border-white/10 px-4 py-3">
                      <div>
                        <div className="text-slate-200 text-sm"><span className="font-medium">{item.user}</span> {item.action} <span className="italic">"{item.survey}"</span></div>
                      </div>
                      <div className="text-xs text-slate-400">{item.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab==='export' && (
            <div className="px-5 pb-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-lg border border-white/10 bg-[#0E1630] p-4">
                <div className="text-sm text-slate-300 font-semibold">Survey Responses</div>
                <div className="text-xs text-slate-500 mb-4">Export all survey responses in CSV or Excel format</div>
                <div className="flex gap-3">
                  <button onClick={exportSurveysCSV} className="px-3 py-2 rounded-md bg-white/5 border border-white/10 hover:bg-white/10">CSV</button>
                  <button onClick={exportSurveysCSV} className="px-3 py-2 rounded-md bg-white/5 border border-white/10 hover:bg-white/10">Excel</button>
                </div>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#0E1630] p-4">
                <div className="text-sm text-slate-300 font-semibold">Analytics Report</div>
                <div className="text-xs text-slate-500 mb-4">Comprehensive analytics and insights report</div>
                <button className="px-3 py-2 rounded-md bg-white/5 border border-white/10 hover:bg-white/10">PDF Report</button>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#0E1630] p-4">
                <div className="text-sm text-slate-300 font-semibold">Participant Data</div>
                <div className="text-xs text-slate-500 mb-4">Export participant demographics and activity</div>
                <button className="px-3 py-2 rounded-md bg-white/5 border border-white/10 hover:bg-white/10">CSV</button>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#0E1630] p-4">
                <div className="text-sm text-slate-300 font-semibold">Custom Export</div>
                <div className="text-xs text-slate-500 mb-4">Configure custom data export parameters</div>
                <button className="px-3 py-2 rounded-md bg-white/5 border border-white/10 hover:bg-white/10">Configure Export</button>
              </div>
              <div className="lg:col-span-2 rounded-lg border border-white/10 bg-[#0E1630] p-4">
                <div className="text-sm text-slate-300 font-semibold mb-4">Export Settings</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <select className="px-3 py-2 rounded-md bg-[#0B1220] border border-white/10">
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                    <option>All time</option>
                  </select>
                  <select className="px-3 py-2 rounded-md bg-[#0B1220] border border-white/10">
                    <option>All surveys</option>
                    <option>Draft</option>
                    <option>Active</option>
                    <option>Archived</option>
                  </select>
                  <select className="px-3 py-2 rounded-md bg-[#0B1220] border border-white/10">
                    <option>CSV</option>
                    <option>Excel</option>
                    <option>JSON</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
