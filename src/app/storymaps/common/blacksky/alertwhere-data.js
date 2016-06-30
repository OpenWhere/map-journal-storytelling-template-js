// This is currently hard-coded to return an array of some faked data. getData should be completed to
// get the data from an exposed web service.

define([], function () {

  function getData(id) {
    console.log('retrieve data for id ' + id);
    var new_data;
    $.ajax({
      dataType: "json",
      url: '/api/v1/storymaps/' + id,
      async: false,
      success: function (response) {
        new_data = response;
      },
      statusCode: {
        401: function(response) {
          window.location.href = '/#/signin';
        }
      }
    });
    return new_data.events;
  }

  return {
    data: getData
  };
});
