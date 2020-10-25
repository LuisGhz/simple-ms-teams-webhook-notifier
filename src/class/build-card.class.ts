import * as core from '@actions/core';
import *  as github from '@actions/github';
import YAML from 'yaml'

import { textTemplate } from '../ts-json/text-template.json';

export class BuildCard {
    private card: any;
    private preThemeColor: any;
    private identNumber: number;

    constructor() {
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
        textTemplate.map(el => {
            str = str.replace(new RegExp(`{gh:${el.target}}`, 'g'), el.replace);
        });

        return str;
    }
}