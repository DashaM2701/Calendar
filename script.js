document.addEventListener("DOMContentLoaded", () => {
  const monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentDate = new Date();
  const events = {};

  

  function renderCalendar() {
    const daysContainer = document.querySelector(".calendar-days");
    const monthYear = document.querySelector("#month-year");
    const eventDetails = document.querySelector("#event-details");
    const headerCalendar = document.querySelector('.calendar_header');
    const caletndarMonth = document.querySelector('.calendar_month');
    daysContainer.innerHTML = "";

    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    headerCalendar.classList.remove('winter', 'autumn', 'spring', 'summer');
    caletndarMonth.classList.remove('autumn_monts', 'winter_monts', 'spring_monts', 'summer_monts')

    if (currentMonth === 11 || currentMonth === 0 || currentMonth === 1) {
      headerCalendar.classList.add('winter');
      caletndarMonth.classList.add('winter_monts')


    } else if(currentMonth === 8 || currentMonth === 9 || currentMonth === 10){
      headerCalendar.classList.add('autumn')
      caletndarMonth.classList.add('autumn_monts')

    }else if(currentMonth === 2 || currentMonth === 3 || currentMonth === 4){
      headerCalendar.classList.add('spring')
      caletndarMonth.classList.add('spring_monts')

    }else{
      headerCalendar.classList.add('summer')
      caletndarMonth.classList.add('summer_monts')


    };

    // Обновление текста с месяцем и годом
    monthYear.textContent = `${monthName[currentMonth]} ${currentYear}`;

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Дни предыдущего месяца
    const prevLastDay = new Date(currentYear, currentMonth, 0).getDate();

    for (let i = firstDay - 1; i >= 0; i--) {
      const dayElem = document.createElement("div");
      dayElem.textContent = prevLastDay - i;
      dayElem.classList.add("day", "other-month-day");
      daysContainer.appendChild(dayElem);
    }

    // Заполнение днями текущего месяца
    for (let day = 1; day <= lastDay; day++) {
      const dayElem = document.createElement("div");
      dayElem.textContent = day;
      dayElem.classList.add("day");

      const dateString = new Date(
        currentYear,
        currentMonth,
        day
      ).toDateString();
      if (events[dateString]) {
        dayElem.classList.add("day-with-event");
      }

      dayElem.addEventListener("click", () => {
        const selectedDate = new Date(currentYear, currentMonth, day);
        displayEvents(selectedDate);
        document.querySelector("#event-details").classList.add("active");
      });

      if (
        day === new Date().getDate() &&
        currentMonth === new Date().getMonth() &&
        currentYear === new Date().getFullYear()
      ) {
        dayElem.classList.add("current-day");
      }

      daysContainer.appendChild(dayElem);
    }

    // Дни следующего месяца
    const nextDays = 7 - ((firstDay + lastDay) % 7);
    if (nextDays < 7) {
      for (let i = 1; i <= nextDays; i++) {
        const dayElem = document.createElement("div");
        dayElem.textContent = i;
        dayElem.classList.add("day", "other-month-day");
        daysContainer.appendChild(dayElem);
      }
    }
  }

  function displayEvents(date) {
    const selectedDateElement = document.querySelector("#selected-date");
    const eventList = document.querySelector("#event-list");
    const newEventInput = document.querySelector("#new-event");
    const addEventButton = document.querySelector("#add-event");

    selectedDateElement.textContent = date.toDateString();
    eventList.innerHTML = "";

    const dateString = date.toDateString();
    const dateEvents = events[dateString] || [];

    dateEvents.forEach((event, index) => {
      const li = document.createElement("li");
      li.textContent = event;

      // Создание кнопки для удаления события
      const removeButton = document.createElement("button");
      removeButton.innerHTML =
        '<img class="trash" src="img/ion_trash-outline.svg" alt=""></img>';
      removeButton.classList.add("remove-event");
      removeButton.addEventListener("click", () => {
        removeEvent(dateString, index);
        displayEvents(date);
        renderCalendar();
        document.querySelector("#event-details").classList.remove("active");
      });

      li.appendChild(removeButton);
      eventList.appendChild(li);
    });

    addEventButton.onclick = () => {
      const newEvent = newEventInput.value.trim();
      if (newEvent) {
        if (!events[dateString]) {
          events[dateString] = [];
        }
        events[dateString].push(newEvent);
        newEventInput.value = "";
        console.log(`Event added: ${newEvent}`);
        displayEvents(date);
        // Скрыть блок с деталями события после добавления события
        document.querySelector("#event-details").classList.remove("active");
        renderCalendar();
      }
    };
  }

  function removeEvent(dateString, index) {
    if (events[dateString]) {
      events[dateString].splice(index, 1);
      if (events[dateString].length === 0) {
        delete events[dateString];
      }
    }
  }

  document.querySelector(".prev-month").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
    document.querySelector("#event-details").classList.remove("active");
  });

  document.querySelector(".next-month").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
    document.querySelector("#event-details").classList.remove("active");
  });

  renderCalendar();
});
