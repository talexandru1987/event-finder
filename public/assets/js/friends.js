const myEventsContainer = $("#my-events-container");

const handleInviteFriendModal = (event) => {
  const target = $(event.target);

  if (target.is('button[name="invite-friend-modal-btn"]')) {
    const eventId = target.attr("id");

    const friendModal = new bootstrap.Modal(
      document.getElementById("friends-modal")
    );

    friendModal.show();

    const inviteFriendBtn = $('button[name="invite-friend-btn"]');

    const inviteFriendHandler = async (event) => {
      try {
        const target = $(event.target);

        const friendId = target.attr("id");

        const payload = { event_id: eventId, friend_id: friendId };

        const response = await fetch("/api/invites", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (data.success) {
          friendModal.hide();
        } else {
          // TODO: handle error
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    inviteFriendBtn.click(inviteFriendHandler);
  }
};

myEventsContainer.click(handleInviteFriendModal);
