<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\Answer;
use App\Models\Token;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class SurveyController extends Controller
{
    public function show()
    {
        $questions = Question::orderBy('question_number')->get();
        return response()->json(['questions' => $questions]);
    }

    public function store(Request $request)
    {
        $questions = Question::all();
        
        $rules = [];
        foreach ($questions as $question) {
            $rules["answers.{$question->id}"] = 'required';
            
            if ($question->question_number == 1) {
                $rules["answers.{$question->id}"] .= '|email';
            }
        }

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Generate unique token
        $token = Token::create([
            'token' => Str::uuid()->toString()
        ]);

        // Save answers
        foreach ($request->answers as $questionId => $answerText) {
            Answer::create([
                'question_id' => $questionId,
                'answer_text' => $answerText,
                'token_id' => $token->id
            ]);
        }

        return response()->json([
            'message' => 'Survey completed successfully',
            'token' => $token->token,
            'response_url' => "/responses/{$token->token}"
        ]);
    }
}
