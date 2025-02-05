import { useState, useCallback, useEffect, useDebugValue, useRef } from "react";

export interface URLParamsLike {
	get(key: string): string | null;
}

export interface RecordParams {
	[key: string]: string | string[] | undefined;
}

export type ParamsInput = URLParamsLike | RecordParams;

function isNumber(value: unknown): value is number {
	return typeof value === "number" && !Number.isNaN(value);
}

function isBoolean(value: unknown): value is boolean {
	return typeof value === "boolean";
}

function isObject(value: unknown): value is object {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isArray(value: unknown): value is unknown[] {
	return Array.isArray(value);
}

function parseValue<T>(value: string | null, defaultValue: T): T {
	try {
		if (value === null) return defaultValue;

		const decoded = decodeURIComponent(value);

		if (defaultValue !== undefined) {
			if (isNumber(defaultValue)) {
				const num = Number(decoded);
				return Number.isNaN(num) ? defaultValue : (num as T);
			}
			if (isBoolean(defaultValue)) {
				return (
					decoded === "true" ? true : decoded === "false" ? false : defaultValue
				) as T;
			}
			if (isObject(defaultValue) || isArray(defaultValue)) {
				try {
					const parsed = JSON.parse(decoded);
					return typeof parsed === typeof defaultValue ? parsed : defaultValue;
				} catch {
					return defaultValue;
				}
			}
		}

		if (decoded === "true") return true as T;
		if (decoded === "false") return false as T;
		if (/^\d+$/.test(decoded)) {
			const num = Number(decoded);
			return Number.isNaN(num) ? (decoded as T) : (num as T);
		}
		if (decoded.length > 0 && (decoded[0] === "{" || decoded[0] === "[")) {
			try {
				return JSON.parse(decoded) as T;
			} catch {
				return decoded as T;
			}
		}

		return decoded as T;
	} catch {
		return defaultValue;
	}
}

function stringifyValue(value: unknown): string {
	try {
		if (value === null || value === undefined) return "";
		if (typeof value === "object") return JSON.stringify(value);
		return String(value);
	} catch {
		return "";
	}
}

function isURLParamsLike(params: ParamsInput): params is URLParamsLike {
	return typeof (params as URLParamsLike).get === "function";
}

function getParam(params: ParamsInput, key: string): string | null {
	try {
		if (isURLParamsLike(params)) {
			return params.get(key);
		}
		const value = params[key];
		if (Array.isArray(value)) return value[0] ?? null;
		return value ?? null;
	} catch {
		return null;
	}
}

class Signal<T> {
	private listeners: Array<(value: T) => void> = [];
	value: T;

	constructor(value: T) {
		this.value = value;
	}

	notify(newValue: T) {
		if (this.value === newValue) return;
		this.value = newValue;
		for (const listener of this.listeners) {
			try {
				listener(newValue);
			} catch (e) {
				console.error("Signal listener error:", e);
			}
		}
	}

	subscribe(fn: (value: T) => void) {
		this.listeners.push(fn);
		return () => {
			this.listeners = this.listeners.filter((f) => f !== fn);
		};
	}
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const store = new Map<string, Signal<any>>();

function getSignal<T>(key: string, value: T): Signal<T> {
	let signal = store.get(key);
	if (!signal) {
		signal = new Signal(value);
		store.set(key, signal);
	}
	return signal;
}

type SetStateAction<T> = T | ((prevState: T) => T);

function useQueryState<T extends string>(
	name: string,
	params: ParamsInput,
	defaultValue: T,
): [T, (newValue: SetStateAction<T>) => void] {
	if (!name) {
		console.error("useQueryState requires a name parameter");
		name = "unnamed";
	}

	const key = encodeURIComponent(name);
	const paramValue = getParam(params, key);
	const initialValue = parseValue<T>(paramValue, defaultValue);

	const [value, setValue] = useState<T>(initialValue);
	const timeoutRef = useRef<number | null>(null);
	const lastSearchRef = useRef(
		typeof window !== "undefined" ? window.location.search : "",
	);
	const signalRef = useRef(getSignal(key, initialValue));
	const isUpdatingRef = useRef(false);

	useEffect(() => {
		return signalRef.current.subscribe((newValue: T) => {
			if (!isUpdatingRef.current) {
				setValue(newValue);
			}
		});
	}, []);

	useEffect(() => {
		if (typeof window === "undefined") return;

		function handleUrlChange() {
			try {
				if (window.location.search === lastSearchRef.current) return;
				if (isUpdatingRef.current) return;

				lastSearchRef.current = window.location.search;
				const params = new URLSearchParams(window.location.search);
				const urlValue = parseValue<T>(params.get(key), defaultValue);
				signalRef.current.notify(urlValue);
			} catch (e) {
				console.error("Error handling URL change:", e);
			}
		}

		window.addEventListener("popstate", handleUrlChange);
		return () => {
			window.removeEventListener("popstate", handleUrlChange);
		};
	}, [key, defaultValue]);

	const setQueryValue = useCallback(
		(newValue: SetStateAction<T>) => {
			if (timeoutRef.current !== null) {
				clearTimeout(timeoutRef.current);
			}

			timeoutRef.current = window.setTimeout(() => {
				try {
					isUpdatingRef.current = true;
					const nextValue =
						typeof newValue === "function"
							? (newValue as (prev: T) => T)(signalRef.current.value)
							: newValue;

					if (nextValue === signalRef.current.value) {
						isUpdatingRef.current = false;
						return;
					}

					signalRef.current.notify(nextValue);

					if (typeof window !== "undefined") {
						const params = new URLSearchParams(window.location.search);
						if (
							nextValue === null ||
							!!nextValue === false ||
							nextValue === ""
						) {
							params.delete(key);
						} else {
							params.set(key, encodeURIComponent(stringifyValue(nextValue)));
						}

						const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`;
						lastSearchRef.current = params.toString();
						window.history.pushState({}, "", newUrl);
					}

					isUpdatingRef.current = false;
				} catch (e) {
					isUpdatingRef.current = false;
					console.error("Error updating query state:", e);
				}
			}, 100);
		},
		[key],
	);

	useDebugValue(value);

	return [value, setQueryValue];
}

export default useQueryState;
