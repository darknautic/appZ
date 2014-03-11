if (Meteor.isClient) {

  //Meteor.subscribe("userNames");

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
        if (err) {}
          // The user might not have been found, or their passwword
          // could be incorrect. Inform the user that their
          // login attempt has failed. 
        else {}
          // The user has been logged in.
          //console.log(Meteor.users.find({_id: this.userId}));
          console.log("the user is :" + Meteor.userId());
          console.log("the user mail :" + Meteor.user().emails[0].address);
          //console.log("the user mail :" + Meteor.user({services : { resume : { loginTokens : {}}}}));
          //console.log("the user mail :" + Meteor.user(     {'emails.address':"w@w"},{_id:1}    )._id);

          var time = new Date();
          Session.set('sessionID',Meteor.userId());
          console.log("login succes");
          console.log("should set a session ?");
          alert("run !!");
          //console.log(Meteor.users.find({ emails: { $elemMatch: { address: email } } }));

        });

          console.log("hi !!" + email); 
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



Template.signControls.events({
  'click input' : function(){
    console.log('singOut');
    
      Meteor.logout(function(err){
        if (err) {
          console.log(err);
          alert('signout err');
        }
        else{
          console.log("logout succes");
          Session.set('sessionID',null);
          delete Session.keys['sessionID'];
          alert('signout success');
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

  Template.userUpdate.events = {
    "click #updateUser": function() {
      Meteor.users.update({_id: Meteor.userId()}, {$set: {lastActive: new Date()}});
    }
  };

  Template.userUpdate.lastUpdated = function() {
    return Meteor.user();
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
