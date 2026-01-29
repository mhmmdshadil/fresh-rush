# Fresh Rush Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                          │
│                    (React + Material Design 3)                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │   Sidebar    │  │  Dashboard   │  │ Buyers Panel │        │
│  │              │  │              │  │              │        │
│  │ • Dashboard  │  │ • Stats      │  │ • Matched    │        │
│  │ • Deliveries │  │ • Produce    │  │   Buyers     │        │
│  │ • Analytics  │  │   List       │  │ • Accept     │        │
│  │ • Farm Map   │  │ • Add Modal  │  │   Offers     │        │
│  │ • Settings   │  │ • Countdown  │  │              │        │
│  │ • Logout     │  │              │  │              │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      REACT COMPONENTS                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌────────────────┐ │
│  │  AuthModal      │  │ AddProduceModal │  │  ProductCard   │ │
│  │  • Sign Up      │  │  • Form         │  │  • Countdown   │ │
│  │  • Sign In      │  │  • Validation   │  │  • Status      │ │
│  │  • Google Auth  │  │  • Submit       │  │  • Actions     │ │
│  └─────────────────┘  └─────────────────┘  └────────────────┘ │
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌────────────────┐ │
│  │   BuyerCard     │  │   StatCard      │  │  Notifications │ │
│  │  • Info         │  │  • Value        │  │  • Toast       │ │
│  │  • Accept Btn   │  │  • Icon         │  │  • Auto-dismiss│ │
│  └─────────────────┘  └─────────────────┘  └────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     SERVICE LAYER                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────┐  ┌──────────────────────┐           │
│  │   authService.js     │  │  produceService.js   │           │
│  │                      │  │                      │           │
│  │ • signUp()           │  │ • addProduce()       │           │
│  │ • signIn()           │  │ • updateProduce()    │           │
│  │ • signInWithGoogle() │  │ • deleteProduce()    │           │
│  │ • logOut()           │  │ • getUserProduce()   │           │
│  │ • onAuthChange()     │  │ • cancelProduce()    │           │
│  │ • getUserData()      │  │ • subscribeToUserProduce() │     │
│  └──────────────────────┘  └──────────────────────┘           │
│                                                                 │
│  ┌──────────────────────┐  ┌──────────────────────┐           │
│  │  buyerService.js     │  │   seedData.js        │           │
│  │                      │  │                      │           │
│  │ • getAllBuyers()     │  │ • seedBuyers()       │           │
│  │ • getMatchedBuyers() │  │ • SAMPLE_BUYERS      │           │
│  │ • createOffer()      │  │                      │           │
│  │ • acceptOffer()      │  │                      │           │
│  │ • subscribeToOffers()│  │                      │           │
│  └──────────────────────┘  └──────────────────────┘           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FIREBASE BACKEND                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Firebase Authentication                      │  │
│  │  • Email/Password Provider                               │  │
│  │  • Google OAuth Provider                                 │  │
│  │  • User Session Management                               │  │
│  │  • Token Refresh                                         │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Cloud Firestore Database                     │  │
│  │                                                           │  │
│  │  Collections:                                            │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐        │  │
│  │  │   users    │  │  produce   │  │   buyers   │        │  │
│  │  │            │  │            │  │            │        │  │
│  │  │ • uid      │  │ • name     │  │ • name     │        │  │
│  │  │ • email    │  │ • quantity │  │ • distance │        │  │
│  │  │ • name     │  │ • expiry   │  │ • price    │        │  │
│  │  │ • role     │  │ • status   │  │ • rating   │        │  │
│  │  │ • created  │  │ • userId   │  │ • slots    │        │  │
│  │  └────────────┘  └────────────┘  └────────────┘        │  │
│  │                                                           │  │
│  │  ┌────────────┐                                          │  │
│  │  │   offers   │                                          │  │
│  │  │            │                                          │  │
│  │  │ • produceId│                                          │  │
│  │  │ • buyerId  │                                          │  │
│  │  │ • status   │                                          │  │
│  │  │ • created  │                                          │  │
│  │  └────────────┘                                          │  │
│  │                                                           │  │
│  │  Features:                                               │  │
│  │  ✓ Real-time Sync                                       │  │
│  │  ✓ Offline Support                                      │  │
│  │  ✓ Security Rules                                       │  │
│  │  ✓ Automatic Indexing                                   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. User Authentication Flow
```
User → AuthModal → authService → Firebase Auth → User Session
                                        ↓
                                   Firestore
                                   (users collection)
```

### 2. Add Produce Flow
```
User → AddProduceModal → produceService.addProduce()
                              ↓
                         Firestore (produce collection)
                              ↓
                    Real-time Listener Updates
                              ↓
                         Dashboard UI
```

### 3. Real-time Updates Flow
```
Firestore Change → onSnapshot Listener → produceService
                                              ↓
                                         React State
                                              ↓
                                         UI Re-render
```

### 4. Buyer Matching Flow
```
User Login → buyerService.seedBuyers() → Check if buyers exist
                                              ↓
                                         Add sample buyers
                                              ↓
                                    getAllBuyers() → Firestore
                                              ↓
                                         Display in UI
```

## State Management

```
App.jsx (Main State Container)
├── user (Firebase Auth User)
├── products (Array from Firestore)
├── buyers (Array from Firestore)
├── selectedProduct (Current selection)
├── notifications (Toast messages)
├── isModalOpen (Modal visibility)
├── isAuthModalOpen (Auth modal visibility)
└── loading (Loading state)
```

## Material Design 3 Implementation

```
Design System (index.css)
├── Color Tokens
│   ├── Primary (Emerald Green)
│   ├── Secondary (Blue)
│   ├── Accent (Purple)
│   ├── Surface Variants
│   └── Status Colors
│
├── Elevation System
│   ├── Level 1 (Subtle)
│   ├── Level 2 (Default)
│   ├── Level 3 (Hover)
│   ├── Level 4 (Active)
│   └── Level 5 (Modal)
│
├── Typography
│   ├── Display (Outfit)
│   ├── Body (Plus Jakarta Sans)
│   └── Monospace (JetBrains Mono)
│
├── State Layers
│   ├── Hover (8% opacity)
│   ├── Focus (12% opacity)
│   └── Pressed (12% opacity)
│
└── Animations
    ├── Framer Motion (Page transitions)
    ├── CSS Transitions (Hover effects)
    └── Keyframe Animations (Pulse, Shake)
```

## Security Architecture

```
Frontend
    ↓
Firebase Auth (Token-based)
    ↓
Firestore Security Rules
    ↓
User-specific Queries
    ↓
Data Access Control
```

### Security Rules (Recommended)
```javascript
// Users can only access their own produce
match /produce/{produceId} {
  allow read: if request.auth != null;
  allow create: if request.auth != null;
  allow update, delete: if request.auth.uid == resource.data.userId;
}

// Anyone authenticated can read buyers
match /buyers/{buyerId} {
  allow read: if request.auth != null;
}
```

## Performance Optimizations

1. **Real-time Listeners**: Only subscribe when user is authenticated
2. **Memoization**: useMemo for sorted products
3. **Lazy Loading**: Components load on demand
4. **Auto-seeding**: Only runs once on first load
5. **Optimistic Updates**: UI updates before server confirmation

## Deployment Architecture

```
Development
    ↓
npm run build
    ↓
Production Build (dist/)
    ↓
Deploy to:
├── Vercel (Recommended)
├── Netlify
└── Firebase Hosting
    ↓
CDN Distribution
    ↓
End Users
```

---

**This architecture provides:**
- ✅ Scalability (Firebase auto-scales)
- ✅ Real-time sync (Firestore listeners)
- ✅ Security (Firebase Auth + Rules)
- ✅ Performance (Optimized queries)
- ✅ Maintainability (Clean separation of concerns)
