// This is currently hard-coded to return an array of some faked data. getData should be completed to
// get the data from an exposed web service.

define([], function () {

  function getData(id) {
    console.log('retrieve data for id ' + id);
    var new_data;
    if (app.isProduction) {
      $.ajax({
        dataType: "json",
        url: '/api/v1/storymaps/' + id,
        async: false,
        success: function (foo) {
          new_data = foo;
        }
      });
    } else {
      $.ajax({
        dataType: "json",
        url: 'localhost:3000/api/v1/storymaps/' + id,
        async: false,
        success: function (foo) {
          new_data = foo;
        }
      });
    }
    return new_data.events;
  }

  return {
    data: getData
  };
});
