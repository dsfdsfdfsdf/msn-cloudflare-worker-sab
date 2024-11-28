addEventListener('fetch', (event) => {
      event.respondWith(handleRequest(event.request));
    });
    async function handleRequest(request) {
      // Define an array of subscription URLs
      const subscriptionUrls = [
          'https://raw.githubusercontent.com/arshiacomplus/v2rayExtractor/refs/heads/main/vmess.html',
        'https://raw.githubusercontent.com/arshiacomplus/v2rayExtractor/refs/heads/main/trojan.html',
           'https://raw.githubusercontent.com/arshiacomplus/v2rayExtractor/refs/heads/main/hy2.html',
          'https://raw.githubusercontent.com/arshiacomplus/v2rayExtractor/refs/heads/main/tuic.html'
          // Add more URLs as needed
      ];
      // Fetch data from all subscription links concurrently
      const validResponses = await Promise.all(
          subscriptionUrls.map(async (url) => {
              const response = await fetch(url);
              if (response.status === 200) {
                  return response.text();
              }
              return null; // Ignore failed requests
          })
      );
      // Filter out null values (failed requests) and merge the responses
      const mergedData = validResponses.filter(Boolean).join('\r\n');
    
      // Create a response with the merged data
      return new Response(mergedData, {
          status: 200,
      });
    }
  
