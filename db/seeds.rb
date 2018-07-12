# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all

User.create(username: "nick", password: "asdfasdf", location: "New York, NY", nickname: "baircave", bio: "I'm the first user whattup")
User.create(username: "guest", password: "asdfasdf", location: "New York, NY", nickname: "guest", bio: "I'm your friendly neighborhood Guest user!")
