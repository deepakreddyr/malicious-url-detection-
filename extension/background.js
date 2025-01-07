// background.js

// Function to send the URL to the Flask backend for analysis
async function checkUrl(url) {
    const apiEndpoint = "http://127.0.0.1:5000/api/check-url"; // Replace with your deployed backend URL
  
    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
  
      if (response.ok) {
        const data = await response.json();
        return data.result; // Contains is_malicious, confidence, processed_url
      } else {
        console.error("Error from the API:", response.statusText);
        return null;
      }
    } catch (error) {
      console.error("Error contacting the API:", error);
      return null;
    }
  }
  
  // Show notification when a URL is flagged as malicious
  function showNotification(url, confidence) {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icon.png", // Replace with your extension's icon
      title: "Malicious URL Detected!",
      message: `The URL "${url}" is flagged as malicious with ${confidence}% confidence. You have been redirected to a safe page.`,
      priority: 2,
    });
  }
  
  // Monitor when the user navigates to a new URL
  chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.url) {
      console.log(`Checking URL: ${changeInfo.url}`);
  
      // Check the URL
      const result = await checkUrl(changeInfo.url);
  
      if (result) {
        console.log("URL analysis result:", result);
  
        // If the URL is malicious
        if (result.is_malicious) {
          // Show a notification
          showNotification(result.processed_url, result.confidence);
  
          // Redirect to a safe page
          chrome.tabs.update(tabId, { url: "https://www.google.com" }); // Replace with your desired safe page URL
        }
      }
    }
  });
  
  // Clear notifications on click
  chrome.notifications.onClicked.addListener((notificationId) => {
    chrome.notifications.clear(notificationId);
  });
  