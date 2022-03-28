const formatContactMessage = ({ email, username, message, fullName }) => {
  return `
        <h1>Message from ${email}</h1>
        <p>Email: <span>${email}</span></p>
        ${username ? `<p>Username: <span>${username}</span></p>` : ""}
        ${fullName ? ` <p>Full name: <span>${fullName}</span></p>` : ""}
        <p>message: <span>${message}</span></p>
    `;
};

module.exports = formatContactMessage;
