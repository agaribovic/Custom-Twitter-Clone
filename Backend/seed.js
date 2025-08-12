const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");
require("dotenv").config();

const User = require("./models/User");
const Tweet = require("./models/Tweet");
const Message = require("./models/Message");

mongoose.connect(process.env.MONGO_URI);

const NUM_USERS = 10;
const TWEETS_PER_USER = 5;
const MESSAGES_COUNT = 20;

const run = async () => {
  try {
    await User.deleteMany({});
    await Tweet.deleteMany({});
    await Message.deleteMany({});

    const users = [];
    for (let i = 0; i < NUM_USERS; i++) {
      const hashedPassword = await bcrypt.hash("password" + i, 10);

      const firstName = faker.person.firstName().slice(0, 5);
      const lastName = faker.person.lastName().slice(0, 5);
      let username = (firstName + lastName).toLowerCase();

      const user = await User.create({
        username,
        email: faker.internet.email(),
        password: hashedPassword,
        following: [],
      });
      users.push(user);
    }

    const tweets = [];
    for (const user of users) {
      for (let i = 0; i < TWEETS_PER_USER; i++) {
        const tweet = await Tweet.create({
          content: faker.lorem.sentence(),
          user: user._id,
          likes: faker.helpers
            .shuffle(users)
            .slice(0, faker.number.int({ min: 1, max: 3 }))
            .map((u) => u._id),
        });
        tweets.push(tweet);
      }
    }

    for (let i = 0; i < MESSAGES_COUNT; i++) {
      let sender = faker.helpers.arrayElement(users);
      if (!sender || !sender._id) {
        throw new Error("Sender is undefined or missing _id");
      }

      let recipient;
      do {
        recipient = faker.helpers.arrayElement(users);
      } while (
        !recipient ||
        !recipient._id ||
        recipient._id.toString() === sender._id.toString()
      );

      await Message.create({
        sender: sender._id,
        content: faker.lorem.sentences(faker.number.int({ min: 1, max: 3 })),
      });
    }
    console.log("Seeded users, tweets, and messages.");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
};

run();
