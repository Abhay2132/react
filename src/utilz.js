export const $ = q => document.querySelector(q);
export const wait = n => new Promise(r => setTimeout(r, n||0));

export function delCopy(arr) {
	let s = new Set(arr);
	let newArr  = []
	s.forEach(e=>newArr.push(e))
	return newArr;
}