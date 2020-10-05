import * as core from '@actions/core';
import { BuildCard } from './build-card.class';

function run() {
  // Get inputs
  const webhook_url = core.getInput('webhook_url');
  const summary = core.getInput('summary');
  const title = core.getInput('title');
  const theme_color = core.getInput('theme-color');
  const sections = core.getInput('sections');
  const potential_action = core.getInput('potential-action');

  const buildCard = new BuildCard();
  buildCard.setTitle(title);
  buildCard.setSummary(summary);
  buildCard.setThemeColor(theme_color);
  buildCard.setSections(sections);
  buildCard.setPotentialAction(potential_action);

  core.info(JSON.stringify(buildCard.toObject(), null, 4));
}

run();
