const  getCookie = (name) => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Check if this cookie is the one we're looking for
      if (cookie.startsWith(name + '=')) {
        // Return the value of the cookie
        return cookie.substring(name.length + 1);
      }
    }
    // Return null if the cookie is not found
    return null;
  };
  export default getCookie;