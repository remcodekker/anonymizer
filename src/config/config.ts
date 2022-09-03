/**
 * Copyright (C) 2022, Patrick van Zadel <patrickvanzadel@eleven.nl>
 *
 * Anonymizer is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Anonymizer is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import {path, toml, yaml} from '../deps.ts';
import {AnonymizerRules} from '../interfaces/anonymizer.rules.ts';

/**
 * internal representation of config files
 */
export type configFileFormat = 'toml' | 'json' | 'yaml' | 'js' | 'ts';

interface IConfigFile {
	readonly type: configFileFormat;
	readonly fileName: string;
	readonly valid: boolean;
}

export class Config {
	/**
	 * Load method that first verifies the config file format, and it's validity.
	 *
	 * @param configFilePath
	 */
	static async load(configFilePath: string): Promise<Record<string, unknown> | undefined | AnonymizerRules> {
		const configFile: IConfigFile = this.verifyFileFormat(configFilePath);

		if (!configFile.valid) {
			return;
		}

		return await this.actuallyLoad(configFile);
	}

	/**
	 * Load the config file based on its format. Each format requires a different way of loading the data.
	 *
	 * @param configFile
	 * @private
	 */
	private static async actuallyLoad(configFile: IConfigFile): Promise<Record<string, unknown> | undefined | AnonymizerRules> {
		const configFilePath = path.join(configFile.fileName);

		if (configFile.type === 'js' || configFile.type === 'ts') {
			const config = await import(configFilePath);
			return config.default;
		} else if (configFile.type === 'toml') {
			const content = await Deno.readTextFile(configFilePath);
			return toml.parse(content);
		} else if (configFile.type === 'yaml') {
			const content = await Deno.readTextFile(configFilePath);
			return yaml.parse(content) as Record<string, unknown>;
		} else if (configFile.type === 'json') {
			return JSON.parse(await Deno.readTextFile(configFilePath)) as Record<string, unknown>;
		}
	}

	/**
	 * Method that verifies the file format.
	 *
	 * @param fileName
	 * @private
	 */
	private static verifyFileFormat(fileName: string): IConfigFile {
		const fileExtensionRegex = /(?:\.([^.]+))?$/;
		const output = fileExtensionRegex.exec(fileName);

		if (output === null) {
			throw new Error("No config file given");
		}

		const type: configFileFormat = output[1] as configFileFormat;
		// TODO: Add a way to verify the contents of each config file so we know it's the correct setup
		const valid = true;

		return {
			fileName,
			type,
			valid
		};
	}
}
