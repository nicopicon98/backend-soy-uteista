const obtainDomainName = (email) => {
  return email.substring(email.lastIndexOf("@") + 1);
};

module.exports = {
  obtainDomainName,
};
