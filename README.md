## Static Template Website Script Generator
This is a simple script that generates 10 unique static HTML pages.

## Desktop preview 
![image](https://user-images.githubusercontent.com/75990868/229975686-9006d444-c465-404a-92c6-e9f9a3da777f.png)
<br>

## Mobile preview 
![image](https://user-images.githubusercontent.com/75990868/229975885-100b2eeb-b4ce-4fe7-bd49-268aab059c5f.png)
<br>

## Lighthouse Score 
![lighthouse](https://user-images.githubusercontent.com/75990868/229908171-9fed23d4-0191-443b-a482-270d85edcfb1.png)

## Installation and Usage

To generate the static HTML pages, run the following command:

1. Clone the repository
   ```bash
   git clone https://github.com/AyushIyankan/Skillbee.git
   ```
2. Install required dependencies
   ```bash
   npm install
   ```
3. Start script
   ```bash
   npm start
   ```
4. You can see html files generated under ./src/pages. On each run, script will generate 10 unique html files.
5. Host the pages to github pages and destination url will be of form: 
https://username.github.io/reponame/src/pages/<filename.html>


## Help and troubleshooting
1. numberOfPages is defined in script, currently the script generates 10 unique web pages but under name website-i.html where i ranges from 1 to 10. In case you need to change the number of unique pages generated everytime just change the variable value.
2. Current configuration is to generate 10 unique pages everytime by replacing website-i.html where i ranges from 1 to 10. In case you need to persist old web pages generated, just comment out
    ```js
   const filename = `website-${fileIndex++}.html`;
   ```
   and uncomment the line
    ```js
   const filename = `page-${activity.toLowerCase().split(" ").join("-")}.html`;
   ```
   in generatePages.js
   

## Access Destination url's
1. If you have used the format
   ```js
   const filename = `website-${fileIndex++}.html`;
   ```
   then url will be of form
   ```text
   https://ayushiyankan.github.io/Skillbee/src/pages/<website-${i}>.html
   ```
   where i ranges from 1 - 10
2. Instead if you have used the format
   ```js
   const filename = `page-${activity.toLowerCase().split(" ").join("-")}.html`;
   ```
   then url will be of form
   ```text
   https://ayushiyankan.github.io/Skillbee/src/pages/<page-${lowercase-chained-format}>.html
   ```


Hosted Links:<br>
[Link website-1](https://ayushiyankan.github.io/Skillbee/src/pages/website-1.html)<br>
[Link website-2](https://ayushiyankan.github.io/Skillbee/src/pages/website-2.html)<br>
[Link website-3](https://ayushiyankan.github.io/Skillbee/src/pages/website-3.html)<br>
[Link website-4](https://ayushiyankan.github.io/Skillbee/src/pages/website-4.html)<br>
[Link website-5](https://ayushiyankan.github.io/Skillbee/src/pages/website-5.html)<br>
[Link website-6](https://ayushiyankan.github.io/Skillbee/src/pages/website-6.html)<br>
[Link website-7](https://ayushiyankan.github.io/Skillbee/src/pages/website-7.html)<br>
[Link website-8](https://ayushiyankan.github.io/Skillbee/src/pages/website-8.html)<br>
[Link website-9](https://ayushiyankan.github.io/Skillbee/src/pages/website-9.html)<br>
[Link website-10](https://ayushiyankan.github.io/Skillbee/src/pages/website-10.html)<br>
