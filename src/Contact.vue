<template>
  <div class="description_style">
    <ul>
      <li>We are passionate engineers from a small town in India with a Glocalization idea, working to address the gap between the technology and comfort.</li>
      <li>In 2023, it all started as a hobby project, slowly acquiring wings to fly as a small manufacturing unit catering the demands.</li>
      <li>In the products page, you shall see the list of products which we already supply the market.</li>
      <li>Feel free to contact us for your personalized Lighting Solutions.</li>
      <br />
      <li>Happy Lighting!</li>
    </ul>
  </div>

  <div class="info-grid">
    <div class="info-card">
      <h3>Legal Registration Details</h3>
      <p>GST: GSTIN 33JUHPK5441R1ZX</p>
      <p>MSME: UDYAM-TN-28-0165965</p>
      <p>Subject to Udumalpet Jurisdiction</p>
    </div>

    <div class="info-card center-align">
      <h3>Reach us at:</h3>
      <p>✉ <a href="mailto:info@inveh.in">info@inveh.in</a></p>
      <p>☎ +91 94877 41183</p>
    </div>

    <div class="info-card right-align">
      <h3>Visit us at:</h3>
      <p>Inveh Lighting Solutions,</p>
      <p>10A1, Poompugar nagar, Dhali road,</p>
      <p>Udumalpet - 642 154,</p>
      <p>Tamilnadu, India.</p>
    </div>
  </div>

  <div class="map-widget">
    <iframe
      title="Inveh Lighting Solutions Location"
      src="https://www.google.com/maps?q=Inveh%20Lighting%20Solutions%2C%20Udumalpet%2C%20Tamil%20Nadu%2C%20India&output=embed"
      width="350"
      height="350"
      style="border:0;"
      allowfullscreen
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"></iframe>
  </div>
</template>


<style scoped>
* {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.description_style {
  text-align: center;
  max-width: 1500px;
  margin: 0 auto;
  padding: 2rem;
}

.description_style ul {
  list-style-position: inside;
  padding-left: 0;
}

.description_style li {
  margin-bottom: 1rem;
  line-height: 1;
}

.info-grid {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 2rem;
  max-width: 1500px;
  margin: 3rem auto;
  padding: 0 2rem;
}

.info-card {
  flex: 1 1 280px;
  text-align: left;
  line-height: 1.5;
}

.info-card.right-align {
  text-align: right;
}

.info-card.center-align {
  text-align: center;
}

.info-card h3 {
  margin-bottom: 1rem;
  color: #333;
}

.info-card p {
  margin: 0.5rem 0;
  color: #555;
  display: block;
}

.info-card a {
  color: #0A66C2;
  text-decoration: none;
}

.info-card a:hover {
  text-decoration: underline;
}

.map-widget {
  max-width: 350px;
  margin: 0 auto 2rem auto;
}

.map-widget iframe {
  display: block;
  margin: 0 auto;
}
</style>