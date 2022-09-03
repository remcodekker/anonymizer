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
import {assertExists} from 'https://deno.land/std@0.153.0/testing/asserts.ts';
import * as mod from 'https://deno.land/std@0.153.0/testing/bdd.ts';

import {getConfigEnvironmentVariable, getDatabaseEnvironmentVariables} from './helper.ts';

mod.beforeAll(() => {
	Deno.env.delete('ANONYMIZER_LOCAL_DATABASE');
	Deno.env.delete('ANONYMIZER_LOCAL_USERNAME');
	Deno.env.delete('ANONYMIZER_LOCAL_PASSWORD');
	Deno.env.delete('ANONYMIZER_CONFIG');
});

Deno.test("Test getDatabaseEnvironmentVariables()", () => {
	Deno.env.set('ANONYMIZER_LOCAL_DATABASE', 'example');
	Deno.env.set('ANONYMIZER_LOCAL_USERNAME', 'example');
	Deno.env.set('ANONYMIZER_LOCAL_PASSWORD', 'example');

	const variables = getDatabaseEnvironmentVariables();
	assertExists(variables);
});

Deno.test("to check if all Database environment variables exist", () => {
	Deno.env.set('ANONYMIZER_CONFIG', '/Users/test/location/config.json');

	const variables = getConfigEnvironmentVariable();
	assertExists(variables);
});
