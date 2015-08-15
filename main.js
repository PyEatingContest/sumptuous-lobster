/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var Settings = require('settings');
var ajax = require('ajax');

var main = new UI.Card({
  title: 'Pebble.js',
  icon: 'images/menu_icon.png',
  subtitle: 'Hello World!',
  body: 'Press any button.'
});

main.show();

main.on('click', 'up', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Pebble.js',
        icon: 'images/menu_icon.png',
        subtitle: 'Can do Menus'
      }, {
        title: 'Second Item',
        subtitle: 'Subtitle Text'
      }]
    }]
  });
  
 
  menu.show();
});



main.on('click', 'select', function(e) {
  var wind = new UI.Window({
    fullscreen: true,
  });
  var textfield = new UI.Text({
    position: new Vector2(0, 65),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: 'Text Anywhere!',
    textAlign: 'center'
  });
  wind.add(textfield);
  wind.show();
});

main.on('click', 'down', function(e) {
  //var card = new UI.Card();
  var splashWindow = new UI.Window();
  
  var oauth_token = Settings.data('oauthAccessToken');
  var oauth_token_secret = Settings.data('oauthAccessTokenSecret');
  var request_url = "https://shielded-temple-2008.herokuapp.com/test?tn=" + oauth_token + "&tns=" + oauth_token_secret;
  var results = '';
  
  ajax({ url: request_url},
    function(data) {
      results = JSON.parse(data);
      //card.subtitle(results.summary.steps);
      
  // Text element to inform user
  var text = new UI.Text({
    position: new Vector2(0, 60),
    size: new Vector2(144, 168),
    text:results.summary.steps,
    //font:'GOTHIC_28_BOLD',
    font: 'BITHAM_42_BOLD',
    color:'black',
    textOverflow:'wrap',
    textAlign:'center',
    backgroundColor:'white'
  });

// Add to splashWindow and show
splashWindow.add(text);
splashWindow.show();
  });

  //card.show();
  
});

Settings.config(
  { url:'https://shielded-temple-2008.herokuapp.com/' },
  function(e) {
    console.log('opened config');
  },
  function(e) {
    console.log(e.response);
    var config_data = JSON.parse(decodeURIComponent(e.response));
    Settings.data(config_data);
    var data = Settings.data();
    console.log(JSON.stringify(data));
  }
  
);