function waitForElement(selector, timeout = 10000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    function check() {
      const element = document.querySelector(selector);
      if (element) {
        resolve(element);
      } else if (Date.now() - startTime > timeout) {
        reject(new Error(`Element ${selector} not found within ${timeout}ms`));
      } else {
        setTimeout(check, 100);
      }
    }
    
    check();
  });
}

function executeNewChatPrompt(prompt, model = null) {
  waitForElement('textarea[placeholder*="type your message"], input[placeholder*="type your message"], [placeholder*="type your message here"]')
    .then(textArea => {
      textArea.value = prompt;
      textArea.dispatchEvent(new Event('input', { bubbles: true }));
      textArea.dispatchEvent(new Event('change', { bubbles: true }));
      
      return waitForElement('button[type="submit"], button:has(svg), .send-button, [role="button"]:has(svg)');
    })
    .then(sendButton => {
      setTimeout(() => {
        sendButton.click();
      }, 500);
    })
    .catch(error => {
      console.error('Failed to execute new chat prompt:', error);
    });
}

window.addEventListener('load', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const prompt = urlParams.get('prompt');
  const model = urlParams.get('model');
  
  if (prompt) {
    setTimeout(() => {
      executeNewChatPrompt(decodeURIComponent(prompt), model);
    }, 2000);
  }
});

window.executeNewChatPrompt = executeNewChatPrompt;