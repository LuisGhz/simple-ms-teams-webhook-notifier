import * as core from '@actions/core';
import *  as github from '@actions/github';
import YAML from 'yaml'

import { RegexReplacer } from '../interface/RegexReplacer.interface';

export class BuildCard {
    private card: any;
    private preThemeColor: any;
    private regexReplacer: RegexReplacer[];
    private identNumber: number;

    constructor() {
        const githubContext: any = github.context;
        const githubActor: string = githubContext.actor;

        this.card = {};
        this.card["@type"] = "MessageCard";
        this.card["@context"] = "https://schema.org/extensions";
        
        this.identNumber = +core.getInput('yaml-ident');

        this.preThemeColor = {
            Success: '28a745',
            Warning: 'ffc107',
            Error: 'dc3545',
            Info: '2554fc'
        }

        this.regexReplacer = [
            { target: 'actor', replace: githubActor },
            { target: 'actor-url', replace: `https://github.com/${githubActor}` },
            { target: 'avatar-url', replace: `${process.env.avatar_url}` },
            { target: 'run-number-link', replace: `[#${githubContext.runNumber}](${githubContext.payload.repository.html_url}/actions/runs/${githubContext.runId})` }
        ]
    }

    setTitle(title: string): void {
        this.card["title"] = this.replaceTemplates(title);
    }

    setSummary(summary: string): void {
        this.card["summary"] = this.replaceTemplates(summary);
    }

    setText(text: string): void {
        this.card["text"] = this.replaceTemplates(text);
    }

    setThemeColor(themeColor: string): void {
        const useThemeColor = this.preThemeColor[themeColor] || themeColor;
        this.card["themeColor"] = useThemeColor;
    }

    setSections(sections: string): void {
        if (sections !== '') {
            const sectionsObject: any = YAML.parse(this.replaceTemplates(sections), {
                indent: this.identNumber
            });

            this.card["sections"] = sectionsObject;
        }
    }

    setPotentialAction(potentialAction: string): void {
        if (potentialAction !== '') {
            const potentialActionObject: any = YAML.parse(potentialAction, {
                indent: this.identNumber
            });
    
            this.card["potentialAction"] = potentialActionObject;
        }
    }

    toObject(): any {
        return this.card;
    }

    private replaceTemplates(str: string): string {
        this.regexReplacer.map(el => {
            str = str.replace(new RegExp(`{gh:${el.target}}`, 'g'), el.replace);
        });

        return str;
    }
}