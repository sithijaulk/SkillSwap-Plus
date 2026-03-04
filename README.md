# SkillSwap+ 🎓 - University Skill Sharing & Learning Platform

**A complete MERN application for peer learning, mentoring, and academic community engagement.**

**Status**: ✅ Production-Ready Architecture | Backend 100% | Frontend Foundation Complete

---

## 📋 What is SkillSwap+?

SkillSwap+ is a campus-based platform where university students can:
- **Learners**: Find verified mentors, book sessions, ask academic questions, track progress
- **Mentors**: Offer skills, set availability, conduct sessions, build reputation
- **Admins**: Verify mentors, moderate content, resolve disputes, manage system settings
- **Community**: Share knowledge through Q&A forums with moderation

---

## ✨ Key Features

| Feature | Module | Status |
|---------|--------|--------|
| **User Registration & Roles** | Module 1 | ✅ Complete |
| **Session Lifecycle Management** | Module 1 | ✅ Complete |
| **Availability Management** | Module 1 | ✅ Complete |
| **Payment Simulation** | Module 1 | ✅ Complete |
| **Progress Tracking** | Module 1 | ✅ Complete |
| **Ratings & Reviews** | Module 2 | ✅ Complete |
| **Reputation Scoring** | Module 2 | ✅ Complete |
| **Feedback Tags** | Module 2 | ✅ Complete |
| **Improvement Suggestions** | Module 2 | ✅ Complete |
| **Q&A Forum** | Module 3 | ✅ API Ready |
| **Content Voting & Moderation** | Module 3 | ✅ API Ready |
| **Mentor Verification** | Module 4 | ✅ Complete |
| **Dispute Resolution** | Module 4 | ✅ Complete |
| **Audit Logging** | Module 4 | ✅ Complete |
| **System Settings** | Module 4 | ✅ Complete |

---

## 🛠️ Tech Stack

**Frontend**:
- React 18.2 + React Router 6 (SPA with protected routes)
- Tailwind CSS 3 (responsive design)
- Axios (API client with JWT interceptor)
- Context API (authentication state)

**Backend**:
- Node.js + Express.js
- MongoDB + Mongoose (13 models, proper indexing)
- JWT (stateless authentication)
- Express-Validator (request validation)
- CORS (configured for localhost + production)

**Infrastructure**:
- Development: npm scripts with auto-reload
- Database: MongoDB Atlas (recommended) or local
- Seeding: Test data auto-generated

---

## 📂 Project Structure

```
SkillSwap-Plus/
├── client/                                      # React Frontend
│   ├── src/
│   │   ├── main.jsx (entry + providers)
│   │   ├── App.jsx (20+ routes)
│   │   ├── pages/
│   │   │   ├── Landing.jsx                    # ✅ Public landing
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx                  # ✅ JWT login
│   │   │   │   └── Register.jsx               # ✅ Role-based signup
│   │   │   ├── dashboard/
│   │   │   │   ├── LearnerDashboard.jsx       # ✅ Learner home
│   │   │   │   ├── MentorDashboard.jsx        # ✅ Mentor home
│   │   │   │   └── AdminDashboard.jsx         # ✅ Admin home
│   │   │   └── (More pages to build)
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx                 # ✅ Role-aware nav
│   │   │   │   └── Footer.jsx                 # 📋 To build
│   │   │   ├── common/
│   │   │   │   ├── Button.jsx                 # ✅ Reusable
│   │   │   │   ├── Modal.jsx                  # 📋 To build
│   │   │   │   └── Card.jsx                   # 📋 To build
│   │   │   └── forms/
│   │   │       └── Input.jsx                  # ✅ Reusable
│   │   ├── context/
│   │   │   └── AuthContext.jsx                # ✅ Auth state
│   │   ├── services/
│   │   │   └── api.js                         # ✅ API client
│   │   └── routes/
│   │       └── ProtectedRoute.jsx             # ✅ Role guards
│   ├── .env.example                           # ✅ Config template
│   └── package.json
│
├── server/                                      # Express Backend
│   ├── src/
│   │   ├── app.js (express app)
│   │   ├── server.js (entry point)
│   │   ├── config/
│   │   │   ├── db.js                          # ✅ MongoDB
│   │   │   └── index.js                       # ✅ Settings
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js             # ✅ JWT verify
│   │   │   ├── error.middleware.js            # ✅ Error handler
│   │   │   └── role.middleware.js             # ✅ Role check
│   │   ├── modules/
│   │   │   ├── user/
│   │   │   │   ├── user.model.js              # ✅ User schema
│   │   │   │   ├── session.model.js           # ✅ Enhanced
│   │   │   │   ├── availability.model.js      # ✅ Mentor slots
│   │   │   │   ├── progress.model.js          # ✅ Learning tracks
│   │   │   │   ├── user.routes.js             # ✅ Auth + profiles
│   │   │   │   ├── user.controller.js         # ✅ Handlers
│   │   │   │   └── user.service.js            # ✅ Business logic
│   │   │   ├── quality/
│   │   │   │   ├── rating.model.js            # ✅ 1 rating/session
│   │   │   │   ├── feedback.model.js          # ✅ Enhanced w/ tags
│   │   │   │   ├── improvement.model.js       # ✅ Suggestions
│   │   │   │   ├── quality.routes.js          # ✅ Endpoints
│   │   │   │   ├── quality.controller.js      # ✅ Handlers
│   │   │   │   └── quality.service.js         # ✅ Reputation logic
│   │   │   ├── community/
│   │   │   │   ├── question.model.js          # ✅ Forum posts
│   │   │   │   ├── answer.model.js            # ✅ Responses
│   │   │   │   ├── community.routes.js        # ✅ Q&A endpoints
│   │   │   │   ├── community.controller.js    # ✅ Handlers
│   │   │   │   └── community.service.js       # ✅ Logic
│   │   │   └── admin/
│   │   │       ├── report.model.js            # ✅ Moderation
│   │   │       ├── auditlog.model.js          # ✅ NEW Audit trail
│   │   │       ├── systemsettings.model.js    # ✅ NEW Config
│   │   │       ├── admin.routes.js            # ✅ Admin endpoints
│   │   │       ├── admin.controller.js        # ✅ Handlers
│   │   │       └── admin.service.js           # ✅ Logic
│   │   └── utils/
│   │       └── seed.js                        # ✅ Test data
│   ├── .env.example                           # ✅ Config template
│   └── package.json
│
├── 📚 DOCUMENTATION (This Project)
├── SETUP.md                                     # 📖 Setup guide
├── IMPLEMENTATION_GUIDE.md                      # 📖 Architecture
├── COMPLETION_SUMMARY.md                        # 📖 What was built
├── STATUS_DASHBOARD.md                          # 📖 Project status
├── API_REFERENCE.md                             # 📖 API examples
└── README.md                                    # 📖 This file
```

---

## 🚀 Quick Start (5 Minutes)

### 1. Prerequisites
- Node.js v14+ & npm v6+
- MongoDB (local or Atlas)

### 2. Setup

```bash
# Navigate to project
cd /path/to/SkillSwap-Plus

# Install dependencies
npm run install-all

# Configure environments
cp server/.env.example server/.env
cp client/.env.example client/.env

# Edit with your MongoDB URI
nano server/.env
```

### 3. Seed Database
```bash
cd server
npm run seed
```

Creates test users:
- **admin@skillswap.edu** / Admin@123
- **mentor@example.com** / Password123
- **learner@example.com** / Password123

### 4. Start Servers

**Terminal 1: Backend**
```bash
cd server
npm run dev
# Runs on http://localhost:5001
```

**Terminal 2: Frontend**
```bash
cd client
npm start
# Runs on http://localhost:3000
```

### 5. Access Application
Open: **http://localhost:3000**

---

## 📖 Documentation

| Document | What It Covers |
|----------|----------------|
| **SETUP.md** | Step-by-step setup, troubleshooting, testing |
| **IMPLEMENTATION_GUIDE.md** | Architecture, API endpoints, business rules |
| **COMPLETION_SUMMARY.md** | What was built, what remains |
| **STATUS_DASHBOARD.md** | Project completion percentage |
| **API_REFERENCE.md** | cURL examples for all endpoints |

---

## 🔑 Key Features Explained

### Module 1: User & Sessions
- **Registration**: Learners & Mentors with role selection
- **Mentors**: Set skills, hourly rate, availability slots
- **Sessions**: Lifecycle: pending → accepted → scheduled → completed
- **Payment**: Simulated payment for paid sessions
- **Progress**: Track skills learned per session

### Module 2: Quality & Reputation
- **Ratings**: 5-star rating + detailed feedback (post-session)
- **One Rating Per Session**: Enforced at database level
- **Feedback Tags**: Pre-defined categories ("clear-explanations", "patient", etc.)
- **Reputation Score**: Formula using rating avg + completion rate + response time
- **Improvement Suggestions**: Rule-based, explainable recommendations

### Module 3: Community Q&A
- **Ask Questions**: Verified users post academic questions
- **Answer & Vote**: Multiple answers with voting
- **Moderation**: Flag inappropriate content, auto-hide after 3 reports
- **Accept Answer**: Question author marks solution
- **Suggest Edits**: Approval workflow for improvements

### Module 4: Admin & Governance
- **Mentor Verification**: Queue-based verification workflow
- **Report Management**: Track, assign, resolve issues
- **Dispute Resolution**: Status trail (Open → Investigating → Resolved)
- **Audit Logging**: All admin actions tracked
- **System Settings**: Central configuration (cancellation windows, rate limits, etc.)

---

## 🔐 Security

- ✅ JWT authentication (7-day expiration)
- ✅ Password hashing (bcryptjs)
- ✅ Role-based access control (3 roles)
- ✅ Request validation (express-validator)
- ✅ CORS enabled (localhost:3000)
- ✅ Audit logging for admin actions

---

## 📊 Database Schema

**13 Collections**:
- User (profiles, skills, reputation)
- Session (lifecycle, payment)
- Availability (mentor slots)
- Progress (learning tracks)
- Rating (session feedback, 1 per session)
- Feedback (detailed feedback with tags)
- Improvement (suggestions)
- Question (forum posts)
- Answer (responses)
- Report (moderation)
- AuditLog (admin actions)
- SystemSettings (configuration)
- Reputation (calculated metrics)

---

## 🧪 Testing

### Test Scenario: Complete Session Flow

1. **Register**: Create learner & mentor accounts
2. **Browse**: Learner finds mentor
3. **Book**: Learner books session (skill_exchange or paid)
4. **Accept**: Mentor accepts session
5. **Complete**: Mentor marks session completed
6. **Rate**: Learner submits rating + feedback
7. **View**: Mentor sees reputation update

**All API endpoints ready to test!**  
See `API_REFERENCE.md` for cURL examples.

---

## 📱 Frontend Pages to Build

### Learner Pages
- [x] Landing page
- [x] Login / Register
- [x] Dashboard (stub)
- [ ] Find Mentors (search, filter)
- [ ] Book Session (calendar, slots)
- [ ] My Sessions (list, details)
- [ ] Session Feedback (rating, tags)
- [ ] Progress Tracker (milestones)

### Mentor Pages
- [x] Dashboard (stub)
- [ ] Availability Management
- [ ] Session Queue (accept/reject)
- [ ] Performance Metrics
- [ ] Improvement Toolkit

### Community Pages
- [ ] Question List (feed, search)
- [ ] Question Detail (answers, voting)
- [ ] Ask Question Form
- [ ] Content Moderation Queue

### Admin Pages
- [ ] User Management
- [ ] Mentor Verification Queue
- [ ] Report Moderation
- [ ] Dispute Manager
- [ ] Settings Panel
- [ ] Audit Log Viewer

---

## 🎯 API Status

**36+ endpoints ready:**
- ✅ Authentication (register, login, me)
- ✅ Users & Profiles
- ✅ Sessions & Payments
- ✅ Availability Management
- ✅ Ratings & Feedback
- ✅ Reputation Scoring
- ✅ Community Q&A (complete)
- ✅ Admin Operations
- ✅ Audit Logging

**All endpoints:**
- Return standardized JSON responses
- Include comprehensive validation
- Enforce role-based access
- Have working error handling

See `API_REFERENCE.md` for full endpoint list with examples.

---

## 🏃 Next Steps

1. **Feature Implementation** (5-7 days)
   - Create remaining frontend pages
   - Integrate API calls
   - Add form validation
   - Implement notifications

2. **Polish & Testing** (2-3 days)
   - Mobile responsiveness
   - Loading states
   - Error handling
   - Performance optimization

3. **Deployment** (1-2 days)
   - Frontend: Vercel
   - Backend: Railway/Heroku
   - Database: MongoDB Atlas
   - Domain & SSL

---

## 🤝 Contributing

This is an academic project. For modifications:
1. Create a feature branch
2. Implement following existing patterns
3. Test thoroughly
4. Submit for review

---

## 📞 Support

**Getting stuck?**
1. Check `SETUP.md` for common issues
2. Review `API_REFERENCE.md` for endpoint formats
3. Examine existing components for patterns
4. Check backend logs: `npm run dev` output

**Common issues:**
- Port already in use: Use different port or kill process
- MongoDB connection: Check .env and network access
- CORS errors: Verify CLIENT_URL in server/.env
- Frontend blank: Check browser console (F12)

---

## 📄 License

University Project - Educational Use Only

---

## ✅ Completion Status

```
Backend:  ███████████████████ 100% COMPLETE
Frontend: ██████░░░░░░░░░░░░░  30% (Foundation ready)
Overall:  ██████████░░░░░░░░░  60% (Ready for feature dev)
```

---

**Ready to build?** Start with `SETUP.md` and pick a page to implement! 🚀

For architecture details, see `IMPLEMENTATION_GUIDE.md`.  
For API examples, see `API_REFERENCE.md`.  
For current status, see `STATUS_DASHBOARD.md`.


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


### Running the project

- **Server** defaults to **port 5001** (5000 is often occupied on macOS). You can override via `PORT`.
- **Client** defaults to **port 3000** and points at the server using the `REACT_APP_PORT` or `REACT_APP_API_URL` environment variable. Example:
  ```bash
  # backend (in one terminal)
  cd server
  PORT=5001 npm run dev

  # frontend (in another terminal)
  cd client
  REACT_APP_PORT=5001 npm start
  ```

CORS is enabled on the backend to allow requests from the client origin. If you see CORS errors, verify the client URL and port match the server’s `CLIENT_URL` setting (defaults to `http://localhost:3000`).

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

Built with Group members for university students
