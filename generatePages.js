const fs = require("fs");
const ejs = require("ejs");
const axios = require("axios");
const { describe, it } = require("node:test");
const { readdir } = require("fs/promises");
const { expect } = require("chai");

//Calculate directory size (number of static pages present)
//If number of static pages not equal to 10 generate till it reaches 10
let requiredPages = 10;

const dirSize = async (directory) => {
  const files = await readdir(directory);
  return files.length;
};

(async () => {
  const size = await dirSize("./src/pages");
  numberOfPages = size;
  console.log(size);
})().then(() => {
  gotNumberOfPages = true;
});

//API URL
const apiUrl = "https://www.boredapi.com/api/activity";

// Define a function to get the data from the API
async function getDataFromApi() {
  const response = await axios.get(apiUrl);
  return response.data;
}

// EJS template
const template = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="../styles/page.css" />
    <title><%= activity %></title>
  </head>
  <body>
    <div class="activity__container">
        <div class="activity__container__left">
            <div class="activity__container__main">
                <div class="activity__key">
                    <p><%= key %></p>
                </div>
                <div class="activity__header">
                    <div class="title__subtitle__flex">
                        <div class="activity__title">
                            <h2><%= activity %></h2>
                        </div>
                        <div class="activity__subtitle">
                            <h4>Outdoor & Sporting Goods Company</h4>
                        </div>
                    </div>
                    <div class="button__sub__flex">
                        <div class="explore-more">
                            <button>
                                <div class="explore-more__text">
                                    <p>EXPLORE MORE</p>
                                </div>
                                <div class="explore-more__arrow">
                                    <i class="fa-light fa-arrow-right-long"></i>
                                </div>
                            </button>
                        </div>
                        <div class="sub-description__text">
                            <p>We have more special goods for you 🚀</p>
                        </div>
                    </div>
                </div>
                <div class="product-outlet__flex">
                    <div class="product-count__flex">
                        <div class="more-than">
                            <p>More than</p>
                        </div>
                        <div class="product-count">
                            <h2>50+</h2>
                        </div>
                        <div class="product-genre">
                            <h4>adventure product</h4>
                        </div>
                    </div>
                    <div class="outlet-count__flex">
                        <div class="more-than">
                            <p>More than</p>
                        </div>
                        <div class="product-count">
                            <h2>75+</h2>
                        </div>
                        <div class="outlet-country">
                            <h4>OUTLET IN INDONESIA</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="activity__container__footer">
          <div class="content__flex">
            <div class="accessibility__flex">
              <div class="accessibility__icon">
                <img src="../assets/images/accessibility-icon.png" alt="" />
              </div>
              <div class="accessibility__text__flex">
                <div class="accessibility__title">
                  <p>accessibility</p>
                </div>
                <div class="accessibility__value">
                                             <h4><%= accessibility %></h4>

                </div>
              </div>
            </div>
            <div class="type__flex">
              <div class="type__icon">
                <img src="../assets/images/type-icon.png" alt="" />
              </div>
              <div class="type__text__flex">
                <div class="type__title">
                  <p>type</p>
                </div>
                <div class="type__value">
                  <h4><%= type %></h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div class="activity__container__right">
            <div class="activity__container__right__header">
                <div class="price__title">
                    <h4>Price</h4>
                </div>
                <div class="price__value">
                    <h4><%= price %></h4>
                </div>
            </div>
        <div class="active__container__right__image">
          <img
            src="../assets/images/activity-container-right-footer.png"
            alt="Activity container right image"
          />
        </div>
        </div>
    </div>
  </body>
</html>
`;

// Function to generate the HTML for a page
function generateHtml(
  activity,
  type,
  participants,
  price,
  link,
  key,
  accessibility
) {
  return ejs.render(template, {
    activity,
    type,
    participants,
    price,
    link,
    key,
    accessibility,
  });
}

// Function to write a page to a file
function writePageToFile(
  activity,
  type,
  participants,
  price,
  link,
  key,
  accessibility,
  filename
) {
  // Template generator
  const html = generateHtml(
    activity,
    type,
    participants,
    price,
    link,
    key,
    accessibility
  );

  // Write file into directory
  fs.writeFileSync(`./src/pages/${filename}`, html);
}

// Generate pages
let iterator = 0;
while (iterator < requiredPages) {
  // We need only 10 files at a time

  // Get data from api, write one by one onto template
  getDataFromApi().then((data) => {
    // Properties
    const activityData = data;
    const activity = activityData.activity;
    const type = activityData.type;
    const participants = activityData.participants;
    const price = activityData.price;
    const link = activityData.link;
    const key = activityData.key;
    const accessibility = activityData.accessibility;
    const filename = `page-${activity.toLowerCase().split(" ").join("-")}.html`;

    // Write page from template onto '../src/pages'
    try {
      writePageToFile(
        activity,
        type,
        participants,
        price,
        link,
        key,
        accessibility,
        filename
      );

      // Success
      console.log(`Wrote file ${filename}`);
    } catch (error) {
      console.log("Ohno, something went wrong");
      return;
    }
  });

  iterator++;
}

// Function to test page generation
async function checkRequiredPagesGenerated() {
  let report = iterator >= 10 ? true : false;
  return report;
}

// Define tests
describe("PageGenerated Test", () => {
  it(`Should generate ${requiredPages} pages.`, async () => {
    const report = await checkRequiredPagesGenerated();
    expect(report).to.equal(true);
  });
});
