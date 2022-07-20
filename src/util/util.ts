export function callAll(...fns: any) {
	return (...arg: any) => fns.forEach((fn: any) => fn?.(...arg));
}
