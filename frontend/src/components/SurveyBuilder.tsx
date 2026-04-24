import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SurveyBasics from './builder/SurveyBasics';
import QuestionBuilderPage from './builder/QuestionBuilderPage';
import VRSettingsPage from './builder/VRSettingsPage';
import TargetingPage from './builder/TargetingPage';
import PublishPage from './builder/PublishPage';

const SurveyBuilder: React.FC = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="basics" replace />} />
      <Route path="basics" element={<SurveyBasics />} />
      <Route path="question-builder" element={<QuestionBuilderPage />} />
      <Route path="vr-settings" element={<VRSettingsPage />} />
      <Route path="targeting" element={<TargetingPage />} />
      <Route path="publish" element={<PublishPage />} />
      <Route path="*" element={<Navigate to="basics" replace />} />
    </Routes>
  );
};

export default SurveyBuilder;
