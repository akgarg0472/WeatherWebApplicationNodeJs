const fetchWeatherData = () => {
  const input = document.querySelector("#search_input");

  const fetchApi = async () => {
    const url = "/weather";
    const data = input?.value;

    if (data === null || data === undefined || data.trim() === "") {
      alert("Please enter city name");
      return;
    }

    await fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        city: `${data}`,
      }),
    })
      .then((res) =>
        res.json({
          city: `${data}`,
        })
      )
      .then((res) => {
        if (res.status === "200") {
          alert(`Temperature: ${res.temperature}\nweather: ${res.weatherType}`);
        } else {
          alert(res.message);
        }
      })
      .catch((err) => {
        alert("Something error occured, please try again later");
      });
  };

  fetchApi();
};
