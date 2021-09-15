# React Gallery

Greetings,

Welcome to React Gallery.

Please find a deployed version of this project
[here](http://www.waxworlds.org/dan/react_gallery/)

Below is a summary of the technologies used in this project:
### Back End
    - NodeJS
    - NPM
        - Express router
        - Archiver
        - Sharp
    - AJAX/XHR
    - Bundlers, trans-compilers and other build tools
        - Create-React-App
        - Webpack
        - Babel
        - Nodemon
    - Deployment
        - Apache Web Server
        - SSH & SCP
        - Bash Scripts


###Front End
    - Javascript
    - Frameworks & APIs
        - React
        - React-Spring
        - Redux
            - Redux-Logger
            - Redux-Thunk
    - HTML
    - CSS

# To download and run this project:
  1. Clone master branch of GitHub repository to local folder
  2. Using Node Package Manager install all dependencies, type the following
     command:
    `npm install`
  3. To run the project enter:
    `npm run start`

The project should be opened up automatically in your default browser

# To deploy to server subdirectory:
  1. Follow the above instructions to install the project
  2. Edit file package.json and change the `homepage` value (the first entry) to
     the subdirectory that you are deploying to. For example if you are
     deploying to http://yourServer.com/subdirectory/react_gallery/
     change the `homepage` value to `/subdirectory/react_gallery`
  3. Run the following command:
     `npm run build`
  4. Finally copy the contents of the newly created `build` directory to your
     deployment directory on your server
