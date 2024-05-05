# Preconditions:
# Must have valid file db/test_user_ids.txt containing array of test user ids as text (created during seeds.rb, or can be manually made)
# Must have folder in root project dir named audios_to_add, which contains mp3s to add (preferably with attached cover images)
#
# Usage:
# (from root project dir)
# bin/rails r db/add_data.rb

require 'taglib'
require 'rack/mime'

# access db
require_relative "../config/environment"

TEST_USER_IDS_FILEPATH = "db/test_user_ids.txt"
MP3_FOLDER = "audios_to_add"

def add_songs_with_artwork!(user_ids)
    created_song_titles = []

    users = User.where("id IN (?)", user_ids).to_a

    mp3_path_list = Dir.children(MP3_FOLDER)
        .select { |filename| File.extname(filename) == ".mp3" }
        .map { |filename| "#{MP3_FOLDER}/#{filename}" }

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
                song.title = tag.title.empty? ? File.basename(mp3_path, ".*") : tag.title

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
                created_song_titles.push(song.title)
            else
                File.open('app/assets/images/track-artwork/default-track-image.png') do |file|
                    song.image = file
                end
                if song.save
                    created_song_titles.push(song.title)
                else
                    puts "Error uploading song:"
                    puts song.title
                    puts song.errors.full_messages
                end
            end

            File.delete(temp_image_filename) if File.exist?(temp_image_filename)
        end
    end

    return created_song_titles
end

def add_songs!()
    puts "Checking for #{TEST_USER_IDS_FILEPATH}..."
    unless File.exist?(TEST_USER_IDS_FILEPATH)
        puts "No test user id file found.  Please ensure #{TEST_USER_IDS_FILEPATH} exists"
        return
    end
    puts "Found!"

    puts "Checking for #{MP3_FOLDER}/..."
    unless File.exist?(MP3_FOLDER)
        puts "No audios folder found.  Please ensure #{MP3_FOLDER}/ exists in the root project dir and has mp3 files inside"
        return
    end
    puts "Found!"

    puts "Reading user ids..."
    test_user_ids = eval(File.read(TEST_USER_IDS_FILEPATH))
    puts "Found ids: #{test_user_ids.to_s}"

    puts "Uploading songs as test users..."
    added_songs = add_songs_with_artwork!(test_user_ids)

    puts "Success! Songs added:"
    puts added_songs
end

add_songs!()