<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Question;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    public function index()
    {
        $questions = Question::orderBy('question_number')->get();

        $formattedQuestions = $questions->map(function ($question) {
            return [
                'id' => $question->id,
                'question_number' => $question->question_number,
                'question_text' => $question->question_text,
                'type' => $question->type
            ];
        });

        return response()->json(['questions' => $formattedQuestions]);
    }
}
