import *  as github from '@actions/github';
import { TextTemplate } from '../interface/text-template.interface';

const textTemplate: TextTemplate[] = [
    { target: 'actor', replace: github.context.actor },
    { target: 'actor-url', replace: `https://github.com/${ github.context.actor }` },
    { target: 'avatar-url', replace: `${process.env.avatar_url}` },
    { target: 'run-number-link', replace: `[#${ github.context.runNumber }](${ github.context.payload?.repository?.html_url }/actions/runs/${ github.context.runId })` }
]

export { textTemplate };