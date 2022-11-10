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
import {ClientConfig, Progress} from '../deps.ts';

export const getTimeoutEnvironmentVariable = (): number => {
	const connectionTimeoutConfig: string | undefined = Deno.env.get('ANONYMIZER_LOCAL_CONNECTION_TIMEOUT');
	return connectionTimeoutConfig ? parseInt(connectionTimeoutConfig) : 60;
};
/**
 * Grab Environment variables so that we don't log these values in history or PS outputs
 */
export const getDatabaseEnvironmentVariables = (): ClientConfig => {
	const hostnameConfig: string | undefined = Deno.env.get('ANONYMIZER_LOCAL_HOSTNAME');
	const hostname: string = hostnameConfig ? hostnameConfig : '127.0.0.1';
	const portConfig: string | undefined = Deno.env.get('ANONYMIZER_LOCAL_PORT');
	const port: number | undefined = portConfig ? parseInt(portConfig) : 3306;
	const db: string | undefined = Deno.env.get('ANONYMIZER_LOCAL_DATABASE');
	const username: string | undefined = Deno.env.get('ANONYMIZER_LOCAL_USERNAME');
	const password: string | undefined = Deno.env.get('ANONYMIZER_LOCAL_PASSWORD');

	if (!db || !username || !password) {
		throw new Error('Could not find the environment variable for one of the following "ANONYMIZER_LOCAL_DATABASE", "ANONYMIZER_LOCAL_USERNAME", "ANONYMIZER_LOCAL_PASSWORD"');
	}

	return {
		hostname,
		port,
		db,
		username,
		password,
		timeout: getTimeoutEnvironmentVariable() * 1000
	};
};

/**
 * Get the Environment variable that holds the location of the configuration file.
 */
export const getConfigEnvironmentVariable = (): string => {
	const config: string | undefined = Deno.env.get('ANONYMIZER_CONFIG');

	if (!config) {
		throw new Error('Could not find the environment variable for "ANONYMIZER_CONFIG"');
	}

	return config;
};

/**
 * Get the Environment variable that holds the language used by the faker library
 */
export const getFakerLocaleEnvironmentVariable = (): string => {
	let locale: string | undefined = Deno.env.get('FAKER_LOCALE');

	if (!locale) {
		locale = 'en';
	}

	return locale;
};

export const unreachable = (target: never) => {
	throw new Error(`Illegal state, unhandled case: ${target}`);
};

export const progress = (total: number): Progress => {
	return new Progress({
		total,
		complete: '=',
		incomplete: '-',
		display: '         :completed/:total :time [:bar] :percent'
	});
};

export const countdown = (total: number): Progress => {
	return new Progress({
		total: total + 1,
		complete: '=',
		incomplete: '-',
		display: '         :time [:bar]'
	});
};
