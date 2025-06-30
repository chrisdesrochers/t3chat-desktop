// Google Authentication Helper for T3 Chat Desktop App
// This script provides a pre-authentication flow for Google services

class GoogleAuthHelper {
  constructor() {
    this.authWindow = null;
    this.isAuthenticated = false;
  }

  // Create a pre-auth flow that opens Google login
  async preAuthenticate() {
    return new Promise((resolve, reject) => {
      // Create overlay for auth flow
      this.createAuthOverlay();
      
      // Open Google auth in a separate window/frame
      this.authWindow = window.open(
        'https://accounts.google.com/signin',
        'googleAuth',
        'width=500,height=600,scrollbars=yes,resizable=yes'
      );

      // Monitor the auth window
      const checkClosed = setInterval(() => {
        if (this.authWindow.closed) {
          clearInterval(checkClosed);
          this.checkAuthStatus().then(resolve).catch(reject);
        }
      }, 1000);

      // Timeout after 5 minutes
      setTimeout(() => {
        if (this.authWindow && !this.authWindow.closed) {
          this.authWindow.close();
        }
        clearInterval(checkClosed);
        reject(new Error('Authentication timeout'));
      }, 300000);
    });
  }

  // Check if user is authenticated with Google
  async checkAuthStatus() {
    try {
      // Test Google auth by making a simple request
      const response = await fetch('https://accounts.google.com/signin', {
        method: 'HEAD',
        credentials: 'include'
      });
      
      this.isAuthenticated = response.ok;
      return this.isAuthenticated;
    } catch (error) {
      console.warn('Auth check failed:', error);
      this.isAuthenticated = false;
      return false;
    }
  }

  // Create overlay UI for authentication flow
  createAuthOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'google-auth-overlay';
    overlay.innerHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      ">
        <div style="
          background: white;
          padding: 30px;
          border-radius: 12px;
          max-width: 400px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        ">
          <h2 style="margin-top: 0; color: #333;">Authenticate with Google</h2>
          <p style="color: #666; margin-bottom: 20px;">
            A Google sign-in window has opened. Please complete authentication, 
            then close the window to continue to T3 Chat.
          </p>
          <div style="
            border: 2px dashed #ddd;
            padding: 15px;
            border-radius: 6px;
            margin: 15px 0;
            color: #999;
          ">
            Waiting for authentication...
          </div>
          <button onclick="window.googleAuthHelper.skipAuth()" style="
            background: #6c757d;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 10px;
          ">
            Skip (may cause login issues)
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(overlay);
  }

  // Remove auth overlay
  removeAuthOverlay() {
    const overlay = document.getElementById('google-auth-overlay');
    if (overlay) {
      overlay.remove();
    }
  }

  // Skip authentication (proceed anyway)
  skipAuth() {
    this.removeAuthOverlay();
    this.proceedToT3Chat();
  }

  // Proceed to T3 Chat after authentication
  proceedToT3Chat() {
    this.removeAuthOverlay();
    
    // Redirect to T3 Chat or remove overlay to show existing content
    if (window.location.href === 'about:blank' || window.location.href.includes('auth-helper')) {
      window.location.href = 'https://t3.chat/';
    }
  }

  // Initialize the helper
  init() {
    // Check if we need to show auth flow
    if (window.location.search.includes('auth=true') || !this.isAuthenticated) {
      this.preAuthenticate()
        .then(() => {
          console.log('Google authentication completed');
          this.proceedToT3Chat();
        })
        .catch(error => {
          console.error('Authentication failed:', error);
          this.proceedToT3Chat(); // Proceed anyway
        });
    }
  }
}

// Initialize when page loads
window.addEventListener('load', () => {
  window.googleAuthHelper = new GoogleAuthHelper();
  
  // Only run auth helper if explicitly requested
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('auth') === 'true') {
    window.googleAuthHelper.init();
  }
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GoogleAuthHelper;
}