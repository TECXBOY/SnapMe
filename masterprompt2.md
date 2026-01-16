SnapMe Mobile App - Master Development Prompt v2.0 (Orange Money SL Integration)
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
Payment Integration: Orange Money Sierra Leone API
Push Notifications: Firebase Cloud Messaging (FCM)
Image Handling: React Native Image Picker, React Native Fast Image
Form Management: React Hook Form + Yup validation
HTTP Client: Axios with interceptors
Testing: Jest + React Native Testing Library
Environment Management: react-native-config

Project Structure Requirements
snapme-mobile/
├── src/
│   ├── components/          # Reusable UI components
│   ├── screens/             # Screen components
│   ├── navigation/          # Navigation configuration
│   ├── services/            # API calls, Firebase services
│   │   ├── firebase/        # Firebase services
│   │   ├── orangeMoney/     # Orange Money API integration
│   │   └── api/             # General API utilities
│   ├── store/              # State management (Redux/Zustand)
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Helper functions, constants
│   ├── types/              # TypeScript type definitions
│   ├── assets/             # Images, fonts, icons
│   ├── config/             # App configuration, environment variables
│   └── theme/              # Design system, colors, typography
├── docs/                    # .md documentation files
│   ├── setup/              # Setup and configuration docs
│   ├── components/         # Component documentation
│   ├── screens/            # Screen documentation
│   ├── services/           # Service documentation
│   ├── integrations/       # Third-party integration guides
│   │   └── orange-money/   # Orange Money specific docs
│   ├── flows/              # User flow documentation
│   └── architecture/       # Architecture decisions
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
  orangeMoney: '#FF6600',    // Orange Money brand color (for payment UI)
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
Make payments via Orange Money
Rate after job completion


Cameraman/Photographer

Register and be vetted (pending approval)
Manage availability (Available/Busy toggle)
Accept/reject jobs
Receive payments to Orange Money wallet
Build reputation via ratings


Admin (Web Dashboard - separate build)

Approve/reject cameraman accounts
Manage pricing packages
Handle disputes
Monitor bookings and payments
Process cameraman withdrawals



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
PhoneInputScreen.tsx - Phone number entry (+232 Sierra Leone format)
OTPVerificationScreen.tsx - OTP input
CustomerOnboardingScreen.tsx - Name, basic info
CameramanOnboardingScreen.tsx - Detailed profile setup

Data Models:
typescript// types/user.ts
interface User {
  id: string;
  phoneNumber: string;  // Format: +232XXXXXXXXX
  role: 'customer' | 'cameraman';
  createdAt: Date;
  updatedAt: Date;
}

interface Customer extends User {
  role: 'customer';
  name: string;
  profileImage?: string;
  bookingHistory: string[];
  orangeMoneyNumber?: string;  // For refunds
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
  orangeMoneyNumber: string;  // REQUIRED - For receiving payments
  walletBalance: number;  // Pending earnings
  totalEarnings: number;
  withdrawalHistory: string[];
}
2. Cameraman Profile System
Requirements:

Complete profile creation flow
Portfolio upload (images/videos)
Equipment list management
Service categories selection
Location setup
Availability toggle (prominent switch)
Orange Money number registration (MANDATORY)

Screens:

CameramanProfileScreen.tsx - View/edit own profile
PortfolioManagerScreen.tsx - Add/remove portfolio items
EquipmentManagerScreen.tsx - Manage equipment list
ServiceCategoriesScreen.tsx - Select service types
OrangeMoneySetupScreen.tsx - Register Orange Money number

Components:

AvailabilityToggle.tsx - Large, prominent toggle switch
PortfolioGrid.tsx - Display portfolio images
EquipmentList.tsx - Display equipment items
ProfileImageUploader.tsx - Upload profile picture
OrangeMoneyInput.tsx - Validated Orange Money number input

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
Payment via Orange Money before confirmation
Cameraman receives request with time limit
Auto-suggest next cameraman if rejected
Customer can cancel before acceptance (with refund)

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
  basePrice: number;  // in SLL (Sierra Leonean Leones)
  addOns?: AddOn[];
}

interface AddOn {
  id: string;
  name: string;
  price: number;  // in SLL
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
  totalPrice: number;  // in SLL
  platformCommission: number;  // in SLL (e.g., 15% of total)
  cameramanEarnings: number;  // in SLL
  paymentStatus: 'pending' | 'paid' | 'held' | 'released' | 'refunded';
  paymentId?: string;  // Orange Money transaction ID
  createdAt: Date;
  acceptedAt?: Date;
  completedAt?: Date;
  cancelledAt?: Date;
  requestExpiresAt: Date;  // Time limit for cameraman response (e.g., 15 mins)
}
5. Orange Money Payment System
CRITICAL: This is the ONLY payment method for MVP
Orange Money API Integration Requirements
Before Implementation:

API Documentation Request: Contact Orange Money Sierra Leone to obtain:

API documentation
Merchant account credentials
Sandbox/test environment access
Production environment details
Webhook endpoints
API rate limits and restrictions


Required API Endpoints (Typical mobile money APIs):

Initiate Payment: Start a payment request
Payment Status: Check transaction status
Refund Transaction: Process refunds
Webhook Endpoint: Receive payment confirmations
Balance Inquiry (if available): Check merchant balance


Merchant Account Setup:

Register as Orange Money merchant
Obtain API credentials (API Key, Secret Key, Merchant ID)
Setup webhook URL for payment notifications
Configure sandbox for testing



Payment Flow Architecture
typescript// types/payment.ts

interface OrangeMoneyCredentials {
  apiKey: string;
  secretKey: string;
  merchantId: string;
  baseUrl: string;  // Different for sandbox vs production
}

interface OrangeMoneyPaymentRequest {
  amount: number;  // in SLL
  currency: 'SLL';
  customerPhoneNumber: string;  // +232XXXXXXXXX
  orderId: string;  // Our booking ID
  description: string;
  callbackUrl?: string;  // Webhook for payment confirmation
  returnUrl?: string;  // Deep link back to app
}

interface OrangeMoneyPaymentResponse {
  transactionId: string;
  status: 'pending' | 'success' | 'failed';
  amount: number;
  currency: 'SLL';
  customerPhoneNumber: string;
  timestamp: Date;
  message?: string;
  paymentUrl?: string;  // If user needs to authorize on Orange Money
}

interface OrangeMoneyRefundRequest {
  transactionId: string;
  amount: number;
  reason: string;
}

interface Payment {
  id: string;
  bookingId: string;
  customerId: string;
  cameramanId: string;
  amount: number;  // Total amount in SLL
  platformFee: number;  // Platform commission in SLL
  cameramanAmount: number;  // Amount to be paid to cameraman in SLL
  currency: 'SLL';
  method: 'orange_money';
  status: 'initiated' | 'pending' | 'completed' | 'failed' | 'refunded';
  
  // Orange Money specific fields
  orangeMoneyTransactionId?: string;
  customerPhoneNumber: string;
  cameramanPhoneNumber: string;
  
  // Timestamps
  createdAt: Date;
  completedAt?: Date;
  refundedAt?: Date;
  
  // Metadata
  metadata?: {
    customerName: string;
    cameramanName: string;
    bookingDescription: string;
  };
}

interface Transaction {
  id: string;
  userId: string;
  type: 'booking_payment' | 'commission_deduction' | 'payout' | 'refund' | 'withdrawal';
  amount: number;  // in SLL
  status: 'pending' | 'completed' | 'failed';
  paymentId?: string;
  bookingId?: string;
  orangeMoneyTransactionId?: string;
  createdAt: Date;
  completedAt?: Date;
  description: string;
}

interface CameramanPayout {
  id: string;
  cameramanId: string;
  amount: number;  // in SLL
  orangeMoneyNumber: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  requestedAt: Date;
  processedAt?: Date;
  completedAt?: Date;
  orangeMoneyTransactionId?: string;
  failureReason?: string;
}
Payment Service Implementation Structure
File: src/services/orangeMoney/OrangeMoneyService.ts
This service must handle:

Payment Initialization: Start payment process
Payment Verification: Check if payment was successful
Webhook Handling: Process Orange Money callbacks
Refunds: Process refund requests
Error Handling: Comprehensive error management
Retry Logic: Handle network failures
Logging: Audit trail for all transactions

Key Methods:
typescriptclass OrangeMoneyService {
  // Initialize payment
  async initiatePayment(request: OrangeMoneyPaymentRequest): Promise<OrangeMoneyPaymentResponse>
  
  // Check payment status
  async checkPaymentStatus(transactionId: string): Promise<OrangeMoneyPaymentResponse>
  
  // Process refund
  async processRefund(request: OrangeMoneyRefundRequest): Promise<OrangeMoneyPaymentResponse>
  
  // Verify webhook signature (security)
  verifyWebhookSignature(payload: any, signature: string): boolean
  
  // Process webhook notification
  async handleWebhook(payload: any): Promise<void>
  
  // Send payout to cameraman
  async processPayout(cameramanId: string, amount: number): Promise<CameramanPayout>
}
```

#### Payment Screens

**1. `PaymentMethodScreen.tsx`**
- Display Orange Money as the only option
- Show Orange Money logo and branding
- Display amount to be paid
- Phone number input (pre-filled from user profile)
- Continue to payment button

**2. `OrangeMoneyPaymentScreen.tsx`**
- Show payment amount and breakdown
- Orange Money branded UI
- Instructions for user:
  - "You will receive a prompt on your phone"
  - "Enter your Orange Money PIN to confirm"
  - "Payment will be processed automatically"
- Loading indicator during payment processing
- Auto-refresh payment status every 5 seconds

**3. `PaymentProcessingScreen.tsx`**
- Full-screen loading indicator
- Payment status updates
- Timeout handling (e.g., 3 minutes max)
- Cancel option (with confirmation)

**4. `PaymentSuccessScreen.tsx`**
- Success animation
- Payment confirmation details:
  - Transaction ID
  - Amount paid
  - Booking details
  - Receipt download option
- Continue to booking confirmation

**5. `PaymentFailedScreen.tsx`**
- Error message
- Reason for failure (if available)
- Retry button
- Contact support option
- Return to booking

**6. `PaymentHistoryScreen.tsx`**
- List of all transactions
- Filter by type (payments, refunds)
- Transaction details on tap
- Download receipt option

**7. `WalletScreen.tsx` (Cameraman)**
- Current balance (pending earnings)
- Total earnings
- Breakdown:
  - Completed jobs awaiting payout
  - Upcoming scheduled payouts
- Withdrawal button
- Transaction history
- Orange Money number display/edit

**8. `WithdrawalScreen.tsx` (Cameraman)**
- Available balance
- Minimum withdrawal amount (e.g., 100,000 SLL)
- Orange Money number confirmation
- Withdrawal amount input
- Processing fee information (if any)
- Confirm withdrawal button
- Expected processing time

#### Payment Components

**1. `OrangeMoneyButton.tsx`**
- Branded Orange Money payment button
- Orange Money logo + "Pay with Orange Money"
- Amount display
- Loading state
- Disabled state

**2. `PaymentStatusIndicator.tsx`**
- Visual indicator for payment status
- Icons and colors for each status
- Status text

**3. `TransactionCard.tsx`**
- Display single transaction
- Transaction type icon
- Amount (colored based on type)
- Date and time
- Status badge
- Transaction ID
- Tap to view details

**4. `PaymentBreakdown.tsx`**
- Itemized list of charges:
  - Service fee
  - Add-ons
  - Platform fee (shown to cameraman)
  - Total
- Clear, readable format

**5. `ReceiptCard.tsx`**
- Formatted receipt display
- All transaction details
- QR code with transaction ID
- Download/share buttons

**6. `OrangeMoneyNumberInput.tsx`**
- Validated input for Orange Money numbers
- Format: +232 XX XXX XXXX
- Auto-formatting as user types
- Validation indicators
- Error messages

#### Payment Flow: Customer Books Cameraman
```
1. Customer selects cameraman and package
2. Customer fills booking details (date, time, location)
3. App calculates total price (package + add-ons)
4. Customer proceeds to payment
5. PaymentMethodScreen shows Orange Money option
6. Customer confirms Orange Money number
7. App calls OrangeMoneyService.initiatePayment()
8. Orange Money sends USSD/SMS prompt to customer's phone
9. Customer enters PIN on their phone
10. App polls payment status every 5 seconds
11. Orange Money webhook confirms payment (or failure)
12. App updates payment status in Firestore
13. If successful:
    - Funds marked as "held" by platform
    - Booking status changes to "pending"
    - Notification sent to cameraman
14. If failed:
    - Show error message
    - Offer retry option
```

#### Payment Flow: Cameraman Gets Paid
```
1. Customer marks job as complete
2. App prompts customer to rate cameraman
3. Customer submits rating
4. Booking status changes to "completed"
5. Payment status changes to "released"
6. Cameraman's wallet balance increases
7. Notification sent to cameraman
8. Cameraman can request withdrawal when balance > minimum
9. Admin processes withdrawal (manual or automated)
10. App calls OrangeMoneyService.processPayout()
11. Orange Money transfers funds to cameraman's number
12. Payout status updated
13. Notification sent to cameraman
```

#### Payment Flow: Refund
```
1. Customer cancels booking before acceptance
   OR Admin approves dispute
2. App calls OrangeMoneyService.processRefund()
3. Orange Money processes refund
4. Funds returned to customer's Orange Money account
5. Payment status changed to "refunded"
6. Transaction record created
7. Notification sent to customer
Firebase Cloud Functions for Payments
Required Cloud Functions:
1. onPaymentWebhook (HTTP Trigger)

Receives Orange Money webhook notifications
Verifies webhook signature
Updates payment status in Firestore
Triggers booking status updates
Sends notifications

2. processScheduledPayouts (Scheduled Trigger - Daily)

Finds completed bookings with released payments
Groups payouts by cameraman
Processes batch payouts via Orange Money API
Updates wallet balances
Sends confirmation notifications

3. handlePaymentTimeout (Scheduled Trigger - Every 5 minutes)

Finds payments stuck in "pending" for > 3 minutes
Checks final status with Orange Money API
Updates status accordingly
Notifies customer if failed

4. calculatePlatformFees (Callable Function)

Calculates platform commission (e.g., 15%)
Returns breakdown for display

5. requestRefund (Callable Function)

Validates refund eligibility
Initiates refund process
Updates records

Orange Money Integration Checklist
Before Development:

 Contact Orange Money SL for API access
 Obtain merchant account
 Get API credentials (sandbox + production)
 Review API documentation
 Understand webhook mechanism
 Clarify refund policy
 Understand payout process
 Get rate limits and restrictions

During Development:

 Setup environment variables for API keys
 Implement OrangeMoneyService
 Create payment screens
 Implement payment components
 Setup Firebase Cloud Functions
 Configure webhook endpoint
 Implement error handling
 Add retry logic
 Create transaction logging
 Build admin payout dashboard

Testing:

 Test payment initiation
 Test successful payment flow
 Test failed payment flow
 Test payment timeout
 Test refund process
 Test payout process
 Test webhook handling
 Test concurrent payments
 Test network failures
 Load testing

Security:

 Secure API credentials
 Implement webhook signature verification
 Add request rate limiting
 Implement payment amount validation
 Add duplicate transaction detection
 Encrypt sensitive data
 Implement audit logging
 Add fraud detection (basic)

Production:

 Switch to production API credentials
 Configure production webhook URL
 Setup monitoring and alerts
 Create runbook for payment issues
 Train support team
 Setup customer support escalation

Environment Configuration
File: .env.example
bash# Orange Money Configuration
ORANGE_MONEY_API_KEY=your_api_key_here
ORANGE_MONEY_SECRET_KEY=your_secret_key_here
ORANGE_MONEY_MERCHANT_ID=your_merchant_id_here
ORANGE_MONEY_BASE_URL=https://api.orange.com/orange-money-sl/v1
ORANGE_MONEY_SANDBOX_URL=https://sandbox.orange.com/orange-money-sl/v1

# Payment Configuration
PLATFORM_COMMISSION_PERCENTAGE=15
MINIMUM_WITHDRAWAL_AMOUNT=100000
PAYMENT_TIMEOUT_SECONDS=180
PAYOUT_PROCESSING_TIME=business_days_1_3

# Firebase
FIREBASE_API_KEY=your_firebase_key
FIREBASE_PROJECT_ID=your_project_id
# ... other Firebase configs
Documentation Requirements for Orange Money
Create these documentation files:

docs/integrations/orange-money/API-Integration-Guide.md

Complete API integration walkthrough
Authentication process
All endpoint descriptions
Request/response examples
Error codes and handling


docs/integrations/orange-money/Payment-Flow-Diagram.md

Visual flowcharts for all payment scenarios
Customer payment flow
Cameraman payout flow
Refund flow
Error handling flows


docs/integrations/orange-money/Testing-Guide.md

How to test payments in sandbox
Test phone numbers (if provided by Orange Money)
Test scenarios and expected results
How to simulate failures


docs/integrations/orange-money/Troubleshooting-Guide.md

Common payment issues
How to handle stuck payments
Customer support scripts
Escalation procedures


docs/integrations/orange-money/Security-Guide.md

Security best practices
Webhook verification
API key management
Fraud prevention



6. Ratings & Reviews
Requirements:

Rating prompt after job completion
5-star rating system
Written review (optional)
Ratings affect cameraman visibility
Display on cameraman profile
Cannot rate until payment is released

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
  customerName: string;
  cameramanId: string;
  rating: number;  // 1-5
  comment?: string;
  createdAt: Date;
  helpful?: number;  // Number of users who found this helpful
}
7. Notifications System
Requirements:

Push notifications for:

Booking requests (Cameraman)
Acceptance/rejection (Customer)
Payment confirmations (Both)
Payment received (Cameraman)
Withdrawal processed (Cameraman)
Job reminders (Both)
Rating reminders (Customer)


Notification history
Notification preferences
Deep linking to relevant screens

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
  type: 
    | 'booking_request' 
    | 'booking_accepted' 
    | 'booking_rejected' 
    | 'booking_cancelled'
    | 'job_reminder' 
    | 'payment_received'
    | 'payment_confirmed'
    | 'payout_processed'
    | 'withdrawal_completed'
    | 'rating_reminder';
  title: string;
  body: string;
  data?: {
    bookingId?: string;
    paymentId?: string;
    payoutId?: string;
    screen?: string;  // Deep link target
  };
  read: boolean;
  createdAt: Date;
}
8. Admin Features (Mobile View - Read-Only)
Requirements:

View pending cameraman approvals
View booking statistics
Monitor payments
Process cameraman withdrawals
Handle disputes (flag for web dashboard)

Screens:

AdminDashboardScreen.tsx - Overview
PendingApprovalsScreen.tsx - Cameraman approvals
BookingMonitorScreen.tsx - Live bookings
PayoutManagementScreen.tsx - Process withdrawals
DisputesScreen.tsx - Dispute management

Components:

StatCard.tsx - Dashboard statistics
ApprovalCard.tsx - Cameraman approval item
PayoutRequestCard.tsx - Payout request item

EXPLICITLY EXCLUDED FROM MVP
DO NOT IMPLEMENT:

❌ In-app messaging/chat between users
❌ Media sharing between users
❌ Social feeds
❌ Subscriptions or long-term contracts
❌ AI-based matching algorithms
❌ Video calls
❌ Story features
❌ Direct tipping beyond booking payment
❌ Multiple payment methods (Orange Money ONLY)
❌ Cryptocurrency payments
❌ Credit card payments (for MVP)

Reason: Keep booking time under 5 minutes, reduce complexity, minimize costs, focus on local payment method.
FIREBASE STRUCTURE
Firestore Collections
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
    - orangeMoneyNumber (REQUIRED)
    - walletBalance
    - totalEarnings

customers/
  {userId}/
    - all Customer interface fields
    - orangeMoneyNumber (optional, for refunds)

bookings/
  {bookingId}/
    - allContinue12:57Booking interface fields
- searchable by customerId, cameramanId, status
payments/
{paymentId}/
- all Payment interface fields
- indexed by bookingId, customerId, cameramanId, status
- orangeMoneyTransactionId
payouts/
{payoutId}/
- CameramanPayout interface fields
- indexed by cameramanId, status
transactions/
{transactionId}/
- all Transaction interface fields
- indexed by userId, type, status
reviews/
{reviewId}/
- all Review interface fields
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
- resolution
systemConfig/
settings/
- platformCommissionPercentage
- minimumWithdrawalAmount
- paymentTimeout
- orangeMoneyConfig

### Firebase Storage Structure
users/{userId}/
profile.jpg
cameramen/{userId}/
portfolio/
image1.jpg
image2.jpg
video1.mp4
receipts/{paymentId}/
receipt.pdf

### Firebase Security Rules (Critical)
```javascript
// Firestore Security Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    function isAdmin() {
      return isAuthenticated() && 
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated();
      allow update: if isOwner(userId);
    }
    
    // Payments - sensitive data
    match /payments/{paymentId} {
      allow read: if isAuthenticated() && (
        resource.data.customerId == request.auth.uid ||
        resource.data.cameramanId == request.auth.uid ||
        isAdmin()
      );
      allow create: if isAuthenticated();
      allow update: if isAdmin();  // Only admin or cloud functions can update
    }
    
    // Payouts
    match /payouts/{payoutId} {
      allow read: if isAuthenticated() && (
        resource.data.cameramanId == request.auth.uid ||
        isAdmin()
      );
      allow create: if isAuthenticated() && 
                       request.resource.data.cameramanId == request.auth.uid;
      allow update: if isAdmin();
    }
    
    // Bookings
    match /bookings/{bookingId} {
      allow read: if isAuthenticated() && (
        resource.data.customerId == request.auth.uid ||
        resource.data.cameramanId == request.auth.uid ||
        isAdmin()
      );
      allow create: if isAuthenticated();
      allow update: if isAuthenticated() && (
        resource.data.customerId == request.auth.uid ||
        resource.data.cameramanId == request.auth.uid
      );
    }
    
    // Other collections...
  }
}
```

## DEVELOPMENT GUIDELINES

### Code Quality Standards
1. **TypeScript Strict Mode**: All files must use TypeScript with strict type checking
2. **ESLint**: Follow Airbnb style guide with React Native adjustments
3. **Prettier**: Consistent code formatting
4. **Comments**: Complex logic must have explanatory comments
5. **Error Handling**: Try-catch blocks for all async operations, especially payment calls
6. **Loading States**: Every async action must show loading indicator
7. **Error States**: User-friendly error messages, no raw error objects
8. **Empty States**: Proper empty state UI for lists
9. **Optimistic Updates**: Update UI before API confirmation where appropriate (NOT for payments)
10. **Accessibility**: Proper labels, contrast ratios, touch targets (min 44x44)

### Performance Requirements
1. **Image Optimization**: Use Fast Image, compress uploads
2. **List Virtualization**: Use FlatList for long lists
3. **Lazy Loading**: Load screens and images on demand
4. **Debouncing**: Debounce search and filter inputs
5. **Memoization**: Use React.memo, useMemo, useCallback appropriately
6. **Bundle Size**: Code splitting where possible
7. **Payment Optimization**: Cache payment status to reduce API calls

### Testing Requirements
1. **Unit Tests**: All utility functions, hooks, especially payment logic
2. **Component Tests**: All reusable components
3. **Integration Tests**: Critical user flows, especially payment flows
4. **Snapshot Tests**: UI components
5. **Payment Testing**: Comprehensive tests for all payment scenarios
6. **Minimum Coverage**: 80% for payment-related code, 70% overall

### Security Requirements
1. **Input Validation**: Validate all user inputs, especially payment amounts
2. **Firebase Security Rules**: Implement proper Firestore rules (see above)
3. **API Keys**: Store in environment variables, never commit
4. **Phone Verification**: Proper OTP validation
5. **Payment Security**: 
   - Verify payment amounts on server-side
   - Implement webhook signature verification
   - Never trust client-side payment status
   - Log all payment operations
6. **Orange Money Number**: Validate format before storage
7. **Data Privacy**: GDPR-like data handling, especially payment data
8. **SSL Pinning**: Consider for production (Orange Money API calls)

### Sierra Leone Context Considerations
1. **Network Reliability**: 
   - Implement robust retry logic
   - Show offline indicators
   - Cache critical data locally
   - Handle intermittent connectivity
   
2. **Device Compatibility**:
   - Support older Android devices (Android 7+)
   - Optimize for lower-end devices
   - Reduce app size
   - Test on devices with limited RAM

3. **Language & Localization**:
   - English as primary language
   - Consider Krio phrases where appropriate
   - Use familiar terminology

4. **Orange Money Integration**:
   - Most common payment method in SL
   - Users are familiar with USSD prompts
   - Clear instructions about PIN entry
   - Handle Orange Money service downtimes gracefully

5. **Currency**:
   - Display prices in SLL (Sierra Leonean Leones)
   - Format: Le 100,000 or SLL 100,000
   - Handle large numbers (SLL has large denominations)

## CRITICAL SUCCESS METRICS

The MVP must achieve:
1. **Booking Speed**: User can complete booking in under 5 minutes
2. **Payment Success Rate**: 95%+ successful payment completion
3. **Payment Processing Time**: < 2 minutes average
4. **Cameraman Response Time**: 80% of requests accepted/rejected within 15 minutes
5. **Payout Processing Time**: Within 1-3 business days
6. **App Performance**: < 2 second screen load times
7. **Crash Rate**: < 1% crash-free sessions
8. **User Satisfaction**: 4+ star average rating

## BUILD ORDER

**Phase 1: Foundation (Week 1)**
1. Project setup with React Native CLI
2. Configure TypeScript, ESLint, Prettier
3. Setup folder structure
4. Implement theme system (colors, typography)
5. Create base navigation structure
6. Setup Firebase project
7. Configure environment variables
8. Document all setup steps
9. **Contact Orange Money SL for API access**

**Phase 2: Authentication (Week 1-2)**
1. Splash screen
2. Welcome/role selection
3. Phone input + OTP (Sierra Leone format: +232)
4. Customer onboarding
5. Cameraman onboarding (including Orange Money number)
6. Auth state management
7. Document authentication flow

**Phase 3: Core Features (Week 2-4)**
1. Cameraman profile creation/editing
2. Orange Money number setup (mandatory for cameramen)
3. Portfolio management
4. Location services integration
5. Home screen with cameraman discovery
6. Search and filter functionality
7. Cameraman detail view
8. Document each feature

**Phase 4: Booking System (Week 4-5)**
1. Service package selection
2. Booking details input
3. Pricing calculation
4. Booking request flow
5. Accept/reject mechanism
6. Booking status tracking
7. Document booking flow

**Phase 5: Orange Money Integration (Week 5-7)** ⚠️ CRITICAL PHASE
1. **Obtain Orange Money API credentials**
2. Setup Orange Money service architecture
3. Implement OrangeMoneyService.ts
4. Create payment screens
5. Implement payment flow (customer side)
6. Setup Firebase Cloud Functions for webhooks
7. Implement payment status polling
8. Add refund functionality
9. Create payout system (cameraman side)
10. Implement withdrawal screens
11. Setup transaction logging
12. Test all payment scenarios thoroughly
13. Document Orange Money integration comprehensively

**Phase 6: Additional Features (Week 7-8)**
1. Ratings and reviews
2. Push notifications (including payment notifications)
3. Notification center
4. Booking history
5. Transaction history
6. User settings
7. Document each feature

**Phase 7: Admin Features (Week 8)**
1. Admin dashboard
2. Cameraman approval system
3. Payout management
4. Dispute handling
5. Document admin features

**Phase 8: Polish & Testing (Week 9-10)**
1. UI/UX refinements
2. Error handling improvements
3. Loading and empty states
4. Comprehensive payment testing
5. Performance optimization
6. Security audit (especially payments)
7. Final documentation review
8. Create user guides

## DELIVERABLES CHECKLIST

For each feature/component, provide:
- [ ] Source code file (.tsx/.ts)
- [ ] Corresponding documentation (.md)
- [ ] TypeScript interfaces/types
- [ ] Unit tests (if applicable)
- [ ] Integration tests for critical flows
- [ ] Usage examples
- [ ] Screenshots/mockups (if UI component)
- [ ] Integration points documented
- [ ] Error handling documented
- [ ] Loading states documented
- [ ] Security considerations documented

## ORANGE MONEY SPECIFIC DELIVERABLES

- [ ] OrangeMoneyService.ts with full implementation
- [ ] All payment screens
- [ ] All payment components
- [ ] Firebase Cloud Functions for payments
- [ ] Webhook handler
- [ ] Payment testing suite
- [ ] Orange Money integration documentation (5+ files)
- [ ] API integration guide
- [ ] Payment flow diagrams
- [ ] Troubleshooting guide
- [ ] Security implementation guide
- [ ] Admin payout guide

## DOCUMENTATION STANDARDS

Every `.md` file must include:
1. **File Header**: File path, creation date, last updated
2. **Quick Summary**: 2-3 sentences max
3. **Technical Details**: Full implementation details
4. **Code Examples**: Real, working code snippets
5. **Dependencies Graph**: Visual or list of dependencies
6. **Testing Notes**: How to test this component
7. **Common Issues**: Known bugs or limitations
8. **Security Notes**: For payment-related files
9. **Related Documentation**: Links to other .md files

## FINAL INSTRUCTIONS

When building this application:

1. **Start with documentation**: Before writing code for any file, create its .md documentation first
2. **Be comprehensive**: Don't skip files - document EVERYTHING
3. **Think mobile-first**: All UI must work on small screens
4. **Consider Sierra Leone context**: 
   - Orange Money is the primary (and only) payment method
   - Network may be slow/unreliable - implement robust retry logic
   - Users may have older devices - optimize performance
   - Test on low-end Android devices
5. **Payment Security is CRITICAL**:
   - Never trust client-side payment status
   - Always verify with Orange Money API
   - Implement comprehensive logging
   - Add fraud detection basics
6. **Follow the exclusion list**: Do NOT add features marked as excluded
7. **Maintain consistency**: Use the same patterns across similar features
8. **Think scalability**: Write code that can handle 10,000+ users
9. **Document decisions**: Explain WHY not just WHAT in documentation
10. **Orange Money Integration**: This is the most critical component - allocate sufficient time and testing

## QUALITY CHECKLIST FOR EACH FILE

Before considering a file complete, verify:
- [ ] TypeScript types are properly defined
- [ ] Error handling is comprehensive (especially for payments)
- [ ] Loading states are implemented
- [ ] Empty states are handled
- [ ] Code follows established patterns
- [ ] Documentation file exists and is complete
- [ ] Component is reusable (if applicable)
- [ ] Performance is optimized
- [ ] Accessibility is considered
- [ ] Code is commented where necessary
- [ ] Security is considered (especially for payment files)
- [ ] Network failure scenarios are handled
- [ ] Tested on both Android and iOS

## ORANGE MONEY INTEGRATION SUCCESS CRITERIA

The Orange Money integration is successful if:
1. **Payment Success Rate**: 95%+ of initiated payments complete successfully
2. **Payment Speed**: Average payment time < 2 minutes
3. **Error Handling**: All failure scenarios handled gracefully with user-friendly messages
4. **Refund Success**: 100% of eligible refunds processed successfully
5. **Payout Reliability**: Cameramen receive payments within promised timeframe
6. **Security**: Zero security incidents related to payments
7. **Audit Trail**: Complete logging of all payment operations
8. **User Experience**: Users find payment process intuitive and straightforward

---

**Remember**: You are building a production-ready application with real money transactions. Every file, every component, every function must be documented, tested, and built to last. The Orange Money integration requires special attention to security, reliability, and error handling. The documentation is as important as the code itself.

**CRITICAL**: Before implementing Orange Money integration, you MUST obtain API documentation and credentials from Orange Money Sierra Leone. Contact them at: [Orange SL Business Team / Developer Relations]

Now begin building SnapMe, starting with the project setup and foundation, and work through each phase systematically. Create both code and documentation as you go. Pay special attention to the Orange Money integration - it's the backbone of the entire platform.Claude is AI and can make mistakes. Please double-check responses. Sonnet 4.5Claude is AI and can make mistakes. Please double-check responses.