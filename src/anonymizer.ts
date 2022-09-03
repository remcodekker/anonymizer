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
import {client} from './database/connection.ts';
import {executeCustomBeforeQueries, executeCustomAfterQueries, runQueriesFromConfig} from './database/transactions.ts';

// Do the first custom queries
await executeCustomBeforeQueries();

// Do the other queries specified in the config
await runQueriesFromConfig();

// Do the final custom queries
await executeCustomAfterQueries();

// Done! Close the connection.
await client.close();
