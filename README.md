# StudioSpace

StudioSpace is a peer-to-peer creative workspace and production studio sharing platform. It helps creators discover studios and book suitable spaces, while studio hosts can publish and manage their listings and booking requests.

## Live Website

Add your deployed website URL here.

## Features

1. Explore creative studios such as photography studios, sound stages, podcast rooms, music suites, and art workshops.
2. Search and filter studios by keyword, category, and location.
3. View detailed studio information, pricing, capacity, amenities, and host details.
4. Register and log in using email and password.
5. Google authentication using Better Auth.
6. Add, edit, and delete personal studio listings.
7. Book available creative studios.
8. View personal booking history.
9. Hosts can view, confirm, and cancel booking requests.
10. Track pending, confirmed, completed, and cancelled bookings.
11. Prevent overlapping confirmed bookings.
12. View and update user profile information.
13. Responsive design for desktop, tablet, and mobile.
14. Light and dark theme support.

## Technology Stack

### Frontend
- Next.js
- React
- JavaScript (JSX)
- Tailwind CSS
- daisyUI
- Lucide React
- Sonner
- Better Auth Client

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- MongoDB Native Driver
- Better Auth
- CORS
- dotenv

## Project Structure

```text
StudioSpace/
├── client/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── lib/
│   ├── public/
│   ├── package.json
│   └── README.md
│
└── server/
    ├── index.js
    ├── package.json
    └── .env


    ## Installation and Setup

### Prerequisites

- Node.js
- npm
- MongoDB Atlas Account
- Google OAuth Credentials

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd StudioSpace


### 3. Frontend Environment Variables

Create a `.env` file inside the `client` folder.

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
BETTER_AUTH_SECRET=YOUR_BETTER_AUTH_SECRET
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=YOUR_MONGODB_ATLAS_CONNECTION_STRING
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET




### 4. Backend Environment Variables

Create a `.env` file inside the `server` folder.

```env
MONGODB_URI=YOUR_MONGODB_ATLAS_CONNECTION_STRING
PORT=5000
CLIENT_URL=http://localhost:3000
BETTER_AUTH_URL=http://localhost:3000





## Main Application Routes

| Route | Description |
|---|---|
| `/` | Home Page |
| `/studios` | Explore Studios |
| `/studios/[id]` | Studio Details |
| `/register` | Create Account |
| `/login` | User Login |
| `/dashboard` | User Dashboard |
| `/add-studio` | Add New Studio |
| `/my-listings` | Manage Studio Listings |
| `/my-bookings` | View My Bookings |
| `/host-bookings` | Manage Host Bookings |
| `/profile` | User Profile |



## Booking Status

- Pending: Booking request is waiting for host approval.
- Confirmed: Host has accepted the booking.
- Completed: Booking has been completed.
- Cancelled: Booking has been cancelled.

## Deployment

- Frontend: Vercel
- Backend: vercel
- Database: MongoDB Atlas




## Important Notes

- Replace the GitHub repository URL before submission.
- Add the live website URL after deployment.
- Add examiner test credentials if required.
- Keep all secret keys and database credentials private.
- Never upload `.env` files to GitHub.