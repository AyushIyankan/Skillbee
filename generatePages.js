const fs = require("fs");
const ejs = require("ejs");
const axios = require("axios");
const { describe, it } = require("node:test");
const { readdir } = require("fs/promises");
const { expect } = require("chai");

// Define required pages
let requiredPages = 10;

// API URL
const apiUrl = "https://www.boredapi.com/api/activity";

// Function to get the data from the API
async function getDataFromApi() {
  const response = await axios.get(apiUrl);
  return response.data;
}

// EJS template
const template = fs.readFileSync("src/views/template.ejs", "utf-8");

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
let fileIndex = 1;

// We need only 10 files at a time
while (iterator < requiredPages) {
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
//     const filename = `page-${activity.toLowerCase().split(" ").join("-")}.html`; // geenerate unique pages and don't overwrite existing file.
    const filename = `website-${fileIndex++}.html`; // overwrite existing files and then generate unique pages

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
  let report = iterator === 10 ? true : false;
  return report;
}

async function checkMoreRequiredPagesGenerated() {
  let report = iterator > 10 ? true : false;
  return report;
}

async function checkLessRequiredPagesGenerated() {
  let report = iterator < 10 ? true : false;
  return report;
}

// Define tests
describe("PageGenerated Test", () => {
  it(`Should generate ${requiredPages} pages.`, async () => {
    const report = await checkRequiredPagesGenerated();
    expect(report).to.equal(true);
  });

  it(`Should not generate more than ${requiredPages} pages.`, async () => {
    const reportMore = await checkMoreRequiredPagesGenerated();
    expect(reportMore).to.equal(false);
  });

  it(`Should not generate less than ${requiredPages} pages.`, async () => {
    const reportLess = await checkLessRequiredPagesGenerated();
    expect(reportLess).to.equal(false);
  });
});
