import { exec } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';

function sortObjectKeysAlphabetically(obj) {
  const entries = Object.entries(obj);

  entries.sort((a, b) => a[0].localeCompare(b[0]));

  return Object.fromEntries(entries);
}

function sortArrayAlphabetically(array) {
  return array.toSorted((a, b) => a.localeCompare(b));
}

const NUMBER_TO_SEVERITY_MAP = { 0: 'off', 1: 'warn', 2: 'error' };

function preprocessConfig(configContent) {
  const config = JSON.parse(configContent);

  config.languageOptions.globals = sortObjectKeysAlphabetically(
    config.languageOptions.globals
  );

  config.plugins = sortArrayAlphabetically(config.plugins);

  const rulesEntries = Object.entries(config.rules);

  rulesEntries.sort((a, b) => a[0].localeCompare(b[0]));

  for (const rule of rulesEntries) {
    const [ruleName, ruleOptions] = rule;

    if (Array.isArray(ruleOptions)) {
      const severity = ruleOptions[0];

      ruleOptions[0] = NUMBER_TO_SEVERITY_MAP[severity];
    } else {
      // This isn't supposed to happen
      throw new Error(
        `Rule Options must always be an array, but this is not the case for: ${ruleName}`
      );
    }
  }

  config.rules = Object.fromEntries(rulesEntries);

  return JSON.stringify(config, null, 2);
}

async function getResolvedConfig(filepath) {
  return new Promise((resolve, reject) => {
    exec(`npx eslint --print-config ${filepath}`, (err, stdout, stderr) => {
      if (err) {
        reject(err);
        return;
      }

      if (stderr) {
        reject(stderr);
        return;
      }

      resolve(stdout);
    });
  });
}

const ESLINT_RESOLVED_CONFIGS_FOLDER = 'eslint-resolved-configs';

const eslintPaths = [
  'config-file.js',
  'src/file.js',
  'config-file.ts',
  'src/file.ts',
  'declaration-file.d.ts',
];

const resolvedConfigs = await Promise.all(
  eslintPaths.map((lintPath) => getResolvedConfig(lintPath))
);

for (let i = 0; i < resolvedConfigs.length; i += 1) {
  const lintPath = eslintPaths[i];
  const resolvedProcessedConfig = preprocessConfig(resolvedConfigs[i]);

  const filename = path.join(
    ESLINT_RESOLVED_CONFIGS_FOLDER,
    `${lintPath}.json`
  );

  await fs.mkdir(path.dirname(filename), { recursive: true });
  await fs.writeFile(filename, resolvedProcessedConfig);
}
