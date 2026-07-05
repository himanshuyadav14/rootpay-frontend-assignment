# RootPay – Frontend Assignment

A pixel-accurate React + TypeScript implementation of the RootPay account creation wizard, built from the provided Figma design.

## Live Demo

🔗 **[https://rootpay-frontend-assignment.vercel.app](https://rootpay-frontend-assignment.vercel.app)**

## GitHub Repository

[https://github.com/himanshuyadav14/rootpay-frontend-assignment](https://github.com/himanshuyadav14/rootpay-frontend-assignment)

---

## Tech Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | React 18 + TypeScript | Strict typing, component model |
| Build tool | Vite | Fast HMR, minimal config |
| Styling | Tailwind CSS v4 | Utility-first, design-token friendly |
| Routing | In-memory wizard (no router) | Single-page flow, no URL needed |
| State | React Context + useState | Lightweight, no overkill library |

---

## Architecture

```
src/
├── assets/
│   └── illustration.svg        # Left-panel hero illustration
├── components/
│   ├── Layout.tsx              # Two-column page shell
│   ├── ProgressBar.tsx         # Animated step indicator
│   ├── Button.tsx              # Primary / secondary + loading state
│   ├── FormInput.tsx           # Labeled input with error/hint
│   ├── PasswordInput.tsx       # FormInput + eye-toggle
│   ├── PhoneInput.tsx          # Country code picker + number input
│   ├── OtpInput.tsx            # 4-box OTP with auto-advance
│   ├── RoleCard.tsx            # Personal / Business selection card
│   └── SuccessModal.tsx        # Animated completion overlay
├── context/
│   └── WizardContext.tsx       # Global step + form data + reset()
├── pages/
│   ├── Step1Role.tsx           # Account type selection
│   ├── Step2Phone.tsx          # Phone number entry
│   ├── Step3Otp.tsx            # OTP verification
│   ├── Step4Name.tsx           # First + last name
│   └── Step5Password.tsx       # Password creation
├── App.tsx                     # Wizard orchestrator + success modal trigger
├── main.tsx                    # React root
└── index.css                   # Global base styles + Tailwind import
```

### State Flow

```
WizardContext (step: 1–5, data: WizardData)
       │
       ├── step <= 5  →  Layout + StepN page
       └── step > 5   →  SuccessModal overlay
                              └── "Go To Dashboard" → reset() → step 1
```

---

## Screens Implemented

| Step | Screen | Key Interactions |
|------|--------|-----------------|
| 1 | **Role Selection** | Personal / Business toggle cards with animated check |
| 2 | **Phone Entry** | Country code dropdown (40+ countries, scrollable) |
| 3 | **OTP Verification** | 4-box auto-advance, backspace nav, paste support, Resend OTP |
| 4 | **Name Entry** | Required-field validation with inline error messages |
| 5 | **Password Creation** | Min-6-char validation, must-match check, eye-toggle, loading spinner |
| 6 | **Success Modal** | Animated entrance, masked account summary, "Go To Dashboard" resets wizard |

---

## Interaction & State Coverage

- **Hover** — buttons, role cards, country options, eye icon
- **Focus** — all inputs with `focus:ring-2 focus:ring-blue-500`
- **Active** — button press darkens background
- **Loading** — Continue button on Step 5 shows spinner during simulated API call
- **Error** — inline red messages below each invalid field
- **Disabled** — inputs & buttons locked during loading
- **Cursor** — `pointer` on all clickable elements, `not-allowed` on disabled
- **Transitions** — progress bar fill (500ms ease), modal fade-in + scale, dropdown caret rotate

---

## Design Decisions

1. **No router** — The 5-step flow is purely sequential; React Context is simpler and avoids URL noise for an onboarding wizard.
2. **Tailwind CSS v4** (`@tailwindcss/vite`) — Zero config, no `tailwind.config.js` needed; utilities are generated on demand.
3. **Country picker built from scratch** — Avoided a heavy library; custom `<ul>` with 40+ countries, scrollable, accessible with ARIA attributes.
4. **OTP component** — Handles: digit-only input, auto-focus next box, backspace to previous, arrow key navigation, and clipboard paste.
5. **Wizard reset** — `reset()` in WizardContext clears all form state and returns to step 1, giving a clean "start over" UX from the success modal.
6. **Strict TypeScript** — No `any` types; all props, context values, and event handlers are fully typed.

---

## Enhancements Beyond Figma

- **40+ country codes** in phone picker (Figma only showed US flag)
- **Paste support** in OTP input
- **Loading spinner** on final submit (simulated async)
- **Keyboard navigation** in OTP (arrow keys + backspace)
- **Success state reset** — wizard restarts cleanly without page reload

---

## Running Locally

```bash
git clone https://github.com/himanshuyadav14/rootpay-frontend-assignment.git
cd rootpay-frontend-assignment
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Build

```bash
npm run build   # outputs to dist/
```
