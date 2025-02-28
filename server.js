require('dotenv').config();
const fs = require('fs');
const express = require('express');
const axios = require('axios');
const schedule = require('node-schedule');
const app = express();

const REFRESH_SITE_LIST_MINUTES = process.env.REFRESH_SITE_LIST_MINUTES || 5;
const TITLE = process.env.TITLE || "Hub";
const PORT = process.env.PORT || 8003;
const FAVICON = "./favicon." + process.env.FAVICON_EXTENSION || "";
const BACKGROUND = "./background." + process.env.BACKGROUND_EXTENSION || "";
const EXCEPTIONS = process.env.EXCEPTIONS?.split(' ') || [];
const SITES = JSON.parse(fs.readFileSync('sites.json'));

const COLORS = {
  background: process.env.COLOR_BACKGROUND || "#22222c",
  backgroundHover: process.env.COLOR_BACKGROUND_HOVER || "#161624",
  linkBorder: process.env.COLOR_LINK_BORDER || "#f23634",
  linkBorderDisabled: process.env.COLOR_LINK_BORDER_DISABLED || "#4a5560",
  linkBorderAnimation: process.env.COLOR_LINK_BORDER_ANIMATION || "#72181c",
  text: process.env.COLOR_TEXT || "#ffffff",
}

const FONT_FAMILY  = process.env.FONT_FAMILY || "'Varela Round', sans-serif";
const IS_TITLE_CLICKABLE = process.env.IS_TITLE_CLICKABLE == 'true';
const TITLE_LINK = process.env.TITLE_LINK || "";

app.set('view engine', 'ejs');

app.use(express.static('public'));

const exceptions = EXCEPTIONS;
const updateSites = async () => {
  await Promise.all(
    SITES.map(async (site) => {
      if (!(exceptions.includes(site.name))) {
        try {
          await axios.get(site.url);
          site.disabled = false;
        } catch (error) {
          site.disabled = true;
        }
      }
      else {
        site.disabled = true;
      }
    })
  );
  console.log('Site list updated', new Date());
};

schedule.scheduleJob(`*/${REFRESH_SITE_LIST_MINUTES}* * * *`, () => {
  updateSites();
});

updateSites();

app.get('/', (req, res) => {
  res.render('index', { title: TITLE, sites:SITES, favicon:FAVICON, background:BACKGROUND, colors: COLORS, fontFamily: FONT_FAMILY, isTitleClickable: IS_TITLE_CLICKABLE, titleLink: TITLE_LINK });
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
