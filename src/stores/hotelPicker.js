const HOTEL_KEY = 'userHotel';

export function saveUserHotel(hotel) {
  localStorage.setItem(HOTEL_KEY, hotel);
}

export function getUserHotel() {
  return localStorage.getItem(HOTEL_KEY) || 'EN';  // Default to 'EN' for English
}
