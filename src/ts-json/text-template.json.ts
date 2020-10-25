import *  as github from '@actions/github';
import { TextTemplate } from '../interface/text-template.interface';

export const textTemplate: TextTemplate[] = [
    { target: 'actor', replace: github.context.actor },
    { target: 'actor-url', replace: `https://github.com/${ github.context.actor }` },
    { target: 'actor-link', replace: `[${github.context.actor}](https://github.com/${ github.context.actor })` },
    { target: 'avatar-url', replace: `${process.env.avatar_url}` },
    { target: 'run-number-link', replace: `[#${ github.context.runNumber }](${ github.context.payload?.repository?.html_url }/actions/runs/${ github.context.runId })` }
]

export function replaceTextByTemplates(str: string): string {
    textTemplate.map(el => {
        str = str.replace(new RegExp(`{gh:${el.target}}`, 'g'), el.replace);
    });

    return str;
}