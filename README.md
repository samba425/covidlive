# Corona

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
"# Corona" 
#   c o v i d l i v e 
 
 


## for depploying in gh-pages
npm install -g angular-cli-ghpages

Now, go to github repo and your code should be uploaded to master branch on github
Next Install the angular-gh-pages using npm:
npm install -g angular-cli-ghpages
Now, Production Build the Application using:
ng build --prod --base-href "https://<username>.github.io/<reponame>/"
Atlast, create the gh-pages branch, also upload the build and bundled code to this branch using :
ngh --dir dist
Open the URL and You will get our Angular App Deployed: