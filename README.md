# Milestone Project 2 : Memorry game


## Purpouse

This is the second milestone project in my full stack development course. It is focusing on interactive frontend development utilising HTML, CSS and Javascript. 

I have created a simple memory game, where the user will be shown a flashing sequence and then have to repeate the sequence back to the game. The sequence will get progressivly harder as the ame cotinues.

## User stories

1. I want an clear good looking landing page

2. I want to understand the rules of the game.

3. I want to know how well I am doing.

4. I want to be able to change the difficulty setting. 

5. I want to keep track of my scores.

## Design

I wanted a simple, elegent look that was light and inviting. with it being a memory game an uncluttered page was important, to avoid distractions. This was achieved through the use of light colours and a minimalistic approch. A few clear buttons for; Starting the game (which disapears once the game starts); The rules, reseting the game and changing the dificulty are laid out across the top. A clear game area takes up the center of the screen and at the bottom are the players score and lives.

- ### Wireframes

    Using balsamiq, I created a wireframe of my project. The finished page is very true to the design 

    [Memory Game Wireframe](docs/README-imgs/Memory-game-wireframe.png)

- ### Color Scheme

    I chose blue as my main color, using a light blue background (<strong>#8edafa</strong>) with contrasting dark blue game squares (<strong>#00334c</strong>). The light blue and white create a welcoming calming look and allow the darker main game area to stand out.


- ### Typography

    I used <strong>Merienda</strong> font family, in two font weights; 400 and 700. I felt it was a sofisticated yet simple looking font which helped lend a calming feel to the page.


## Features

The page was kept simple and is responsive across all screen sizes using a mix of preset responsive elements from libraries like bootstrap, custom CSS media queries and JavaScript listeners

- Nav section

    - 'Rules' button top left, opens a modal explaining how to play the game.

    - 'Reset' button top center, resets round to 0 and lives to 3.
    - 'Difficulty' button top right, brings up drop down menu for different difficulty levels available.
    - Larger 'Play' button, centered and just belowe other buttons. on click, dissapears and starts the game sequence.
		
- Game section

    - Grid of dark blue squares; 2 x 2, 3 x 3 or 4 x 4 depending on difficulty. Each square flashes in accordence to the current game sequence and when clicked by the player.

- Score section

    - Round indicator showing the current round as a numerical value.

    - High score indicator shows the highest round that has been achieved.

    - Lives are shown in the from of red hearts. 	

## credits

- [bootstrap](https://getbootstrap.com/) 
    
    - All the main buttons (with some size and color adaptations).
    
    - Modals used for 'Rules' section and 'Play Again' display. 

- [animate.css](https://animate.style/)

    - Animations for game squares when transitioning between difficulties.

- [W3School](), [MND]() and [Stack Overflow]()

    - General reminders and assitance with syntax

- Images

    - Brain logo - https://pngtree.com/so/brain-logo

    - Cloud background - [google Images](https://www.google.com/search?q=cartoon+clouds&hl=en&tbm=isch&sxsrf=ALeKk03lkx5g73rFvkKzLWvcBOTIPGGN-Q%3A1627297410725&source=hp&biw=1280&bih=881&ei=gpb-YP_oJM_WgQbAt67gAg&oq=cartoon+clouds&gs_lcp=CgNpbWcQAzIECCMQJzIECCMQJzICCAAyAggAMgIIADICCAAyAggAMgIIADICCAAyAggAOgcIIxDqAhAnOggIABCxAxCDAToFCAAQsQNQgA9YjiVg1StoAXAAeACAAWyIAfcGkgEEMTMuMZgBAKABAaoBC2d3cy13aXotaW1nsAEK&sclient=img&ved=0ahUKEwj_semgy4DyAhVPa8AKHcCbCywQ4dUDCAc&uact=5)

