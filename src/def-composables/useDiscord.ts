// Webhook link
const cardCreationsChannel = "https://discord.com/api/webhooks/1244571775841599569/H1EF4SF4-3Nmz6QzjPLgKa8ZkG6OauCYYWXXhj6_L0dM2mz2ui9ZTM3QZAUU5lTzI50D";

//Maybe as properties also require img url, or will that be deduced from the ID?
export const sendNewCardMessage = (author: String, id: number) => {
  const request = new XMLHttpRequest();
  request.open("POST", cardCreationsChannel);
  request.setRequestHeader('Content-type', 'application/json');
  const params = {
    embeds: [{
      title: "A **New Card** has been created!",
      description: "You can check it out [here](https://crowdcontrol.network/#/cardview/"+ id + ").",
      color: "9111111",
      image: { //Remove Image if it cannot be converted, maybe post the artwork only?
        url: "https://crowdcontrol.network/assets/EntityShadowFrame-CKDxnyUT.jpg"
      },
      footer: {
        text: "made by: " + author,
        icon_url: "https://crowdcontrol.network/assets/CCLogo-D94ueMZD.png"
      },
    }
    ]
  }
  request.send(JSON.stringify(params));
}
