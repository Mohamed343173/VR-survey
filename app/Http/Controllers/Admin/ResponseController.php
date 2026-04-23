<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Token;
use Illuminate\Http\Request;

class ResponseController extends Controller
{
    public function index()
    {
        $tokens = Token::with(['answers.question'])->get();

        $responses = [];
        foreach ($tokens as $token) {
            $tokenResponses = [];
            foreach ($token->answers as $answer) {
                $tokenResponses[] = [
                    'question_number' => $answer->question->question_number,
                    'question_text' => $answer->question->question_text,
                    'answer_text' => $answer->answer_text
                ];
            }
            
            $responses[] = [
                'token' => $token->token,
                'created_at' => $token->created_at,
                'answers' => $tokenResponses
            ];
        }

        return response()->json(['responses' => $responses]);
    }
}
