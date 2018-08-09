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
u3 = User.create!(username: "nick", password: "asdfasdf", location: "New York, NY", bio: "I wrote this app--hopefully there's no bugs.......")
u4 = User.create!(username: "guest", password: "asdfasdf", location: "New York, NY", bio: "I'm your friendly neighborhood Guest user! If you're checking out Groundpound for the first time, enjoy your stay!")
u5 = User.create!(username: "Oliver Heldens", password: "asdfasdf", location: "Netherlands", bio: "'King Kong' Out Now! :D heldeep.release.link/king-kong-hi-lo-touch

WWW.OLIVERHELDENS.COM
With free downloads, exclusive studio sessions & more. Join now! :D

\o/ House Music \o/
@HeldeepRecords
@HeldeepRadio

Btw, I make more bassline driven and 'underground' / clubby stuff under my @official-hilo alias
Enjoy!

MGMT: Lucas Keller, Alex Harrow, Dave Frank | Milk & Honey Music
heldens@milkhoneyla.com

Bookings North & South America: david@spinartistagency.com
Bookings ROW: jennifer.hammel@caa.com")
u6 = User.create!(username: "Basement Jaxx", password: "asdfasdf", location: "London / United Kingdom")
u7 = User.create!(username: "Audien", password: "asdfasdf", location: "Connecticut / United States", bio: "feelsy music")
u8 = User.create!(username: "Knife Party", password: "asdfasdf", location: "London", bio: "Seizure Music")
u9 = User.create!(username: "Unlike Pluto", password: "asdfasdf", location: "Los Angeles, United States", bio: "¿

✚ Management / Booking / Press ✚
bit.ly/contact-unlikepluto")

profPhoto = EzDownload.open('https://s3.amazonaws.com/groundpound-pro/oliver-heldens-prof-photo.jpg')
coverPhoto = EzDownload.open('https://s3.amazonaws.com/groundpound-pro/oliver-heldens-cover-photo.jpg')
u5.profile_photo.attach(io: profPhoto, filename: 'oliver-heldens-prof-photo.jpg')
u5.cover_photo.attach(io: coverPhoto, filename: 'oliver-heldens-cover-photo.jpg')

profPhoto = EzDownload.open('https://s3.amazonaws.com/groundpound-pro/basement-jaxx-prof-photo.jpg')
coverPhoto = EzDownload.open('https://s3.amazonaws.com/groundpound-pro/basement-jaxx-cover-photo.jpeg')
u6.profile_photo.attach(io: profPhoto, filename: 'basement-jaxx-prof-photo.jpg')
u6.cover_photo.attach(io: coverPhoto, filename: 'basement-jaxx-cover-photo.jpg')

profPhoto = EzDownload.open('https://s3.amazonaws.com/groundpound-pro/audien-prof-photo.jpg')
coverPhoto = EzDownload.open('https://s3.amazonaws.com/groundpound-pro/audien-cover-photo.jpg')
u7.profile_photo.attach(io: profPhoto, filename: 'audien-prof-photo.jpg')
u7.cover_photo.attach(io: coverPhoto, filename: 'audien-cover-photo.jpg')

profPhoto = EzDownload.open('https://s3.amazonaws.com/groundpound-pro/knife-party-prof-photo.jpg')
coverPhoto = EzDownload.open('https://s3.amazonaws.com/groundpound-pro/knife-party-cover-photo.jpg')
u8.profile_photo.attach(io: profPhoto, filename: 'knife-party-prof-photo.jpg')
u8.cover_photo.attach(io: coverPhoto, filename: 'knife-party-cover-photo.jpg')

profPhoto = EzDownload.open('https://s3.amazonaws.com/groundpound-pro/unlike-pluto-prof-photo.jpg')
coverPhoto = EzDownload.open('https://s3.amazonaws.com/groundpound-pro/unlike-pluto-cover-photo.jpg')
u9.profile_photo.attach(io: profPhoto, filename: 'unlike-pluto-prof-photo.jpg')
u9.cover_photo.attach(io: coverPhoto, filename: 'unlike-pluto-cover-photo.jpg')


t11 = Track.new(title: "Animals (Oliver Heldens Remix)", artist_id: u5.id, track_url: "x", description: "Hey everyone, it's finally out: my official remix for @MartinGarrix - Animals ! :-)
Really happy with this one and I'm also overwhelmed by the reactions/likes and plays (over 400k!) on the preview.
It would be so sick if we could hit the top 10 again (like with Gecko, which is #3 atm).
Support me and get it here: www.beatport.com/track/animals-ol…ns-remix/5050373 or support me by reposting/sharing this :-)
Thanks!
~ Oli
@OliverHeldens
www.facebook.com/OliverHeldens
www.twitter.com/OliverHeldens
www.instagram.com/OliverHeldens

<3 the track on HypeM here: bit.ly/1d1GyWt")
artFile = EzDownload.open("https://s3.amazonaws.com/groundpound-pro/01+Animals+(Oliver+Heldens+Remix).jpg")
trackFile = EzDownload.open("https://s3.amazonaws.com/groundpound-pro/01+Animals+(Oliver+Heldens+Remix).m4a")
t11.artwork.attach(io: artFile, filename: "animals-oliver-heldens-remix.jpg")
t11.track_file.attach(io: trackFile, filename: "animals-oliver-heldens-remix.m4a")
t11.save!

t12 = Track.new(title: "EDM Trend Machine", artist_id: u8.id, track_url: "x", description: "'EDM Trend Machine' taken from the album 'Abandon Ship' OUT NOW smarturl.it/AbandonShipiTunes")
artFile = EzDownload.open("https://s3.amazonaws.com/groundpound-pro/03+Boss+Mode.jpg")
trackFile = EzDownload.open("https://s3.amazonaws.com/groundpound-pro/04+EDM+Trend+Machine.m4a")
t12.artwork.attach(io: artFile, filename: "abandon-ship.jpg")
t12.track_file.attach(io: trackFile, filename: "edm-trend-machine.m4a")
t12.save!

t13 = Track.new(title: "Boss mode", artist_id: u8.id, track_url: "x", description: "'Boss Mode' taken from the album 'Abandon Ship' OUT NOW smarturl.it/AbandonShipiTunes")
artFile = EzDownload.open("https://s3.amazonaws.com/groundpound-pro/03+Boss+Mode.jpg")
trackFile = EzDownload.open("https://s3.amazonaws.com/groundpound-pro/03+Boss+Mode.m4a")
t13.artwork.attach(io: artFile, filename: "abandon-ship.jpg")
t13.track_file.attach(io: trackFile, filename: "boss-mode.m4a")
t13.save!

t14 = Track.new(title: "Never Say Never", artist_id: u6.id, track_url: "x", description: "The GRAMMY nominated single from the album \"Junto\" by Basement Jaxx featuring South London school-leaver sensation ETML.

\"Junto\" is out now !
Deluxe Digital: smarturl.it/deldigi
Digital: smarturl.it/juntodigi
Deluxe CD: smarturl.it/Junto2CD
CD: smarturl.it/JuntoCD
2LP: smarturl.it/JuntoLP

www.facebook.com/BasementJaxx
twitter.com/TheBasementJaxx
www.youtube.com/BasementJaxx")
artFile = EzDownload.open("https://s3.amazonaws.com/groundpound-pro/1-04+Never+Say+Never.jpg")
trackFile = EzDownload.open("https://s3.amazonaws.com/groundpound-pro/1-04+Never+Say+Never.m4a")
t14.artwork.attach(io: artFile, filename: "junto.jpg")
t14.track_file.attach(io: trackFile, filename: "never-say-never.m4a")
t14.save!

t15 = Track.new(title: "Unicorn", artist_id: u6.id, track_url: "x", description: "From the new Basement Jaxx album, \"Junto\", out now !

Deluxe Digital: smarturl.it/deldigi
Digital: smarturl.it/juntodigi
Deluxe CD: smarturl.it/Junto2CD
CD: smarturl.it/JuntoCD
2LP: smarturl.it/JuntoLP")
artFile = EzDownload.open("https://s3.amazonaws.com/groundpound-pro/1-04+Never+Say+Never.jpg")
trackFile = EzDownload.open("https://s3.amazonaws.com/groundpound-pro/1-03+Unicorn.m4a")
t15.artwork.attach(io: artFile, filename: "junto.jpg")
t15.track_file.attach(io: trackFile, filename: "unicorn.m4a")
t15.save!

t16 = Track.new(title: "Pompeii (Audien Remix)", artist_id: u7.id, track_url: "x", description: "My new official remix of 'Pompeii' by Bastille!

Out Now!

Beatport: btprt.dj/1ly4Ocr
iTunes: bit.ly/1hvUKxq

www.facebook.com/audienmusic
www.twitter.com/audien")
artFile = EzDownload.open("https://s3.amazonaws.com/groundpound-pro/01+Pompeii+(Audien+Remix).jpg")
trackFile = EzDownload.open("https://s3.amazonaws.com/groundpound-pro/01+Pompeii+(Audien+Remix).m4a")
t16.artwork.attach(io: artFile, filename: "pompeii-audien-remix.jpg")
t16.track_file.attach(io: trackFile, filename: "pompeii-audien-remix.m4a")
t16.save!

t17 = Track.new(title: "Revolution (Unlike Pluto Remix)", artist_id: u9.id, track_url: "x", description: "hypem.com/track/28hj1/Diplo+-+…+(Unlike+Pluto+remix)

Get it on iTunes: smarturl.it/revolutionremixes2
Get it on Amazon: amzn.to/1Hrn6r3
Get it on Beatport: btprt.dj/1dhPteP
---
Stream Revolution (Remixes Part 2) - smarturl.it/streamrevolutionrmxs")
artFile = EzDownload.open("https://s3.amazonaws.com/groundpound-pro/Revolution+(Unlike+Pluto+remix).jpg")
trackFile = EzDownload.open("https://s3.amazonaws.com/groundpound-pro/Revolution+(Unlike+Pluto+remix).mp3")
t17.artwork.attach(io: artFile, filename: "revolution-unlike-pluto-remix.jpg")
t17.track_file.attach(io: trackFile, filename: "revolution-unlike-pluto-remix.mp3")
t17.save!


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
