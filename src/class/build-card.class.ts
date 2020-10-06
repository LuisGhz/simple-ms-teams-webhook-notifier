import * as core from '@actions/core';
const yaml = require('yaml');

export class BuildCard {
    private card: any;
    private preThemeColor: any;

    constructor() {
        this.card = {};
        this.card["@type"] = "MessageCard";
        this.card["@context"] = "https://schema.org/extensions";

        yaml.defaultOptions = {
            indent: +core.getInput('yaml-ident')
        }

        this.preThemeColor = {
            Success: '28a745',
            Warning: 'ffc107',
            Error: 'dc3545',
            Info: '2554fc'
        }
    }

    setTitle(title: string): void {
        this.card["title"] = title;
    }

    setSummary(summary: string): void {
        this.card["summary"] = summary;
    }

    setText(text: string): void {
        this.card["text"] = text;
    }

    setThemeColor(themeColor: string): void {
        const useThemeColor = this.preThemeColor[themeColor] || themeColor;
        this.card["themeColor"] = useThemeColor;
    }

    setSections(sections: string): void {
        if (sections !== '') {
            const sectionsObject: any = yaml.parse(sections);

            this.card["sections"] = sectionsObject;
        }
    }

    setPotentialAction(potentialAction: string): void {
        if (potentialAction !== '') {
            const potentialActionObject: any = yaml.parse(potentialAction);
    
            this.card["potentialAction"] = potentialActionObject;
        }
    }

    toObject(): any {
        return this.card;
    }
}