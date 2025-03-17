<a name="readme-top"></a>
<div align="center">

# Mini Chess 5x5

In this 5x5 chess variant, players use three distinct pieces: 'P,' which moves one block in any of the four cardinal directions; 'H1,' which moves in a plus pattern, skipping one block; and 'H2,' which moves diagonally, also skipping one block. This simplified yet strategic setup reimagines traditional chess tactics on a smaller board, encouraging fresh, dynamic gameplay.

</div>

<div align="center"><h4><a href="#-table-of-contents">️Table of Contents</a> • <a href="#-about-the-project">ℹ️ About the Project</a> • <a href="#-stack-tech">🛠 Stack Tech</a> • <a href="#-setup">⚙ Setup</a> • <a href="#-things-to-look-out-for">🔍 Things to Look Out For</a> • <a href="#-about-the-author">👨🏻‍ About the Author</a></h4></div>

## ️Table of Contents
 <details>
<summary>Open Contents</summary>

- [Mini Chess 5x5](#mini-chess-5x5)
  - [ℹ️ About the Project](#-about-the-project)
  - [🛠 Stack Tech](#-stack-tech)
  - [⚙ Setup](#-setup)
  - [🔍 Things to Look Out For](#-things-to-look-out-for)
  - [👨🏻‍ About the Author](#-about-the-author)
</details>

## ℹ️ About the Project

This 5x5 chess variant offers a unique and streamlined experience, featuring only three pieces that encourage strategic thinking on a compact board. The 'P' piece moves one block in any of the four cardinal directions, the 'H1' piece moves in a plus pattern, skipping one block, and the 'H2' piece moves diagonally, skipping one block. These simplified moves and the reduced board size enhance tactical gameplay, making each move impactful.

Built with Next.js, the project leverages the framework's efficient server-side rendering and fast navigation to create a seamless user experience. Tailwind CSS is used for styling, offering a sleek, responsive design that enhances device usability. The Firebase Realtime Database powers the multiplayer functionality, allowing for smooth, real-time game state updates between players. Firebase’s robust, scalable backend also supports player synchronization, ensuring that each move is instantly reflected on both sides of the board, regardless of device.

This project exemplifies the integration of modern front-end technologies to create an engaging, multiplayer game with a unique twist on traditional chess mechanics, tailored to a minimalist 5x5 setup.

## 🛠 Stack Tech
- [![Firebase][Firebase-badge]][Firebase-url] - Mobile & web app development platform

[Firebase-badge]: https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase
[Firebase-url]: 
- [![Next.js][Next.js-badge]][Next.js-url] - A server-side rendered framework for building React applications

[Next.js-badge]: https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextjs
[Next.js-url]: 
- [![TypeScript][TypeScript-badge]][TypeScript-url] - A strict syntactical superset of JavaScript

[TypeScript-badge]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript
[TypeScript-url]: 
- [![Tailwind CSS][Tailwind CSS-badge]][Tailwind CSS-url] - Utility-first CSS framework

[Tailwind CSS-badge]: https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwindcss
[Tailwind CSS-url]: 

## ⚙ Setup
### Clone the Repository:
```bash
git clone https://github.com/akshay-Kalekar//miniChess-5x5-.git
cd miniChess-5x5-
```
### Install Dependencies
```bash
npm install
# or
yarn install
```
### Environment Setup:
```.local.env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_DATABASE_URL=your_firebase_database_url
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
```

### Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🔍 Things to Look Out For
If you're a developer contributing to or modifying this project, keep in mind the following features:

1. **Move Sound Effects** - Each move is accompanied by a sound effect to enhance player engagement.
2. **Move Suggestions** - The game highlights possible moves for each selected piece, helping players strategize effectively.
3. **Chat Functionality** - Players can send messages to each other in real-time during a match, enhancing the social aspect of gameplay.
4. **Move History** - A detailed move history is tracked and can be retracted if needed, providing players with a record of past moves and game progress.
5. **Wrong Move Alerts** - If a player attempts an invalid move, a pop-up alert notifies them, preventing errors and ensuring smooth gameplay.

Ensure these features are properly tested and functional when making changes to the project.

## 👨🏻‍ About the Author

**Akshay Ajay Kalekar**

This project was created by Akshay Ajay Kalekar. Connect with me on [GitHub](https://github.com/akshay-Kalekar) to learn more about my projects and professional background.

<p align="right"><a href="#readme-top">Top ⬆️</a></p>

