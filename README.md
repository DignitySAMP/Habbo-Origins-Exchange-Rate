# Habbo Origins Exchange Rate fansite

This project was started shortly after the launch of Sulake's Habbo: Origins. The economy was a driving factor of this game but recently Sulake has implemented strict rules against many aspects that made the economy great.

For this reason, motivation has been lost in the project. It's in a semi operational state, the only pending tasks are to add per-hotel support (right now all prices are global) and write a simple JS Discord bot that allows the altering of the "stores/creditHistory.json" file, which is responsible for updating the prices.

## Preview

![1](https://github.com/user-attachments/assets/c7706b2a-dc2c-4288-b877-525b7cb70dc4)
![2](https://github.com/user-attachments/assets/e6f00bd4-3ab5-4173-8366-5d7df7f1e782)
![3](https://github.com/user-attachments/assets/b333b36d-0934-456a-9165-9379fc905bda)
![4](https://github.com/user-attachments/assets/7d923e39-f7e1-43c9-ae1b-fe1d1404037a)


## Features

 - Habbo Origins catalogue ported over into a JSON file (although it's missing some of the new items, last update to our catalogue file was on the 26th of July)
 - Interactive price chart using chart.js, container is filled with information from "stores/creditHistory.json"
 - Simple conversion of Club Sofa's and credits (credit sprite changes depending on value, bronze, silver, gold)
 - Basic pinia component implementation, needs reworking eventually
 - CSS template is inspired by the homepage of Habbo Origins, as well as taking after the appearance of the base game.
 - This was built in about a day and a half, and might have unknown bugs. Most bugs I discovered during local testing have been fixed.



## Recommended IDE Setup / Tools

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur). [LibreSprite](https://libresprite.github.io/) for pixel art and the [Habbo-X wiki](https://habboxwiki.com/) for images and information.


## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
