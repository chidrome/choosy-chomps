# Choosy Chomps

This is a fully-functional Node.js recipe app that is catered toward those who have strict dietary restrictions (or are just picky eaters!) that pulls from the [Edamam API](https://www.edamam.com/) to provide detailed nutritional information about each recipe. Users can search for ingredients within a specific category of diet restriction and they are provided with a plethora of recipes that fit their needs. 

## How to use this app: 

Make an account by clicking "Sign Up" anywhere on the page. From the home page, you can enter a particular search query and browse through an extensive list of recipes. From there, you can add favorite recipes to save and view later on, which you can access from your profile. 

# Technologies Used 
* Node.js
* Express
* SQL
* Postgres
* Sequelize
* JavaScript
* jQuery
* Materialize
* HTML5/CSS3

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

I decided to begin with building the layout.ejs and partials because having at least a framework of some sort that resembles what's in my mind helps me so much when I get down to business on the logic. I want to make sure with this project that mobile accessibility was the priority and studied up on Materialize classes that would help make this simpler for me. 
