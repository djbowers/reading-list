# Reading List

Command line application that allows you to use the Google Books API to search for books and construct a reading list.

## Getting Started

To run the application, use `npm start`.

## Tests

To run the test suite, use `npm test`.

## Approach

Initially, I attempted to write this application using a more functional approach, using promises and recursion to continue asking the user for input. This was working well initially, and I had a test framework set up to write tests using mocha and chai, but I couldn’t quite figure out how to get the control flow to execute properly.

Since I’m newer to functional programming, I decided that instead of pushing forward and risking not finishing in the 5 days, I would start fresh and rewrite the app with OOP. I’m much more familiar with OOP and this allowed me to quickly rebuild the app. I was able to pull most of the core logic from the functional attempt, allowing me to rebuild the app in about half the time.

Unfortunately, because of the time it took me to write the app with OOP, I was unable to get as many tests written for this version. There is one integration test for the Google Books API call, but I'd like to add more.

## Dependencies

I used three external dependencies in this application. First, I used `axios` for the API call to Google Books. I prefer this over the native `fetch` method because you do not have to explicitly convert the API response to JSON. I also used `prompt-sync` to synchronously get user input, and `inquirer` to allow the user to select a book from a list.

In addition to the three primary dependencies, I also used `mocha` to write my tests and `chai` for assertions.

## Development History

I have included an additional branch called `dev-history` that includes all of the commits I created while building the initial version of this app using a functional approach. The `master` branch contains my modified commit history using an OOP approach.
