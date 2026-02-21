import { customAlphabet } from 'nanoid';

// Custom alphabet for workflow IDs (similar to Weavy.ai)
const WORKFLOW_ID_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const WORKFLOW_ID_LENGTH = 16;

// Generate unique workflow IDs like "SZXXYN7L9PN2SCTV"
export const generateWorkflowId = customAlphabet(WORKFLOW_ID_ALPHABET, WORKFLOW_ID_LENGTH);

// Generate a workflow ID with a suffix for uniqueness
export function createWorkflowId(): string {
	const id = generateWorkflowId();
	// Add a random suffix to ensure uniqueness
	const suffix = generateWorkflowId().substring(0, 4);
	return `${id}${suffix}`;
}

// Alternative: Generate shorter IDs like "SZXXYN7L9PN2SCTVYAlt"
export function createShortWorkflowId(): string {
	return generateWorkflowId();
}
