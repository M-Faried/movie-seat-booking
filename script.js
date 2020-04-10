const cinemaContainer = document.querySelector('.cinema-layout-container');
const seats = document.querySelectorAll('.seats-row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

//////////////////////////////////////////////////////// On Load Functions

//Loading data saved into local storage.
populateUI();

cinemaContainer.addEventListener('click', function (e) {
  //The following implementation which is to grap the container of all seats instead of looping through all of them every time
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
    updateInvoice();
    saveSeatsData();
  }
});

movieSelect.addEventListener('change', function () {
  updateInvoice();
  saveMovieData();
});

//////////////////////////////////////////////////////// Helper Functions

function updateInvoice() {
  let ticketPrice = +movieSelect.value;
  let selectedSeats = cinemaContainer.querySelectorAll('.seat.selected');
  count.innerHTML = selectedSeats.length;
  total.innerHTML = selectedSeats.length * ticketPrice;
}

//Saves current seats daa into local storage.
function saveSeatsData() {
  let selectedSeats = cinemaContainer.querySelectorAll('.seat.selected');

  //Spread operator is used to get selectedSeats and seats in an array format.
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  //The previous statement is the same as the following statement.
  //   const seatsIndex = [...selectedSeats].map(function (seat) {
  //     return [...seats].indexOf(seat);
  //   });

  //Saving selected seats into the local storage of the browser.
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
}

//Saves current selected movie data into local storage.
function saveMovieData() {
  localStorage.setItem('selectedMovie', movieSelect.selectedIndex);
}

//Loads data into user interface from the local storage.
function populateUI() {
  //Loading the selected movie index.
  const selectedMovieIndex = localStorage.getItem('selectedMovie');
  if (selectedMovieIndex !== null)
    movieSelect.selectedIndex = selectedMovieIndex;

  //Loading stored seats data.
  const storedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (storedSeats !== null && storedSeats.length > 0) {
    //Looping over the seats (with their index) in order to check whether this index was saved
    //previously or not.
    seats.forEach((seat, seatIndex) => {
      if (storedSeats.indexOf(seatIndex) > -1) seat.classList.add('selected');
    });
  }
  updateInvoice();
}
