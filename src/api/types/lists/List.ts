import type { CategoryList } from './CategoryList';
import type { Person } from './Person';

export interface List extends CategoryList {
	category: 'idp' | 'invalid' | 'child';
	persons: Person[];
}
