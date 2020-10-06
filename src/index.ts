import * as core from '@actions/core';
import axios from 'axios';
import { BuildCard } from './class/build-card.class';

function run() {
  // Get inputs
  const webhook_url = core.getInput('webhook_url', { required: true });
  const summary = core.getInput('summary');
  const title = core.getInput('title');
  const text = core.getInput('text');
  const theme_color = core.getInput('theme-color');
  const sections = core.getInput('sections');
  const potential_action = core.getInput('potential-action');
  
  const buildCard = new BuildCard();
  let builtCard: any;

  buildCard.setTitle(title);
  buildCard.setSummary(summary);
  buildCard.setText(text);
  buildCard.setThemeColor(theme_color);
  buildCard.setSections(sections);
  buildCard.setPotentialAction(potential_action);

  builtCard = buildCard.toObject();
  core.info(JSON.stringify(builtCard, null, 4));

  axios.post(webhook_url, builtCard)
  .then(res => {
    core.info(res.data);
  })
  .catch(err => {
    core.error(err);
  })
}

run();
