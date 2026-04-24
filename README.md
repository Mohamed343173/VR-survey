# VR Survey System

A comprehensive full-stack application for conducting VR experience surveys with user authentication, survey management, and analytics dashboard.

## Features

### 🔐 Authentication System
- **User Registration**: Create new user accounts with email validation
- **User Login**: Secure authentication for regular users
- **Admin Login**: Separate admin authentication with role-based access
- **Token-based Authentication**: Using Laravel Sanctum for API security

### 📊 Survey System
- **20 Pre-configured Questions**: Covering various aspects of VR experience
- **Multiple Question Types**:
  - Type A: Multiple choice questions
  - Type B: Text input questions
  - Type C: Rating questions (1-5 scale)
- **Dynamic Form Generation**: Based on question types
- **Response Validation**: Server-side validation for all answers
- **Unique Token Generation**: Each survey response gets a unique identifier

### 📈 Admin Dashboard
- **Analytics Charts**: Pie charts for categorical data (Q6, Q7, Q10)
- **Radar Chart**: For rating questions (Q11-Q15)
- **Question Management**: View all survey questions
- **Response Management**: View all survey responses
- **Real-time Data**: Live updates from survey submissions

### 🎨 Modern UI/UX
- **Responsive Design**: Works on desktop, tablet, and mobile
- **VR-themed Design**: Modern gradient backgrounds and animations
- **Interactive Components**: Hover effects and smooth transitions
- **Chart.js Integration**: Beautiful data visualization

## Technology Stack

### Backend (Laravel 12)
- **Framework**: Laravel 12 with PHP 8.2+
- **Database**: SQLite (can be configured for MySQL/PostgreSQL)
- **Authentication**: Laravel Sanctum
- **API**: RESTful API endpoints
- **Validation**: Server-side validation with custom rules

### Frontend (React 18)
- **Framework**: React 18 with functional components
- **Routing**: React Router DOM
- **HTTP Client**: Axios for API communication
- **Charts**: Chart.js with react-chartjs-2
- **Styling**: Custom CSS with modern design patterns

## Installation & Setup

### Prerequisites
- PHP 8.2 or higher
- Composer
- Node.js 16 or higher
- npm or yarn

### Backend Setup
1. Navigate to the project root:
   ```bash
   cd survey
   ```

2. Navigate to the backend directory:
   ```bash
   cd backend
   ```

3. Install PHP dependencies:
   ```bash
   composer install
   ```

4. Copy environment file:
   ```bash
   cp .env.example .env
   ```

5. Generate application key:
   ```bash
   php artisan key:generate
   ```

6. Run database migrations:
   ```bash
   php artisan migrate
   ```

7. Seed the database with questions and admin user:
   ```bash
   php artisan db:seed
   ```

8. Start the Laravel development server:
   ```bash
   php artisan serve
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ..
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
- `GET /api/register` - Show registration form
- `POST /api/register` - Register new user
- `GET /api/login` - Show login form
- `POST /api/login` - User login
- `GET /api/admin/login` - Show admin login form
- `POST /api/admin/login` - Admin login

### Survey
- `GET /api/survey` - Get all survey questions
- `POST /api/survey` - Submit survey responses
- `GET /api/responses/{token}` - View survey responses by token

### Admin (Protected)
- `GET /api/admin` - Dashboard analytics data
- `GET /api/admin/questionnaire` - Get all questions
- `GET /api/admin/responses` - Get all survey responses

## Database Schema

### Users Table
- `id` - Primary key
- `name` - User's full name
- `email` - Unique email address
- `password` - Hashed password
- `role` - User role (user/admin)
- `remember_token` - For "remember me" functionality
- `created_at`, `updated_at` - Timestamps

### Questions Table
- `id` - Primary key
- `question_number` - Question order (1-20)
- `question_text` - The actual question
- `type` - Question type (A/B/C)
- `created_at`, `updated_at` - Timestamps

### Answers Table
- `id` - Primary key
- `question_id` - Foreign key to questions
- `answer_text` - User's answer
- `token_id` - Foreign key to tokens
- `created_at`, `updated_at` - Timestamps

### Tokens Table
- `id` - Primary key
- `token` - Unique token string (UUID)
- `created_at`, `updated_at` - Timestamps

## Default Admin Credentials

After running the seeders, you can log in as admin with:
- **Email**: admin@vrsurvey.com
- **Password**: set in your seeder/environment (change it before production use)

## Survey Questions

The system comes with 20 pre-configured questions covering:

1. **Demographics**: Age, gender, email
2. **VR Experience**: Previous usage, headset ownership
3. **Usage Patterns**: Frequency, primary use cases
4. **Preferences**: Content types, interaction methods
5. **Feature Ratings**: Visual quality, audio, comfort, ease of use, content variety
6. **Budget & Concerns**: Spending preferences, VR concerns
7. **Recommendations**: Likelihood to recommend VR

## Usage Flow

### For Users
1. Register a new account or log in
2. Access the survey form
3. Answer all 20 questions
4. Submit the survey
5. Receive a unique token to view responses

### For Admins
1. Log in with admin credentials
2. Access the dashboard to view analytics
3. View all questions in the questionnaire section
4. Review all responses in the responses section

## Security Features

- **Password Hashing**: All passwords are securely hashed
- **Token Authentication**: API endpoints protected with Sanctum tokens
- **Role-based Access**: Admin routes protected with middleware
- **Input Validation**: Server-side validation for all inputs
- **CORS Configuration**: Proper CORS setup for frontend-backend communication

## Customization

### Adding New Questions
1. Update the `QuestionsSeeder.php` file
2. Run `php artisan db:seed --class=QuestionsSeeder`

### Modifying Question Types
1. Update the question type in the database
2. Modify the frontend rendering logic in `Survey.js`

### Styling Changes
- Modify CSS files in the respective component directories
- Global styles can be updated in `App.css`

## Deployment

### Backend Deployment
1. Set up a web server (Apache/Nginx)
2. Configure environment variables
3. Run `composer install --optimize-autoloader --no-dev`
4. Set proper file permissions
5. Configure database connection

### Frontend Deployment
1. Build the production version: `npm run build`
2. Deploy the `build` folder to your web server
3. Configure API base URL for production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support or questions, please open an issue in the repository or contact the development team.
