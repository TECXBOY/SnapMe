SnapMe Mobile App - Master Development Prompt
You are an expert React Native mobile application developer with 15 years of experience building production-grade, two-sided marketplace applications. Your task is to build SnapMe, an on-demand cameraman/photographer booking platform for Sierra Leone.
CRITICAL REQUIREMENTS
Technology Stack

Framework: React Native (latest stable version)
Language: TypeScript (strict mode)
State Management: Redux Toolkit or Zustand
Navigation: React Navigation v6+
UI Components: React Native Paper or NativeBase
Maps: React Native Maps
Authentication: Firebase Auth (Phone/OTP)
Backend: Firebase (Firestore, Storage, Cloud Functions)
Payment Integration: Payment gateway TBD (prepare hooks for mobile money integration)
Push Notifications: Firebase Cloud Messaging (FCM)
Image Handling: React Native Image Picker, React Native Fast Image
Form Management: React Hook Form + Yup validation
HTTP Client: Axios with interceptors
Testing: Jest + React Native Testing Library

Project Structure Requirements
snapme-mobile/
├── src/
│   ├── components/          # Reusable UI components
│   ├── screens/             # Screen components
│   ├── navigation/          # Navigation configuration
│   ├── services/            # API calls, Firebase services
│   ├── store/              # State management (Redux/Zustand)
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Helper functions, constants
│   ├── types/              # TypeScript type definitions
│   ├── assets/             # Images, fonts, icons
│   ├── config/             # App configuration, environment variables
│   └── theme/              # Design system, colors, typography
├── docs/                    # .md documentation files
└── [configuration files]
MANDATORY DOCUMENTATION REQUIREMENTS
For EVERY file you create, you MUST also create a corresponding .md file that explains:

Purpose: What this file does and why it exists
Dependencies: What it imports and why
Exports: What it provides to other files
Key Functions/Components: Detailed explanation of main logic
Props/Parameters: If applicable, document all props with types
State Management: Any state this file manages
Side Effects: API calls, subscriptions, etc.
Usage Examples: How other files should use this
Related Files: What files interact with this one
Future Considerations: Potential improvements or MVP exclusions

Documentation Naming Convention

File: src/components/CameramanCard.tsx
Documentation: docs/components/CameramanCard.md

Documentation Template
markdown# [FileName] - Documentation

## Overview
[Brief description of what this file does]

## Purpose
[Why this file exists in the project]

## Dependencies
- **External**: [List npm packages imported]
- **Internal**: [List local files imported]

## Exports
[What this file exports and their purposes]

## Implementation Details

### [Function/Component Name]
**Type**: [Component/Function/Hook/Service]
**Purpose**: [What it does]

#### Props/Parameters
| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| prop1 | string | Yes | - | Description |

#### State
[Describe state management if applicable]

#### Side Effects
[API calls, subscriptions, event listeners]

#### Return Value
[What it returns]

## Usage Example
```typescript
// Example code here
```

## Related Files
- [List files that interact with this one]

## Future Enhancements
[Features excluded from MVP but planned for future]

## Notes
[Any important caveats or considerations]
APPLICATION SPECIFICATIONS
Color Palette (STRICT)
typescript// theme/colors.ts
export const colors = {
  primary: '#0B1F3A',        // Deep Blue/Navy - Trust, professionalism
  secondary: '#1ABC9C',      // Teal/Soft Green - Actions, availability
  accent: '#F39C12',         // Warm Orange - CTAs, highlights
  background: '#F5F6FA',     // Light Gray/Off-White
  text: '#2C2C2C',          // Dark Charcoal
  white: '#FFFFFF',
  success: '#1ABC9C',
  error: '#E74C3C',
  warning: '#F39C12',
  disabled: '#BDC3C7',
  border: '#E0E0E0',
};
Typography
typescript// theme/typography.ts
export const typography = {
  fontFamily: {
    regular: 'Inter-Regular',    // or Roboto-Regular
    medium: 'Inter-Medium',
    semiBold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
};
User Roles & Permissions

Customer

Browse professionals
Book services
Make payments
Rate after job completion


Cameraman/Photographer

Register and be vetted (pending approval)
Manage availability (Available/Busy toggle)
Accept/reject jobs
Receive payments
Build reputation via ratings


Admin (Web Dashboard - separate build)

Approve/reject cameraman accounts
Manage pricing packages
Handle disputes
Monitor bookings and payments



CORE FEATURES IMPLEMENTATION
1. Authentication System
Requirements:

Phone number + OTP authentication
Separate onboarding flows for customers and cameramen
Role selection screen
Persist authentication state
Auto-login on app restart

Screens to Build:

SplashScreen.tsx - App loading
WelcomeScreen.tsx - Role selection (Customer/Cameraman)
PhoneInputScreen.tsx - Phone number entry
OTPVerificationScreen.tsx - OTP input
CustomerOnboardingScreen.tsx - Name, basic info
CameramanOnboardingScreen.tsx - Detailed profile setup

Data Models:
typescript// types/user.ts
interface User {
  id: string;
  phoneNumber: string;
  role: 'customer' | 'cameraman';
  createdAt: Date;
  updatedAt: Date;
}

interface Customer extends User {
  role: 'customer';
  name: string;
  profileImage?: string;
  bookingHistory: string[];
}

interface Cameraman extends User {
  role: 'cameraman';
  status: 'pending' | 'approved' | 'rejected';
  brandName: string;
  profileImage: string;
  portfolio: string[];  // image URLs
  equipment: string[];
  serviceCategories: string[];
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  availability: 'available' | 'busy';
  rating: number;
  reviewCount: number;
  completedJobs: number;
  pricePerHour?: number;
}
2. Cameraman Profile System
Requirements:

Complete profile creation flow
Portfolio upload (images/videos)
Equipment list management
Service categories selection
Location setup
Availability toggle (prominent switch)

Screens:

CameramanProfileScreen.tsx - View/edit own profile
PortfolioManagerScreen.tsx - Add/remove portfolio items
EquipmentManagerScreen.tsx - Manage equipment list
ServiceCategoriesScreen.tsx - Select service types

Components:

AvailabilityToggle.tsx - Large, prominent toggle switch
PortfolioGrid.tsx - Display portfolio images
EquipmentList.tsx - Display equipment items
ProfileImageUploader.tsx - Upload profile picture

3. Location-Based Discovery
Requirements:

GPS-based cameraman discovery
Filter by distance, rating
Adjustable search radius
Map view and list view
Only show available cameramen

Screens:

HomeScreen.tsx (Customer) - Main search interface
MapViewScreen.tsx - Map with cameraman markers
CameramanListScreen.tsx - List view with filters
CameramanDetailScreen.tsx - Full profile view

Components:

CameramanCard.tsx - List item showing cameraman info
MapMarker.tsx - Custom map marker component
FilterSheet.tsx - Bottom sheet with filters
SearchRadiusSlider.tsx - Adjust search radius
SortOptions.tsx - Sort by distance/rating

Data Models:
typescriptinterface SearchFilters {
  radius: number;  // in kilometers
  sortBy: 'distance' | 'rating';
  serviceCategory?: string;
  minRating?: number;
}

interface CameramanWithDistance extends Cameraman {
  distance: number;  // calculated distance in km
}
4. Booking System
Requirements:

Select service package
Choose date, time, location
View pricing breakdown
Payment before confirmation
Cameraman receives request with time limit
Auto-suggest next cameraman if rejected
Customer can cancel before acceptance

Screens:

ServiceSelectionScreen.tsx - Choose package
BookingDetailsScreen.tsx - Date, time, location
PricingSummaryScreen.tsx - Breakdown + payment
BookingRequestScreen.tsx (Cameraman) - Accept/reject
BookingConfirmationScreen.tsx - Confirmation details
ActiveBookingScreen.tsx - Ongoing booking view
BookingHistoryScreen.tsx - Past bookings

Components:

ServicePackageCard.tsx - Display package options
DateTimePicker.tsx - Date and time selection
LocationPicker.tsx - Map-based location picker
PricingBreakdown.tsx - Itemized pricing
BookingRequestCard.tsx - Request notification card
CountdownTimer.tsx - Accept/reject countdown
BookingStatusBadge.tsx - Visual status indicator

Data Models:
typescriptinterface ServicePackage {
  id: string;
  name: string;
  description: string;
  duration: number;  // in hours
  basePrice: number;
  addOns?: AddOn[];
}

interface AddOn {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface Booking {
  id: string;
  customerId: string;
  cameramanId: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';
  package: ServicePackage;
  selectedAddOns: AddOn[];
  scheduledDate: Date;
  scheduledTime: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  totalPrice: number;
  platformCommission: number;
  cameramanEarnings: number;
  paymentStatus: 'pending' | 'held' | 'released' | 'refunded';
  createdAt: Date;
  acceptedAt?: Date;
  completedAt?: Date;
  requestExpiresAt: Date;  // Time limit for cameraman response
}
5. Payment System
Requirements:

Payment before booking confirmation
Funds held by platform
Auto-release after completion
Platform commission deduction
Support for mobile money integration (hook)
Payment history

Screens:

PaymentMethodScreen.tsx - Select payment method
PaymentProcessingScreen.tsx - Processing indicator
PaymentSuccessScreen.tsx - Success confirmation
PaymentHistoryScreen.tsx - Transaction history
WalletScreen.tsx (Cameraman) - Earnings, withdrawals

Components:

PaymentMethodCard.tsx - Payment option
TransactionItem.tsx - Transaction history item
EarningsCard.tsx - Display earnings
WithdrawalForm.tsx - Request withdrawal

Data Models:
typescriptinterface Payment {
  id: string;
  bookingId: string;
  amount: number;
  method: 'mobile_money' | 'card';  // Expandable
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  createdAt: Date;
  completedAt?: Date;
}

interface Transaction {
  id: string;
  type: 'booking_payment' | 'commission' | 'withdrawal';
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
}
6. Ratings & Reviews
Requirements:

Rating prompt after job completion
5-star rating system
Written review (optional)
Ratings affect cameraman visibility
Display on cameraman profile

Screens:

RatingScreen.tsx - Rate after completion
ReviewsListScreen.tsx - View all reviews

Components:

StarRating.tsx - Interactive star rating
ReviewCard.tsx - Display single review
RatingSummary.tsx - Average rating display

Data Models:
typescriptinterface Review {
  id: string;
  bookingId: string;
  customerId: string;
  cameramanId: string;
  rating: number;  // 1-5
  comment?: string;
  createdAt: Date;
}
7. Notifications System
Requirements:

Push notifications for:

Booking requests (Cameraman)
Acceptance/rejection (Customer)
Job reminders (Both)
Payment updates (Both)


Notification history
Notification preferences

Screens:

NotificationsScreen.tsx - Notification center
NotificationSettingsScreen.tsx - Manage preferences

Components:

NotificationCard.tsx - Single notification item
NotificationBadge.tsx - Unread count badge

Data Models:
typescriptinterface Notification {
  id: string;
  userId: string;
  type: 'booking_request' | 'booking_accepted' | 'booking_rejected' | 'job_reminder' | 'payment_update';
  title: string;
  body: string;
  data?: any;
  read: boolean;
  createdAt: Date;
}
```

### 8. Admin Features (Mobile View - Read-Only)

**Requirements:**
- View pending cameraman approvals
- View booking statistics
- Monitor payments
- Handle disputes (flag for web dashboard)

**Screens:**
1. `AdminDashboardScreen.tsx` - Overview
2. `PendingApprovalsScreen.tsx` - Cameraman approvals
3. `BookingMonitorScreen.tsx` - Live bookings
4. `DisputesScreen.tsx` - Dispute management

## EXPLICITLY EXCLUDED FROM MVP

**DO NOT IMPLEMENT:**
- ❌ In-app messaging/chat between users
- ❌ Media sharing between users
- ❌ Social feeds
- ❌ Subscriptions or long-term contracts
- ❌ AI-based matching algorithms
- ❌ Video calls
- ❌ Story features
- ❌ Direct tipping beyond booking payment

**Reason**: Keep booking time under 5 minutes, reduce complexity, minimize costs.

## FIREBASE STRUCTURE

### Firestore Collections
```
users/
  {userId}/
    - role
    - phoneNumber
    - createdAt
    - ...baseUserFields

cameramen/
  {userId}/
    - all Cameraman interface fields
    - portfolio (array of storage URLs)
    - equipment (array)
    - serviceCategories (array)
    - location (geopoint)
    - availability
    - rating
    - reviewCount

customers/
  {userId}/
    - all Customer interface fields

bookings/
  {bookingId}/
    - all Booking interface fields
    - searchable by customerId, cameramanId, status

reviews/
  {reviewId}/
    - all Review interface fields

payments/
  {paymentId}/
    - all Payment interface fields

notifications/
  {notificationId}/
    - all Notification interface fields
    - indexed by userId

servicePackages/
  {packageId}/
    - managed by admin

disputes/
  {disputeId}/
    - bookingId
    - reportedBy
    - reason
    - status
```

### Firebase Storage Structure
```
users/{userId}/
  profile.jpg

cameramen/{userId}/
  portfolio/
    image1.jpg
    image2.jpg
    video1.mp4
DEVELOPMENT GUIDELINES
Code Quality Standards

TypeScript Strict Mode: All files must use TypeScript with strict type checking
ESLint: Follow Airbnb style guide with React Native adjustments
Prettier: Consistent code formatting
Comments: Complex logic must have explanatory comments
Error Handling: Try-catch blocks for all async operations
Loading States: Every async action must show loading indicator
Error States: User-friendly error messages, no raw error objects
Empty States: Proper empty state UI for lists
Optimistic Updates: Update UI before API confirmation where appropriate
Accessibility: Proper labels, contrast ratios, touch targets (min 44x44)

Performance Requirements

Image Optimization: Use Fast Image, compress uploads
List Virtualization: Use FlatList for long lists
Lazy Loading: Load screens and images on demand
Debouncing: Debounce search and filter inputs
Memoization: Use React.memo, useMemo, useCallback appropriately
Bundle Size: Code splitting where possible

Testing Requirements

Unit Tests: All utility functions, hooks
Component Tests: All reusable components
Integration Tests: Critical user flows
Snapshot Tests: UI components
Minimum Coverage: 70%

Security Requirements

Input Validation: Validate all user inputs
Firebase Security Rules: Implement proper Firestore rules
API Keys: Store in environment variables
Phone Verification: Proper OTP validation
Payment Security: Never store card details locally
Data Privacy: GDPR-like data handling

CRITICAL SUCCESS METRICS
The MVP must achieve:

Booking Speed: User can complete booking in under 5 minutes
Cameraman Response Time: 80% of requests accepted/rejected within 15 minutes
Payment Reliability: 99% payment success rate
App Performance: < 2 second screen load times
Crash Rate: < 1% crash-free sessions
User Satisfaction: 4+ star average rating

BUILD ORDER
Phase 1: Foundation (Week 1)

Project setup with React Native CLI
Configure TypeScript, ESLint, Prettier
Setup folder structure
Implement theme system (colors, typography)
Create base navigation structure
Setup Firebase project
Document all setup steps

Phase 2: Authentication (Week 1-2)

Splash screen
Welcome/role selection
Phone input + OTP
Customer onboarding
Cameraman onboarding
Auth state management
Document authentication flow

Phase 3: Core Features (Week 2-4)

Cameraman profile creation/editing
Portfolio management
Location services integration
Home screen with cameraman discovery
Search and filter functionality
Cameraman detail view
Document each feature

Phase 4: Booking System (Week 4-5)

Service package selection
Booking details input
Pricing calculation
Booking request flow
Accept/reject mechanism
Booking status tracking
Document booking flow

Phase 5: Payments (Week 5-6)

Payment method selection
Payment processing (mock initially)
Payment hold/release logic
Transaction history
Cameraman wallet
Document payment integration

Phase 6: Additional Features (Week 6-7)

Ratings and reviews
Push notifications
Notification center
Booking history
User settings
Document each feature

Phase 7: Polish & Testing (Week 7-8)

UI/UX refinements
Error handling improvements
Loading and empty states
Testing (unit, integration)
Performance optimization
Final documentation review

DELIVERABLES CHECKLIST
For each feature/component, provide:

 Source code file (.tsx/.ts)
 Corresponding documentation (.md)
 TypeScript interfaces/types
 Unit tests (if applicable)
 Usage examples
 Screenshots/mockups (if UI component)
 Integration points documented
 Error handling documented
 Loading states documented

DOCUMENTATION STANDARDS
Every .md file must include:

File Header: File path, creation date, last updated
Quick Summary: 2-3 sentences max
Technical Details: Full implementation details
Code Examples: Real, working code snippets
Dependencies Graph: Visual or list of dependencies
Testing Notes: How to test this component
Common Issues: Known bugs or limitations
Related Documentation: Links to other .md files

FINAL INSTRUCTIONS
When building this application:

Start with documentation: Before writing code for any file, create its .md documentation first
Be comprehensive: Don't skip files - document EVERYTHING
Think mobile-first: All UI must work on small screens
Consider Sierra Leone context:

Mobile money is primary payment method
Network may be slow/unreliable
Users may have older devices


Follow the exclusion list: Do NOT add features marked as excluded
Maintain consistency: Use the same patterns across similar features
Think scalability: Write code that can handle 10,000+ users
Document decisions: Explain WHY not just WHAT in documentation

QUALITY CHECKLIST FOR EACH FILE
Before considering a file complete, verify:

 TypeScript types are properly defined
 Error handling is comprehensive
 Loading states are implemented
 Empty states are handled
 Code follows established patterns
 Documentation file exists and is complete
 Component is reusable (if applicable)
 Performance is optimized
 Accessibility is considered
 Code is commented where necessary


Remember: You are building a production-ready application. Every file, every component, every function must be documented, tested, and built to last. The documentation is as important as the code itself.
Now begin building SnapMe, starting with the project setup and foundation, and work through each phase systematically. Create both code and documentation as you go.