# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'ez_download'

Comment.destroy_all
Track.destroy_all
User.destroy_all

u1 = User.create!(username: "baircave", password: "asdfasdf", location: "New York, NY", bio: "We're baircave. We like to make music to dance to")
u2 = User.create!(username: "Justice", password: "asdfasdf", location: "Paris, France", nickname: "Justice", bio: "We made all of our first album in Garageband. This is a miracle considering its limitations, trust us.")
u3 = User.create!(username: "nick", password: "asdfasdf", location: "New York, NY", nickname: "baircave", bio: "I wrote this app--hopefully there's no bugs.......")
u4 = User.create!(username: "guest", password: "asdfasdf", location: "New York, NY", bio: "I'm your friendly neighborhood Guest user! If you're checking out Groundpound for the first time, enjoy your stay!")

t1 = Track.new(title: "arthur x medic - Barrier (baircave Vocal Edit)", artist_id: u1.id, track_url: "x", description: "A little while back my talented friend Arthur made an outrageously beautiful instrumental. I loved the chords and melodies and immediately knew I wanted to embellish it with some vocals. I think Ellen did an amazing job with them and hope it's something you all enjoy!")
artFile = EzDownload.open('https://s3.amazonaws.com/groundpound-pro/Barrier+Art.jpg')
trackFile = EzDownload.open("https://s3.amazonaws.com/groundpound-pro/Barrier+(baircave+Vocal+Edit).mp3")
t1.artwork.attach(io: artFile, filename: 'Barrier Art.jpg')
t1.track_file.attach(io: trackFile, filename: 'Barrier (baircave Vocal Edit).mp3')
t1.save!

t2 = Track.new(title: "Don't Hold Back", artist_id: u1.id, track_url: "x", description: "I don't always do downtempo disco deep cut flips--but when I do you bet your ass there's a completely overindulgent synth solo")
artFile = EzDownload.open("https://s3.amazonaws.com/groundpound-pro/Don't+Hold+Back.png")
trackFile = EzDownload.open("https://s3.amazonaws.com/groundpound-pro/Don't+Hold+Back.mp3")
t2.artwork.attach(io: artFile, filename: "Don't Hold Back.png")
t2.track_file.attach(io: trackFile, filename: "Don't Hold Back.mp3")
t2.save!

t3 = Track.new(title: "baircave x voia - Folds", artist_id: u1.id, track_url: "x")
artFile = EzDownload.open("https://s3.amazonaws.com/groundpound-pro/Screen+Shot+2018-07-20+at+8.24.30+AM.png")
trackFile = EzDownload.open("https://s3.amazonaws.com/groundpound-pro/Folds.wav")
t3.artwork.attach(io: artFile, filename: "folds.png")
t3.track_file.attach(io: trackFile, filename: "folds.wav")
t3.save!


t4 = Track.new(title: "Hesitate", artist_id: u1.id, track_url: "x")
artFile = EzDownload.open("https://s3.amazonaws.com/groundpound-pro/bair+tub-02.jpg")
trackFile = EzDownload.open("https://s3.amazonaws.com/groundpound-pro/Hesitate.mp3")
t4.artwork.attach(io: artFile, filename: "bair tub-02.jpg")
t4.track_file.attach(io: trackFile, filename: "Hesitate.mp3")
t4.save!

t5 = Track.new(title: "Sonic Mania - Main Menu Theme", artist_id: u2.id, track_url: "x")
artFile = EzDownload.open("https://s3.amazonaws.com/groundpound-pro/IMG_0949.JPG")
trackFile = EzDownload.open("https://s3.amazonaws.com/groundpound-pro/Main+Menu.m4a")
t5.artwork.attach(io: artFile, filename: "sonic_art.jpg")
t5.track_file.attach(io: trackFile, filename: "main_menu.m4a")
t5.save!

t6 = Track.new(title: "Indulgence", artist_id: u3.id, track_url: "x", description: "The first thing I was ever really proud of")
artFile = EzDownload.open("https://s3.amazonaws.com/groundpound-pro/BAIR+CIGAR+PHOTO+(Square+Cropped)+SMALL.jpg")
trackFile = EzDownload.open("https://s3.amazonaws.com/groundpound-pro/Indulgence.m4a")
t6.artwork.attach(io: artFile, filename: "bair_cigar.jpg")
t6.track_file.attach(io: trackFile, filename: "Indulgence.m4a")
t6.save!

t7 = Track.new(title: "Robot Love", artist_id: u4.id, track_url: "x")
artFile = EzDownload.open("https://s3.amazonaws.com/groundpound-pro/Robot+Love+FUNKBOT+(w%3A+Text)+SMALLFILE.jpg")
trackFile = EzDownload.open("https://s3.amazonaws.com/groundpound-pro/Robot+Love.mp3")
t7.artwork.attach(io: artFile, filename: "robot_love_funkbot.jpg")
t7.track_file.attach(io: trackFile, filename: "Robot Love.mp3")
t7.save!

t8 = Track.new(title: "Moophs - Space Travel (feat. Xela) [baircave Remix]", artist_id: u3.id, track_url: "x", description: "This was my first time ever trying to write up-tempo (above 134bpm). Kind of a weird result but I think it's got its own charm. Hope you enjoy!")
artFile = EzDownload.open("https://s3.amazonaws.com/groundpound-pro/spacetravelremix.png")
trackFile = EzDownload.open("https://s3.amazonaws.com/groundpound-pro/Space+Travel+(baircave+Remix)+MASTER1.mp3")
t8.artwork.attach(io: artFile, filename: "spacetravelremix.png")
t8.track_file.attach(io: trackFile, filename: "spacetravelremix.mp3")
t8.save!

t9 = Track.new(title: "Is Everything Okay?", artist_id: u2.id, track_url: "x")
artFile = EzDownload.open("https://s3.amazonaws.com/groundpound-pro/Screen+Shot+2018-07-20+at+8.21.08+AM.png")
trackFile = EzDownload.open("https://s3.amazonaws.com/groundpound-pro/Is+Everything+Okay_.mp3")
t9.artwork.attach(io: artFile, filename: "is_everything_okay.png")
t9.track_file.attach(io: trackFile, filename: "Is Everything Okay.png")
t9.save!

t10 = Track.new(title: "Pierce Fulton - Life in Letters (baircave Remix)", artist_id: u1.id, track_url: "x", description: "Made this one for a remix contest. Been a fan of Pierce's since I saw him open for Wolfgang Gartner in 2012. Thought I'd throw it back to that warm electro house feel. Enjoy!")
artFile = EzDownload.open("https://s3.amazonaws.com/groundpound-pro/pierce+fulton+rmx.png")
trackFile = EzDownload.open("https://s3.amazonaws.com/groundpound-pro/Life+in+Letters+(baircave+Remix).mp3")
t10.artwork.attach(io: artFile, filename: "pierce fulton remix.png")
t10.track_file.attach(io: trackFile, filename: "Life in Letter baircave Remix.mp3")
t10.save!


c1 = Comment.create!(body: "YOOOOO!!!!", author_id: u2.id, track_id: t10.id)
c2 = Comment.create!(body: "meh", author_id: u3.id, track_id: t10.id)
c3 = Comment.create!(body: "i was at that show but i don't remember any of it so i assume it was dope", author_id: u4.id, track_id: t10.id)
c4 = Comment.create!(body: "what were you wearing?", author_id: u1.id, track_id: t10.id)
c5 = Comment.create!(body: "i had a guy fieri haircut and only wore turtlenecks that year", author_id: u4.id, track_id: t10.id)
