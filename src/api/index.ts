import * as aboutUs from '~api/rest/aboutUs/aboutUs';
import * as donations from '~api/rest/donations/donations';
import * as exportList from '~api/rest/exportList/exportList';
import * as footer from '~api/rest/footer/footer';
import * as getHelp from '~api/rest/getHelp/getHelp';
import * as getHelpAdmin from '~api/rest/getHelp/getHelpAdmin';
import * as hero from '~api/rest/hero/hero';
import * as lists from '~api/rest/lists/lists';
import * as ourAchievements from '~api/rest/ourAchievements/ourAchievements';
import * as ourActivity from '~api/rest/ourActivity/ourActivity';
import * as partners from '~api/rest/partners/partners';
import * as persons from '~api/rest/persons/persons';

export const api = {
	aboutUs,
	exportList,
	getHelp,
	getHelpAdmin,
	lists,
	persons,
	ourAchievements,
	ourActivity,
	hero,
	donations,
	partners,
	footer,
};
