import React, { useState } from 'react';

const UV_Home: React.FC = () => {
  const [ctaClicked, setCtaClicked] = useState(false);

  const handleCtaClick = () => {
    setCtaClicked(true);
    // Smooth scroll to the content below
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="w-full py-4 px-6 bg-white/80 backdrop-blur-sm border-b border-slate-100 sticky top-0 z-10">
        <nav className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <span className="text-xl font-semibold text-slate-800">Welcome</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600 hidden sm:block">Your journey starts here</span>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="flex-1 flex items-center justify-center px-6 py-16 sm:py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Welcome to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Something Amazing
              </span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Discover new possibilities and embark on an incredible journey. 
              We're here to help you achieve your goals and make your dreams a reality.
            </p>
            
            {/* Primary CTA Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleCtaClick}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <span>Get Started</span>
                <svg 
                  className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>

            {/* CTA Feedback */}
            {ctaClicked && (
              <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-xl animate-fade-in">
                <p className="text-green-700 font-medium">
                  Awesome! You're ready to begin your journey.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Additional Content Section */}
        <section id="main-content" className="py-16 px-6 bg-white/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-800 mb-4">
              What's Next?
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              You've taken the first step. Explore what we have to offer and discover how we can help you succeed.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-6 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">W</span>
            </div>
            <span className="text-sm text-slate-300">Welcome Page</span>
          </div>
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} Welcome. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default UV_Home;
