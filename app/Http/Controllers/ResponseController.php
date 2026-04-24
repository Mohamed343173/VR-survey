<?php

namespace App\Http\Controllers;

use App\Models\Token;
use Illuminate\Http\Request;

class ResponseController extends Controller
{
    public function show($token)
    {
        $tokenRecord = Token::where('token', $token)->first();

        if (!$tokenRecord) {
            return response()->json(['message' => 'Token not found'], 404);
        }

        $answers = $tokenRecord->answers()->with('question')->get();

        $responses = [];
        foreach ($answers as $answer) {
            $responses[] = [
                'question_number' => $answer->question->question_number,
                'question_text' => $answer->question->question_text,
                'answer_text' => $answer->answer_text,
                'question_type' => $answer->question->type
            ];
        }

        return response()->json([
            'token' => $token,
            'responses' => $responses
        ]);
    }
}
