import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary caught error]:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md bg-slate-800 border border-slate-700 p-8 rounded-3xl shadow-2xl">
            <h1 className="text-2xl font-bold text-red-400 mb-3">समर्थ कॉम्प्युटर्स खंडाळा</h1>
            <p className="text-slate-300 text-sm mb-6">
              वेबसाईट लोड करताना काही तांत्रिक अडचण आली आहे. कृपया पेज रिफ्रेश करा.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg"
            >
              पुन्हा प्रयत्न करा (Refresh)
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
