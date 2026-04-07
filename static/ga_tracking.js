// ============================================
// GOOGLE ANALYTICS 4 - COMPLETE TRACKING
// ============================================

(function() {
  'use strict';
  
  const GA_MEASUREMENT_ID = 'G-FQQW1BBHKF';
  
  // ============================================
  // 1. LOAD GOOGLE ANALYTICS
  // ============================================
  function loadGoogleAnalytics() {
    // Prevent duplicate loading
    if (window.gtagLoaded) return;
    window.gtagLoaded = true;
    
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
    
    window.dataLayer = window.dataLayer || [];
    
    // Override gtag to ensure it's available immediately
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      page_path: window.location.pathname
    });
  }
  
  // ============================================
  // 2. TRACK PAGE VIEWS (SPA Navigation)
  // ============================================
  function trackPageView(pagePath) {
    if (typeof gtag !== 'undefined') {
      gtag('config', GA_MEASUREMENT_ID, {
        page_path: pagePath || window.location.pathname
      });
      
      // Also send as event for more flexibility
      gtag('event', 'page_view', {
        page_path: pagePath || window.location.pathname,
        page_title: document.title
      });
    }
  }
  
  // ============================================
  // 3. CUSTOM EVENT TRACKING
  // ============================================
  
  // Button Click Tracking
  function trackButtonClick(buttonName, buttonLocation) {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'button_click', {
        event_category: 'engagement',
        event_label: buttonName,
        button_location: buttonLocation || 'unknown'
      });
    }
  }
  
  // Link Click / Navigation Tracking
  function trackNavigation(linkText, linkUrl) {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'navigation', {
        event_category: 'navigation',
        event_label: linkText || linkUrl,
        link_url: linkUrl || window.location.href
      });
    }
  }
  
  // PDF Download Tracking
  function trackPDFDownload(pdfName, pdfLocation) {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'file_download', {
        event_category: 'download',
        event_label: pdfName,
        file_type: 'PDF',
        file_location: pdfLocation || 'unknown'
      });
    }
  }
  
  // Form Submission Tracking
  function trackFormSubmit(formName, formLocation) {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'form_submission', {
        event_category: 'engagement',
        event_label: formName,
        form_location: formLocation || 'unknown'
      });
    }
  }
  
  // Experiment Started Tracking
  function trackExperimentStart(experimentId, experimentName) {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'experiment_started', {
        event_category: 'experiment',
        event_label: experimentName,
        experiment_id: experimentId
      });
    }
  }
  
  // Calculation Completed Tracking
  function trackCalculationComplete(experimentId, experimentName) {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'calculation_complete', {
        event_category: 'calculation',
        event_label: experimentName,
        experiment_id: experimentId
      });
    }
  }
  
  // ============================================
  // 4. SETUP EVENT LISTENERS
  // ============================================
  function setupEventListeners() {
    // Track all button clicks
    document.addEventListener('click', function(e) {
      const button = e.target.closest('button, a.btn');
      if (button) {
        const buttonText = button.textContent?.trim() || button.className;
        const buttonLocation = button.closest('section')?.querySelector('h2')?.textContent || 'unknown';
        trackButtonClick(buttonText, buttonLocation);
      }
    });
    
    // Track navigation links
    document.addEventListener('click', function(e) {
      const link = e.target.closest('a');
      if (link && link.href && !link.href.startsWith('javascript')) {
        const linkText = link.textContent?.trim() || link.className;
        trackNavigation(linkText, link.href);
      }
    });
    
    // Track PDF generation/download
    document.addEventListener('submit', function(e) {
      const form = e.target;
      if (form.action && form.action.includes('download_pdf')) {
        const formLocation = form.closest('section')?.querySelector('h2')?.textContent || 'unknown';
        trackFormSubmit('PDF Download', formLocation);
      }
    });
  }
  
  // ============================================
  // 5. INITIALIZE
  // ============================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      loadGoogleAnalytics();
      setupEventListeners();
    });
  } else {
    loadGoogleAnalytics();
    setupEventListeners();
  }
  
  // Export functions for manual tracking
  window.GAAnalytics = {
    trackPageView,
    trackButtonClick,
    trackNavigation,
    trackPDFDownload,
    trackFormSubmit,
    trackExperimentStart,
    trackCalculationComplete
  };
  
})();

// ============================================
// HOW TO USE IN YOUR CODE
// ============================================

/*
// Example 1: Track when user starts an experiment
<button onclick="GAAnalytics.trackExperimentStart(1, 'Water Hardness')">
  Start Experiment
</button>

// Example 2: Track when calculation is completed
<button onclick="GAAnalytics.trackCalculationComplete(1, 'Water Hardness')">
  Calculate
</button>

// Example 3: Track PDF download manually
<a href="#" onclick="GAAnalytics.trackPDFDownload('Exp1_Result', 'Experiment 1')">
  Download PDF
</a>

// Example 4: Manual page view tracking (for special routes)
GAAnalytics.trackPageView('/custom-page');
*/