import * as core from '@actions/core';
import YAML from 'yaml'

import { textTemplate, replaceTextByTemplates, themeColorTemplate } from '../ts-json';

export class BuildCard {
    private card: any;
    private identNumber: number;

    constructor() {
        this.card = {};
        this.card["@type"] = "MessageCard";
        this.card["@context"] = "https://schema.org/extensions";
        
        this.identNumber = +core.getInput('yaml-ident');
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
        const useThemeColor = themeColorTemplate[themeColor] || themeColor;
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
        return replaceTextByTemplates(str);
    }
}