# Changelog


## [1.2.0] - 2020-10-15

### Added

- **{gh:run-number-link}** template to create a link to executed runner.
- **print-json** if true payload will be print on step.
- Set default avatar_url if an error accurs.
- Set yaml conf in each execution.
- Try catch block to webhook_url assigment.

### Changed

- Update yaml from 1.1.0 to 2.x.

### Removed

- yaml 1.1.0.

## [1.1.0] - 2020-10-07

### Added

- Preset theme colors.
- RegexReplacer interface.
- **{gh:actor}** template to get the username who execute the workflow.
- **{gh:actor-url}** to get the user url who execute the workflow
- Make run function async
- Get avatar_url from https://api.github.com/users/{username} in index file with axios using await.
- **{gh:avatar_url}** template to get the avatar-url.

### Changed

- Change default color for theme-color input.
- Move build-card to class directory

## [1.0.0] - 2020-10-05

### Initial Release