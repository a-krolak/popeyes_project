if (!localStorage.getItem('userId')) {
  localStorage.setItem('userId', String(Math.random()));
}

function handleClick(event) {
  console.log(event);

  const whereUserClicksX = Math.round(event.pageX);
  const whereUserClicksY = Math.round(event.pageY);

  const eventPath = event.path;
  const trackingID = eventPath.find(
    item => item.dataset.trackingid !== undefined
  );
  console.log(trackingID);

  const eventTarget = event.target.outerHTML;
  const timeOnPage = Math.round(event.timeStamp);

  const userId = localStorage.getItem('userId');

  const url = '/clicks';
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      clickX: whereUserClicksX,
      clickY: whereUserClicksY,
      tracking: String(trackingID),
      target: eventTarget,
      time: timeOnPage,
      id: userId,
    }),
  });
}

window.addEventListener('click', handleClick);
