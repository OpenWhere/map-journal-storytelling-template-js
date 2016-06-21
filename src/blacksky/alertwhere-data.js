// This is currently hard-coded to return an array of some faked data. getData should be completed to
// get the data from an exposed web service.

define([], function () {

  function getData(id) {
    console.log(`retrieve data for id, ${id}`);
    var new_data;
    $.ajax({
      dataType: "json",
      url: "http://api-proxy.service.consul:80/saved-search/storymap/" + id,
      data: data,
      async: false,
      success: function(foo) {
        new_data = foo;
      }
    });
    return new_data.events;
  }

  return {
    data: getData
  };
});