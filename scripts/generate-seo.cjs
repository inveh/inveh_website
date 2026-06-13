const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://www.inveh.in';
const DIST_DIR = path.join(__dirname, '../dist');
const PUBLIC_DIR = path.join(__dirname, '../public');

// Parse products from src/data/products.ts using a custom state-machine brace parser
function parseProducts() {
  const productsFilePath = path.join(__dirname, '../src/data/products.ts');
  if (!fs.existsSync(productsFilePath)) {
    console.error(`Error: Products file not found at ${productsFilePath}`);
    return [];
  }

  const content = fs.readFileSync(productsFilePath, 'utf8');

  // Find productCategories array start and end
  const startIdx = content.indexOf('export const productCategories');
  if (startIdx === -1) {
    console.error('Could not find productCategories in products.ts');
    return [];
  }
  const arrayStart = content.indexOf('[', startIdx);
  const arrayEnd = content.lastIndexOf(']');
  const arrayContent = content.substring(arrayStart + 1, arrayEnd);

  const products = [];
  let braceCount = 0;
  let currentBlock = '';
  let inString = false;
  let stringChar = '';

  for (let i = 0; i < arrayContent.length; i++) {
    const char = arrayContent[i];
    
    // Handle quotes to prevent matching braces inside strings
    if ((char === "'" || char === '"' || char === '`') && arrayContent[i-1] !== '\\') {
      if (!inString) {
        inString = true;
        stringChar = char;
      } else if (stringChar === char) {
        inString = false;
      }
    }
    
    if (!inString) {
      if (char === '{') {
        braceCount++;
      } else if (char === '}') {
        braceCount--;
      }
    }
    
    currentBlock += char;
    
    if (braceCount === 0 && currentBlock.trim() !== '') {
      if (currentBlock.includes('model_num')) {
        products.push(currentBlock);
      }
      currentBlock = '';
    }
  }

  const parseField = (block, fieldName) => {
    const regex = new RegExp(`${fieldName}\\s*:\\s*(['"\`]?)([\\s\\S]*?)\\1\\s*(?:,|\\n|$)`);
    const match = block.match(regex);
    if (match) {
      let val = match[2].trim();
      if ((val.startsWith("'") && val.endsWith("'")) || 
          (val.startsWith('"') && val.endsWith('"')) || 
          (val.startsWith('`') && val.endsWith('`'))) {
        val = val.substring(1, val.length - 1);
      }
      return val;
    }
    return '';
  };

  return products.map(block => {
    const model_name = parseField(block, 'model_name');
    const model_num = parseField(block, 'model_num');
    const model_price = Number(parseField(block, 'model_price') || 0);
    const discount = Number(parseField(block, 'discount') || 0);
    const description = parseField(block, 'description');
    const title = parseField(block, 'title');

    // Extract images
    const imageRegex = /getImagePath\(['"`](.*?)['"`]\)/g;
    let imgMatch;
    const images = [];
    while ((imgMatch = imageRegex.exec(block)) !== null) {
      images.push('/' + imgMatch[1]);
    }

    return {
      title,
      model_name,
      model_num,
      model_price,
      discount,
      description,
      images
    };
  });
}

// Generate sitemap.xml
function generateSitemap(products) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <!-- Homepage -->
  <url>
    <loc>${SITE_URL}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Contact page -->
  <url>
    <loc>${SITE_URL}/Contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Product pages -->
`;

  products.forEach(p => {
    xml += `  <url>
    <loc>${SITE_URL}/product/${p.model_num}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  });

  xml += `\n</urlset>`;

  // Write sitemap to public/ and dist/
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), xml, 'utf8');
  if (fs.existsSync(DIST_DIR)) {
    fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), xml, 'utf8');
  }
  console.log('Successfully generated sitemap.xml (dynamic)');
}

// Generate robots.txt
function generateRobots() {
  const robots = `# robots.txt for www.inveh.in
User-agent: *
Allow: /

# Block non-existent pages from crawling
Disallow: /home
Disallow: /about-us
Disallow: /pendant-lights

# Block Firebase Hosting internal routes (not real pages)
Disallow: /_/

Sitemap: ${SITE_URL}/sitemap.xml
`;

  fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), robots, 'utf8');
  if (fs.existsSync(DIST_DIR)) {
    fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robots, 'utf8');
  }
  console.log('Successfully generated robots.txt');
}

// Generate page HTML based on template, head and body content
function generateHtmlPage(template, headHtml, bodyHtml) {
  // Replace the SEO block
  let html = template.replace(/<!-- SEO_START -->[\s\S]*?<!-- SEO_END -->/, `<!-- SEO_START -->\n${headHtml}\n    <!-- SEO_END -->`);
  // Replace the app container with fallback body
  html = html.replace('<div id="app"></div>', `<div id="app">${bodyHtml}</div>`);
  return html;
}

// Ensure directory exists recursively
function ensureDirectoryExists(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExists(dirname);
  fs.mkdirSync(dirname);
}

// Main execution
function main() {
  console.log('Starting SEO Generation Script...');

  const templatePath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error(`Error: Built index.html template not found at ${templatePath}. Run build first!`);
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath, 'utf8');
  const products = parseProducts();
  console.log(`Parsed ${products.length} products successfully.`);

  // 1. Generate Sitemap and Robots
  generateSitemap(products);
  generateRobots();

  // 2. Prerender Home page
  const homeHead = `    <title>Inveh Lighting Solutions – Handcrafted Wooden LED Lamps | Udumalpet, India</title>
    <meta name="description" content="Inveh Lighting Solutions crafts premium handmade wooden LED pendant lamps, tube lights, and personalised gifts. Shop unique eco-friendly lighting for homes and offices. Based in Udumalpet, Tamil Nadu, India.">
    <meta name="keywords" content="wooden LED lamps India, handmade pendant lamp, wooden lighting solutions, eco-friendly lamps, personalised lamp gifts, Udumalpet lighting, inveh lighting">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="${SITE_URL}/">

    <!-- Open Graph (Facebook / Instagram / WhatsApp) -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="${SITE_URL}/">
    <meta property="og:site_name" content="Inveh Lighting Solutions">
    <meta property="og:title" content="Inveh Lighting Solutions – Handcrafted Wooden LED Lamps">
    <meta property="og:description" content="Discover unique handcrafted wooden LED pendant lamps, tube lights and personalised gifts. Made in India by passionate engineers.">
    <meta property="og:image" content="${SITE_URL}/inveh_logo.webp">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Inveh Lighting Solutions – Handcrafted Wooden LED Lamps">
    <meta name="twitter:description" content="Discover unique handcrafted wooden LED pendant lamps, tube lights and personalised gifts. Made in India by passionate engineers.">
    <meta name="twitter:image" content="${SITE_URL}/inveh_logo.webp">

    <!-- JSON-LD: Organization -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Inveh Lighting Solutions",
      "url": "${SITE_URL}",
      "logo": "${SITE_URL}/inveh_logo.webp",
      "description": "Inveh Lighting Solutions crafts premium handmade wooden LED pendant lamps, tube lights, and personalised gifts.",
      "foundingDate": "2023",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "10A1, Poompugar Nagar, Dhali Road",
        "addressLocality": "Udumalpet",
        "postalCode": "642154",
        "addressRegion": "Tamil Nadu",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-94877-41183",
        "email": "info@inveh.in",
        "contactType": "Customer Service",
        "areaServed": "IN"
      },
      "sameAs": [
        "https://www.instagram.com/inveh_lighting/"
      ]
    }
    </script>

    <!-- JSON-LD: LocalBusiness -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Inveh Lighting Solutions",
      "image": "${SITE_URL}/inveh_logo.webp",
      "url": "${SITE_URL}",
      "telephone": "+91-94877-41183",
      "email": "info@inveh.in",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "10A1, Poompugar Nagar, Dhali Road",
        "addressLocality": "Udumalpet",
        "postalCode": "642154",
        "addressRegion": "Tamil Nadu",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 10.5924,
        "longitude": 77.2546
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      "priceRange": "₹100 – ₹1500"
    }
    </script>`;

  let homeBodyProductsList = '';
  products.forEach(p => {
    const priceText = p.model_price > 0 
      ? (p.discount > 0 
          ? `Rs. ${p.model_price - p.discount} <del>Rs. ${p.model_price}</del>` 
          : `Rs. ${p.model_price}`)
      : '';
    homeBodyProductsList += `
      <article>
        <a href="/product/${p.model_num}">
          <h3>${p.model_name}</h3>
          <p>SKU: ${p.model_num} | ${priceText}</p>
          <p>${p.description}</p>
        </a>
      </article>`;
  });

  const homeBody = `
    <header>
      <nav><a href="/">Home</a> | <a href="/Contact">Contact</a></nav>
      <h1>INVEH – Handcrafted Wooden LED Lamps</h1>
    </header>
    <main>
      <section>
        <h2>About Us</h2>
        <p>Welcome to Inveh Lighting Solutions — where nature meets craftsmanship. Each piece in our collection is handcrafted from premium pine wood, engineered wood and acrylic using state-of-the-art techniques. We blend modern manufacturing with artisanal warmth to create lamps that don't just illuminate a room — they transform it.</p>
      </section>
      <section>
        <h2>Our Lighting Collection</h2>
        ${homeBodyProductsList}
      </section>
    </main>
    <footer>
      <p>&copy; 2026 Inveh Lighting. All Rights Reserved.</p>
    </footer>`;

  const homeHtml = generateHtmlPage(template, homeHead, homeBody);
  fs.writeFileSync(templatePath, homeHtml, 'utf8');
  console.log('Prerendered Home page: /index.html');

  // 3. Prerender Contact page
  const contactHead = `    <title>Contact Us – Inveh Lighting Solutions | Udumalpet, Tamil Nadu</title>
    <meta name="description" content="Get in touch with Inveh Lighting Solutions. Reach us by email at info@inveh.in or call +91 94877 41183. Based in Udumalpet, Tamil Nadu, India.">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="${SITE_URL}/Contact">

    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="${SITE_URL}/Contact">
    <meta property="og:site_name" content="Inveh Lighting Solutions">
    <meta property="og:title" content="Contact Us – Inveh Lighting Solutions">
    <meta property="og:description" content="Reach us by email at info@inveh.in or call +91 94877 41183. Based in Udumalpet, Tamil Nadu, India.">
    <meta property="og:image" content="${SITE_URL}/inveh_logo.webp">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Contact Us – Inveh Lighting Solutions">
    <meta name="twitter:description" content="Get in touch with Inveh Lighting Solutions. Based in Udumalpet, Tamil Nadu, India.">
    <meta name="twitter:image" content="${SITE_URL}/inveh_logo.webp">`;

  const contactBody = `
    <header>
      <nav><a href="/">Home</a> | <a href="/Contact">Contact</a></nav>
      <h1>Contact Us - Inveh Lighting Solutions</h1>
    </header>
    <main>
      <section>
        <p>We are passionate engineers from a small town in India with a Glocalization idea, working to address the gap between the technology and comfort.</p>
        <p>In 2023, it all started as a hobby project, slowly acquiring wings to fly as a small manufacturing unit catering the demands.</p>
        <p>In the products page, you shall see the list of products which we already supply the market.</p>
        <p>Feel free to contact us for your personalized Lighting Solutions.</p>
        <p>Happy Lighting!</p>
      </section>
      <section>
        <h2>Reach us at:</h2>
        <p>Email: <a href="mailto:info@inveh.in">info@inveh.in</a></p>
        <p>Phone: +91 94877 41183</p>
      </section>
      <section>
        <h2>Legal Registration Details</h2>
        <p>GST: GSTIN 33JUHPK5441R1ZX</p>
        <p>MSME: UDYAM-TN-28-0165965</p>
        <p>Subject to Udumalpet Jurisdiction</p>
      </section>
      <section>
        <h2>Visit Us</h2>
        <p>Inveh Lighting Solutions, 10A1, Poompugar nagar, Dhali road, Udumalpet - 642 154, Tamilnadu, India.</p>
      </section>
    </main>
    <footer>
      <p>&copy; 2026 Inveh Lighting. All Rights Reserved.</p>
    </footer>`;

  const contactHtml = generateHtmlPage(template, contactHead, contactBody);
  const contactDest = path.join(DIST_DIR, 'Contact/index.html');
  ensureDirectoryExists(contactDest);
  fs.writeFileSync(contactDest, contactHtml, 'utf8');
  console.log('Prerendered Contact page: /Contact/index.html');

  // 4. Prerender each Product Detail page
  products.forEach(p => {
    const sellingPrice = p.model_price - p.discount;
    const priceText = p.model_price > 0 
      ? (p.discount > 0 
          ? `Rs. ${sellingPrice} <del>Rs. ${p.model_price}</del>` 
          : `Rs. ${p.model_price}`)
      : '';
    const productTitle = `${p.model_name} – Inveh Lighting Solutions | Handcrafted Wooden LED Lamp`;
    const productDesc = p.description
      ? `${p.description} | Buy ${p.model_name} from Inveh Lighting Solutions.`
      : `Buy the ${p.model_name} handcrafted wooden LED lamp from Inveh Lighting Solutions. Starting at Rs. ${sellingPrice}.`;
    const productImage = p.images[0]
      ? `${SITE_URL}${p.images[0]}`
      : `${SITE_URL}/inveh_logo.webp`;

    const productHead = `    <title>${productTitle}</title>
    <meta name="description" content="${productDesc}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="${SITE_URL}/product/${p.model_num}">

    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="${SITE_URL}/product/${p.model_num}">
    <meta property="og:site_name" content="Inveh Lighting Solutions">
    <meta property="og:title" content="${p.model_name} – Inveh Lighting Solutions">
    <meta property="og:description" content="${p.description || 'Handcrafted wooden LED lamp by Inveh Lighting Solutions.'}">
    <meta property="og:image" content="${productImage}">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${p.model_name} – Inveh Lighting Solutions">
    <meta name="twitter:description" content="${p.description || 'Handcrafted wooden LED lamp by Inveh Lighting Solutions.'}">
    <meta name="twitter:image" content="${productImage}">

    <!-- JSON-LD: Product Schema -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "${p.model_name}",
      "sku": "${p.model_num}",
      "description": "${p.description.replace(/"/g, '\\"')}",
      "image": ${JSON.stringify(p.images.map(img => `${SITE_URL}${img}`))},
      "brand": {
        "@type": "Brand",
        "name": "Inveh Lighting Solutions"
      },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "INR",
        "price": ${sellingPrice},
        "availability": "https://schema.org/InStock",
        "url": "${SITE_URL}/product/${p.model_num}",
        "seller": {
          "@type": "Organization",
          "name": "Inveh Lighting Solutions"
        }
      }
    }
    </script>`;

    const productBody = `
    <header>
      <nav><a href="/">Home</a> | <a href="/Contact">Contact</a></nav>
      <h1>${p.model_name} - Inveh Lighting Solutions</h1>
    </header>
    <main>
      <article>
        <h2>${p.model_name}</h2>
        <p>SKU: ${p.model_num}</p>
        <p class="price">Price: ${priceText}</p>
        <div class="description">
          <p>${p.description}</p>
        </div>
        <div class="gallery">
          ${p.images.map((img, idx) => `<img src="${img}" alt="${p.model_name} view ${idx + 1}" />`).join('\n          ')}
        </div>
        <p><a href="/">Back to Home Catalog</a></p>
      </article>
    </main>
    <footer>
      <p>&copy; 2026 Inveh Lighting. All Rights Reserved.</p>
    </footer>`;

    const productHtml = generateHtmlPage(template, productHead, productBody);
    const productDest = path.join(DIST_DIR, `product/${p.model_num}/index.html`);
    ensureDirectoryExists(productDest);
    fs.writeFileSync(productDest, productHtml, 'utf8');
  });

  console.log(`Prerendered ${products.length} product detail pages successfully.`);
  console.log('SEO Generation Complete!');
}

main();
