const sendForm = () => {
  const errorMessage = "Something was wrong...",
    loadMessage = "loading...",
    successMessage = "Thanks! We'll write you!";

  const form1 = document.getElementById("form1");
  const form2 = document.getElementById("form2");
  const form3 = document.getElementById("form3");
  const statusMessage = document.createElement("div");
  statusMessage.textContent = "Тут будет сообщение!";
  statusMessage.style.cssText = "font-size: 2rem; color: white;";
  const formDataFunc = function (event) {
    event.preventDefault();
    const form = document.getElementById(`${event.target.id}`);
    console.log(form);
    form.appendChild(statusMessage);

    statusMessage.textContent = loadMessage;
    const formData = new FormData(form);
    let body = {};

    for (let key of formData.entries()) {
      body[key[0]] = key[1];
    }

    postData(body)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("status network not 200");
        }
        console.log(response);
        statusMessage.textContent = successMessage;
      })
      .catch((error) => {
        statusMessage.textContent = errorMessage;
        console.error(error);
      });
  };

  const postData = (body) => {
    return fetch("./server.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  };
  form1.addEventListener("submit", formDataFunc);
  form2.addEventListener("submit", formDataFunc);
  form3.addEventListener("submit", formDataFunc);
};

export default sendForm;
