


# Afloat

React Native for an app for providing payday cash advances to American workers. Visit [here](https://github.com/dartmouth-cs98/19w-quantweb-backend) for the backend.


## Architecture

1) React Native Framework
2) ExpoKit
3) React Native Router Flux for navigation
4) PLAID API with Dwolla integration
5) ExpressJS Backend [here](https://github.com/dartmouth-cs98/19w-quantweb-backend)
6) Native Base UI styled components 
7) Redux
8) Passport Authentication 

## Setup

1) Clone the repo
2) Navigate to the repo's root folder. 
3) You can specify whether you want to run the backend locally or hosted by changing `ROOT_URL` in `src/constants/config.js` to `http://localhost:3000` or `https://quantwebdev.me`, respectively
4) Run the following commands:
````
# install depencies
yarn
# start the ExpoKit development server
yarn start

````
5) Open the `ios/react-native-starter-kit.xcworkspace file` in Xcode
6) Click the play icon to build and run the the app. (Picking a simulator if none are selected)
7) A simulator should open, running the app

## Branches
* `master` is our stable branch
* `joe/dev` is Joe's dev branch, currently holding beta features (email verification, email updating, lazy loading transactions) that have not been merged with master
## Authors

Tyler Burnam, Azhar Hussain, Deven Orie, Joe Connolly

## Acknowledgments

We used the Macnamee Starter Pack as a foundation for our project.  You can view it [here](https://github.com/mcnamee/react-native-starter-kit)
