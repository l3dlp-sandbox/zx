// Generated by dts-bundle-generator v9.5.1

/// <reference types="node" />

import * as fs from 'fs';
import { URL as URL$1 } from 'node:url';

declare type ErrnoException = NodeJS.ErrnoException;
declare type StatAsynchronousMethod = (path: string, callback: (error: ErrnoException | null, stats: fs.Stats) => void) => void;
declare type StatSynchronousMethod = (path: string) => fs.Stats;
interface FileSystemAdapter {
	lstat: StatAsynchronousMethod;
	stat: StatAsynchronousMethod;
	lstatSync: StatSynchronousMethod;
	statSync: StatSynchronousMethod;
}
interface Entry {
	dirent: Dirent;
	name: string;
	path: string;
	stats?: Stats;
}
declare type Stats = fs.Stats;
declare type ErrnoException$1 = NodeJS.ErrnoException;
interface Dirent {
	isBlockDevice: () => boolean;
	isCharacterDevice: () => boolean;
	isDirectory: () => boolean;
	isFIFO: () => boolean;
	isFile: () => boolean;
	isSocket: () => boolean;
	isSymbolicLink: () => boolean;
	name: string;
}
interface ReaddirAsynchronousMethod {
	(filepath: string, options: {
		withFileTypes: true;
	}, callback: (error: ErrnoException$1 | null, files: Dirent[]) => void): void;
	(filepath: string, callback: (error: ErrnoException$1 | null, files: string[]) => void): void;
}
interface ReaddirSynchronousMethod {
	(filepath: string, options: {
		withFileTypes: true;
	}): Dirent[];
	(filepath: string): string[];
}
declare type FileSystemAdapter$1 = FileSystemAdapter & {
	readdir: ReaddirAsynchronousMethod;
	readdirSync: ReaddirSynchronousMethod;
};
declare type Entry$1 = Entry;
type Entry$2 = Entry$1;
type Pattern = string;
type FileSystemAdapter$2 = FileSystemAdapter$1;
type Options = {
	/**
	 * Return the absolute path for entries.
	 *
	 * @default false
	 */
	absolute?: boolean;
	/**
	 * If set to `true`, then patterns without slashes will be matched against
	 * the basename of the path if it contains slashes.
	 *
	 * @default false
	 */
	baseNameMatch?: boolean;
	/**
	 * Enables Bash-like brace expansion.
	 *
	 * @default true
	 */
	braceExpansion?: boolean;
	/**
	 * Enables a case-sensitive mode for matching files.
	 *
	 * @default true
	 */
	caseSensitiveMatch?: boolean;
	/**
	 * Specifies the maximum number of concurrent requests from a reader to read
	 * directories.
	 *
	 * @default os.cpus().length
	 */
	concurrency?: number;
	/**
	 * The current working directory in which to search.
	 *
	 * @default process.cwd()
	 */
	cwd?: string;
	/**
	 * Specifies the maximum depth of a read directory relative to the start
	 * directory.
	 *
	 * @default Infinity
	 */
	deep?: number;
	/**
	 * Allow patterns to match entries that begin with a period (`.`).
	 *
	 * @default false
	 */
	dot?: boolean;
	/**
	 * Enables Bash-like `extglob` functionality.
	 *
	 * @default true
	 */
	extglob?: boolean;
	/**
	 * Indicates whether to traverse descendants of symbolic link directories.
	 *
	 * @default true
	 */
	followSymbolicLinks?: boolean;
	/**
	 * Custom implementation of methods for working with the file system.
	 *
	 * @default fs.*
	 */
	fs?: Partial<FileSystemAdapter$2>;
	/**
	 * Enables recursively repeats a pattern containing `**`.
	 * If `false`, `**` behaves exactly like `*`.
	 *
	 * @default true
	 */
	globstar?: boolean;
	/**
	 * An array of glob patterns to exclude matches.
	 * This is an alternative way to use negative patterns.
	 *
	 * @default []
	 */
	ignore?: Pattern[];
	/**
	 * Mark the directory path with the final slash.
	 *
	 * @default false
	 */
	markDirectories?: boolean;
	/**
	 * Returns objects (instead of strings) describing entries.
	 *
	 * @default false
	 */
	objectMode?: boolean;
	/**
	 * Return only directories.
	 *
	 * @default false
	 */
	onlyDirectories?: boolean;
	/**
	 * Return only files.
	 *
	 * @default true
	 */
	onlyFiles?: boolean;
	/**
	 * Enables an object mode (`objectMode`) with an additional `stats` field.
	 *
	 * @default false
	 */
	stats?: boolean;
	/**
	 * By default this package suppress only `ENOENT` errors.
	 * Set to `true` to suppress any error.
	 *
	 * @default false
	 */
	suppressErrors?: boolean;
	/**
	 * Throw an error when symbolic link is broken if `true` or safely
	 * return `lstat` call if `false`.
	 *
	 * @default false
	 */
	throwErrorOnBrokenSymbolicLink?: boolean;
	/**
	 * Ensures that the returned entries are unique.
	 *
	 * @default true
	 */
	unique?: boolean;
};
type Task = {
	base: string;
	dynamic: boolean;
	patterns: Pattern[];
	positive: Pattern[];
	negative: Pattern[];
};
type EntryObjectModePredicate = {
	[TKey in keyof Pick<Options, "objectMode">]-?: true;
};
type EntryStatsPredicate = {
	[TKey in keyof Pick<Options, "stats">]-?: true;
};
type EntryObjectPredicate = EntryObjectModePredicate | EntryStatsPredicate;
declare function FastGlob(source: Pattern | Pattern[], options: Options & EntryObjectPredicate): Promise<Entry$2[]>;
declare function FastGlob(source: Pattern | Pattern[], options?: Options): Promise<string[]>;
declare namespace FastGlob {
	export {Options};
	export type Entry = Entry$2;
	export {Task};
	export {Pattern};
	type FileSystemAdapter = FileSystemAdapter$2;
	const glob: typeof FastGlob;
	const globSync: typeof sync;
	const globStream: typeof stream;
	const async: typeof FastGlob;
	function sync(source: Pattern | Pattern[], options: Options & EntryObjectPredicate): Entry$2[];
	function sync(source: Pattern | Pattern[], options?: Options): string[];
	function stream(source: Pattern | Pattern[], options?: Options): NodeJS.ReadableStream;
	function generateTasks(source: Pattern | Pattern[], options?: Options): Task[];
	function isDynamicPattern(source: Pattern, options?: Options): boolean;
	function escapePath(source: string): Pattern;
	function convertPathToPattern(source: string): Pattern;
	namespace posix {
		function escapePath(source: string): Pattern;
		function convertPathToPattern(source: string): Pattern;
	}
	namespace win32 {
		function escapePath(source: string): Pattern;
		function convertPathToPattern(source: string): Pattern;
	}
}
type GlobEntry = FastGlob.Entry;
type GlobTask = {
	readonly patterns: string[];
	readonly options: Options$1;
};
type ExpandDirectoriesOption = boolean | readonly string[] | {
	files?: readonly string[];
	extensions?: readonly string[];
};
type FastGlobOptionsWithoutCwd = Omit<FastGlob.Options, "cwd">;
type Options$1 = {
	/**
	If set to `true`, `globby` will automatically glob directories for you. If you define an `Array` it will only glob files that matches the patterns inside the `Array`. You can also define an `Object` with `files` and `extensions` like in the example below.

	Note that if you set this option to `false`, you won't get back matched directories unless you set `onlyFiles: false`.

	@default true

	@example
	```
	import {globby} from 'globby';

	const paths = await globby('images', {
		expandDirectories: {
			files: ['cat', 'unicorn', '*.jpg'],
			extensions: ['png']
		}
	});

	console.log(paths);
	//=> ['cat.png', 'unicorn.png', 'cow.jpg', 'rainbow.jpg']
	```
	*/
	readonly expandDirectories?: ExpandDirectoriesOption;
	/**
	Respect ignore patterns in `.gitignore` files that apply to the globbed files.

	@default false
	*/
	readonly gitignore?: boolean;
	/**
	Glob patterns to look for ignore files, which are then used to ignore globbed files.

	This is a more generic form of the `gitignore` option, allowing you to find ignore files with a [compatible syntax](http://git-scm.com/docs/gitignore). For instance, this works with Babel's `.babelignore`, Prettier's `.prettierignore`, or ESLint's `.eslintignore` files.

	@default undefined
	*/
	readonly ignoreFiles?: string | readonly string[];
	/**
	The current working directory in which to search.

	@default process.cwd()
	*/
	readonly cwd?: URL | string;
} & FastGlobOptionsWithoutCwd;
type GitignoreOptions = {
	readonly cwd?: URL | string;
};
type GlobbyFilterFunction = (path: URL | string) => boolean;
declare function globby(patterns: string | readonly string[], options: Options$1 & {
	objectMode: true;
}): Promise<GlobEntry[]>;
declare function globby(patterns: string | readonly string[], options?: Options$1): Promise<string[]>;
declare function globbySync(patterns: string | readonly string[], options: Options$1 & {
	objectMode: true;
}): GlobEntry[];
declare function globbySync(patterns: string | readonly string[], options?: Options$1): string[];
declare function globbyStream(patterns: string | readonly string[], options?: Options$1): NodeJS.ReadableStream;
declare function generateGlobTasks(patterns: string | readonly string[], options?: Options$1): Promise<GlobTask[]>;
declare function generateGlobTasksSync(patterns: string | readonly string[], options?: Options$1): GlobTask[];
declare function isDynamicPattern(patterns: string | readonly string[], options?: FastGlobOptionsWithoutCwd & {
	/**
	The current working directory in which to search.

	@default process.cwd()
	*/
	readonly cwd?: URL | string;
}): boolean;
declare function isGitIgnored(options?: GitignoreOptions): Promise<GlobbyFilterFunction>;
declare function isGitIgnoredSync(options?: GitignoreOptions): GlobbyFilterFunction;
declare function convertPathToPattern(source: string): FastGlob.Pattern;
declare const fetch$1: typeof globalThis.fetch;
type TCodeRef = {
	type: string;
	value: string;
	index: number;
};
type TOptsNormalized = {
	comments: boolean;
	bufferSize: number;
	re: RegExp;
	offset: number;
};
type TOpts = Partial<TOptsNormalized>;
declare const depseekSync: (input: string | Buffer, opts?: TOpts) => TCodeRef[];
declare function minimist(args?: string[], opts?: minimist.Opts): minimist.ParsedArgs;
declare function minimist<T>(args?: string[], opts?: minimist.Opts): T & minimist.ParsedArgs;
declare function minimist<T extends minimist.ParsedArgs>(args?: string[], opts?: minimist.Opts): T;
declare namespace minimist {
	interface Opts {
		/**
		 * A string or array of strings argument names to always treat as strings
		 */
		string?: string | string[] | undefined;
		/**
		 * A boolean, string or array of strings to always treat as booleans. If true will treat
		 * all double hyphenated arguments without equals signs as boolean (e.g. affects `--foo`, not `-f` or `--foo=bar`)
		 */
		boolean?: boolean | string | string[] | undefined;
		/**
		 * An object mapping string names to strings or arrays of string argument names to use as aliases
		 */
		alias?: {
			[key: string]: string | string[];
		} | undefined;
		/**
		 * An object mapping string argument names to default values
		 */
		default?: {
			[key: string]: any;
		} | undefined;
		/**
		 * When true, populate argv._ with everything after the first non-option
		 */
		stopEarly?: boolean | undefined;
		/**
		 * A function which is invoked with a command line parameter not defined in the opts
		 * configuration object. If the function returns false, the unknown option is not added to argv
		 */
		unknown?: ((arg: string) => boolean) | undefined;
		/**
		 * When true, populate argv._ with everything before the -- and argv['--'] with everything after the --.
		 * Note that with -- set, parsing for arguments still stops after the `--`.
		 */
		"--"?: boolean | undefined;
	}
	interface ParsedArgs {
		[arg: string]: any;
		/**
		 * If opts['--'] is true, populated with everything after the --
		 */
		"--"?: string[] | undefined;
		/**
		 * Contains all the arguments that didn't have an option associated with them
		 */
		_: string[];
	}
}
declare const _default: {
	parse: (content: string | Buffer) => NodeJS.ProcessEnv;
	stringify: (env: NodeJS.ProcessEnv) => string;
	load: (...files: string[]) => NodeJS.ProcessEnv;
	loadSafe: (...files: string[]) => NodeJS.ProcessEnv;
	config: (def?: string, ...files: string[]) => NodeJS.ProcessEnv;
};
export declare const createRequire: (filename: string | URL$1) => NodeJS.Require;
declare const globbyModule: {
	convertPathToPattern: typeof convertPathToPattern;
	globby: typeof globby;
	sync: typeof globbySync;
	globbySync: typeof globbySync;
	globbyStream: typeof globbyStream;
	generateGlobTasksSync: typeof generateGlobTasksSync;
	generateGlobTasks: typeof generateGlobTasks;
	isGitIgnoredSync: typeof isGitIgnoredSync;
	isGitIgnored: typeof isGitIgnored;
	isDynamicPattern: typeof isDynamicPattern;
};
declare const _glob: (typeof globbyModule)["globby"] & typeof globbyModule;
declare const _YAML: YAML;
export interface YAML {
	parse(text: string): any;
	stringify(object: any): string;
	/** @deprecated */
	parseAllDocuments(s: string, opts?: any): any[];
	/** @deprecated */
	parseDocument(s: string, opts?: any): any;
	/** @deprecated */
	isAlias(v: any): boolean;
	/** @deprecated */
	isCollection(v: any): boolean;
	/** @deprecated */
	isDocument(v: any): boolean;
	/** @deprecated */
	isMap(v: any): boolean;
	/** @deprecated */
	isNode(v: any): boolean;
	/** @deprecated */
	isPair(v: any): boolean;
	/** @deprecated */
	isScalar(v: any): boolean;
	/** @deprecated */
	isSeq(v: any): boolean;
	/** @deprecated */
	Alias: any;
	/** @deprecated */
	Composer: any;
	/** @deprecated */
	Document: any;
	/** @deprecated */
	Schema: any;
	/** @deprecated */
	YAMLSeq: any;
	/** @deprecated */
	YAMLMap: any;
	/** @deprecated */
	YAMLError: any;
	/** @deprecated */
	YAMLParseError: any;
	/** @deprecated */
	YAMLWarning: any;
	/** @deprecated */
	Pair: any;
	/** @deprecated */
	Scalar: any;
	/** @deprecated */
	Lexer: any;
	/** @deprecated */
	LineCounter: any;
	/** @deprecated */
	Parser: any;
}
export declare const depseek: typeof depseekSync;
export declare const dotenv: typeof _default;
declare const fs$1: typeof import("fs-extra");
export declare const YAML: typeof _YAML;
export declare const glob: typeof _glob;
export declare const nodeFetch: typeof fetch$1;
declare const minimist$1: typeof minimist;
declare namespace minimist$1 {
	interface Opts extends minimist.Opts {
	}
	interface ParsedArgs extends minimist.ParsedArgs {
	}
}

export {
	fs$1 as fs,
	minimist$1 as minimist,
};

export {};
