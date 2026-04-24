<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Question;

class QuestionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $questions = [
            ['question_number' => 1, 'question_text' => 'What is your email address?', 'type' => 'B'],
            ['question_number' => 2, 'question_text' => 'How old are you?', 'type' => 'C'],
            ['question_number' => 3, 'question_text' => 'What is your gender?', 'type' => 'A'],
            ['question_number' => 4, 'question_text' => 'Have you used VR before?', 'type' => 'A'],
            ['question_number' => 5, 'question_text' => 'What VR headset do you own?', 'type' => 'B'],
            ['question_number' => 6, 'question_text' => 'What is your primary use case for VR?', 'type' => 'A'],
            ['question_number' => 7, 'question_text' => 'How often do you use VR?', 'type' => 'A'],
            ['question_number' => 8, 'question_text' => 'What is your experience level with VR?', 'type' => 'A'],
            ['question_number' => 9, 'question_text' => 'What features are most important to you in VR?', 'type' => 'B'],
            ['question_number' => 10, 'question_text' => 'What type of VR content do you prefer?', 'type' => 'A'],
            ['question_number' => 11, 'question_text' => 'Rate the importance of visual quality (1-5)', 'type' => 'C'],
            ['question_number' => 12, 'question_text' => 'Rate the importance of audio quality (1-5)', 'type' => 'C'],
            ['question_number' => 13, 'question_text' => 'Rate the importance of comfort (1-5)', 'type' => 'C'],
            ['question_number' => 14, 'question_text' => 'Rate the importance of ease of use (1-5)', 'type' => 'C'],
            ['question_number' => 15, 'question_text' => 'Rate the importance of content variety (1-5)', 'type' => 'C'],
            ['question_number' => 16, 'question_text' => 'What is your budget for VR equipment?', 'type' => 'A'],
            ['question_number' => 17, 'question_text' => 'What concerns do you have about VR?', 'type' => 'B'],
            ['question_number' => 18, 'question_text' => 'How do you prefer to interact with VR content?', 'type' => 'A'],
            ['question_number' => 19, 'question_text' => 'What improvements would you like to see in VR technology?', 'type' => 'B'],
            ['question_number' => 20, 'question_text' => 'Would you recommend VR to others?', 'type' => 'A'],
        ];

        foreach ($questions as $question) {
            Question::create($question);
        }
    }
}
