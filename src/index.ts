import * as core from '@actions/core';
import * as github from '@actions/github';
import axios from 'axios';
import { BuildCard } from './class/build-card.class';

async function run() {

  await axios.get(`https://api.github.com/users/${github.context.actor}`)
  .then((res: any) => {
      core.info('Setup Ok');
      process.env.avatar_url = res.data.avatar_url;
  }).catch((err: any) => {
      process.env.avatar_url = 'https://avatars1.githubusercontent.com/u/9919?v=4';
      core.error(err);
  });
  
  // Get inputs
  let webhook_url = '';
  try {
    webhook_url = core.getInput('webhook_url', { required: true });
  } catch(err) {
    return core.setFailed(err);
  }
  const summary = core.getInput('summary');
  const title = core.getInput('title');
  const text = core.getInput('text');
  const theme_color = core.getInput('theme-color');
  const sections = core.getInput('sections');
  const potential_action = core.getInput('potential-action');
  const print_json: boolean = core.getInput('print-json') == "true";
  
  const buildCard = new BuildCard();
  let builtCard: any;

  buildCard.setTitle(title);
  buildCard.setSummary(summary);
  buildCard.setText(text);
  buildCard.setThemeColor(theme_color);
  buildCard.setSections(sections);
  buildCard.setPotentialAction(potential_action);

  builtCard = buildCard.toObject();

  if (print_json) {
    core.info(JSON.stringify(builtCard, null, 4));
  }

  axios.post(webhook_url, builtCard)
  .then(res => {
    core.info(res.data);
  })
  .catch(err => {
    core.error(err);
  })
}

run();
