import { exec, execFile, spawn } from 'child_process';
import path from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';
import symbols from 'log-symbols';
import ora from 'ora';
import download from 'download-git-repo';
import { getJsonFileData, setJsonFileData } from '../utils/JsonFileData.js';
import { createId } from '../utils/createId.js';

// TODO manager clis

// TODO create
export async function addCli(name, commander) {
  name = name.trim();
  commander = commander.trim();
  const spinner = ora('Loading...').start();
  spinner.color = 'blue';
  spinner.text = 'Loading';
  try {
    const { allClisChoices, allClis } = await getJsonFileData(
      'config/allClis.json'
    );
    if (allClisChoices.includes(name)) {
      spinner.fail('failed');
      console.log(symbols.warning, chalk.red(`${name} is stayed!`));
    } else {
      const id = createId();
      const create_time = new Date().toISOString();
      const update_time = create_time;
      allClisChoices.push(name);
      allClis.push({
        id,
        name,
        commander,
        create_time,
        update_time,
      });
      await setJsonFileData('config/allClis.json', {
        allClisChoices,
        allClis,
      });
      spinner.succeed('success');
      console.log(symbols.success, chalk.green(`add ${name} is successed!`));
    }
  } catch (error) {
    spinner.fail('failed');
    console.log(symbols.error, chalk.red(`something is wrong: ${error}!`));
  }
}

// TODO del
export async function delCli(name) {
  name = name.trim();
  try {
    const { allClisChoices, allClis } = await getJsonFileData(
      'config/allClis.json'
    );
    if (allClisChoices.includes(name)) {
      const allClisChoicesTemp = allClisChoices.filter(a => a != name);
      const allClisTemp = allClis.filter(a => a.name != name);
      await setJsonFileData('config/allClis.json', {
        allClisChoices: allClisChoicesTemp,
        allClis: allClisTemp,
      });
      console.log(symbols.success, chalk.green(`del is successed!`));
    } else {
      console.log(symbols.info, chalk.yellow(`${name} is null!`));
    }
  } catch (error) {
    console.log(symbols.error, chalk.red(`something is wrong: ${error}!`));
  }
}

// TODO update
export async function updateCli(oldName, newName) {
  oldName = oldName.trim();
  newName = newName.trim();
  try {
    const { allClisChoices, allClis } = await getJsonFileData(
      'config/allClis.json'
    );
    if (allClisChoices.includes(oldName)) {
      const index = allClisChoices.indexOf(oldName);
      allClisChoices[index] = newName;
      allClis[index].name = newName;
      allClis[index].update_time = new Date().toISOString();
      await setJsonFileData('config/allClis.json', {
        allClisChoices,
        allClis,
      });
      console.log(symbols.success, chalk.green(`update is successed!`));
    } else {
      console.log(symbols.info, chalk.yellow(`${oldName} is null!`));
    }
  } catch (error) {
    console.log(symbols.error, chalk.red(`something is wrong: ${error}!`));
  }
}

// TODO list
export async function listAllCli() {
  try {
    const { allClis } = await getJsonFileData('config/allClis.json');
    console.log(symbols.success, chalk.green(`list is successed!`));
    console.table(allClis);
  } catch (error) {
    console.log(symbols.error, chalk.red(`something is wrong: ${error}!`));
  }
}

// TODO find
export async function findCli(name) {
  name = name.trim();
  try {
    const { allClis } = await getJsonFileData('config/allClis.json');
    const data = allClis.filter(a => a.name == name);
    if (data.length > 0) {
      console.log(symbols.success, chalk.green(`find ${name} is successed!`));
    } else {
      console.log(symbols.error, chalk.red(`find ${name} is failed!`));
    }
    console.table(data);
  } catch (error) {
    console.log(symbols.error, chalk.red(`something is wrong: ${error}!`));
  }
}

// TODO choose
export async function chooseCli() {
  try {
    const { allClisChoices, allClis } = await getJsonFileData(
      'config/allClis.json'
    );
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'template',
          message: '请选择',
          choices: allClisChoices,
        },
      ])
      .then(ans => {
        // const spinner = ora('Loading...').start();
        // spinner.color = 'blue';
        // spinner.text = 'Loading rainbows';
        // setTimeout(() => {
        //   spinner.succeed('success');
        //   console.log(symbols.success, chalk.green(JSON.stringify(ans)));
        // }, 1000);
      });
  } catch (error) {
    console.log(symbols.error, chalk.red(`something is wrong: ${error}!`));
  }
}

// TODO use
export async function useCli(name) {
  name = name.trim();
  const spinner = ora('Loading...').start();
  spinner.color = 'blue';
  spinner.text = 'Loading';
  try {
    const { allClis } = await getJsonFileData('config/allClis.json');
    const data = allClis.filter(a => a.name == name);
    if (data.length > 0) {
      exec(
        data[0].commander,
        { cwd: path.join(process.cwd()), timeout: 5000 },
        (error, stdout, stderr) => {
          if (error) {
            spinner.fail('failed');
            console.log(
              symbols.error,
              chalk.red(`something is wrong: ${error}!`)
            );
            return;
          }
          console.log(stderr);
          console.log('\n', chalk.green(stdout));
          spinner.succeed('success');
          console.log(
            symbols.success,
            chalk.green(`use ${name} is successed!`)
          );
        }
      );
    } else {
      spinner.fail('failed');
      console.log(symbols.info, chalk.yellow(`use ${name} is failed!`));
    }
  } catch (error) {
    spinner.fail('failed');
    console.log(symbols.error, chalk.red(`something is wrong: ${error}!`));
  }
}
