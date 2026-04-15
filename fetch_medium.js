const https = require('https');
const http = require('http');

const url = 'https://medium.com/@alexkrausephd/what-apple-and-elons-boring-company-taught-me-about-project-management-9e2a38a47016';

const options = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
    }
};

https.get(url, options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        // Look for og:image
        const ogMatch = data.match(/og:image"[^>]*content="([^"]+)"/);
        if (ogMatch) {
            console.log('og:image:', ogMatch[1]);
        }
        
        // Look for twitter:image
        const twMatch = data.match(/twitter:image"[^>]*content="([^"]+)"/);
        if (twMatch) {
            console.log('twitter:image:', twMatch[1]);
        }
        
        // Look for any image URLs
        const imgMatches = data.match(/https:\/\/[^"']+\.(jpg|jpeg|png|webp)/gi);
        if (imgMatches) {
            console.log('Images found:');
            imgMatches.slice(0, 10).forEach(img => console.log(' ', img));
        }
        
        if (!ogMatch && (!imgMatches || imgMatches.length === 0)) {
            console.log('No images found. Page length:', data.length);
            console.log('First 2000 chars:', data.slice(0, 2000));
        }
    });
}).on('error', err => console.error('Error:', err));
