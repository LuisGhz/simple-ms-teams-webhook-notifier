# Simple MS Teams Webhook
---

A GitHub Action to send notifications to MS Teams using the syntax of [Legacy Actionable Messages](https://docs.microsoft.com/en-us/outlook/actionable-messages/message-card-reference) (Not all features yet).

---

| Input                | Description                                                  | Required           | Default |
| -------------------- | ------------------------------------------------------------ | ------------------ | ------- |
| **webhook_url**      | Url generated by Incoming Webhook for MS Teams channel       | :heavy_check_mark: |         |
| **summary**          | Card summary                                                 | :x:                |         |
| **title**            | Card title                                                   | :x:                |         |
| **text**             | Card body text                                               | :x:                |         |
| **theme-color**      | Brand color card. Hexadecimal (without **#**).<br />You can use **Success**, **Warning**, **Error** and **Info** words as well | :x:                | Success |
| **sections**         | For more information visit [Sections fields](https://docs.microsoft.com/en-us/outlook/actionable-messages/message-card-reference#section-fields). <br />This action uses yaml format in value as string. Some examples below. | :x:                |         |
| **potential-action** | For more information visit [Actions](https://docs.microsoft.com/en-us/outlook/actionable-messages/message-card-reference#actions). <br />This action uses yaml format in value as string. Some examples below. | :x:                |         |
| **yaml-ident**       | This action uses [YAML](https://www.npmjs.com/package/yaml) to parse the value of **sections** & **potential-action** to json properties. <br />This input configures the number of spaces used for the indentations. | :x:                |         |

---

## Examples

### Send only basic fields

```yaml
- name: run action
      id: run_action
      uses: luisghz/simple-ms-teams-webhook-notifier@v1
      with: 
        webhook_url: ${{ secrets.WEBHOOK_URL }}
        summary: 'Card Summary'
        title: 'Card title'
        text: 'Card text'
```

### Set hexadecimal theme color

```yaml
- name: run action
      id: run_action
      uses: luisghz/simple-ms-teams-webhook-notifier@v1
      with: 
        webhook_url: ${{ secrets.WEBHOOK_URL }}
        summary: 'Card Summary'
        title: 'Card title'
        text: 'Card text'
        theme-color: 'b405ff'
```

### Set preset theme color

```yaml
- name: run action
      id: run_action
      uses: luisghz/simple-ms-teams-webhook-notifier@v1
      with: 
        webhook_url: ${{ secrets.WEBHOOK_URL }}
        summary: 'Card Summary'
        title: 'Card title'
        text: 'Card text'
        theme-color: 'Success'
```

### Use sections (You can use the basic fields at the same time)

```yaml
- name: run action
      id: run_action
      uses: luisghz/simple-ms-teams-webhook-notifier@v1.*
      with: 
        webhook_url: ${{ secrets.WEBHOOK_URL }}
        summary: 'Card Summary'
        title: 'Card Title'
        text: 'Card Text'
        sections: |
          - activityTitle: "Section title"
            activitySubtitle: "Section subtitle"
            activityImage: "https://image-url.com"
            facts:
              - name: 'Fact 1'
                value: 'Value 1'
              - name: 'Fact 2'
                value: 'Value 2'
```

### Use potential action

```yaml
- name: run action
      id: run_action
      uses: luisghz/simple-ms-teams-webhook-notifier@v1
      with: 
        webhook_url: ${{ secrets.WEBHOOK_URL }}
        summary: 'Card Summary'
        title: 'Card Title'
        text: 'Card Text'
        potential-action: |
        	- "@type": "OpenUri"
	          name: "Open Executed Action"
	          targets:
	          	- os: "default"
	          	  uri: "https://docs.microsoft.com/outlook/actionable-messages"
	          
```

**Note**: To use special characters you must use double quotes **" "** in the property name. You can use double quotes in the values too.