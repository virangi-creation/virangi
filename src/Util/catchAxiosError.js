const catchAxiosError = (error) => {
    console.log(error);
    if (error.response) alert(error.response.data);
    else if (error.request) alert("Unable to connect to server");
    else alert(error.message);
};

export default catchAxiosError;
