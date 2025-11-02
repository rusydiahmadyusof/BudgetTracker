# 💰 Budget Tracker

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A modern, enterprise-grade budget tracking application built with Next.js and React**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [Tech Stack](#-tech-stack) • [Project Structure](#-project-structure)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Demo](#-demo)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#-usage)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Key Concepts Demonstrated](#-key-concepts-demonstrated)
- [Performance Optimizations](#-performance-optimizations)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

---

## 🎯 About

Budget Tracker is a full-featured, production-ready personal finance management application. Built with modern web technologies, it provides an intuitive interface for tracking income, expenses, budgets, and spending patterns. The application is designed with enterprise-grade UI/UX principles and demonstrates best practices in React development, state management, and data visualization.

### Why Budget Tracker?

- ✅ **Zero Cost** - No backend servers, databases, or API keys required
- ✅ **Privacy First** - All data stored locally in your browser
- ✅ **Production Ready** - Enterprise-grade design and code quality
- ✅ **Educational** - Extensive code comments explaining React concepts
- ✅ **Modern Stack** - Built with latest Next.js and React patterns

---

## ✨ Features

### 📊 Dashboard
- **Real-time Financial Overview** - Instant summary of income, expenses, and balance
- **Interactive Charts** - Visual spending trends with daily, weekly, and monthly views
- **Category Breakdown** - Pie chart showing expense distribution by category
- **Quick Add** - Fast transaction entry without leaving the dashboard
- **Recent Transactions** - Quick access to latest activity

### 💸 Transaction Management
- **Complete CRUD Operations** - Create, read, update, and delete transactions
- **Advanced Filtering** - Search by description, filter by category, type, and date range
- **Bulk Operations** - Efficient transaction management
- **Date-based Organization** - Chronological sorting and filtering

### 🏷️ Category Management
- **Custom Categories** - Create unlimited custom expense categories
- **Visual Indicators** - Color-coded categories with icons
- **Transaction Count** - See how many transactions belong to each category
- **Smart Deletion** - Prevents deletion of categories with existing transactions

### 🎯 Budget Tracking
- **Flexible Budgets** - Set weekly or monthly spending limits per category
- **Progress Tracking** - Visual progress bars showing budget utilization
- **Smart Alerts** - Visual indicators when approaching or exceeding budgets
- **Category-based Budgets** - Link budgets to specific expense categories

### 🌙 Dark Mode
- **Theme Toggle** - Easy switch between light and dark modes via header button
- **System Preference** - Automatically detects and applies your system's color scheme preference
- **Persistent Theme** - Your theme choice is saved and restored on page reload
- **Dark Mode Colors** - Professional dark theme with Charcoal backgrounds, Teal accents, and Light Gray text

### 🎨 Design & UX
- **Responsive Design** - Fully optimized for desktop, tablet, and mobile
- **Enterprise UI/UX** - Professional Finance-Trust theme with clean aesthetics
- **Smooth Animations** - Page transitions and interactive elements
- **Accessibility** - ARIA labels, keyboard navigation, and semantic HTML

### 💾 Data Management
- **Local Storage** - All data persists in browser localStorage
- **No Backend Required** - Completely client-side application
- **Data Export Ready** - Structured for easy data export implementation
- **Error Handling** - Graceful error handling and user feedback

---

## 🚀 Demo

### Screenshots

<!-- Add screenshots here -->
- **Dashboard**: Overview of financial health with charts and summary cards
- **Transactions**: Complete transaction list with advanced filtering
- **Categories**: Visual category management with icons and colors
- **Budgets**: Budget tracking with progress indicators

### Live Demo

[🚀 View Live Demo](https://your-demo-url.com) *(Coming Soon)*

---

## 🛠️ Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm** 9.x or higher (comes with Node.js)
- **Git** (for cloning the repository)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/budget-tracker.git
   cd budget-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

---

## 📖 Usage

### Adding Transactions

1. Navigate to **Dashboard** or **Transactions** page
2. Click **"Add Transaction"** button
3. Select transaction type (Income or Expense)
4. Enter amount, description, and date
5. Select category (for expenses)
6. Click **"Save"**

### Creating Categories

1. Go to **Categories** page
2. Click **"Add Category"**
3. Enter category name
4. Choose a color and icon
5. Save the category

### Setting Budgets

1. Navigate to **Budgets** page
2. Click **"Set Budget"**
3. Select a category
4. Enter budget amount
5. Choose period (Weekly or Monthly)
6. Save the budget

### Viewing Reports

- **Dashboard**: View spending trends chart and expense breakdown
- **Charts**: Switch between daily, weekly, and monthly views
- **Filters**: Use transaction filters to analyze specific time periods

### Switching Themes

1. Click the **Moon/Sun icon** in the top-right corner of the header
2. The theme will toggle between light and dark modes
3. Your preference is automatically saved and will persist across sessions
4. The app also respects your system's color scheme preference on first visit

---

## 🔧 Tech Stack

### Core Framework
- **[Next.js 14.2](https://nextjs.org/)** - React framework with App Router
- **[React 18.3](https://react.dev/)** - UI library
- **[JavaScript (ES6+)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)** - Programming language

### Styling
- **[TailwindCSS 3.4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Google Fonts (Inter)](https://fonts.google.com/specimen/Inter)** - Typography

### Data Visualization
- **[Recharts 2.12](https://recharts.org/)** - Composable charting library

### Icons & UI
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[React Hook Form](https://react-hook-form.com/)** - Form state management

### Utilities
- **[date-fns 3.6](https://date-fns.org/)** - Modern date utility library

### Storage
- **localStorage API** - Browser-native data persistence

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

---

## 📁 Project Structure

```
BudgetTracker/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.js          # Root layout with providers
│   │   ├── page.js            # Dashboard page
│   │   ├── transactions/       # Transactions page
│   │   ├── categories/         # Categories page
│   │   ├── budgets/            # Budgets page
│   │   └── globals.css         # Global styles
│   │
│   ├── components/
│   │   ├── ui/                 # Reusable UI components
│   │   │   ├── Button.js
│   │   │   ├── Card.js
│   │   │   ├── Input.js
│   │   │   ├── Modal.js
│   │   │   └── ...
│   │   │
│   │   ├── layout/             # Layout components
│   │   │   ├── Header.js
│   │   │   ├── Sidebar.js
│   │   │   ├── BottomNav.js
│   │   │   └── ClientLayout.js
│   │   │
│   │   ├── dashboard/          # Dashboard components
│   │   │   ├── Dashboard.js
│   │   │   ├── SummaryCard.js
│   │   │   ├── QuickAdd.js
│   │   │   ├── ExpenseChart.js
│   │   │   ├── DailySpendingChart.js
│   │   │   └── RecentTransactions.js
│   │   │
│   │   ├── transactions/        # Transaction components
│   │   ├── categories/         # Category components
│   │   ├── budgets/            # Budget components
│   │   └── shared/             # Shared components
│   │
│   ├── context/
│   │   ├── BudgetContext.js    # Global state management
│   │   └── ThemeContext.js     # Theme management (dark/light mode)
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── useTransactions.js
│   │   ├── useCategories.js
│   │   ├── useLocalStorage.js
│   │   └── useDebounce.js
│   │
│   ├── utils/                  # Utility functions
│   │   ├── calculations.js    # Business logic
│   │   ├── formatters.js      # Formatting utilities
│   │   ├── storage.js         # localStorage wrapper
│   │   └── constants.js        # App constants
│   │
│   └── lib/
│       └── utils.js            # General utilities
│
├── public/                     # Static assets
├── .eslintrc.json             # ESLint configuration
├── tailwind.config.js         # TailwindCSS configuration
├── next.config.js             # Next.js configuration
├── postcss.config.js          # PostCSS configuration
└── package.json               # Dependencies
```

---

## 🎓 Key Concepts Demonstrated

This project showcases essential React and Next.js concepts:

### React Concepts
- ✅ **Functional Components** - Modern React component patterns
- ✅ **Hooks** - useState, useEffect, useContext, useCallback, useMemo
- ✅ **Custom Hooks** - Reusable logic extraction (useTheme, useTransactions, useCategories)
- ✅ **Context API** - Global state management (BudgetContext, ThemeContext)
- ✅ **Theme Management** - Dark/light mode with Context API and localStorage
- ✅ **Component Composition** - Building complex UIs from simple components
- ✅ **Controlled Components** - Form handling patterns
- ✅ **Conditional Rendering** - Dynamic UI updates
- ✅ **Event Handling** - User interaction patterns

### Next.js Concepts
- ✅ **App Router** - Next.js 14 file-based routing
- ✅ **Server & Client Components** - Proper component separation
- ✅ **Layout Patterns** - Nested layouts and shared UI
- ✅ **Metadata API** - SEO and page metadata
- ✅ **Page Transitions** - Smooth navigation animations

### Performance Optimizations
- ✅ **Debouncing** - Optimized search input
- ✅ **Memoization** - useMemo and useCallback for expensive operations
- ✅ **Code Splitting** - Automatic by Next.js
- ✅ **Lazy Loading** - Component-level code splitting

### Best Practices
- ✅ **DRY Principle** - Reusable components and utilities
- ✅ **Separation of Concerns** - Clear component responsibilities
- ✅ **Error Handling** - Graceful error boundaries
- ✅ **Accessibility** - ARIA labels and keyboard navigation
- ✅ **Type Safety** - PropTypes and consistent data structures
- ✅ **Code Comments** - Extensive documentation for learning

---

## ⚡ Performance Optimizations

- **Debounced Search** - Reduces unnecessary filtering operations
- **Memoized Calculations** - Expensive operations cached with useMemo
- **Optimized Re-renders** - useCallback prevents unnecessary component updates
- **Lazy Component Loading** - Components loaded on demand
- **Efficient Data Structures** - Optimized for fast lookups and filtering

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### How to Contribute

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style and patterns
- Add comments for complex logic
- Ensure all features work on mobile and desktop
- Test thoroughly before submitting PR
- Update README if adding new features

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Next.js Team** - Amazing React framework
- **TailwindCSS** - Utility-first CSS framework
- **Recharts** - Beautiful charting library
- **Lucide** - Comprehensive icon library
- **date-fns** - Modern date utilities

---

## 📧 Contact

**Project Maintainer** - [Your Name](https://github.com/yourusername)

**Project Link** - [https://github.com/yourusername/budget-tracker](https://github.com/yourusername/budget-tracker)

---

<div align="center">

**⭐ If you found this project helpful, please consider giving it a star! ⭐**

Made with ❤️ using Next.js and React

</div>
