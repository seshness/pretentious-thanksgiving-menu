function hideNux() {
  $('.nux').hide();
}

function hideResponse() {
  $('.response').hide();
}

function showDiningTable() {
  $('.dining-table').show();
}

function renderDescription(description) {
  $('.dining-table .serving-dish').text(description);
}

function fetchNewDescription() {
  $.ajax({
    url: '/description'
  }).done(function(response) {
    renderDescription(response.description);
    showDiningTable();
  });
}

function accept() {
  hideResponse();
}

function reject() {
  fetchNewDescription();
}

function handleEntree() {
  hideNux();
  fetchNewDescription();
}

// on ready
$(function() {
  $('a.entree').on('click', handleEntree);
  $('a.accept').on('click', accept);
  $('a.reject').on('click', reject);
});