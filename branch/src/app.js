/** Format Google Calendar */
'use strict';

import day from '../vue/helper/daylib.js'

const settings = {
  name: 'Google Calendar Library',
  url: 'https://www.googleapis.com/',
  today: day().format('D-MMM-YYYY ddd h:mma'),
};

export default settings;
