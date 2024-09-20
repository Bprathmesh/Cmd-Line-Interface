#!/usr/bin/env node

import figlet from "figlet";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import { createSpinner } from "nanospinner";
import chalk from "chalk";
import inquirer from "inquirer";
import fetch from "node-fetch";

// Personal details
const user = {
  name: 'Prathmesh',
  role: 'Second-year student at Scaler',
  technologies: ['Backend Technologies', 'iOS Development'],
  github: 'https://www.github.com/bprathmesh',
  email: 'prathmesh.23bcs10025@ms.sst.scaler.com',
  hobbies: ['Writing', 'Gaming', 'Coding'],
  funFact: "I once coded for 24 hours straight during a hackathon!",
  projects: [
    {
      name: 'Hotel Booking Chatbot',
      url: 'https://github.com/Bprathmesh/Hotel_Booking_Bot',
      description: 'An intelligent chatbot for hotel bookings using OpenAI\'s GPT-3.5-turbo.',
      details: [
        'Created a seamless and interactive user experience from initial inquiry to reservation completion.',
        'Implemented a conversational AI-powered interface for booking.',
        'Designed a multi-step booking process with context retention.',
        'Integrated with external APIs to provide room options and handle bookings.',
        'Ensured robust user input validation and error handling.',
        'Maintained persistent conversation state using a SQLite database.'
      ]
    },
    {
      name: 'Enhanced Quiz App',
      url: 'https://github.com/Bprathmesh/Aaritya-Project',
      description: 'A cross-platform Quiz App using Flutter and Dart with a Go backend.',
      details: [
        'Implemented a modular architecture for enhanced maintainability and scalability.',
        'Utilized Riverpod for state management, ensuring smooth and responsive UI interactions.',
        'Integrated REST APIs for dynamically fetching quiz questions and utilized local storage for offline functionality.',
        'Designed and implemented a hint system and score tracking feature.',
        'Optimized the app\'s performance with a responsive design.'
      ]
    },
    {
      name: 'Customised Notification Application Flutter',
      url: 'https://github.com/Bprathmesh/Notif-swift',
      description: 'A cross-platform Flutter application for iOS, Android, and Web with Firebase integration.',
      details: [
        'Boosted user engagement by 30% through personalized notifications.',
        'Engineered an advanced notification system with scheduling and dynamic timezone handling.',
        'Designed and implemented an admin panel for user analytics using Firestore.',
        'Integrated multi-language support and dynamic theming.',
        'Optimized app performance with Provider for state management and Firestore streams.'
      ]
    }
  ],
};

// Function to display a welcome message with gradient text animation
async function displayWelcome() {
  console.clear();
  const rainbowTitle = chalkAnimation.rainbow(
    'Welcome to Prathmesh\'s Interactive CLI Portfolio!'
  );

  await new Promise((resolve) => setTimeout(resolve, 2000));
  rainbowTitle.stop();

  console.log(
    gradient.pastel.multiline(
      figlet.textSync('Prathmesh CLI', {
        font: 'Big',
        horizontalLayout: 'default',
        verticalLayout: 'default',
      })
    )
  );

  console.log(
    chalk.cyan(
      `\n🚀 Embarking on a journey through the digital realm of ${user.name}!\n`
    )
  );
}

// Function to display user details in a styled way
function showDetails() {
  console.log(chalk.greenBright('\n=== About Me ===\n'));
  
  console.log(gradient.cristal(`
    👨‍💻 ${chalk.bold('Role')}: ${user.role}
    🛠️ ${chalk.bold('Technologies')}: ${user.technologies.join(', ')}
    🌱 ${chalk.bold('Hobbies')}: ${user.hobbies.join(', ')}
    🎉 ${chalk.bold('Fun Fact')}: ${user.funFact}
  `));

  console.log(chalk.greenBright('\n=== Connect with Me ===\n'));

  console.log(`
    🌍 ${chalk.cyan('GitHub:')} ${chalk.underline(user.github)}
    ✉️ ${chalk.cyan('Email:')} ${chalk.underline(user.email)}
  `);
}

// Function to display projects
async function showProjects() {
  console.log(chalk.yellowBright('\n=== My Projects ===\n'));
  for (const project of user.projects) {
    console.log(chalk.cyan(`${project.name}`));
    console.log(chalk.white(`${project.description}`));
    console.log(chalk.blue(`URL: ${project.url}`));
    console.log(chalk.green('\nKey Features:'));
    project.details.forEach((detail, index) => {
      console.log(chalk.white(`${index + 1}. ${detail}`));
    });
    console.log('\n');
    
    if (project !== user.projects[user.projects.length - 1]) {
      const { continue: shouldContinue } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'continue',
          message: 'Would you like to see the next project?',
          default: true,
        },
      ]);
      if (!shouldContinue) break;
    }
  }
}

// Function to display a random coding tip
function showCodingTip() {
  const tips = [
    "Always comment your code!",
    "Learn to use version control like Git.",
    "Take regular breaks to avoid burnout.",
    "Practice coding challenges daily.",
    "Collaborate with others to improve your skills.",
  ];
  const randomTip = tips[Math.floor(Math.random() * tips.length)];
  console.log(chalk.magenta('\n💡 Random Coding Tip: ') + chalk.white(randomTip));
}

// Function to fetch and display a random programming joke
async function showProgrammingJoke() {
  const spinner = createSpinner('Fetching a programming joke...').start();
  try {
    const response = await fetch('https://official-joke-api.appspot.com/jokes/programming/random');
    const [joke] = await response.json();
    spinner.success({ text: 'Here\'s a programming joke for you!' });
    console.log(chalk.yellow(`\n${joke.setup}`));
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(chalk.green(`${joke.punchline}\n`));
  } catch (error) {
    spinner.error({ text: 'Failed to fetch a joke. Maybe the server is taking a coffee break!' });
  }
}

// Main menu function
async function mainMenu() {
  const choices = [
    'View My Details',
    'Show My Projects',
    'Display a Random Coding Tip',
    'Tell Me a Programming Joke',
    'Exit',
  ];

  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to explore?',
      choices,
    },
  ]);

  switch (action) {
    case 'View My Details':
      showDetails();
      break;
    case 'Show My Projects':
      await showProjects();
      break;
    case 'Display a Random Coding Tip':
      showCodingTip();
      break;
    case 'Tell Me a Programming Joke':
      await showProgrammingJoke();
      break;
    case 'Exit':
      console.log(chalk.green('Thank you for exploring my CLI portfolio. Goodbye!'));
      process.exit(0);
  }

  await new Promise(resolve => setTimeout(resolve, 2000));
  await mainMenu();
}

// Start the CLI
async function start() {
  await displayWelcome();
  await mainMenu();
}

start();
