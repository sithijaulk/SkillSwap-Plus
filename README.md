# SkillSwap+ 🎓

A University Skill Sharing & Learning Platform built with the MERN stack.

## 🌟 Features

### Core Modules
1. **User & Sessions Management**
   - Student and Mentor registration with role-based access
   - Session scheduling and availability management
   - Mock payment integration
   - Progress tracking

2. **Quality & Improvement Platform**
   - Ratings and reviews system
   - Reputation calculation
   - Automated improvement recommendations
   - Mentor performance metrics

3. **Campus Learning Community**
   - Q&A forum for academic support
   - Upvoting/downvoting answers
   - Accepted answers system
   - Content moderation

4. **Admin & Governance**
   - User and mentor verification
   - Dispute resolution
   - Content moderation
   - System analytics and reporting

## 🛠️ Tech Stack

- **Frontend**: React.js + Tailwind CSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT
- **Authorization**: Role-based access control (RBAC)

## 📁 Project Structure

```
skillswap-plus/
├── client/          # React frontend
├── server/          # Express backend
├── docs/            # Documentation
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd skillswap-plus
```

2. Install all dependencies
```bash
npm run install-all
```

3. Set up environment variables
```bash
# Copy the example file
cp .env.example server/.env

# Edit server/.env with your configuration
```

4. Start MongoDB (if running locally)
```bash
mongod
```

5. Run the application
```bash
# Development mode (both frontend and backend)
npm run dev

# Or run separately:
npm run server    # Backend only (port 5000)
npm run client    # Frontend only (port 3000)
```

## 🔑 Default Admin Credentials

After seeding the database:
- **Email**: admin@skillswap.edu
- **Password**: Admin@123

## 📚 API Documentation

API documentation is available at `/docs` after starting the server.

### Main Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

#### Users & Sessions
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/sessions` - Get all sessions
- `POST /api/sessions` - Create session
- `GET /api/availability` - Get mentor availability

#### Quality & Ratings
- `POST /api/ratings` - Submit rating
- `GET /api/ratings/:sessionId` - Get session ratings
- `GET /api/reputation/:mentorId` - Get mentor reputation

#### Community Q&A
- `GET /api/questions` - Get all questions
- `POST /api/questions` - Ask a question
- `POST /api/answers` - Submit an answer
- `POST /api/votes` - Vote on answer

#### Admin
- `GET /api/admin/users` - Get all users (Admin only)
- `PUT /api/admin/verify/:userId` - Verify mentor (Admin only)
- `GET /api/admin/reports` - Get all reports (Admin only)

## 👥 User Roles

- **Learner**: Can browse mentors, book sessions, ask questions
- **Mentor**: Can offer skills, set availability, conduct sessions
- **Admin**: Full system access, user verification, content moderation

## 🧪 Testing

```bash
# Backend tests
cd server
npm test

# Frontend tests
cd client
npm test
```

## 📦 Build for Production

```bash
# Build frontend
cd client
npm run build

# The build folder will be in client/build
```

## 🤝 Contributing

This is a university project. Contributions follow academic collaboration guidelines.

## 📄 License

ISC

## 👨‍💻 Development Team

- Module 1: User & Sessions
- Module 2: Quality & Improvement
- Module 3: Community Q&A
- Module 4: Admin & Governance

---

Built with ❤️ for university students
