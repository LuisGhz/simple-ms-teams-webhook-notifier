import * as core from '@actions/core';
const yaml = require('yaml');


export class BuildCard {
    private card: any;

    constructor() {
        this.card = {};
        this.card["@type"] = "MessageCard";
        this.card["@context"] = "https://schema.org/extensions";

        yaml.defaultOptions = {
            indent: +core.getInput('yaml-ident')
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
        this.card["themeColor"] = themeColor;
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