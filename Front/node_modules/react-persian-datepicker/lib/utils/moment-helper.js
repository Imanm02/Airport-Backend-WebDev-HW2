'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDaysOfMonth = getDaysOfMonth;
/**
 * Get days of a month that should be shown on a month page
 *
 * @param month A moment object
 * @returns {Array}
 */
function getDaysOfMonth(month) {
  var days = [];

  var current = month.clone().startOf('jMonth');
  var end = month.clone().endOf('jMonth');

  // Set start to the first day of week in the last month
  current.subtract((current.day() + 1) % 7, 'days');

  // Set end to the last day of week in the next month
  end.add(6 - (end.day() + 1) % 7, 'days');

  while (current.isBefore(end)) {
    days.push(current.clone());
    current.add(1, 'days');
  }

  return days;
}