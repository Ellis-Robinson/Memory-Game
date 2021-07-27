# Milestone Project 2 : Memory game
![responsive mock-up of site](docs/README-imgs/responsive-mockup.png)

Link to main site [here](https://ellis-robinson.github.io/Memory-Game/) !
# Purpose

This is the second milestone project in my full stack development course. It is focusing on interactive frontend development utilising HTML, CSS and Javascript. 

I have created a simple memory game, where the user will be shown a flashing sequence and then have to repeat the sequence back to the game. The sequence will get progressively harder as the game continues.

# User stories

1. I want a clear good looking landing page

2. I want to understand the rules of the game.

3. I want to know how well I am doing.

4. I want to be able to change the difficulty setting. 

5. I want to keep track of my scores.

# Design

I wanted a simple, elegant look that was light and inviting. with it being a memory game an uncluttered page was important, to avoid distractions. This was achieved through the use of light colours and a minimalistic approach. A few clear buttons for; Starting the game (which disappears once the game starts); The rules, resetting the game and changing the difficulty are laid out across the top. A clear game area takes up the centre of the screen and at the bottom are the players score and lives.

## Wireframes

    Using balsamiq, I created a wireframe of my project. The finished page is very true to the design 

    [Memory Game Wireframe](docs/README-imgs/Memory-game-wireframe.png)

## Color Scheme

    I chose blue as my main color, using a light blue background (<strong>#8edafa</strong>) with contrasting dark blue game squares (<strong>#00334c</strong>). The light blue and white create a welcoming calming look and allow the darker main game area to stand out.

## Typography

    I used <strong>Merienda</strong> font family, in two font weights; 400 and 700. I felt it was a sophisticated yet simple looking font which helped lend a calming feel to the page.

# Features

The page was kept simple and is responsive across all screen sizes using a mix of preset responsive elements from libraries like bootstrap, custom CSS media queries and JavaScript listeners

- Nav section

    - 'Rules' button top left, opens a modal explaining how to play the game.

    - 'Reset' button top centre, resets round to 0 and lives to 3.
    - 'Difficulty' button top right, brings up drop down menu for different difficulty levels available.
    - Larger 'Play' button, centred and just below other buttons. on click, disappears and starts the game sequence.
        
- Game section

    - Grid of dark blue squares; 2 x 2, 3 x 3 or 4 x 4 depending on difficulty. Each square flashes in accordance to the current game sequence and when clicked by the player.

- Score section

    - Round indicator showing the current round as a numerical value.

    - High score indicator shows the highest round that has been achieved.

    - Lives are shown in the from of red hearts.    

### Future features

- different graphics on higher levels
- slightly different sounds for each square
- animated background
- animations for losing and gaining lives
- different layouts other than square grid
- different shaped game pieces
- different theme options
- individual users high score + score board

# Technologies

## Languages

- [HTML5](https://www.w3schools.com/html/)
    - Used for the main structure ad content of the webpage.

- [CSS3](https://www.w3schools.com/css/)

    - Used to style the different elements on the page and allow for responsiveness.

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

    - Used to create the main functionality of the game as well as some of the responsiveness across different screen sizes.

## Libraries

- [Bootstrap](https://getbootstrap.com/)
    
    - All the main buttons (with some size and color adaptations).
    
    - Modals used for 'Rules' section and 'Play Again?' display.

- [Animate.css](https://animate.style/)

    - Animations for game squares when transitioning between difficulty levels.

## Tools

- [converto](https://s4.converto.io/en15/download-redirect/?id=2aljibOM7a9fTtFswgEuKBIK09wjx3ed)

    - used to convert YouTube clips to mp3 files to be used as sound effects.

- [W3C Markup validator](https://validator.w3.org/)

    - Used to check HTML code for any errors.

- [WC3 CSS validator](https://jigsaw.w3.org/css-validator/validator)

# Testing

The project was completed using google chrome browser so initial testing was done dynamically throughout the project. I then tested each element across Firefox and Microsoft edge browsers.

## User stories

1. I want a clear good looking landing page

    - The site is a single page and is designed to be clean and inviting
    ![screenshot of site](docs/README-imgs/landing-page.png)

2. I want to understand the rules of the game.

    - A clear button marked rules brings up a modal explaining the rules of the game 
    ![screenshot of rules button](docs/README-imgs/user-story-2-rules.png)
    ![screen shot of rules modal](docs/README-imgs/user-story-2-rules-modal.png)

3. I want to know how well I am doing.

    - The current round the user is on is displayed just below the game area.

    ![screenshot of current round](docs/README-imgs/user-story-3-round.png)

4. I want to be able to change the difficulty setting

    - A button above the game area marked 'difficulty' displays the current difficulty level and brings up a drop down menu with available difficulties.

    ![screenshot of difficulty button](docs/README-imgs/user-story-4-difficulty.png)

5. I want to keep track of my high score.

    - The highest score achieved is displayed just below the game area, below the current round indicator.

    ![screenshot of highscore](docs/README-imgs/user-story-5-highscore.png)

## feature testing

- Nav section

    - all buttons have been tested on different browsers and all function as intended with positioning ad content depending on screen size

- Game section
    
    - the game squares display correctly across the different browsers with the correct content being displayed depending on screen size.

- Score section

    - The round, high score and lives all display correctly across the different browsers and functioned reliably throughout my testing.

## Responsiveness

The project was created using mobile first approach and then adapted to display differently as the screen sizes increased. Google chrome developer tools was my main form of testing. I personally tested the game on several different devices, and the game was also sent out to multiple people using different devices and any minor display issues were corrected.

## Code validation

- HTML
    - My HTML files were checked using [W3C validator](https://validator.w3.org/#validate_by_uri) and came back with no major issue

- CSS
    - My CSS files were checked using [W3C CSS validator](https://jigsaw.w3.org/css-validator/validator) and came back with no major issues

- JavaScript
    - My JS files were checked using [JS-hint](https://jshint.com/) and came back with no major issues

## Bus and Fixes

    - Bug: Game squares not flashing when clicked
    - Fix: Used for loop with eventListener to initiate flashSquare() function which changes the class of the game square that was clicked, then used timeOut function to change it back, creating the flash appearance.

    - Bug: player sequence showing strings rather than numbers.
    - Fix: used unary plus (+) to convert gameSquare data from string to integer.

    - Bug: couldn't get a modal from bootstrap to display when game over happened without having a button to click on.
    - Fix: created a button, hid it with display: none then created a function to 'click button' and called it when game over happens. 

    
    - Bug: when difficulty setting changes, the new config of squares is not clickable.
    - Fix: Changed gameSquare variable to empty array, then in if statement, within change difficulty function, populated array with all game square classes, then added event listeners

    - bug: You can click squares whilst the sequence is flashing.
    - Fix: added functions that identified if the sequence is flashing or not. Then added and removed event listener's dynamically depending on state.

    - bug: game sequence not flashing last square in sequence
    - fix: the problem was that when I delayed the round increase by 500ms so it aligned with the 'success' flash via a setTimeout, I also delayed the game sequence increase. This meant that the flashSequence function was called 500ms before the sequence was increased. To fix, I simply moved the increase sequence outside of the setTimeout method

# credits
 

- [animate.css](https://animate.style/)

    - Animations for game squares when transitioning between difficulties.

- [W3School](), [MND]() and [Stack Overflow]()

    - General reminders and assistance with syntax

- Images

    - Brain logo - https://pngtree.com/so/brain-logo

    - Cloud background - [google Images](https://www.google.com/search?q=cartoon+clouds&hl=en&tbm=isch&sxsrf=ALeKk03lkx5g73rFvkKzLWvcBOTIPGGN-Q%3A1627297410725&source=hp&biw=1280&bih=881&ei=gpb-YP_oJM_WgQbAt67gAg&oq=cartoon+clouds&gs_lcp=CgNpbWcQAzIECCMQJzIECCMQJzICCAAyAggAMgIIADICCAAyAggAMgIIADICCAAyAggAOgcIIxDqAhAnOggIABCxAxCDAToFCAAQsQNQgA9YjiVg1StoAXAAeACAAWyIAfcGkgEEMTMuMZgBAKABAaoBC2d3cy13aXotaW1nsAEK&sclient=img&ved=0ahUKEwj_semgy4DyAhVPa8AKHcCbCywQ4dUDCAc&uact=5)

- Sounds

    - [Game square sound](https://www.youtube.com/watch?v=wJaOs-s-cGU)

    - [Correct sequence sound](https://www.youtube.com/watch?v=3wr8ntTQaeA)

    - [Incorrect sequence sound](https://www.youtube.com/watch?v=PdNb0r_n2mo) 

    - [Play again modal sound](https://www.youtube.com/watch?v=1ar7fqJXD50)

    - [Background music](https://www.youtube.com/watch?v=zPyg4N7bcHM&t=53s)
