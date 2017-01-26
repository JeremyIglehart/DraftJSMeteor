import { Meteor } from 'meteor/meteor'

if (Meteor.settings.private === undefined) {
  console.log("Warning: Meteor.settings.private === undefined")
  console.log("oAuth settings will not be loaded.")
  console.log("Please create a settings-development.json in the root directory and populate.")
  console.log("Example:")
  console.log('{')
  console.log('  "public": {')
  console.log('  },')
  console.log('  "private": {')
  console.log('    "oAuth": {')
  console.log('      "google": {')
  console.log('        "clientId": "YourID",')
  console.log('        "secret": "YourSecret",')
  console.log('        "loginStyle": "popup"')
  console.log('      },')
  console.log('      "facebook": {')
  console.log('        "appId": "YourID",')
  console.log('        "secret": "YourSecret",')
  console.log('        "loginStyle": "popup"')
  console.log('      },')
  console.log('      "twitter": {')
  console.log('        "consumerKey": "YourKey",')
  console.log('        "secret": "YourSecret",')
  console.log('        "loginStyle": "popup"')
  console.log('      }')
  console.log('    }')
  console.log('  }')
  console.log('}')
  console.log('')
} else {
  const services = Meteor.settings.private.oAuth;

  const configure = () => {
    if ( services ) {
      for( let service in services ) {
        ServiceConfiguration.configurations.upsert( { service: service }, {
          $set: services[ service ]
        });
      }
    }
  }

  Meteor.startup(() => {
    console.log("Configuring oAuth")
    configure()
  })
}
