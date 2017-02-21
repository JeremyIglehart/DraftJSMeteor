import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { Roles } from 'meteor/alanning:roles'

if (Meteor.users.find().count() === 0) {
  console.log("Creating Admin User...")

  let adminUserID = Accounts.createUser({
    email: "admin@autoschematic.com",
    password: "SuperSecretPassword!",
    profile: { name: "admin" }
  })

  console.log("Admin User ID:", adminUserID)

  Roles.addUsersToRoles(adminUserID, 'admin')

  console.log("Admin user account has been added to the 'admin' GLOBAL_GROUP:", Roles.userIsInRole(adminUserID, 'admin'))
}
