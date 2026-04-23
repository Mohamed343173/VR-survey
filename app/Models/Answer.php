<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    use HasFactory;

    protected $fillable = [
        'question_id',
        'answer_text',
        'token_id',
    ];

    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    public function token()
    {
        return $this->belongsTo(Token::class);
    }
}
