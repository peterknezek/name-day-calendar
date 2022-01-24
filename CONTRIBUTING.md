# Contributing

Any contribution to this project is very welcome, especially name days from new countries or some updates.

Welcome.

## Add country

If you like to add a new country that is not involved. Please check before wiki [Specification for data](https://github.com/peterknezek/name-day/wiki/Specification-for-data).

1. Create new branch with name: `data-new-country<country_code>`
2. Create new file in `data/countries`, with filename `<country_code>.yaml`
3. Add name days according to data structure rules and sorted by date
4. Commit with the message in format `feat: ...`
5. Create a new pull request with the title `feat: ...` to `main` branch

## Make changes

If you like to add or change data for an existing country please take a look at [Specification for data](https://github.com/peterknezek/name-day/wiki/Specification-for-data).

1. Create a branch for your changes with the name `fix: ...`
2. Build the project:
   ```
   npm run build
   ```
   It will generate types and JSON files that are used in the package.
3. Test your code or data
4. Make commit with message `fix: ...`
5. Create a new pull request with the title `fix: ...` to the `main` branch

That's it. If you don't feel comfortable forking the project or modifying the YAML you can also submit an issue that includes the appropriate name-days data and required rules.

Please do not forget to name your source of information.

Thanks!
