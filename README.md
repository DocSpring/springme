# SpringMe demo JS application for DocSpring

This is app is a WIP. It's purpose is to demonstrate capabilities on the DocSpring platform and provide examples of how to 
implement our PDF processing platform in your own JavaScript/TypeScript applications. These are just ideas and examples and 
we encourage you to experiment with your own solutions. 

This is built with Create Next App and uses RTX for version managment. There is a .env.local.example file that you can use as
as template to build your own .env.local file which you will need to at least add your DocSpring API token and ID to.

# Typing for DocSpring library

Currently we are using the Javascript library which does not include any typing so we have declared it under `types/decs.d.ts`. 
I plan to update this to the TypeScript library.