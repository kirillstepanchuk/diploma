class UserDto {
  email;
  id;
  isActivated;
  isBlocked;
  roles;
  name;
  favoriteProducts;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
    this.isBlocked = model.isBlocked;
    this.roles = model.roles;
    this.name = model.name;
    this.phoneNumber = model.phoneNumber;
    this.favoriteProducts = model.favoriteProducts;
  }
}

module.exports = UserDto;
