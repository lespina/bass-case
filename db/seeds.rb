# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

SEED_PASSWORD = ENV['BASSCASE_SEED_PASSWORD']

SEED_USER_PARAMS = {
    1 => {
        username: "guest",
        password: SEED_PASSWORD,
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
            user.follows.new(followee_id: prev_user.id).save

            # follow previous user -> user & save immediately
            prev_user
                .follows
                .new(followee_id: user.id)
                .save
        end

        # add current user to list of created users
        created_users.push(user)
    end

    return created_users.map {|user| user.id }
end

def make_seed_user_deletion_script(user_ids)
    text =
    """
    List of seed user ids for reference (lowest is the guest account):

    #{user_ids}

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
    make_seed_user_deletion_script(user_ids)
end