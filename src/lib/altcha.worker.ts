import { solveChallenge } from 'altcha-lib';

onmessage = async (event: MessageEvent) => {
	const { algorithm, challenge, maxnumber, salt } = event.data;
	const { promise } = solveChallenge(challenge, salt, algorithm, maxnumber ?? 1_000_000);
	const solution = await promise;
	self.postMessage(solution ?? null);
};
