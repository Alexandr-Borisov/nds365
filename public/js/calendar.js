/* eslint-disable camelcase */
// Setup the calendar with the current date
$(document).ready(() => {
  const date = new Date();
  const today = date.getDate();
  // Set click handlers for DOM elements
  $('.right-button').click({ date }, next_year);
  $('.left-button').click({ date }, prev_year);
  $('.month').click({ date }, month_click);
  $('#add-button').click({ date }, new_event);
  // Set current month as active
  $('.months-row').children().eq(date.getMonth()).addClass('active-month');
  init_calendar(date);
  const events = check_events(today, date.getMonth() + 1, date.getFullYear());
  show_events(events, months[date.getMonth()], today);
});

// Initialize the calendar by appending the HTML dates
function init_calendar(date) {
  $('.tbody').empty();
  $('.events-container').empty();
  const calendar_days = $('.tbody');
  const month = date.getMonth();
  const year = date.getFullYear();
  const day_count = days_in_month(month, year);
  let row = $("<tr class='table-row'></tr>");
  const today = date.getDate();
  // Set date to 1 to find the first day of the month
  date.setDate(1);
  const first_day = date.getDay();
  // 35+firstDay is the number of date elements to be added to the dates table
  // 35 is from (7 days in a week) * (up to 5 rows of dates in a month)
  for (let i = 0; i < 35 + first_day; i++) {
    // Since some of the elements will be blank,
    // need to calculate actual date from index
    const day = i - first_day + 1;
    // If it is a sunday, make a new row
    if (i % 7 === 0) {
      calendar_days.append(row);
      row = $("<tr class='table-row'></tr>");
    }
    // if current index isn't a day in this month, make it blank
    if (i < first_day || day > day_count) {
      var curr_date = $("<td class='table-date nil'>" + '</td>');
      row.append(curr_date);
    } else {
      var curr_date = $(`<td class='table-date'>${day}</td>`);
      const events = check_events(day, month + 1, year);
      if (today === day && $('.active-date').length === 0) {
        curr_date.addClass('active-date');
        show_events(events, months[month], day);
      }
      // If this date has any events, style it with .event-date
      if (events.length !== 0) {
        curr_date.addClass('event-date');
      }
      // Set onClick handler for clicking a date
      curr_date.click({ events, month: months[month], day }, date_click);
      row.append(curr_date);
    }
  }
  // Append the last row and set the current year
  calendar_days.append(row);
  $('.year').text(year);
}

// Get the number of days in a given month/year
function days_in_month(month, year) {
  const monthStart = new Date(year, month, 1);
  const monthEnd = new Date(year, month + 1, 1);
  return (monthEnd - monthStart) / (1000 * 60 * 60 * 24);
}

// Event handler for when a date is clicked
function date_click(event) {
  $('.events-container').show(250);
  $('#dialog').hide(250);
  $('.active-date').removeClass('active-date');
  $(this).addClass('active-date');
  show_events(event.data.events, event.data.month, event.data.day);
}

// Event handler for when a month is clicked
function month_click(event) {
  $('.events-container').show(250);
  $('#dialog').hide(250);
  const { date } = event.data;
  $('.active-month').removeClass('active-month');
  $(this).addClass('active-month');
  const new_month = $('.month').index(this);
  date.setMonth(new_month);
  init_calendar(date);
}

// Event handler for when the year right-button is clicked
function next_year(event) {
  $('#dialog').hide(250);
  const { date } = event.data;
  const new_year = date.getFullYear() + 1;
  $('year').html(new_year);
  date.setFullYear(new_year);
  init_calendar(date);
}

// Event handler for when the year left-button is clicked
function prev_year(event) {
  $('#dialog').hide(250);
  const { date } = event.data;
  const new_year = date.getFullYear() - 1;
  $('year').html(new_year);
  date.setFullYear(new_year);
  init_calendar(date);
}

// Event handler for clicking the new event button
function new_event(event) {
  // if a date isn't selected then do nothing
  if ($('.active-date').length === 0) {
    return;
  }
  // remove red error input on click
  $('input').click(function () {
    $(this).removeClass('error-input');
  });
  // empty inputs and hide events
  $('#dialog input[type=text]').val('');
  $('#dialog input[type=number]').val('');
  $('.events-container').hide(250);
  $('#dialog').show(250);
  // Event handler for cancel button
  $('#cancel-button').click(() => {
    $('#name').removeClass('error-input');
    $('#count').removeClass('error-input');
    $('#dialog').hide(250);
    $('.events-container').show(250);
  });
  // Event handler for ok button
  $('#ok-button')
    .unbind()
    .click({ date: event.data.date }, () => {
      const { date } = event.data;
      const name = $('#name').val().trim();
      // const count = parseInt($('#count').val().trim());
      const day = parseInt($('.active-date').html());
      // Basic form validation
      if (name.length === 0) {
        $('#name').addClass('error-input');
        // } else if (isNaN(count)) {
        //   $('#count').addClass('error-input');
      } else {
        $('#dialog').hide(250);
        new_event_json(name, date, day);
        date.setDate(day);
        init_calendar(date);
      }
    });
}

// Adds a json event to event_data
function new_event_json(name, date, day) {
  const event = {
    occasion: name,
    // invited_count: count,
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day,
  };
  event_data.events.push(event);
}

// Display all events of the selected date in card views
function show_events(events, month, day) {
  // Clear the dates container
  $('.events-container').empty();
  $('.events-container').show(250);
  // If there are no events for this date, notify the user
  if (events.length === 0) {
    var event_card = $("<div class='event-card'></div>");
    var event_name = $(
      `<div class='event-name'>Нет событий, запланированных на ${month} ${day}.</div>`,
    );
    $(event_card).css({ 'border-left': '10px solid #FF1744' });
    $(event_card).append(event_name);
    $('.events-container').append(event_card);
  } else {
    // Go through and add each event as a card to the events container
    for (let i = 0; i < events.length; i++) {
      var event_card = $("<div class='event-card'></div>");
      var event_name = $(`<div class='event-name'>${events[i].occasion}</div>`);
      // let event_count = $(`<div class='event-count'>${events[i].invited_count} Invited</div>`);
      if (events[i].cancelled === true) {
        $(event_card).css({
          'border-left': '10px solid #FF1744',
        });
        // event_count = $("<div class='event-cancelled'>Cancelled</div>");
      }
      $(event_card).append(event_name);
      $('.events-container').append(event_card);
    }
  }
}

// Checks if a specific date has any events
function check_events(day, month, year) {
  const events = [];
  for (let i = 0; i < event_data.events.length; i++) {
    const event = event_data.events[i];
    if (event.day === day && event.month === month && event.year === year) {
      events.push(event);
    }
  }
  return events;
}

// Given data for events in JSON format
var event_data = {
  events: [
    {
      occasion: '⏰  Сдать СЗВМ',
      year: 2020,
      month: 11,
      day: 15,
      cancelled: true,
    },
    {
      occasion: '💲 Оплатить налоги с ЗП',
      year: 2020,
      month: 11,
      day: 15,
      cancelled: true,
    },
    {
      occasion: '🔙  Штраф 500 рублей за каждого сотрудника',
      year: 2020,
      month: 11,
      day: 16,
      cancelled: true,
    },
    {
      occasion: '🔙  Пени по налогам',
      year: 2020,
      month: 11,
      day: 16,
      cancelled: true,
    },
    {
      occasion: '💲 Оплата НДС',
      year: 2020,
      month: 11,
      day: 25,
      cancelled: true,
    },
    {
      occasion: '🔙  Пени по налогам',
      year: 2020,
      month: 11,
      day: 26,
      cancelled: true,
    },
    {
      occasion: '💲 Расчет зарплаты',
      year: 2020,
      month: 11,
      day: 30,
      cancelled: true,
    },
    {
      occasion: '📈 Заполнить отчет для руководителя',
      year: 2020,
      month: 12,
      day: 5,
      cancelled: true,
    },
    {
      occasion: '⏰  Сдать СЗВМ',
      year: 2020,
      month: 12,
      day: 15,
      cancelled: true,
    },
    {
      occasion: '💲 Оплатить налоги с ЗП',
      year: 2020,
      month: 12,
      day: 15,
      cancelled: true,
    },
    {
      occasion: '🔙  Штраф 500 рублей за каждого сотрудника',
      year: 2020,
      month: 12,
      day: 16,
      cancelled: true,
    },
    {
      occasion: '🔙  Пени по налогам',
      year: 2020,
      month: 12,
      day: 16,
      cancelled: true,
    },
    {
      occasion: '💲 Оплата НДС',
      year: 2020,
      month: 12,
      day: 25,
      cancelled: true,
    },
    {
      occasion: '🔙  Пени по налогам',
      year: 2020,
      month: 12,
      day: 26,
      cancelled: true,
    },
    {
      occasion: '💲 Оплатить взносы ИП',
      year: 2020,
      month: 12,
      day: 30,
      cancelled: true,
    },
    {
      occasion: '💲 Расчет зарплаты',
      year: 2020,
      month: 12,
      day: 31,
      cancelled: true,
    },
    {
      occasion: '💲 Расчет зарплаты',
      year: 2020,
      month: 11,
      day: 30,
      cancelled: true,
    },
    {
      occasion: '📈 Заполнить отчет для руководителя',
      year: 2021,
      month: 1,
      day: 5,
      cancelled: true,
    },
    {
      occasion: '⏰  Сдать СЗВМ',
      year: 2021,
      month: 1,
      day: 15,
      cancelled: true,
    },
    {
      occasion: '💲 Оплатить налоги с ЗП',
      year: 2021,
      month: 1,
      day: 15,
      cancelled: true,
    },
    {
      occasion: '🔙  Штраф 500 рублей за каждого сотрудника',
      year: 2021,
      month: 1,
      day: 18,
      cancelled: true,
    },
    {
      occasion: '🔙  Пени по налогам',
      year: 2021,
      month: 1,
      day: 18,
      cancelled: true,
    },
    {
      occasion: '💲 Оплата НДС',
      year: 2021,
      month: 1,
      day: 25,
      cancelled: true,
    },
    {
      occasion: '🚫 Блокировка счета за непредоставленную отчетность',
      year: 2021,
      month: 1,
      day: 26,
      cancelled: true,
    },
    {
      occasion: '🔙  Оплата НДС',
      year: 2021,
      month: 1,
      day: 26,
      cancelled: true,
    },
    {
      occasion: '💲 Расчет зарплаты',
      year: 2021,
      month: 1,
      day: 29,
      cancelled: true,
    },
    {
      occasion: '✅ Декларация по транспортному налогу',
      year: 2021,
      month: 2,
      day: 1,
      cancelled: true,
    },
    {
      occasion: '✅ Декларация РСВ',
      year: 2021,
      month: 2,
      day: 2,
      cancelled: true,
    },
    {
      occasion:
        '🔙  Штраф за непредоставленную декларацию по транспотному налогу 1000 рублей',
      year: 2021,
      month: 2,
      day: 2,
      cancelled: true,
    },
    {
      occasion: '🚫 Блокировка счета за непредоставленную отчетность',
      year: 2021,
      month: 2,
      day: 3,
      cancelled: true,
    },
    {
      occasion: '🔙  Штраф 20% от суммы налога за несданный отчет',
      year: 2021,
      month: 2,
      day: 3,
      cancelled: true,
    },
    {
      occasion: '📈 Заполнить отчет для руководителя',
      year: 2021,
      month: 2,
      day: 5,
      cancelled: true,
    },
    {
      occasion: '⏰  Сдать СЗВМ',
      year: 2021,
      month: 2,
      day: 15,
      cancelled: true,
    },
    {
      occasion: '💲 Оплатить налоги с ЗП',
      year: 2021,
      month: 2,
      day: 15,
      cancelled: true,
    },
    {
      occasion: '🔙  Штраф 500 рублей за каждого сотрудника',
      year: 2021,
      month: 2,
      day: 16,
      cancelled: true,
    },
    {
      occasion: '🔙  Пени по налогам',
      year: 2021,
      month: 2,
      day: 16,
      cancelled: true,
    },
    {
      occasion: '🔙  Оплата НДС',
      year: 2021,
      month: 2,
      day: 25,
      cancelled: true,
    },
    {
      occasion: '💲 Расчет зарплаты',
      year: 2021,
      month: 2,
      day: 26,
      cancelled: true,
    },
    {
      occasion: '✅ Декларация 6НДФЛ',
      year: 2021,
      month: 3,
      day: 1,
      cancelled: true,
    },
    {
      occasion: '✅ Декларация 2НДФЛ',
      year: 2021,
      month: 3,
      day: 1,
      cancelled: true,
    },
    {
      occasion: '🚫 Блокировка счета за несданный отчет',
      year: 2021,
      month: 3,
      day: 2,
      cancelled: true,
    },
    {
      occasion: '🔙  Штраф 1000 рублей за 6НДФЛ',
      year: 2021,
      month: 3,
      day: 2,
      cancelled: true,
    },
    {
      occasion: '🔙  Штраф 500 рублей за 2НДФЛ',
      year: 2021,
      month: 3,
      day: 2,
      cancelled: true,
    },
    {
      occasion: '📈 Заполнить отчет для руководителя',
      year: 2021,
      month: 3,
      day: 5,
      cancelled: true,
    },
    {
      occasion: '⏰  Сдать СЗВМ',
      year: 2021,
      month: 3,
      day: 15,
      cancelled: true,
    },
    {
      occasion: '💲 Оплатить налоги с ЗП',
      year: 2021,
      month: 3,
      day: 15,
      cancelled: true,
    },
    {
      occasion: '🔙  Штраф 500 рублей за каждого сотрудника',
      year: 2021,
      month: 3,
      day: 16,
      cancelled: true,
    },
    {
      occasion: '🔙  Пени по налогам',
      year: 2021,
      month: 3,
      day: 16,
      cancelled: true,
    },
    {
      occasion: '🔙  Оплата НДС',
      year: 2021,
      month: 3,
      day: 25,
      cancelled: true,
    },
    {
      occasion: '✅ Декларация по налогу на прибыль',
      year: 2021,
      month: 3,
      day: 29,
      cancelled: true,
    },
    {
      occasion: '💲 Расчет зарплаты',
      year: 2021,
      month: 3,
      day: 31,
      cancelled: true,
    },
    {
      occasion: '✅ Декларация УСН ООО',
      year: 2021,
      month: 3,
      day: 31,
      cancelled: true,
    },
    {
      occasion: '🚫 Блокировка счета за несданную декларацию УСН',
      year: 2021,
      month: 4,
      day: 1,
      cancelled: true,
    },
    {
      occasion: '📈 Заполнить отчет для руководителя',
      year: 2021,
      month: 4,
      day: 5,
      cancelled: true,
    },
    {
      occasion: '⏰  Сдать СЗВМ',
      year: 2021,
      month: 4,
      day: 15,
      cancelled: true,
    },
    {
      occasion: '💲 Оплатить налоги с ЗП',
      year: 2021,
      month: 4,
      day: 15,
      cancelled: true,
    },
    {
      occasion: '🔙  Штраф 500 рублей за каждого сотрудника',
      year: 2021,
      month: 4,
      day: 16,
      cancelled: true,
    },
    {
      occasion: '🔙  Пени по налогам',
      year: 2021,
      month: 4,
      day: 16,
      cancelled: true,
    },
    {
      occasion: '🔙  Оплата НДС',
      year: 2021,
      month: 4,
      day: 26,
      cancelled: true,
    },
    {
      occasion: '💲 Расчет зарплаты',
      year: 2021,
      month: 4,
      day: 30,
      cancelled: true,
    },
    {
      occasion: '✅ Декларация УСН ООО',
      year: 2021,
      month: 4,
      day: 30,
      cancelled: true,
    },
  ],
};

const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];
