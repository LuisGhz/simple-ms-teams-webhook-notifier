const yaml = require('yaml');

export class BuildCard {
    private card: any;
    constructor() {
        this.card = {};
        this.card["@type"] = "MessageCard";
        this.card["@context"] = "https://schema.org/extensions";
    }

    setTitle(title: string): void {
        this.card["title"] = title;
    }

    setSummary(summary: string): void {
        this.card["summary"] = summary;
    }

    setThemeColor(themeColor: string): void {
        this.card["themeColor"] = themeColor;
    }

    setSections(sections: string): void {
        if (sections === '') {
            this.card["sections"] = {};
        } else {
            const sectionsObject: any = yaml.parse(sections);
            
            this.card["sections"] = sectionsObject;
        }

    }

    setPotentialAction(potentialAction: string): void {
        if (potentialAction === '') {
            this.card["potentialAction"] = {};
        } else {
            const potentialActionObject: any = yaml.parse(potentialAction);
    
            this.card["potentialAction"] = potentialActionObject;
        }

    }

    toObject(): any {
        return this.card;
    }
}