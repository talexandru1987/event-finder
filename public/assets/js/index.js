const signupForm = $("#signup-form");
const loginForm = $("#login-form");
const logoutBtn = $("#logout-btn");
const searchForm = $("#search-form");

const eventsContainer = $("#events-container");

const renderError = (id, message) => {
  const errorDiv = $(`#${id}`);
  errorDiv.empty();
  errorDiv.append(`<div class="text-center text-danger">${message}</div>;`);
};

const handleSignup = async (event) => {
  event.preventDefault();

  const first_name = $("#firstName").val();
  const last_name = $("#lastName").val();
  const user_name = $("#userName").val();
  const email = $("#email").val();
  const password = $("#password").val();
  const confirmPassword = $("#confirmPassword").val();
  const profile_img_url = $("#profileImageUrl").val();
  const date_of_birth = $("#dateOfBirth").val();

  if (first_name && last_name && user_name && email && password && confirmPassword) {
    if (password === confirmPassword) {
      try {
        const payload = {
          first_name,
          last_name,
          user_name,
          email,
          password,
          confirmPassword,
          profile_img_url,
          date_of_birth,
        };

        console.log(payload);

        const response = await fetch("/auth/signup", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (data.success) {
          window.location.assign("/login");
        } else {
          renderError("signup-error", "Failed to create account. Please try again");
        }
      } catch (error) {
        renderError("signup-error", "Failed to create account. Please try again.");
      }
    } else {
      renderError("signup-error", "Passwords do not match. Try again.");
      //mismatched passwords
    }
  } else {
    renderError("signup-error", "Please complete all required fields.");
  }

  console.log("submit");
};

const handleLogin = async (event) => {
  event.preventDefault();

  const email = $("#email").val();
  const password = $("#password").val();

  if (email && password) {
    try {
      const payload = {
        email,
        password,
      };

      const response = await fetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        window.location.assign("/");
      } else {
        renderError("login-error", "Failed to login. Please try again");
      }
    } catch (error) {
      renderError("login-error", "Failed to login. Please try again.");
    }
  } else {
    renderError("login-error", "Passwords do not match. Try again.");
  }
};

const handleLogout = async () => {
  console.log("logout");
  try {
    const response = await fetch("/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      window.location.assign("/");
    }
  } catch (error) {
    console.log("Failed to logout");
  }
};

const navigateToSearchResults = (event) => {
  event.preventDefault();

  const q = $("#searchInput").val();

  window.location.assign(`/search-events?q=${q}`);
};

//open and close modal
const handleEventView = async (event) => {
  const target = $(event.target);
  const currentTarget = $(event.currentTarget);

  const searchKey = currentTarget.attr("data-search-key");
  const eventId = target.attr("data-event-id");

  const response = await fetch(`/api/search/${searchKey}`);

  const data = await response.json();

  const searchResults = data.data.search_results;

  const singleEvent = searchResults.find((each) => {
    return each.id === eventId;
  });

  $("#eventModal").remove();

  // title, address, thumbnail, buy tickets link

  const modal = `<div class="modal fade bd-example-modal-lg" id="eventModal" tabindex="-1" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" id="modalContainer" >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">${singleEvent.title}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="event-card-header">
          <img src=${singleEvent.thumbnail} alt="rover" />
        </div>
        <div class="modal-body">

          <div class="row">
           <div class="col">
          <p>${singleEvent.description}</p>
          <p>Venue: ${singleEvent.venue} </p>
          <p>Rating: ${singleEvent.rating} </p>
          <p>Review: ${singleEvent.reviews}  </p>
          <p>Address: ${singleEvent.address}</p>
          <p>Date: ${singleEvent.date} </p>
          </div>
          <div class="col">
          <p>MAP </p>
          </div>
          </div>




          
        </div>

        <div class="modal-footer">

          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" id="buyTickets"> Buy tickets</button>
          <button type="button" class="btn btn-primary" id="getLocation"  >Get Location</button>
          <button type="button" class="btn btn-primary" id="saveEvent" >Save Event</button>
        </div>
      </div>
    </div>
  </div>`;

  $("#main").append(modal);

  const myModal = new bootstrap.Modal(document.getElementById("eventModal"));

  myModal.show();

  const handleModalClick = async (event) => {
    if (event.target.id === "saveEvent") {
      const saveEventResult = await fetch("/api/event", {
        method: "POST",
        body: JSON.stringify(singleEvent),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  };

  $("#modalContainer").click(handleModalClick);
};

signupForm.submit(handleSignup);
loginForm.submit(handleLogin);
logoutBtn.click(handleLogout);
searchForm.submit(navigateToSearchResults);
eventsContainer.click(handleEventView);
