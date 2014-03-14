if (Meteor.isClient) {


  Template.login.events({
      
      'submit #login-form' : function(e, t){
          
          e.preventDefault();
          // retrieve the input field values
          var email = t.find('#login-email').value
          var password = t.find('#login-password').value;

          // Trim and validate your fields here.... 

          // If validation passes, supply the appropriate fields to the
          // Meteor.loginWithPassword() function.
          Meteor.loginWithPassword(email, password, function(err){
              if (err) {
                console.log("Not login. Error !¡"); 
              }
                // The user might not have been found, or their passwword
                // could be incorrect. Inform the user that their
                // login attempt has failed. 
              else {

                  // The user has been logged in.
                  //console.log("the user is :" + Meteor.userId());
                  console.log("Info : mail " + Meteor.user().emails[0].address);
                  console.log("Info : id " + Meteor.userId());
                  // Hash Value
                  /*var current_date = (new Date()).valueOf().toString();
                  var random = Math.random().toString();
                  console.log(crypto.createHash('sha1').update(current_date + random).digest('hex'));
                  */
                                    
                  //Session.set('SessionID',Meteor.userId());
                  Session.set('loggedUser',Meteor.user().emails[0].address);                  
                  console.log("Successfully login");                  
                  alert("Continue ?");

              }              
                
            

          });

          
          return false; 
      }

  });  



Template.register.events({
    'submit #register-form' : function(e, t) {
      e.preventDefault();
      var email = t.find('#account-email').value
        , password = t.find('#account-password').value;

        // Trim and validate the input

      Accounts.createUser({email: email, password : password}, function(err){
          if (err) {
            // Inform the user that account creation failed
            console.log("Creation Failed");
          } else {
            // Success. Account has been created and the user
            // has logged in successfully. 
            console.log("creation succes");
            console.log(Meteor.userId);
          }

        });

      return false;
    }
  });


  var trimInput = function(val) {
    return val.replace(/^\s*|\s*$/g, "");
    }


/*
  Meteor.autorun(function() {
    // Whenever this session variable changes, run this function.
    var message = Session.get('displayMessage');
    if (message) {
      var stringArray = message.split('&amp;');
      ui.notify(stringArray[0], stringArray[1])
        .effect('slide')
        .closable();

      Session.set('displayMessage', null);
    }
  });
*/



Template.whois.events({
  'click a#whois' : function(){
    Meteor.logout(function(err){
        if (err) {
          console.log("Err - signOut Process");
          console.log(err);
          //alert('Err - signOut Process');
        }
        else{
          //Session.set('loggedUser',null);
          delete Session.keys['loggedUser'];          
          //console.log("Ok - signoOut successfully");
          //alert('Ok - signoOut successfully');
        }

    });
  }
});



Meteor.startup(function() {
    Session.set("contentRenderedCount", 0);
  });

Template.content.rendered = function() {
    var renderCount = Session.get("contentRenderedCount") + 1;
    Session.set("contentRenderedCount", renderCount);
    document.getElementById("renderCount").innerText = renderCount;
  };

Template.userUpdate.lastUpdated = function() {
    return Meteor.user();
  };

Template.userUpdate.events = {
    "click #updateUser": function() {
      Meteor.users.update({_id: Meteor.userId()}, {$set: {lastActive: new Date()}});
    }
  };

Template.whois.loggedUser = function(){
  var whois = Session.get('loggedUser');
  //if(!whois){whois = "Sign out";}
  return whois;
  };


 /* Meteor.autorun(function() {
    Session.set("meteor_loggedin",!!Meteor.user());
  });

  Handlebars.registerHelper('session',function(input){
      return Session.get(input);
  });
*/


}  //isClient



if (Meteor.isServer) {

  Meteor.startup(function () {
    // code to run on server at startup
    });

  Meteor.users.allow({
    'update': function () {
      return true; 
      }
    });

  } //isServer
