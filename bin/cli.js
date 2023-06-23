#!/usr/bin/env node
import { program } from 'commander';
import packageInfo from '../config/packageInfo.js';
// import allClisData from '../config/allClis.json' assert { type: 'json' };
import {
  addCli,
  delCli,
  updateCli,
  listAllCli,
  findCli,
  chooseCli,
  useCli,
} from '../config/managerClis.js';
import { printLogo } from '../utils/printLogo.js';

program
  .name(packageInfo.name)
  .version(packageInfo.version, '-v, --vers', 'output the current version')
  .description(packageInfo.description);

program
  .command('add')
  .description('add a cli')
  .argument('<name>', "cli's name")
  .argument('<commander>', "cli's commander")
  .action((name, commander) => {
    addCli(name, commander);
  });

program
  .command('del')
  .description('del a cli')
  .argument('<name>', "cli's name")
  .action(name => {
    delCli(name);
  });

program
  .command('update')
  .description('update a cli')
  .argument('<oldName>', 'old name')
  .argument('<newName>', 'new name')
  .action((oldName, newName) => {
    updateCli(oldName, newName);
  });

program
  .command('list')
  .description('list all cli')
  .action(() => {
    listAllCli();
  });

program
  .command('find')
  .description('find a cli')
  .argument('<name>', "cli's name")
  .action(name => {
    findCli(name);
  });

// program
//   .command('choose')
//   .description('choose a cli')
//   .action(() => {
//     chooseCli();
//   });

// program
//   .command('use')
//   .description('find a cli')
//   .argument('<name>', "cli's name")
//   .action(name => {
//     useCli(name);
//   });

printLogo();

program.parse(process.argv);
