# Choosy Chomps

[LIVE SITE](http://choosychomps.herokuapp.com/)

This is a fully-functional Node.js recipe app that is catered toward those who have strict dietary restrictions (or are just picky eaters!) that pulls from the [Edamam API](https://www.edamam.com/) to provide detailed nutritional information about each recipe. Users can search for ingredients within a specific category of diet restriction and they are provided with a plethora of recipes that fit their needs. 

***

## How to use this app: 

Make an account by clicking "Sign Up" anywhere on the page. From the home page, you can enter a particular search query and browse through an extensive list of recipes. From there, you can add favorite recipes to save and view later on, which you can access from your profile. 

![screen shot 2018-03-02 at 10 20 25 am](https://user-images.githubusercontent.com/25888207/36914801-58f3c0d8-1e03-11e8-89e3-73427068d7dd.png)
_This is the search bar referenced above._


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

To be honest, I was at a bit of a loss at first because it all seemed rather overwhelming with this being my first independent full-stack project. I took a step back, however, and decided to start with what I'm best at: designing. However, I needed some inspiration! I knew--vaguely--what I was going to do with this and what its purpose was, so I asked a few people who would possibly benefit from it for some kinds of features they'd like to see. Thus, I got my user stories. 

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
| GET    | /recipes/:label   | Renders show.ejs that displays in-depth information gathered from another API call regarding a specific recipe.                                                         |
| GET | /recipes/show/:uri | Renders the show.ejs page but gets the URI directly from the source rather than from database. (Could probably be added to the /recipes/:label route somehow with some conditionals but this works for the time being!) |

## Models 
### Users
| id | name   | email | password            | bio    |
|----|--------|-------|------------------------------|--------|
| 1  | STRING | EMAIL | $2a$10$8qKpgr1yN...ENCRYPTED STRING | STRING |

### Favorites
| id | label  | ingredients    | imgUrl  | url    | uri    |
|----|--------|----------------|---------|--------|--------|
| 1  | STRING | ARRAY\[STRINGS\] | STRING  | STRING | STRING |

## Analyzing the API 

Before I dove into making the recipe routes functional, I wanted to thoroughly understand the API and mentally prepare myself to gather the information I was actually looking for rather than fishing through and struggling more than necessary. After searching for a while, I decided I wanted to make it so the user could filter their search results by a simple query string of, say, a favorite ingredient, and by a prepopulated list of dietary options that are found within the API. Those two parameters would then be passed into the API call's URL (along with the key and id that are necessary, of course!) and would then only return the data the user would be looking for. 

## Wrestling the API

I ran into a problem after trying to execute this--if the user's search results turn up with nothing, the API link would actually render a page on Edamam's site that wasn't in JSON format and would throw an error that would break my entire ~~life~~ code. I sat staring at my screen for ~~far too long~~ a little while and remembered "Oh, duh, try/catch". 

![screen shot 2018-03-01 at 3 30 02 pm](https://user-images.githubusercontent.com/25888207/36875596-72227eda-1d65-11e8-8839-2938b5f505c9.png)
_Block of code with my try/catch._

This tries to JSON.parse() the API's URL, and if it turns out the user's search query doesn't actually result in any hits (and therefore renders a web page rather than a JSON object), it throws an error and the catch renders a 404 error page I quickly made. Otherwise, it goes through with the API call and renders the page that displays the search results. 

![screen shot 2018-03-02 at 10 28 16 am](https://user-images.githubusercontent.com/25888207/36915125-72a74d64-1e04-11e8-95e6-2691d6933392.png)
_This is the 404 page._

## Styling and UX

Once I got the majority of the app's routes and API calls functional, I dove into styling a bit more seriously. I wanted to take the user's experience into consideration every step of the way. Here are some of the thoughts I had as I was styling and what I did about it: 

* It's got to have easy, clear navigation. If I can't navigate my own site easily, then how would I expect the user to be able to? -> I put a set of nav links on the top and bottom of the site, clearly labeled and easily accessible.

* This is a recipe site, what color would be best for this? What layout? -> Red! Red is a hungry color. (I swear I didn't make that up, look it up.) As for the layout...probably lots of pictures of food? Maybe a picnic table background? That works.

* I don't want to have the user scroll too much while they are navigating the site in general, it's tedious and makes it look cluttered and those who aren't particularly tech-savvy may have issues. -> In the event that there needs to be plenty of information loaded on the screen, I simply put the information within overflow:scroll'd divs so the user can scroll within the html bounds rather than scroll through the entire body of the site. This can be seen in the favorites list on the profile, the info display on the recipes/all page and the view details page of each recipe. Here's an example: 
![screen shot 2018-03-02 at 10 42 08 am](https://user-images.githubusercontent.com/25888207/36915666-6475460e-1e06-11e8-93e2-55b9d5cc38b0.png)
_This is on the view details page--the pink boxes are scrollable items._ 

* This better be mobile-responsive too, for the sake of Marie in my user stories--how else will she be able to browse for recipes on the bus? -> Well...I made it mobile-responsive. This is much more easily achievable with Materialize, I've come to realize. 

## Some hiccups...

I ran into some problems here and there while I was making this. (Shocker, right?) Here are a few of the issues, and once again, what I did about them: 

* My delete route was functional, but it wasn't letting me delete anything other than the top-most recipe on my favorites page. Why?! -> I realized the element that I was using as my delete button had an ID rather than a class to call while referencing it in the main.js. This made it so yes, it was functional, but only once since an ID is completely unique. Simply changing that reference to a class was all I needed to fix the problem, so when the favorites populated on the page, that element in particular would still have all the attributes and listeners applied. 

* Why won't my nutrients\[items\] load? It's just outputting, literally, "nutrients\[items\]". -> Put an equals sign in there, dingus. <%= nutrients\[items\] %>, not <% nutrients\[items\] %>. ~~I wasted way too much time on this one.~~

## Result, as of 03/02/2018: 
![screen shot 2018-03-02 at 10 58 54 am](https://user-images.githubusercontent.com/25888207/36916432-bb2e8472-1e08-11e8-8c22-dc096a2c29d8.png)
_Home page._

![screen shot 2018-03-02 at 10 59 35 am](https://user-images.githubusercontent.com/25888207/36916464-d4845410-1e08-11e8-9fd4-e8f11ca4fad3.png)
_Profile page._

![screen shot 2018-03-02 at 11 00 42 am](https://user-images.githubusercontent.com/25888207/36916518-fb958fb0-1e08-11e8-8ceb-72b5e68963c4.png)
_Search results page._

![screen shot 2018-03-02 at 11 01 12 am](https://user-images.githubusercontent.com/25888207/36916556-0e0b60ac-1e09-11e8-9dc0-d7bd363c9baa.png)
_View details page._

## Next Steps

I'd really love to implement a feature where the user can gather ingredients and add them to a shopping list that they can reference later on. 

I'd also really like to make it so the user can enter a certain portion size, and the ingredients listed on the details page would be calculated to be exactly the amount the user would need. If I were to go the simple route with this, I'd just need to use the API's built-in weights of each ingredient and do some simple math to convert the given metrics into something useful to the user. 
