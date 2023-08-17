## Manhwalist Api Scrapper

Resful API [Manhwalist](https://manhwalist.xyz) built using node js

## Usage

1. Clone this repository
```bash
  git clone https://github.com/ZeroneDoo/manhwalist-api-scrapper.git
```
2. Install dependecies
```bash
  npm i
```
3. Start the project
```bash
  npm start
```
4. Visit [http://localhost:3000](http://localhost:3000)


## Documentation

## Popular Comic
Get Popular Comic Today

```bash
/home
```
example: [http://localhost:3000/home](http://localhost:3000/home)

## Project Update
Get Project Update

```bash
/home/project-update
```
example: [http://localhost:3000/home/project-update](http://localhost:3000/home/project-update)

## Latest Update
Get Latest Update Comic

```bash
/home/latest-update
```
example: [http://localhost:3000/home/latest-update](http://localhost:3000/home/latest-update)

## Detail Comic
```bash
/manga/:endpoint
```
example: [http://localhost:3000/manga/lookism](http://localhost:3000/manga/lookism)

## Genre List
```bash
/genres
```
example: [http://localhost:3000/genres](http://localhost:3000/genres)

## Genre Detail
```bash
/genres/:endpoint
```
```bash
/genres/:endpoint?page=1
```
example: [http://localhost:3000/genres/action](http://localhost:3000/genres/action)

## Chapter
```bash
/chapter/:endpoint
```
example: [http://localhost:3000/chapter/lookism-chapter-461-bahasa-indonesia-terbaru/](http://localhost:3000/chapter/lookism-chapter-461-bahasa-indonesia-terbaru/)
