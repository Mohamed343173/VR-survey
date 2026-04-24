<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Answer;
use App\Models\Question;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        try {
            // Get aggregated data for Q6, Q7, Q10 (pie charts)
            $q6Data = $this->getPieChartData(6);
            $q7Data = $this->getPieChartData(7);
            $q10Data = $this->getPieChartData(10);

            // Get Q11-Q15 scores for radar chart
            $radarData = $this->getRadarChartData();

            return response()->json([
                'pie_charts' => [
                    'q6' => $q6Data,
                    'q7' => $q7Data,
                    'q10' => $q10Data
                ],
                'radar_chart' => $radarData
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to load dashboard data',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    private function getPieChartData($questionNumber)
    {
        $question = Question::where('question_number', $questionNumber)->first();
        if (!$question) return [];

        $answers = Answer::where('question_id', $question->id)->get();
        $data = [];

        foreach ($answers as $answer) {
            $value = $answer->answer_text;
            if (!isset($data[$value])) {
                $data[$value] = 0;
            }
            $data[$value]++;
        }

        $result = [];
        foreach ($data as $label => $count) {
            $result[] = [
                'label' => $label,
                'count' => $count
            ];
        }

        return $result;
    }

    private function getRadarChartData()
    {
        $questions = Question::whereIn('question_number', [11, 12, 13, 14, 15])->get();
        $data = [];

        foreach ($questions as $question) {
            $answers = Answer::where('question_id', $question->id)->get();
            $total = 0;
            $count = 0;

            foreach ($answers as $answer) {
                $value = (int) $answer->answer_text;
                if ($value >= 1 && $value <= 5) {
                    $total += $value;
                    $count++;
                }
            }

            $average = $count > 0 ? round($total / $count, 2) : 0;
            
            $data[] = [
                'question' => "Q{$question->question_number}",
                'average_score' => $average
            ];
        }

        return $data;
    }
}
