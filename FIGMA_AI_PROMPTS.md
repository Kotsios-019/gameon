# Figma AI - Design Prompts for GameOn

Use these prompts with Figma AI to generate designs that match our brand guidelines.

## Brand Setup Prompt
```
Create a design system for "GameOn" - a mobile app for finding 5-a-side football matches.

Brand Colors:
- Primary Green: #22C55E (Football green - buttons, CTAs)
- Secondary Dark: #1E293B (Cards, surfaces)
- Accent Orange: #F97316 (Highlights, achievements)
- Error Red: #EF4444
- Background: #FFFFFF (light) / #0F172A (dark)
- Text Primary: #0F172A (light) / #F8FAFC (dark)

Typography:
- Primary Font: Inter (Regular 400, Medium 500, Semi-Bold 600, Bold 700)
- Headers: Poppins (Semi-Bold 600, Bold 700)
- Body: 16px / 24px line height
- Headers: 20px, 24px, 28px

Spacing: 4px, 8px, 12px, 16px, 24px, 32px, 48px

Design Principles: Simple, Trustworthy, Energetic, Accessible
```

---

## Screen-Specific Prompts

### 1. Onboarding/Welcome Screen
```
Design an onboarding screen for GameOn app with:
- Large hero text: "Kick off with GameOn"
- Subheading explaining finding and joining football matches
- Clean, modern illustration of football/pitch (minimal style)
- Primary green button (#22C55E) labeled "Get Started"
- Background: White or light surface (#F8FAFC)
- Use Inter font for body, Poppins for heading
- Mobile-first, centered layout
- Friendly, energetic tone
```

### 2. Match Feed/Home Screen
```
Create a match feed screen with:
- Header: "Matches Near You" in Poppins Semi-Bold 20px
- Multiple match cards, each containing:
  * Venue name (Semi-Bold 16px, dark text)
  * Time display (14px, secondary text color) with clock icon
  * Distance (e.g., "2.3 km away") with location icon
  * Skill level badge (Intermediate, Advanced, etc.) in colored pill
  * Player count (e.g., "8/10 players") with person icon
  * Primary green button "Join Match" (#22C55E, 48px height, rounded 12px)
- Card style: White background (#FFFFFF), 16px border radius, subtle shadow
- Cards stacked vertically with 12px spacing
- Pull-to-refresh indicator at top
- Bottom tab navigation: Home, Matches, Chat, Profile icons
```

### 3. Match Card Component
```
Design a reusable match card component with:
- Card container: White background, 16px rounded corners, subtle shadow
- Top section: Venue icon (24px) + venue name (Semi-Bold 16px)
- Time section: Clock icon + "Tomorrow 6:00 PM" (14px secondary color)
- Location section: Location pin icon + "1.2 km away" (14px secondary)
- Info badges: Skill level (e.g., "Intermediate" in green pill), Match type "5v5"
- Player count: People icon + "8/10 players joined"
- Status badge: "Open" (green background) or "Full" (gray background)
- Primary button: "Join Match" (#22C55E, white text, 48px height, 12px radius)
- Padding: 16px all around
- Spacing: 12px between sections
```

### 4. Match Detail Screen
```
Create a match detail screen with:
- Header: Back button + venue name (Poppins Semi-Bold 20px) + share icon
- Hero section: Large venue name, date/time prominently displayed
- Match info card with:
  * Scheduled time (large, bold)
  * Location with map preview or address
  * Duration (90 minutes)
  * Skill level preference
  * Description text
- Participant list section:
  * Section header "Players (8/10)"
  * Grid or list of avatar circles (48px) with names below
  * Empty slots shown as dashed circles
- Action buttons:
  * Primary "Join Match" button (green #22C55E, full width, 48px height)
  * Secondary "View Chat" button if already joined
- Chat preview section (if joined)
- Scrollable content, safe area padding
```

### 5. Create Match Screen
```
Design a create match form screen with:
- Header: "Create Match" (Poppins Semi-Bold 20px) + cancel/back
- Form fields with clear labels (Semi-Bold 14px, dark):
  * Venue selector: Dropdown or map picker with location icon
  * Date picker: Calendar icon + date selector (native style)
  * Time picker: Clock icon + time selector
  * Skill level: Segmented control or picker (Beginner, Intermediate, Advanced, Expert)
  * Max players: Number input (default 10 for 5v5)
  * Description: Multi-line text area
- Each input: 48px height minimum, 12px border radius, 16px padding
- Primary submit button: "Create Match" (green #22C55E, full width, bottom-aligned)
- Input focus state: Green border (#22C55E, 2px)
- Error states: Red border (#EF4444) + error message below input
- Spacing: 24px between sections
```

### 6. Profile Screen
```
Design a user profile screen with:
- Profile header section:
  * Large avatar circle (96px) with border
  * Display name (Poppins Bold 24px)
  * Skill level badge (colored pill)
  * Preferred position (e.g., "Midfielder")
  * Edit profile button (secondary style)
- Stats section:
  * Three stat cards: "Matches Played", "Reliability", "Ratings"
  * Numbers large and bold, labels smaller
  * Cards with subtle background (#F8FAFC)
- Past matches section:
  * "Recent Matches" header
  * List of match cards (compact version)
  * Each showing date, venue, status
- Settings section:
  * List items: Notifications, Privacy, Logout
  * Chevron icons on right
- Bottom tab navigation
- Clean, organized layout with proper spacing
```

### 7. Chat Screen
```
Design a per-match chat screen with:
- Header: Match name + venue + back button
- Message list:
  * Messages aligned left (others) and right (self)
  * Message bubbles:
    - Self: Green background (#22C55E), white text
    - Others: Light gray background (#F1F5F9), dark text
  * Avatar circles (40px) next to other messages
  * Timestamp (12px, secondary color) below messages
  * Name label (14px, Semi-Bold) above other messages
- Input bar (fixed at bottom):
  * Text input field (rounded, 48px height)
  * Send button (green circle with send icon)
- Typing indicator when someone is typing
- Scroll to bottom button (floating)
```

### 8. Bottom Tab Navigation
```
Design a bottom tab navigation bar with:
- Four tabs: Home, Matches, Chat, Profile
- Active tab: Green icon (#22C55E) + green text label
- Inactive tab: Gray icon (#94A3B8) + gray text label
- Icons: 24px size, line style
- Labels: 12px font, Semi-Bold when active
- Background: White (#FFFFFF) with subtle top border
- Height: 64px (including safe area)
- Badge indicator on Chat tab if unread messages
```

### 9. Empty State - No Matches
```
Design an empty state screen for "no matches found" with:
- Large, friendly illustration (football or pitch theme, minimal style)
- Heading: "No matches nearby?" (Poppins Semi-Bold 20px)
- Body text: "Be the first to create a match in your area!" (Inter Regular 16px, secondary color)
- Primary CTA button: "Create Match" (green #22C55E, 48px height)
- Centered layout, generous spacing
- Brand colors and friendly tone
```

### 10. Rating/Feedback Screen
```
Design a post-match rating screen with:
- Header: "Rate Your Experience"
- Match info card (compact): Date, venue, opponent names
- Star rating component: 5 stars, clickable, scales to 1-5
- Star colors: Yellow/Orange (#F97316) when selected, gray when unselected
- Comment text area: Multi-line input for feedback
- Optional: Rate individual players section
- Submit button: "Submit Rating" (green #22C55E, full width)
- Skip option (text link)
- Clear, simple layout focused on rating interaction
```

---

## Component Library Prompts

### Primary Button
```
Design a primary button component with:
- Background: #22C55E (Football green)
- Text: White, Inter Semi-Bold 16px
- Height: 48px
- Border radius: 12px
- Padding: 16px horizontal
- States: Default, Pressed (90% opacity), Disabled (40% opacity), Loading (spinner)
- Touch-friendly, accessible
```

### Input Field
```
Design a text input component with:
- Background: #F8FAFC (light surface)
- Border: 1px solid #E2E8F0
- Border radius: 12px
- Height: 48px
- Padding: 14px horizontal
- Text: Inter Regular 16px, dark color
- Label: Above input, Inter Semi-Bold 14px
- States: Default, Focus (green border #22C55E, 2px), Error (red border #EF4444), Disabled
- Error message below in red (#EF4444, 12px)
```

### Match Card Component (Detailed)
```
Create a comprehensive match card component with all states:
- Default state: White card with all match info
- Loading state: Skeleton screen with shimmer
- Full state: Grayed out join button, "Full" badge
- Joined state: Green checkmark, "You're in" indicator
- States include hover/press effects
- Responsive padding and spacing
- Clear visual hierarchy
```

---

## Design System Prompts

### Color System
```
Create a complete color palette for GameOn with:
- Primary: #22C55E (Football green) - main actions
- Secondary: #1E293B (Dark) - surfaces, cards
- Accent: #F97316 (Orange) - highlights
- Success: #22C55E
- Error: #EF4444
- Warning: #F59E0B
- Info: #3B82F6
- Text colors (light and dark mode)
- Surface colors
- Border colors
Include all shades and opacity variants
```

### Typography Scale
```
Design a typography system using Inter and Poppins:
- H1: Poppins Bold 28px / 34px line height
- H2: Poppins Semi-Bold 24px / 30px
- H3: Poppins Semi-Bold 20px / 26px
- Body: Inter Regular 16px / 24px
- Body Small: Inter Regular 14px / 20px
- Caption: Inter Regular 12px / 16px
- Button: Inter Semi-Bold 16px / 20px
Show all weights (Regular, Medium, Semi-Bold, Bold)
```

---

## Tips for Using with Figma AI

1. **Be Specific:** Include exact hex codes, sizes, and spacing
2. **Reference Components:** Ask to "use the match card component from before"
3. **Iterate:** Generate, refine, and regenerate based on results
4. **Test Variations:** Ask for light and dark mode versions
5. **State Variants:** Always specify states (default, hover, active, disabled)
6. **Mobile First:** Specify mobile dimensions (375px width standard)
7. **Accessibility:** Request WCAG AA compliant designs

---

## Next Steps

1. Start with brand setup prompt to establish design system
2. Generate each screen one by one
3. Create component library from generated screens
4. Test variations and states
5. Export assets and specifications for development

Good luck with your designs! 🎨⚽

