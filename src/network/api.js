
const BASEURL = process.env.REACT_APP_BASE_URL;

// Use the fetch function to make a GET request
const selectWord = (params) => {
  return new Promise((resolve, reject) => {
      fetch(`${BASEURL}/selectword?wordlength=${params.wordLength}&amount=${params.amount}`).then(response => {
          // Check if the request was successful (status code 200)
          console.log('HELLO');
          console.log('response',response.status);
          if (response.status !== 200 ) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
      }).then(data => {
          // Handle the data received from the server
          return resolve(data);
      }).catch(error => {
          // Handle any errors that occurred during the fetch
          console.error('Fetch error:', error);
          return reject(error);
      });
    }
  );
}


// Use the fetch function to make a GET request
const compareWord = (params) => {
  return new Promise((resolve, reject) => {
      fetch(`${BASEURL}/checkword?id=${params.id}&word=${params.word}`).then(response => {
          // Check if the request was successful (status code 200)
          console.log('HELLO');
          console.log('response',response.status);
          if (response.status !== 200 ) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
      }).then(data => {
          // Handle the data received from the server
          return resolve(data);
      }).catch(error => {
          // Handle any errors that occurred during the fetch
          console.error('Fetch error:', error);
          return reject(error);
      });
    }
  );
}

export {selectWord, compareWord};