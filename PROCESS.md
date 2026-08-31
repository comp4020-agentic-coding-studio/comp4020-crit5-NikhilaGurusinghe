# Process overview

## What I built

Its a simple daily game. How big is a blue whale compared to a person? How about a lion compared to a blue whale and then a person? How many can you get correct in a row? 

## The moments that mattered

I didn't really use an agent, and i used AI a little bit more than i usually would (mostly because i spent like 4 days on this 2% assignment).

One big problem I had was sizing the p5 canvas' I use to stylize the artworks of the animals an various species. By default if you pop down a p5 canvas it won't resize to say fit its parent container in fact you have to specify the width and height of the p5 canvas when you start the p5 sketch code. I knew about resizeObservers in react so i used one that had a react hook, and that worked well. Unfortunately i gave the sketch's parent container my desired height and the desired aspect ratio (as css style) to this div (and this is then picked up by the resize observer and then used internally to resize the canvas) however, this wasn't working in terms of the height, so since i have the desired aspect ratio I just calculate the width as well from this using the height which i have as well alongside the desired aspect ratio. I knew it was right cause the image looked correct and not squished or whatever -- it had the correct aspect ratio when rendered in the p5 canvas. see [`3a4f769`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit5-NikhilaGurusinghe/commit/3a4f76903abbf06f445bbcf4da659b869619f3b8)
