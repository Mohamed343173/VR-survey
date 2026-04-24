import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

interface Survey {
  id: number;
  title: string;
  description: string;
  duration: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'new';
  rating: number;
  participants: number;
  category: string;
  points: number;
  icon: string;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  awardedDate?: string;
}

const UserDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    // Mock data – replace with API calls if desired
    setSurveys([
      { id:1, title:'Social VR Gaming Interaction Survey', description:'Explore how users interact in virtual gaming environments', duration:'15 min', difficulty:'medium', rating:4.5, participants:28, category:'Gaming', points:20, icon:'🎮' },
      { id:2, title:'VR Wayfinding Task Completion Analysis', description:'Study navigation patterns in virtual environments', duration:'20 min', difficulty:'new', rating:4.7, participants:32, category:'Spatial Navigation', points:20, icon:'🗺️' },
      { id:3, title:'Virtual Store Navigation & Layout Feedback', description:'Evaluate shopping experience in VR stores', duration:'20 min', difficulty:'new', rating:4.1, participants:37, category:'Shopping', points:20, icon:'🛍️' },
      { id:4, title:'Medical Procedure VR Training Usability', description:'Assess training effectiveness for medical procedures', duration:'60 min', difficulty:'hard', rating:4.8, participants:8, category:'Healthcare', points:50, icon:'🏥' },
      { id:5, title:'Virtual Classroom Engagement Study', description:'Measure student engagement in VR learning environments', duration:'30 min', difficulty:'medium', rating:4.4, participants:22, category:'Education', points:50, icon:'🎓' },
      { id:6, title:'Evaluation of Immersive Gameplay in VR', description:'Analyze gaming immersion and user experience', duration:'35 min', difficulty:'medium', rating:4.7, participants:51, category:'Gaming', points:50, icon:'🎮' },
      { id:7, title:'VR Office Safety Protocol Simulation', description:'Test safety training effectiveness in virtual offices', duration:'30 min', difficulty:'medium', rating:4.7, participants:25, category:'Workplace', points:50, icon:'💼' },
      { id:8, title:'Remote Collaboration VR Experience Feedback', description:'Gather insights on virtual team collaboration', duration:'18 min', difficulty:'new', rating:4.9, participants:18, category:'Workplace', points:20, icon:'🤝' },
      { id:9, title:'VR Science Experiment Safety and Learning', description:'Evaluate educational safety protocols in VR labs', duration:'28 min', difficulty:'medium', rating:3.9, participants:18, category:'Education', points:50, icon:'🧪' },
    ]);

    setAchievements([
      { id:1, title:'Elite Researcher', description:"Top tier! Reaching Level 5 means you're among the most dedicated and impactful researchers on the platform.", icon:'🛡️', earned:true, awardedDate:'05/12/2023' },
      { id:2, title:'VR Veteran', description:'A seasoned explorer! Reaching Level 3 shows your consistent commitment to advancing VR research.', icon:'🏅', earned:true, awardedDate:'05/12/2023' },
      { id:3, title:'Rising Star', description:"You\'ve climbed to Level 2! Your dedication is truly paying off. What new insights will you unlock next?", icon:'⭐', earned:true, awardedDate:'05/12/2023' },
      { id:4, title:'Point Legend', description:'Legendary status achieved! 1000 points earned means you\'re a top contributor.', icon:'🌟', earned:false },
      { id:5, title:'Point Master', description:"You're accumulating points like a pro! 500 points earned is a significant milestone.", icon:'🚀', earned:false },
      { id:6, title:'Point Collector', description:"Nice job! You've earned 100 points.", icon:'💎', earned:false },
      { id:7, title:'Feedback Pro', description:'Your detailed insights are invaluable! Completing surveys with thorough feedback makes a real difference.', icon:'💡', earned:false },
      { id:8, title:'Survey Champion', description:'Unstoppable! With 25 completed surveys, you are an essential part of the VR research community.', icon:'☀️', earned:false },
    ]);

    setLoading(false);
  }, []);

  const filtered = surveys
    .filter(s => (category==='All' || s.category===category))
    .filter(s => s.title.toLowerCase().includes(q.toLowerCase()));

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B1220] text-slate-200 flex items-center justify-center">Loading…</div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1220] text-slate-200">
      <div className="sticky top-0 z-10 bg-[#0E1630] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-slate-400">Welcome back, <span className="text-slate-200 font-semibold">{user?.name || 'User'}</span></div>
          <button onClick={logout} className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10">Logout</button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-12 gap-6">
        {/* Welcome + KPIs */}
        <div className="col-span-12 rounded-xl bg-white/5 border border-white/10 p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                {(user?.name||'U').split(' ').map(n=>n[0]).join('')}
              </div>
              <div>
                <div className="text-slate-200 font-semibold">Welcome back, {user?.name || 'User'}</div>
                <div className="text-xs text-slate-400">Level 5 – 75% to next level</div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="rounded-lg bg-[#0B1220] border border-white/10 px-4 py-2 text-center">
                <div className="text-xs text-slate-400">Surveys Completed</div>
                <div className="text-xl font-bold">24</div>
              </div>
              <div className="rounded-lg bg-[#0B1220] border border-white/10 px-4 py-2 text-center">
                <div className="text-xs text-slate-400">Points</div>
                <div className="text-xl font-bold">2,840</div>
              </div>
            </div>
          </div>
        </div>

        {/* My Progress */}
        <div className="col-span-12 rounded-xl bg-white/5 border border-white/10 p-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-4">
            <span>🟦</span>
            <span>My Progress</span>
          </div>

          {/* Card 1 */}
          <div className="rounded-lg bg-[#152033] border border-white/10 p-5 mb-4">
            <div className="flex items-center justify-between">
              <div className="text-slate-200 font-semibold">Workplace VR Collaboration</div>
              <div className="text-xs text-slate-400 flex items-center gap-1">🕒 <span>12 minutes left</span></div>
            </div>
            <div className="text-xs text-slate-400 mt-3 mb-1">Progress</div>
            <div className="relative h-2 w-full bg-white/10 rounded-full">
              <div className="absolute left-0 top-0 h-2 bg-blue-500 rounded-full" style={{width:'65%'}} />
              <div className="absolute right-0 -top-5 text-xs text-slate-300">65%</div>
            </div>
            <button className="mt-3 w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white">
              <span>▶️</span>
              <span>Continue Survey</span>
            </button>
          </div>

          {/* Card 2 */}
          <div className="rounded-lg bg-[#152033] border border-white/10 p-5">
            <div className="flex items-center justify-between">
              <div className="text-slate-200 font-semibold">Virtual Event Engagement</div>
              <div className="text-xs text-slate-400 flex items-center gap-1">🕒 <span>25 minutes left</span></div>
            </div>
            <div className="text-xs text-slate-400 mt-3 mb-1">Progress</div>
            <div className="relative h-2 w-full bg-white/10 rounded-full">
              <div className="absolute left-0 top-0 h-2 bg-blue-500 rounded-full" style={{width:'30%'}} />
              <div className="absolute right-0 -top-5 text-xs text-slate-300">30%</div>
            </div>
            <button className="mt-3 w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white">
              <span>▶️</span>
              <span>Continue Survey</span>
            </button>
          </div>
        </div>

        {/* Available Surveys */}
        <div className="col-span-12 rounded-xl bg-white/5 border border-white/10 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold text-slate-300">Available Surveys</div>
            <div className="flex items-center gap-2">
              <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search surveys…" className="px-3 py-2 rounded-lg bg-[#0B1220] border border-white/10 placeholder:text-slate-500" />
              <select value={category} onChange={e=>setCategory(e.target.value)} className="px-3 py-2 rounded-lg bg-[#0B1220] border border-white/10">
                <option>All</option>
                <option>Gaming</option>
                <option>Education</option>
                <option>Healthcare</option>
                <option>Shopping</option>
                <option>Workplace</option>
                <option>Spatial Navigation</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(survey => (
              <div key={survey.id} className="rounded-xl bg-white/5 border border-white/10 p-4">
                <div className="flex items-start justify-between">
                  <div className="text-3xl">{survey.icon}</div>
                  <span className="px-2 py-1 rounded-md text-xs bg-[#0B1220] border border-white/10">{survey.difficulty}</span>
                </div>
                <div className="mt-2 text-slate-200 font-semibold">{survey.title}</div>
                <div className="text-slate-400 text-sm mt-1 line-clamp-3">{survey.description}</div>
                <div className="flex items-center justify-between text-xs text-slate-500 mt-3">
                  <span>{survey.duration}</span>
                  <span>⭐ {survey.rating}</span>
                  <span>{survey.participants} participants</span>
                </div>
                <div className="flex items-center justify-between mt-3 text-xs">
                  <span className="text-slate-400">{survey.category}</span>
                  <span className="text-yellow-400">⭐ {survey.points}</span>
                </div>
                <button className="mt-3 w-full px-3 py-2 rounded-md bg-[#0B1220] border border-white/10">▶️ Start Survey</button>
              </div>
            ))}
          </div>
        </div>

        {/* Recently Completed */}
        <div className="col-span-12 rounded-xl bg-white/5 border border-white/10 p-5">
          <div className="text-sm font-semibold text-slate-300 mb-4">Recently Completed</div>
          <div className="space-y-3">
            {[
              { title:'VR Gaming Experience Study', date:'16/01/2024', pts:'1,176', rating:'4/5', feedback:'"Excellent survey design and clear instructions"' },
              { title:'Virtual Meeting Effectiveness', date:'12/01/2024', pts:'1,120', rating:'4/5' },
              { title:'VR Art Gallery Experience', date:'10/01/2024', pts:'1,140', rating:'4/5', feedback:'"Very immersive and well-structured!"' },
            ].map((r, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-[#0B1220] border border-white/10">
                <div>
                  <div className="text-slate-200 font-medium">{r.title}</div>
                  <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                    <span>{r.date}</span>
                    <span>⭐ {r.pts} points</span>
                    <span>⭐ {r.rating} rating</span>
                  </div>
                  {r.feedback && <div className="text-xs text-slate-400 mt-1">{r.feedback}</div>}
                </div>
                <button className="px-3 py-2 rounded-md bg-white/5 border border-white/10 text-sm">Feedback</button>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="col-span-12 rounded-xl bg-white/5 border border-white/10 p-5">
          <div className="text-sm font-semibold text-slate-300 mb-4">Achievements</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map(a => (
              <div key={a.id} className={`rounded-xl p-5 border ${a.earned ? 'border-blue-400/30 bg-blue-500/10' : 'border-white/10 bg-white/5'}`}>
                <div className="flex items-start justify-between">
                  <div className="text-3xl">{a.icon}</div>
                  {a.earned && <span className="text-yellow-400 text-sm">🏆</span>}
                </div>
                <div className={`mt-2 font-semibold ${a.earned ? 'text-blue-200' : 'text-slate-400'}`}>{a.title}</div>
                <div className={`text-sm mt-1 ${a.earned ? 'text-blue-300' : 'text-slate-500'}`}>{a.description}</div>
                {a.earned && a.awardedDate && (
                  <div className="text-xs text-blue-400 mt-2">Awarded: {a.awardedDate}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
