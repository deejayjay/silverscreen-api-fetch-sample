# silverscreen-api-fetch-sample

This is a boilerplate for web apps built using HTML, CSS/Scss and JavaScript and uses parcel bundler

## How to setup the project?

1. After downloading the contents of the Github repository or forking it, open the `silverscreen-api-fetch-sample` folder in VSCode, then run the following command to install all required node dependencies (parcel & sass):

```npm
npm install
```

2. If you have already installed and setup the extension `DartJS Sass Compiler and Sass Watcher`, skip to step 7.
3. Install the VSCode extension `DartJS Sass Compiler and Sass Watcher`.
4. After completing step 2 successfully, lookup `DartJS Sass Compiler and Sass Watcher` in the list of extensions, right click on the extension and then click on `Extension Settings`.
5. Scroll down to find the setting `Dartsass: Sass Bin Path` and set the path to `node_modules\sass\sass.js`.
6. Set the `Dartsass: Target Directory` path to `./src/css`.
7. Now, right click on the `src/scss` folder and click on the `DartSass: Sass Watch`.
8. Add a new file in the `silverscreen-api-fetch-sample` folder and name it `.env`.
9. Add the following content to the `.env` file that you just created: `SILVERSCREEN_FETCH_SAMPLE_API_KEY=your_api_key`.
10. Replace the `your_api_key` with the API key you got from [Movie DB API](https://www.themoviedb.org/).

## How to launch the application

To launch the web app, open the terminal and run the command `npm start`.
