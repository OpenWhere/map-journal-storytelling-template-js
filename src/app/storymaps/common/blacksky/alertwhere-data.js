// getData will query the StoryMaps API for the story data of the specific storymap ID. In the event of an
// 'unauthorized' status code return, it will redirect to allow the user to login before reloading the storymap.

define([], function () {

  function getData(id) {
    console.log(`retrieve data for id ${id}`);
    var newData = undefined;
    $.ajax({
      dataType: 'json',
      url: `/api/v1/storymaps/${id}`,
      async: false,
      success: (response) => {
        newData = response;
      },
      statusCode: {
        401: () => {
          window.location.href = `/storymaps/BlackSkySignin.html?appid=${id}`;
        }
      }
    });
    return newData.events;
  }

  return {
    data: getData
  };
});
