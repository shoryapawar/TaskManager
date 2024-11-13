import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        background: '#1C1C1E',        // Main background
        cardBackground: '#2C2C2E',    // Task card backgrounds
        navbar: '#2E2E30',            // Navbar background

        // Buttons
        primaryButton: '#FF3B30',     // Main action button
        secondaryButton: '#3A3A3C',   // Secondary buttons
        tertiaryButton: '#E5E5EA',    // Lighter button option

        // Text Colors
        primaryText: '#FFFFFF',       // Main text color
        secondaryText: '#A1A1A6',     // Subtext or muted text
        accentText: '#FF453A',        // Accent text color

        // Inputs and Form Fields
        inputField: '#3A3A3C',        // Input background
        inputBorder: '#48484A',       // Input border color

        // Borders and Dividers
        border: '#48484A',            // Default border
        cardBorder: '#5A5A5C',        // Card border color

        // Task Status Colors
        completedTask: '#34C759',     // Completed task indicator
        overdueTask: '#FF9F96',       // Overdue task indicator
        upcomingTask: '#FFD60A',      // Upcoming task indicator
        inProgressTask: '#0A84FF',
      },
    },
    fontFamily: {
      georgia: ['Georgia', 'serif'],
      sourgummy: ['Sour Gummy', 'sans-serif'],
    }
  },
  plugins: [
    daisyui,
  ],
}