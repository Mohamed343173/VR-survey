import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BuilderHeader from './BuilderHeader';

type QuestionType =
  | 'Multiple Choice'
  | 'Rating Scale'
  | 'VR Interaction Tracking'
  | 'Spatial Data Collection'
  | 'Text Response';

interface Question {
  id: string;
  type: QuestionType;
  title: string;
  options: string[]; // used for multiple choice
  required: boolean;
}

const QuestionBuilderPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const navigate = useNavigate();

  const addQuestion = () => {
    setQuestions(qs => [
      ...qs,
      {
        id: Math.random().toString(36).slice(2),
        type: 'Multiple Choice',
        title: '',
        options: ['Option 1', 'Option 2'],
        required: false,
      },
    ]);
  };

  const removeQuestion = (id: string) => setQuestions(qs => qs.filter(q => q.id !== id));

  const updateQuestion = (id: string, updater: Partial<Question>) =>
    setQuestions(qs => qs.map(q => (q.id === id ? { ...q, ...updater } : q)));

  const addOption = (id: string) =>
    setQuestions(qs => qs.map(q => (q.id === id ? { ...q, options: [...q.options, `Option ${q.options.length + 1}`] } : q)));

  const updateOption = (id: string, index: number, value: string) =>
    setQuestions(qs => qs.map(q => (q.id === id ? { ...q, options: q.options.map((o, i) => (i === index ? value : o)) } : q)));

  return (
    <div className="min-h-screen bg-[#0B1220] text-slate-200 px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create New VR Survey</h1>
        <BuilderHeader />

        <div className="mt-6 rounded-xl border border-white/10 bg-[#0E1630] p-6">
          <div className="text-slate-300 font-semibold mb-1">Question Builder</div>
          <div className="text-xs text-slate-500 mb-6">Create questions optimized for VR experiences</div>

          {questions.length === 0 && (
            <div className="border-2 border-dashed border-white/10 rounded-lg py-6 px-4 flex items-center justify-center text-blue-300/80">
              <button onClick={addQuestion} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600/20 border border-blue-400/30">
                <span className="text-xl">＋</span>
                <span className="font-medium">Add Question</span>
              </button>
            </div>
          )}

          {questions.map((q, idx) => (
            <div key={q.id} className="mt-4 rounded-lg bg-white/5 border border-white/10 p-4">
              <div className="flex items-center justify-between">
                <div className="text-slate-300 font-semibold">Question {idx + 1}</div>
                <button onClick={() => removeQuestion(q.id)} className="text-red-400 hover:text-red-300">🗑️</button>
              </div>

              <div className="mt-4 grid gap-4">
                <div>
                  <div className="text-sm text-slate-400 mb-2">Question Type</div>
                  <select
                    value={q.type}
                    onChange={e => updateQuestion(q.id, { type: e.target.value as QuestionType })}
                    className="px-3 py-2 rounded-md bg-[#0B1220] border border-white/10"
                  >
                    <option>Multiple Choice</option>
                    <option>Rating Scale</option>
                    <option>VR Interaction Tracking</option>
                    <option>Spatial Data Collection</option>
                    <option>Text Response</option>
                  </select>
                </div>

                <div>
                  <div className="text-sm text-slate-400 mb-2">Question Title</div>
                  <input
                    value={q.title}
                    onChange={e => updateQuestion(q.id, { title: e.target.value })}
                    placeholder="Enter your question"
                    className="w-full px-3 py-2 rounded-lg bg-[#0B1220] border border-white/10 placeholder:text-slate-500"
                  />
                </div>

                {q.type === 'Multiple Choice' && (
                  <div>
                    <div className="text-sm text-slate-400 mb-2">Answer Options</div>
                    <div className="space-y-2">
                      {q.options.map((opt, i) => (
                        <input key={i} value={opt} onChange={e => updateOption(q.id, i, e.target.value)} className="w-full px-3 py-2 rounded-lg bg-[#0B1220] border border-white/10" />
                      ))}
                    </div>
                    <button onClick={() => addOption(q.id)} className="mt-3 w-full text-left px-4 py-2 rounded-md bg-[#0B1220] border border-white/10 hover:bg-white/5">
                      <span className="mr-2">＋</span>Add Option
                    </button>
                  </div>
                )}

                {q.type === 'Text Response' && (
                  <div>
                    <div className="text-sm text-slate-400 mb-2">Preview</div>
                    <input disabled placeholder="Short response" className="w-full px-3 py-2 rounded-lg bg-[#0B1220] border border-white/10" />
                  </div>
                )}

                {q.type === 'Rating Scale' && (
                  <div className="text-sm text-slate-400">Participants will answer with a rating scale (e.g., 1–5).</div>
                )}

                {q.type === 'VR Interaction Tracking' && (
                  <div className="text-sm text-slate-400">Capture interaction metrics (e.g., hand/eye tracking). Configure details later.</div>
                )}

                {q.type === 'Spatial Data Collection' && (
                  <div className="text-sm text-slate-400">Collect spatial positioning/wayfinding data. Configure details later.</div>
                )}

                <label className="mt-1 inline-flex items-center gap-2 text-sm text-slate-300">
                  <input type="checkbox" checked={q.required} onChange={e => updateQuestion(q.id, { required: e.target.checked })} />
                  Required question
                </label>
              </div>
            </div>
          ))}

          {questions.length > 0 && (
            <div className="mt-4">
              <button onClick={addQuestion} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600/20 border border-blue-400/30">
                <span className="text-xl">＋</span>
                <span className="font-medium">Add Question</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="mt-6 rounded-xl border border-white/10 bg-[#0E1630] p-4 flex items-center justify-between">
          <button className="px-3 py-2 rounded-md bg-white/5 border border-white/10" onClick={()=>navigate('/admin/surveys/new/basics')}>← Previous</button>
          <div className="flex items-center gap-3">
            <button className="px-3 py-2 rounded-md bg-white/5 border border-white/10">💾 Save Draft</button>
            <button className="px-3 py-2 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600" onClick={()=>navigate('/admin/surveys/new/vr-settings')}>Next →</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionBuilderPage;
