import * as core from '@actions/core'
import * as github from '@actions/github';
const axios = require('axios');

async function setup() {
    await axios.get(`https://api.github.com/users/${github.context.actor}`)
    .then((res: any) => {
        core.info('Setup Ok');
        process.env.avatar_url = res.data.avatar_url;
    }).catch((err: any) => {
        core.error(err);
    });
}

setup();