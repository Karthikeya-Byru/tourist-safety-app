# Tourist Safety Flutter App

A cross-platform mobile application for tourist safety, featuring real-time incident reporting, emergency SOS, and safety zone monitoring.

## Features

### 🔐 Authentication
- User registration and login
- Secure token-based authentication
- Profile management

### 🚨 Emergency SOS
- One-tap emergency alert system
- Countdown timer with cancellation option
- Quick access to emergency contacts
- Animated emergency button with visual feedback

### 📱 Incident Reporting
- Report safety incidents in real-time
- Categorize incidents by type and severity
- View nearby incidents and safety alerts
- Location-based incident mapping

### 🎨 iOS-Style Design
- Glassmorphism UI effects
- Vibrant gradient backgrounds
- Smooth animations and transitions
- Native iOS-style components

## Backend Integration

The app connects to the same backend as the web application:
- **Base URL**: `http://localhost:5000/api`
- **Authentication**: JWT token-based
- **Real-time sync**: Incidents and user data

## Getting Started

### Prerequisites
- Flutter SDK (3.35.2 or later)
- Dart SDK (3.9.0 or later)
- Android Studio / VS Code
- Backend server running on localhost:5000

### Installation

1. **Install dependencies**
   ```bash
   cd tourist_safety_app
   flutter pub get
   ```

2. **Run the app**
   ```bash
   # Debug mode
   flutter run
   
   # Release mode
   flutter run --release
   ```

### Supported Platforms
- ✅ Android
- ✅ iOS
- ✅ Web (with responsive design)
- ✅ Windows/macOS/Linux

## Connect with Backend

Make sure the backend server is running:
```bash
cd ../Smart_Tourist_Safety_System-main
npm start
```

The app will automatically connect to `http://localhost:5000/api` for all API calls.
