import * as core from '@actions/core';

function run() {
  // Get inputs
  const webhook_url = core.getInput('webhook_url');
  const summary = core.getInput('summary');
  const title = core.getInput('title');
  const theme_color = core.getInput('theme-color');
  const sections = core.getInput('sections');
  const potential_action = core.getInput('potential-action');


}

run();
