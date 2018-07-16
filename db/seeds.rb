# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Track.destroy_all

u1 = User.create!(username: "baircave", password: "asdfasdf", location: "New York, NY", bio: "I'm the first user whattup")
u2 = User.create!(username: "Justice", password: "asdfasdf", location: "Paris, France", nickname: "Justice", bio: "I'm the first user whattup")
u3 = User.create!(username: "nick", password: "asdfasdf", location: "New York, NY", nickname: "baircave", bio: "I'm the first user whattup")
u4 = User.create!(username: "guest", password: "asdfasdf", location: "New York, NY", bio: "I'm your friendly neighborhood Guest user!")

t1 = Track.create!(title: "Sick beat", artist_id: u1.id, description: "sick description for sick beat")
t2 = Track.create!(title: "French hau5", artist_id: u2.id, description: "We are so dang french it's scary")
