# Choosy Chomps
***

This is a fully-functional Node.js recipe app that is catered toward those who have strict dietary restrictions (or are just picky eaters!) that pulls from the [Edamam API](https://www.edamam.com/) to provide detailed nutritional information about each recipe. Users can search for ingredients within a specific category of diet restriction and they are provided with a plethora of recipes that fit their needs. 

***

## How to use this app: 

Make an account by clicking "Sign Up" anywhere on the page. From the home page, you can enter a particular search query and browse through an extensive list of recipes. From there, you can add favorite recipes to save and view later on, which you can access from your profile. 

## Technologies Used 
* Node.js
* Express
* SQL
* Postgres
* Sequelize
* JavaScript
* jQuery
* Materialize
* HTML5/CSS3
* BCrypt
* EJS

***

## Where to begin? 

To be honest, I was at a bit of a loss at first because it all seemed rather overwhelming with this being my first independent full-stack project. I took a step back, however, and decided to start with what I'm best at: designing. However, I needed some inspiration! I knew--vaguely--what I was going to do with this and what its purpose was, so I asked a few people who would possibly benefit from it the kinds of features they'd like to see. Thus, I got my user stories. 

### User Stories

1. ) "As a single mom of two picky eaters, this app is a lifesaver. I don't often have enough time to plan out the week's recipes, so being able to specify what ingredients I may have in my kitchen already or being able to exclude various types of recipes is so helpful." - Joyce
2. ) "I have a ridiculously restrictive diet due to health issues, and this app would help reduce the stress of finding something healthy to eat that doesn't also hurt me." - Logan
3. ) "I like trying new recipes every weekend, so being able to have access to thousands of recipes from all kinds of recipe sites is super convenient. I can browse while I'm on the bus!" - Marie 

Nice! That got some gears turning, so I managed to think up a rough draft for my wireframes:

![img_8744](https://user-images.githubusercontent.com/25888207/36824912-a9a0aa82-1cb9-11e8-9f39-223527d13bda.jpg)
![img_8745](https://user-images.githubusercontent.com/25888207/36824913-aa03f7f4-1cb9-11e8-8e44-d1e3940b3408.jpg)
![img_8746](https://user-images.githubusercontent.com/25888207/36824914-aa29c876-1cb9-11e8-9c3d-5320b28721d5.jpg)

Although the app itself's layout doesn't exactly match my plans made in my wireframe, it certainly helped having a vision of what it _could_ be in my head. This helped with the general planning of routing and ideas surrounding the basic functionality.

![image1](https://user-images.githubusercontent.com/25888207/36825127-aa3a431c-1cba-11e8-93ec-147e89bb6336.jpeg)

This is my rough draft for my routing that I wrote out before even writing a line of code so I could start with a sense of intention. I felt a lot less daunted by this project by the time I wireframed and addressed the routing. 

## Let's get coding! 

I decided to begin with building the layout.ejs and partials because having at least a framework of some sort that resembles what's in my mind helps me so much when I get down to business on the logic. I wanted to make sure with this project that mobile accessibility was the priority before desktop accessibility and studied up on Materialize classes that would help make this simpler for me. 

With some trial and error, I managed to make a fully-responsive home page with images populated from some Google image searches. (I plan to make the files local in the future so they load a bit more quickly.) 

## Routes 

| CRUD   | ROUTE             | FUNCTIONALITY                                                                                                |
|--------|-------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| GET    | /                 | Renders the home page of Choosy Chomps                                                                                                 |
| GET    | /profile          | Renders the user's profile page, but only when logged in. Otherwise, redirects to the login page.                                      |
| GET    | /profile/edit/:id | Renders the "edit user data" page                                                                                                      |
| PUT    | /profile/new/:id  | Updates the user data (namely, their name and bio)                                                                                     |
| POST   | /profile          | Adds a favorite recipe to the profile page, but redirects the user back to their search results.                                       |
| DELETE | /profile/:label   | Deletes a specific recipe from the profile page                                                                                        |
| GET    | /auth/signup      | Renders the sign-up form.                                                                                                              |
| POST   | /auth/signup      | Redirects the user to the homepage upon a successful sign up, otherwise displays an error and redirects to the sign-up page once more. |
| GET    | /auth/login       | Renders the log in form.                                                                                                               |
| POST   | /auth/login       | If successful, redirects to the home page. Otherwise, displays an error.                                                               |
| GET    | /auth/logout      | Logs user out and redirects to the home page.                                                                                          |
| GET    | /recipes          | Makes an API call and renders a page that displays all the recipe results called from the search query.                                |
| GET    | /recipes/:label   | Renders a page that displays in-depth information gathered from another API call regarding a specific recipe.                                                         |

## Analyzing the API 

Before I dove into making the recipe routes functional, I wanted to thoroughly understand the API and mentally prepare myself to gather the information I was actually looking for rather than fishing through and struggling more than necessary. After searching for a while, I decided I wanted to make it so the user could filter their search results by a simple query string of, say, a favorite ingredient, and by a prepopulated list of dietary options that are found within the API. Those two parameters would then be passed into the API call's URL (along with the key and id that are necessary, of course!) and would then only return the data the user would be looking for. 

I ran into a problem after trying to execute this--if the user's search results turn up with nothing, the API link would actually render a page on Edamam's site that wasn't in JSON format and would throw an error that would break my entire ~~life~~ code. I sat staring at my screen for ~~far too long~~ a little while and remembered "Oh, duh, try/catch". 

![screen shot 2018-03-01 at 3 30 02 pm](https://user-images.githubusercontent.com/25888207/36875596-72227eda-1d65-11e8-8839-2938b5f505c9.png)

This tries to JSON.parse() the API's URL, and if it turns out the user's search query doesn't actually result in any hits (and therefore renders a web page rather than a JSON object), it throws an error and the catch renders a 404 error page I quickly made. Otherwise, it goes through with the API call and renders the page that displays the search results. 
