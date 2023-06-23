import chalk from 'chalk';
export function printLogo() {
  const LOGO = `

/ __      ___            ___     // ( )        / __      ___
//   ) ) //___) ) ____  //   ) ) // / /  ____  //   ) ) //   ) ) \\ / /
//   / / //             //       // / /        //   / / //   / /   \/ /
//   / / ((____         ((____   // / /        ((___/ / ((___/ /    / /\

`;
  if (process.argv.length == 2) {
    console.log(chalk.blue(`${LOGO}`));
  }
}
