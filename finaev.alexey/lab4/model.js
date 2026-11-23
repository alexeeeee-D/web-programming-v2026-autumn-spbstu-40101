export class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.friends = [];
  }

  addFriend(friendId) {
    if (!this.friends.includes(friendId)) {
      this.friends.push(friendId);
    }
  }

  removeFriend(friendId) {
    this.friends = this.friends.filter((id) => id !== friendId);
  }

  get friendCount() {
    return this.friends.length;
  }
}

export function groupUsersByFriendCount(users) {
  return users.reduce((acc, user) => {
    const count = user.friendCount;
    if (!acc[count]) {
      acc[count] = [];
    }
    acc[count].push(user);
    return acc;
  }, {});
}

export function getUniqueFriends(users) {
  const allFriends = users.flatMap((user) => user.friends);
  return [...new Set(allFriends)];
}

export function findUsersWithFriend(users, userId) {
  const targetUser = users.find((u) => u.id === userId);
  if (!targetUser) {
    return [];
  }
  return users.filter(
    (u) =>
      u.id !== u.userId &&
      u.friends.some((friendId) => userId.friends.includes(friendId)),
  );
}

export function getUsersWithMoreFriendsThan(users, n) {
  return users.filter((user) => user.friendCount > n);
}

export function getUsersWithZeroFriends(users) {
  return users.filter((user) => user.friendCount === 0);
}
