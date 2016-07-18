define(["./alertwhere-data"], function (awData) {

  // bpoteat: borrowed this from here:
  // https://gist.github.com/onderaltintas/6649521
  var degrees2meters = function (lon, lat) {
    var x = lon * 20037508.34 / 180;
    var y = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180);
    y = y * 20037508.34 / 180;
    return [x, y];
  };

  function getExtent(position) {
    if (!position) {
      return null;
    }
    var coords;
    if (Array.isArray(position))
      coords = position;
    else
      coords = position.split(',');


    // this is a hack to just get us to a reasonable zoom level around the point of the position
    var min = degrees2meters(parseFloat(coords[0]) - 1, parseFloat(coords[1]) - 1);
    var max = degrees2meters(parseFloat(coords[0]) + 1, parseFloat(coords[1]) + 1);

    return {
      "xmin": min[0],
      "ymin": min[1],
      "xmax": max[0],
      "ymax": max[1],
      "spatialReference": {"wkid": 102100}
    };
  }

  function cleanupTitle(title) {
    if (!title) {
      return '';
    }
    return title.replace(/&quot;|"/g, '\'');
  }

  function getContent(id) {
    var data = awData.data(id);
    console.log('got data:', data);
    var sections = [];

    // add the title/description from the data as the first story.
    var firstSectionData = {
      "title": `<p><strong><span style=\"font-size:36px\">${cleanupTitle(data.title)}</span></strong></p>\n`,
      "content": data.description ? `<p>${data.description}</p>` : '<p></p>',
      "contentActions": [],
      // not sure what these dates are used for (they don't show anywhere in the content) but it errors
      // without them, so...
      "creaDate": 1465324793581,
      "pubDate": 1465324793581,
      "status": "PUBLISHED",
      "media": {
        "type": "webmap",
        "webmap": {
          "id": data.uuid,
          "extent": data.events.length > 0 ? getExtent(data.events[0].location) : ''
        }
      }
    };
    sections.push(firstSectionData);

    $.each(data.events, function (index, section) {

      var content = section.description && section.description !== 'null' ? `<p>${section.description}</p>\n` : '<p></p>';
      if (section.image_url) {
        content = `<img src="${section.image_url}">`;
      }

      var sectionData = {
        "title": `<p><strong><span style=\"font-size:36px\">${cleanupTitle(section.title)}</span></strong></p>\n`,
        "content": content,
        "contentActions": [],
        // not sure what these dates are used for (they don't show anywhere in the content) but it errors
        // without them, so...
        "creaDate": 1465324793581,
        "pubDate": 1465324793581,
        "status": "PUBLISHED",
        "media": {
          "type": "webmap",
          "webmap": {
            "id": data.uuid,
            "extent": getExtent(section.location)
          }
        }
      };
      sections.push(sectionData);
    });

    var storyData = {
      "item": {
        "title": "AlertWhere StoryMap: " + data.title,
        "extent": [],
      },
      "itemData": {
        "values": {
          "settings": {
            "layout": {
              // This can be either "side" or "float" for how the output should be arranged.
              "id": "side"
            },
            "header": {
              "linkText": data.title,
              "linkURL": "http://pgp.alertwhere.com",
              "logoURL": "http://www.blacksky.com/wp-content/uploads/2016/01/BlackSkyLogo-reverseorange_iconrgb.jpg",
              "logoTarget": "http://www.blacksky.com/",
              "social": {"facebook": false, "twitter": false, "bitly": false}
            }
          },
          "story": {
            "storage": "WEBAPP",
            // This is where the real content is defined. Each object in the sections array defins
            "sections": sections
          }
        }
      }
    };

    return storyData;
  }

  function getMap(id) {
    var data = awData.data(id);
    var layers = [];
    $.each(data.events, function (index, section) {
      var coords;
      if (Array.isArray(section.location))
        coords = section.location;
      else
        coords = section.location.split(',');
      var position = degrees2meters(parseFloat(coords[0]), parseFloat(coords[1]));
      var popupDescription = `<h2>${section.locationName ? section.locationName : ''}</h2>`;
      if (section.url) {
        popupDescription += `<a href="${section.url}" target="_blank">Click for article</a>`;
      }
      if (section.image_url) {
        popupDescription += `<img src="${section.image_url}">`;
      }
      var layer = {
        "layerDefinition": {
          "type": "Feature Layer",
          "drawingInfo": {
            "renderer": {
              "field1": "TYPEID",
              "type": "uniqueValue",
              "uniqueValueInfos": [
                {
                  "symbol": {
                    "height": 36,
                    "width": 36,
                    "xoffset": 0,
                    "yoffset": 12,
                    "contentType": "image/png",
                    "type": "esriPMS",
                    // I'm guessing this is where we would stick our own icon.
                    // "url": "http://static.arcgis.com/images/Symbols/Basic/GreenStickpin.png"
                    "url": "resources/tpl/viewer/icons/GreenStickpin.png"
                  },
                  "value": "0",
                  "label": "Stickpin"
                }
              ]
            }
          },
          "fields": [
            {
              "alias": "OBJECTID",
              "name": "OBJECTID",
              "type": "esriFieldTypeOID",
              "editable": false
            }
          ],
        },
        "popupInfo": {
          // The title and description will be both be inserted as html into the popup for the point marker.
          "title": section.title,
          "description": popupDescription
        },

        "featureSet": {
          "geometryType": "esriGeometryPoint",
          "features": [{
            "geometry": {
              // The actual point for the item.
              "x": position[0],
              "y": position[1],

              "spatialReference": {
                "wkid": 102100,
                "latestWkid": 3857
              }
            },
            "attributes": {
              "VISIBLE": 1,
              "TITLE": section.title,
              "TYPEID": 0,
              "OBJECTID": index
            }
          }]
        },
      };

      layers.push(layer);
    });

    var mapData = {
      "item": {
        // doesn't matter what value this is but it has to be a 32 character guid.
        "id": data.uuid,
        "title": data.title + " map",

        // the default zoom extent for the map.
        "extent": null,
      },
      "itemData": {
        "baseMap": {
          "baseMapLayers": [
            {
              "type": "OpenStreetMap",
              "layerType": "OpenStreetMap",
              "opacity": 1,
              "visibility": true,
              "id": "OpenStreetMap"
            }
          ],
          "title": "OpenStreetMap"
        },
        "spatialReference": {
          "wkid": 102100,
          "latestWkid": 3857
        },
        "operationalLayers": [
          {
            "featureCollection": {
              "layers": layers,
              "showLegend": false
            },
            "opacity": 1,
            "visibility": true
          }
        ],
      }
    };

    return mapData;
  }

  return {
    getStoryData: getContent,
    getMapData: getMap
  };
});
