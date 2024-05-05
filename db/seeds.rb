# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# If ./seed_songs exists, will load all top-level mp3 files and attempt to grab included artwork.
# Else, will expect ./seed_audios & ./seed_audio_artworks formatted from previous S3 bucket.  If
# none of these exist, audio upload is skipped
#
# You should not commit these folders unless temporarily such as in heroku

require 'taglib'
require 'rack/mime'

SEED_SONGS_AUDIO_FOLDER_PATH = 'seed_audios'
SEED_SONGS_ARTWORK_FOLDER_PATH = 'seed_audio_artworks'

SEED_SONGS_COMBINED_PATH = 'seed_songs'

USE_COMBINED_PATH = File.exist?(SEED_SONGS_COMBINED_PATH)

SEED_PASSWORD = ENV['BASSCASE_SEED_PASSWORD']

SEED_USER_PARAMS = {
    1 => {
        username: "guest",
        password: "password",
        bio: "Meep, meep.",
        location: "Sesame Street"
    },
    2 => {
        username: "Hailey's Comet",
        password: SEED_PASSWORD,
        bio: "I'm just a comet, don't mind me!",
        location: "Spaaaaaaaace."
    },
    3 => {
        username: "Hello Kitty",
        password: SEED_PASSWORD,
        bio: "You can never have too many friends.",
        location: "London, UK"
    },
    4 => {
        username: "Marvin Martian",
        password: SEED_PASSWORD,
        bio: "Where's the kaboom? There was supposed to be an Earth-shattering kaboom!",
        location: "Mars"
    },
    5 => {
        username: "Bugz",
        password: SEED_PASSWORD,
        bio: "What's up, doc?",
        location: "Tune Town"
    },
    6 => {
        username: "Duck Dodgers",
        password: SEED_PASSWORD,
        bio: "No wabbits!",
        location: "Planet X"
    },
    7 => {
        username: "Tom",
        password: SEED_PASSWORD,
        bio: "No mice!!!",
        location: "A respectable home"
    },
    8 => {
        username: "Jerry",
        password: SEED_PASSWORD,
        bio: "Cats r stinkers, gimme cheese!",
        location: "Hole in the wall"
    },
    9 => {
        username: "Donkey Kong",
        password: SEED_PASSWORD,
        bio: "Ooooooh, banana!",
        location: "DK Isles"
    },
    10 => {
        username: "Doge",
        password: SEED_PASSWORD,
        bio: "Much doge, very wow",
        location: "*wag*"
    }
}

RANDOM_SEED = 412

def create_seed_users!()
    created_users = []

    SEED_USER_PARAMS.each do |i, params|
        user = User.new
        user.username = params[:username]
        user.password = params[:password]
        user.bio = params[:bio]
        user.location = params[:location]
        user.save

        # add avatar, banner images
        user.profile_image = File.open("app/assets/images/seed/avatar_#{i}.jpg")
        user.banner_image = File.open("app/assets/images/seed/banner_#{i}.jpg")
        user.save

        # add bi-directional follows for all prev users
        created_users.each do |prev_user|
            # follow user -> previous user
            user.follows.new(followee_id: prev_user.id).save if [true, false].sample

            # follow previous user -> user & save immediately
            if prev_user.username === 'guest' || [true, false].sample
                prev_user
                    .follows
                    .new(followee_id: user.id)
                    .save
            end
        end

        # add current user to list of created users
        created_users.push(user)
    end

    return created_users.map {|user| user.id }
end

def create_seed_songs_combined!(user_ids)
    if !File.directory?(SEED_SONGS_AUDIO_FOLDER_PATH)
        puts 'No seed music detected, skipping song uploads'
        return []
    end

    created_songs = []

    users = User.where("id IN (?)", user_ids).to_a

    mp3_path_list = Dir.children(SEED_SONGS_COMBINED_PATH).map { |filename| "#{SEED_SONGS_COMBINED_PATH}/#{filename} }"

    num_songs_per_user = (mp3_path_list.length.to_f / users.length).ceil

    while !mp3_path_list.empty? do
        user = users.shift

        num_songs_per_user.times do
            break if mp3_path_list.empty?

            song = user.songs.new
            song.plays = 0

            mp3_path = mp3_path_list.shift

            File.open(mp3_path) do |file|
                song.audio = file
            end

            temp_image_filename = ""

            TagLib::MPEG::File.open(mp3_path) do |file|
                tag = file.id3v2_tag
                cover_img = tag.frame_list('APIC').first
                song.title = tag.title.empty? ? File.basename(Dir.children(audio_path)[0], ".*") : tag.title

                if cover_img.nil?
                    File.open('app/assets/images/track-artwork/default-track-image.png') do |file|
                        song.image = file
                    end
                else
                    image_data = cover_img.picture.force_encoding('UTF-8')
                    mime_type = cover_img.mime_type === 'image/jpg' ? 'image/jpeg' : cover_img.mime_type

                    temp_image_filename = "cover_art#{Rack::Mime::MIME_TYPES.invert[mime_type]}"
                    File.open(temp_image_filename, "w+") do |file|
                        file.write(image_data)
                        song.image = file
                    end
                end
            end

            if song.save
                created_songs.push(song.id)
            else
                File.open('app/assets/images/track-artwork/default-track-image.png') do |file|
                    song.image = file
                end
                if song.save
                    created_songs.push(song.id)
                else
                    puts "Error uploading song:"
                    puts song.title
                    puts song.errors.full_messages
                end
            end

            File.delete(temp_image_filename) if File.exist?(temp_image_filename)
        end
    end

    return created_songs
end

def create_seed_songs!(user_ids)
    if !File.directory?(SEED_SONGS_AUDIO_FOLDER_PATH)
        puts 'No seed music detected, skipping song uploads'
        return []
    end

    created_songs = []

    users = User.where("id IN (?)", user_ids).to_a

    song_data_list = Dir.children(SEED_SONGS_AUDIO_FOLDER_PATH).map do |song_number|
        {
            audio: "#{SEED_SONGS_AUDIO_FOLDER_PATH}/#{song_number}/original",
            art: "#{SEED_SONGS_ARTWORK_FOLDER_PATH}/#{song_number}/original"
        }
    end

    num_songs_per_user = (song_data_list.length.to_f / users.length).ceil

    while !song_data_list.empty? do
        user = users.shift

        num_songs_per_user.times do
            break if song_data_list.empty?

            song = user.songs.new
            song.plays = 0

            song_data = song_data_list.shift
            audio_path = song_data[:audio]
            artwork_path = song_data[:art]

            File.open("#{audio_path}/#{Dir.children(audio_path)[0]}") do |file|
                song.audio = file
            end

            TagLib::MPEG::File.open(audio_path) do |file|
                tag = file.id3v2_tag
                song.title = tag.title.empty? ? File.basename(Dir.children(audio_path)[0], ".*") : tag.title

                if File.directory?(artwork_path)
                    File.open("#{artwork_path}/#{Dir.children(artwork_path)[0]}") do |file|
                        song.image = file
                    end
                else
                    File.open('app/assets/images/track-artwork/default-track-image.png') do |file|
                        song.image = file
                    end
                end
            end

            if song.save
                created_songs.push(song.id)
            else
                File.open('app/assets/images/track-artwork/default-track-image.png') do |file|
                    song.image = file
                end
                if song.save
                    created_songs.push(song.id)
                else
                    puts "Error uploading song:"
                    puts song.title
                    puts song.errors.full_messages
                end
            end
        end
    end

    return created_songs
end

def add_likes_and_reposts!(user_ids, song_ids)
    return if !File.directory?(SEED_SONGS_AUDIO_FOLDER_PATH)

    user_ids.each do |user_id|
        user = User.find(user_id)

        song_ids.sample(Random.new(RANDOM_SEED).rand(song_ids.length)).each do |song_id|
            user.likes.new(song_id: song_id).save if [true, false].sample
            user.reposts.new(song_id: song_id).save if [true, false].sample
        end
    end
end

def make_seed_user_deletion_script(user_ids, song_ids)
    text =
    """
    List of seed user ids & song ids for reference (lowest is the guest account):

    User IDs
    #{user_ids}

    Song IDs
    #{song_ids}

    Run this command in the rails console. Access using `bin/rails console` from the root of basscase repo.  Requires connection to basscase postgres db in specified env.

    ```
    # in rails console

    User
        .where(\"id IN (?)\", #{user_ids})
        .each { |user| user.destroy }
    ```
    """

    File.write("db/delete_seed_users.txt", text)
end

if SEED_PASSWORD.nil?
    print "Error: required ENV variable BASSCASE_SEED_PASSWORD to seed db with users"
else
    user_ids = create_seed_users!

    song_ids = USE_COMBINED_PATH ? create_seed_songs_combined!(user_ids) : create_seed_songs!(user_ids)
    add_likes_and_reposts!(user_ids, song_ids)

    make_seed_user_deletion_script(user_ids, song_ids)
end