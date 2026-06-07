// 重构前：
function processUser(user) {
  let role = 'guest';
  if (user && user.profile && user.profile.role) {
    role = user.profile.role;
  }
  let age = user && user.age !== undefined ? user.age : 18;
  // ...
}

// 重构后：
const processUser = ({ profile, age = 18 } = {}) => {
  const role = profile?.role ?? 'guest';
  // ...
};
